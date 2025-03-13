import express from 'express';
import { Course } from '../entities/Course';
import { AppDataSource } from '../config/database';

const router = express.Router();
const courseRepository = AppDataSource.getRepository(Course);

// Créer un nouveau cours
router.post('/', async (req, res) => {
  try {
    const course = courseRepository.create(req.body);
    await courseRepository.save(course);
    res.status(201).json(course);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Erreur lors de la création du cours' });
  }
});

// Récupérer tous les cours
router.get('/', async (req, res) => {
  try {
    const courses = await courseRepository.find({
      order: { updatedAt: 'DESC' }
    });
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur lors de la récupération des cours' });
  }
});

// Récupérer un cours spécifique
router.get('/:id', async (req, res) => {
  try {
    const course = await courseRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    res.json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur lors de la récupération du cours' });
  }
});

// Mettre à jour un cours
router.put('/:id', async (req, res) => {
  try {
    const course = await courseRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    courseRepository.merge(course, req.body);
    const result = await courseRepository.save(course);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Erreur lors de la mise à jour du cours' });
  }
});

// Supprimer un cours
router.delete('/:id', async (req, res) => {
  try {
    const course = await courseRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    await courseRepository.remove(course);
    res.json({ message: 'Cours supprimé avec succès' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur lors de la suppression du cours' });
  }
});

export default router; 