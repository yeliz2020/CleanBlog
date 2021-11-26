const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//const ejs = require('ejs');
//const path = require('path');
//const Post = require('./models/Post');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageController');

const app = express();

//connect DB
mongoose
  .connect(
    'mmongodb+srv://yeliz:VI2WTzkZz1XNWgnW@cluster0.opfqj.mongodb.net/cleanblog-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/post', pageController.getPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
