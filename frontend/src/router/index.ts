import { createRouter, createWebHistory } from 'vue-router'
import CourseList from '../components/CourseList.vue'
import DocumentEditor from '../components/DocumentEditor.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CourseList
    },
    {
      path: '/editor',
      name: 'editor',
      component: DocumentEditor
    }
  ]
})

export default router 