<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span class="ml-2 text-xl font-semibold text-gray-900">CourseApp</span>
            </div>
            <div class="ml-6 flex space-x-4">
              <router-link 
                to="/" 
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Mes Cours
              </router-link>
              <router-link 
                to="/editor" 
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Éditeur
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view />
    </main>

    <footer class="bg-white mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} CourseApp. Tous droits réservés.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script> 