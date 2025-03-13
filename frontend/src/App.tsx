import { useState } from 'react'
import { NotePage } from './components/NotePage'
import { PlusIcon } from '@heroicons/react/24/outline'

interface Note {
  id: string
  title: string
  content: string
  updatedAt: Date
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nouvelle note',
      content: '',
      updatedAt: new Date()
    }
    setNotes([...notes, newNote])
    setSelectedNoteId(newNote.id)
  }

  const selectedNote = notes.find(note => note.id === selectedNoteId)

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r overflow-y-auto">
        <div className="p-4">
          <button
            onClick={createNewNote}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Nouvelle note
          </button>
        </div>
        <div className="space-y-1">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedNoteId === note.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-sm text-gray-500">
                {note.updatedAt.toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {selectedNote ? (
          <NotePage
            initialContent={selectedNote.content}
            onSave={(content) => {
              setNotes(notes.map(note =>
                note.id === selectedNote.id
                  ? { ...note, content, updatedAt: new Date() }
                  : note
              ))
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Sélectionnez une note ou créez-en une nouvelle
          </div>
        )}
      </div>
    </div>
  )
}

export default App 