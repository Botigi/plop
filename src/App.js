import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    if (selectedCourse && (editingCourse.title || editingCourse.description)) {
      const updatedCourses = courses.map(course =>
        course.id === selectedCourse.id ? { ...course, ...editingCourse } : course
      );
      setCourses(updatedCourses);
    }
  }, [editingCourse.title, editingCourse.description]);

  const handleNewCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: 'Nouveau cours',
      description: ''
    };
    setCourses([...courses, newCourse]);
    setSelectedCourse(newCourse);
    setEditingCourse(newCourse);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setEditingCourse(course);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="new-course-button" onClick={handleNewCourse}>
            Nouveau Cours
          </button>
        </div>
        
        <div className="courses-list">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleSelectCourse(course)}
              className={`course-item ${selectedCourse?.id === course.id ? 'selected' : ''}`}
            >
              <h4>{course.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <input
          type="text"
          value={editingCourse.title}
          onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
          placeholder="Titre du cours"
          className="course-title-input"
        />

        <textarea
          value={editingCourse.description}
          onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
          placeholder="Description du cours..."
          className="course-description-input"
        />
      </div>
    </div>
  );
}

export default App; 