const express = require('express');
const { Task, sequelize } = require('./models/task');
const app = express();
const port = 3000;

app.use(express.json());


sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
});




app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});


app.post('/tasks', async (req, res) => {
    const { description } = req.body;
    const newTask = await Task.create({ description });
    res.status(201).json(newTask);
});


app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).send('Tarea no encontrada.');
    res.json(task);
});


app.put('/tasks/:id', async (req, res) => {
    const { description, done } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).send('Tarea no encontrada.');

    task.description = description || task.description;
    task.done = done !== undefined ? done : task.done;
    task.updated_at = new Date();

    await task.save();
    res.json(task);
});


app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).send('Tarea no encontrada.');

    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
});

app.listen(port, () => {
    console.log(`API de tareas corriendo en http://localhost:${port}`);
});
