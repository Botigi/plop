import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import CodeBlock from '@tiptap/extension-code-block'

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

export const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table,
      CodeBlock,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="prose max-w-none w-full">
      <div className="border rounded-lg p-4 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
} 