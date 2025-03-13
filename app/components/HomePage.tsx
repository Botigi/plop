import React from 'react';

const HomePage = () => {
  const courses = ['Cours 1', 'Cours 2', 'Cours 3']; // Exemple de liste de cours

  return (
    <div>
      <h1>Liste des Cours</h1>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
      <button onClick={() => alert('Créer un nouveau cours')}>Créer un Nouveau Cours</button>
    </div>
  );
};

export default HomePage; 