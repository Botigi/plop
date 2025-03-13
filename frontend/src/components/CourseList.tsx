import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Course {
  _id: string
  title: string
  updatedAt: string
}

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Erreur lors du chargement des cours:', err))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Mes Cours</h2>
        <Link
          to="/courses/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nouveau Cours
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-500">
              Dernière modification: {new Date(course.updatedAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun cours n'a été créé pour le moment.</p>
          <p className="text-gray-500">
            Commencez par créer votre premier cours en cliquant sur "Nouveau Cours".
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseList 