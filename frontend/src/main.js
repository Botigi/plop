// Stockage local des notes
let notes = JSON.parse(localStorage.getItem('notes') || '[]');
let currentNoteId = null;

// Éléments du DOM
const noteList = document.getElementById('noteList');
const newNoteBtn = document.getElementById('newNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');

// Sauvegarder les notes dans le stockage local
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Créer une nouvelle note
function createNewNote() {
    const note = {
        id: Date.now(),
        title: 'Nouvelle note',
        content: '',
        created: new Date().toISOString()
    };
    notes.unshift(note);
    saveNotes();
    displayNotes();
    selectNote(note.id);
}

// Afficher toutes les notes dans la sidebar
function displayNotes() {
    noteList.innerHTML = notes.map(note => `
        <div class="note-item" data-id="${note.id}">
            <div>${note.title || 'Sans titre'}</div>
            <small>${new Date(note.created).toLocaleDateString()}</small>
        </div>
    `).join('');

    // Ajouter les écouteurs d'événements pour chaque note
    document.querySelectorAll('.note-item').forEach(noteElement => {
        noteElement.addEventListener('click', () => {
            selectNote(parseInt(noteElement.dataset.id));
        });
    });
}

// Sélectionner une note pour l'édition
function selectNote(id) {
    currentNoteId = id;
    const note = notes.find(n => n.id === id);
    if (note) {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        document.querySelectorAll('.note-item').forEach(el => {
            el.style.background = el.dataset.id == id ? '#e0e0e0' : 'white';
        });
    }
}

// Sauvegarder les modifications de la note courante
function saveCurrentNote() {
    if (currentNoteId) {
        const noteIndex = notes.findIndex(n => n.id === currentNoteId);
        if (noteIndex !== -1) {
            notes[noteIndex].title = noteTitle.value;
            notes[noteIndex].content = noteContent.value;
            saveNotes();
            displayNotes();
        }
    }
}

// Événements
newNoteBtn.addEventListener('click', createNewNote);
noteTitle.addEventListener('input', saveCurrentNote);
noteContent.addEventListener('input', saveCurrentNote);

// Initialisation
displayNotes();
if (notes.length > 0) {
    selectNote(notes[0].id);
} 