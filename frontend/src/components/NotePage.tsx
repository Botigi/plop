import { useState } from 'react'
import { Editor } from './Editor'
import { EditorToolbar } from './EditorToolbar'

interface NotePageProps {
  initialContent?: string
  onSave?: (content: string) => void
}

export const NotePage = ({ initialContent = '', onSave }: NotePageProps) => {
  const [content, setContent] = useState(initialContent)

  const handleChange = (newContent: string) => {
    setContent(newContent)
    onSave?.(newContent)
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Titre de la note..."
          className="w-full px-4 py-2 text-2xl font-bold border-b focus:outline-none"
        />
        <EditorToolbar editor={null} />
        <div className="p-4">
          <Editor content={content} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
} 