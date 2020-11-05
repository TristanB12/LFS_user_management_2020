const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/Post');

mongoose.connect('mongodb+srv://tristan:dellenger974@cluster0.zqx31.mongodb.net/Cluster0?retryWrites=true&w=majority',
{   useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/posts/add', (req, res, next) => {
    const post = new Post({
        ...req.body
    });
    post.save()
        .then(() => res.status(201).json({ message: 'post created'}))
        .catch(error => res.status(400).json({ error }));
});

app.post('/api/posts/like', (req, res, next) => {
    Post.updateOne({_id: req.body.id}, {stats: req.body.stats, liked: true, _id: req.body.id})
        .then(() => res.status(200).json({message: 'post liked'}))
        .catch(error => res.status(400).json({error}));
});

app.post('/api/posts/unlike', (req, res, next) => {
    Post.updateOne({_id: req.body.id}, {stats: req.body.stats, liked: false, _id: req.body.id})
        .then(() => res.status(200).json({message: 'post liked'}))
        .catch(error => res.status(400).json({error}));
});

app.use('/api/reset', (req, res, next) => {
    Post.deleteMany({ photo: null })
        .then(() => res.status(200).json({message: 'data base reseted'}))
        .catch(error => res.status(400).json({error}));
});

app.use('/api/posts', (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;