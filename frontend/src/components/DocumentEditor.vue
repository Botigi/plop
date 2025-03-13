<template>
  <div class="min-h-screen bg-white">
    <!-- Barre d'outils -->
    <div class="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <!-- Formatage de texte -->
            <button 
              @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'bg-gray-100': editor.isActive('bold') }"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span class="font-bold">B</span>
            </button>
            <button 
              @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'bg-gray-100': editor.isActive('italic') }"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span class="italic">I</span>
            </button>
            <button 
              @click="editor.chain().focus().toggleStrike().run()"
              :class="{ 'bg-gray-100': editor.isActive('strike') }"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span class="line-through">S</span>
            </button>
            <div class="h-4 w-px bg-gray-300"></div>

            <!-- Listes -->
            <button 
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'bg-gray-100': editor.isActive('bulletList') }"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span>•</span>
            </button>
            <button 
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'bg-gray-100': editor.isActive('orderedList') }"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span>1.</span>
            </button>
            <div class="h-4 w-px bg-gray-300"></div>

            <!-- Tableaux -->
            <button 
              @click="insertTable"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span>⊞</span>
            </button>
            <div class="h-4 w-px bg-gray-300"></div>

            <!-- Code -->
            <button 
              @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{ 'bg-gray-100': editor.isActive('codeBlock') }"
              class="p-2 rounded hover:bg-gray-100"
            >
              <span class="font-mono">{}</span>
            </button>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <button 
              @click="saveDocument"
              class="btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Éditeur -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="prose prose-lg max-w-none">
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'

// Configuration de l'éditeur
const editor = useEditor({
  extensions: [
    StarterKit,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ],
  content: '<h1>Bienvenue dans votre nouvel espace de travail</h1><p>Commencez à écrire ici...</p>',
  autofocus: true,
  editable: true,
})

// Fonctions utilitaires
const insertTable = () => {
  editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

const saveDocument = () => {
  const content = editor.value?.getHTML()
  console.log('Contenu sauvegardé:', content)
  // TODO: Implémenter la sauvegarde réelle
}

// Nettoyage
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.ProseMirror {
  min-height: 300px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
}

.ProseMirror table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.ProseMirror td,
.ProseMirror th {
  border: 2px solid #e5e7eb;
  box-sizing: border-box;
  min-width: 1em;
  padding: 0.5rem;
  position: relative;
  vertical-align: top;
}

.ProseMirror th {
  background-color: #f9fafb;
  font-weight: bold;
}

.ProseMirror .selectedCell:after {
  background: rgba(200, 200, 255, 0.4);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.ProseMirror pre {
  background: #0d1117;
  border-radius: 0.5rem;
  color: #e6edf3;
  font-family: 'Menlo', 'Monaco', 'Courier New', Courier, monospace;
  padding: 0.75rem 1rem;
}

.ProseMirror pre code {
  background: none;
  color: inherit;
  font-size: 0.875em;
  padding: 0;
}
</style> 