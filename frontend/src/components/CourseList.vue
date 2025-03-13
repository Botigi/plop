<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-12">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Mes Cours</h1>
        <p class="text-gray-600">Gérez vos cours et leur contenu facilement</p>
      </div>
      <button @click="showAddCourse = true" 
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <span>Nouveau Cours</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="course in courses" 
           :key="course.id" 
           class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ course.title }}
          </h2>
          <div class="flex space-x-2">
            <button @click="editCourse(course)" 
                    class="text-gray-500 hover:text-blue-500">
              Modifier
            </button>
            <button @click="deleteCourse(course.id)" 
                    class="text-gray-500 hover:text-red-500">
              Supprimer
            </button>
          </div>
        </div>
        
        <p class="text-gray-600 mb-6">
          {{ course.content }}
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in course.tags" 
                :key="tag" 
                class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {{ tag }}
          </span>
        </div>
        
        <div class="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
          <span>Créé le: {{ new Date(course.createdAt).toLocaleDateString() }}</span>
          <span>Mis à jour: {{ new Date(course.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </div>

    <!-- Modal simple -->
    <div v-if="showAddCourse" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">
          {{ editingCourse ? 'Modifier le cours' : 'Nouveau cours' }}
        </h3>

        <form @submit.prevent="saveCourse" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input 
              v-model="courseForm.title" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required 
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
            <textarea 
              v-model="courseForm.content" 
              rows="4" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input 
              v-model="courseForm.tags" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Séparez les tags par des virgules"
            />
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              @click="showAddCourse = false"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {{ editingCourse ? 'Mettre à jour' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Course } from '../types/Course'

const courses = ref<Course[]>([])
const showAddCourse = ref(false)
const editingCourse = ref<Course | null>(null)
const courseForm = ref({
  title: '',
  content: '',
  tags: ''
})

onMounted(() => {
  fetchCourses()
})

const fetchCourses = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/courses')
    courses.value = await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error)
  }
}

const saveCourse = async () => {
  try {
    const url = editingCourse.value
      ? `http://localhost:3001/api/courses/${editingCourse.value.id}`
      : 'http://localhost:3001/api/courses'
    
    const method = editingCourse.value ? 'PUT' : 'POST'
    const tags = courseForm.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: courseForm.value.title,
        content: courseForm.value.content,
        tags,
      }),
    })

    if (response.ok) {
      await fetchCourses()
      showAddCourse.value = false
      resetForm()
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du cours:', error)
  }
}

const editCourse = (course: Course) => {
  editingCourse.value = course
  courseForm.value = {
    title: course.title,
    content: course.content,
    tags: course.tags?.join(', ') || '',
  }
  showAddCourse.value = true
}

const deleteCourse = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return
  
  try {
    const response = await fetch(`http://localhost:3001/api/courses/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      await fetchCourses()
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du cours:', error)
  }
}

const resetForm = () => {
  editingCourse.value = null
  courseForm.value = {
    title: '',
    content: '',
    tags: '',
  }
}
</script> 