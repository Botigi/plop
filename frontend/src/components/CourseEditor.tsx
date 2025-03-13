import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CourseEditor = () => {
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] px-4',
      },
    },
  })

  const saveCourse = async () => {
    if (!title || !editor?.getHTML()) {
      alert('Veuillez remplir le titre et le contenu du cours')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('http://localhost:3001/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: editor.getHTML(),
        }),
      })

      if (response.ok) {
        navigate('/')
      } else {
        throw new Error('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde du cours')
    } finally {
      setSaving(false)
    }
  }

  const MenuBar = () => {
    if (!editor) return null

    return (
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex flex-wrap gap-2 p-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Gras"
          >
            <strong>G</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Italique"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Liste à puces"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Liste numérotée"
          >
            1.
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Bloc de code"
          >
            <code>{`</>`}</code>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du cours"
          className="w-full text-3xl font-bold focus:outline-none"
        />
      </div>
      
      <MenuBar />
      
      <div className="border-b min-h-[500px]">
        <EditorContent editor={editor} />
      </div>

      <div className="p-4 flex justify-end gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          Annuler
        </button>
        <button
          onClick={saveCourse}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}

export default CourseEditor 