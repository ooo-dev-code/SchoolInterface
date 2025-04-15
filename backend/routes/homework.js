import express from 'express';
import Homework from '../models/homework.js';

const homeworkRouter = express.Router();

homeworkRouter.get('/', async (req, res) => {
    try {
        const homework = await Homework.find();
        if (!homework) {
            return res.status(404).json({ error: 'No homework found' });
        }
        res.status(200).json(homework);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

homeworkRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const homework = await Homework.findById(id);
        if (!homework) {
            return res.status(404).json({ error: 'Homework not found' });
        }
        res.status(200).json(homework);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

homeworkRouter.post('/', async (req, res) => {
    const { description, classes, subject, day, month, number, assignedBy } = req.body;
    try {
        const homework = await Homework.create({ description, classes, subject, day, month, number, assignedBy });
        res.status(201).json(homework);
    }
    catch (err) {
        console.error('Error creating homework:', err); // <- this will show the real reason in your terminal
        res.status(500).json({ error: err.message }); // return real message to client too
    }
})

homeworkRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const homework = await Homework.findByIdAndDelete(id);
        if (!homework) {
            return res.status(404).json({ error: 'Homework not found' });
        }
        res.status(200).json({ message: 'Homework deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

homeworkRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, subject, day, month, number, assignedBy } = req.body;
    try {
        const homework = await Homework.findByIdAndUpdate(id, { description, subject, day, month, number, assignedBy }, { new: true });
        if (!homework) {
            return res.status(404).json({ error: 'Homework not found' });
        }
        res.status(200).json(homework);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

export default homeworkRouter;