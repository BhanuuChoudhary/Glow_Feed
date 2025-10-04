const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const {v4 : uuidv4} = require('uuid');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username :"Bhanu Choudhary",
        content : "I Love coding !"
    },
    {
        id : uuidv4(),
        username :"Rohit Choudhary",
        content : "Hardwork is important to achieve success"
    },
    {
        id : uuidv4(),
        username :"Ravikant Choudhary",
        content : "I got selected in my first coding round"
    },
];

app.get('/post', (req, res) => {
    res.render("index.ejs",{posts});
});

app.get('/post/new', (req, res) => {
    res.render("new.ejs");
});

app.post('/post', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();

    let newPost = {
        id: uuidv4(),
        username,
        content
    };

    posts.push(newPost);
    res.redirect('/post');
});

app.get('/post/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

   
    res.render("show.ejs", { post }); // ✅ only one response
});

app.get('/post/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs", { post });
});


app.patch('/post/:id', (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = newcontent;
    console.log(post);

    res.redirect("/post");
});

app.delete('/post/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect('/post');
});

app.listen(port, () => {
    console.log(`Listening to port : ${port}`);
});