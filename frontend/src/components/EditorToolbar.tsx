import { Editor } from '@tiptap/react'
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  CodeIcon,
  ImageIcon,
  TableIcon,
} from '@heroicons/react/24/outline'

interface EditorToolbarProps {
  editor: Editor | null
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) {
    return null
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon: Icon,
    title
  }: { 
    onClick: () => void
    isActive?: boolean
    icon: any
    title: string
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${
        isActive ? 'bg-gray-100' : ''
      }`}
      title={title}
    >
      <Icon className="w-5 h-5" />
    </button>
  )

  return (
    <div className="border-b p-2 flex gap-2 flex-wrap">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        icon={BoldIcon}
        title="Gras"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        icon={ItalicIcon}
        title="Italique"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        icon={ListIcon}
        title="Liste à puces"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        icon={CodeIcon}
        title="Bloc de code"
      />
      <ToolbarButton
        onClick={() => {
          const url = window.prompt('URL de l\'image')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        icon={ImageIcon}
        title="Insérer une image"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true
        }).run()}
        icon={TableIcon}
        title="Insérer un tableau"
      />
    </div>
  )
} 