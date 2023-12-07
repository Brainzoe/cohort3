const express = require('express');
const {connectDb} = require('./database/db');
const BlogModel = require('./models/BlogModel');
const app = express();
const port = 4000;


//connect to mongodb 


//middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//status code ok-200 create-201 //not-found-404 bad-request-400 401-unauthorized 402- payment needed 500- server side error
//crud c-post r-get u-put d-delete

//READ
app.get('/', (req, res) => {
    try {

        res.status(200).render("home", { title: "home page" });
    } catch (err) {
        console.log(err.message);
    }
});


app.get('/about', (req, res) => {
    try {
        res.status(200).render("about", { title: "about page" })
    } catch (err) {
        console.log(err)
    }
})

app.get('/make-post', (req, res) => {
    try{
       res.render("post");
    }
    catch(err){
        console.log(err)
    }
});



//CREATE
app.post('/post-blog-api', (req, res) => {
    try{

    }
    catch(err){
        console.log(err)
    }
})


app.get("*", (req, res) => {
    try {
        res.status(404).render("error", { title: "error page" });
    } catch (error) {
        console.log(error)
    }
});


(async function(){
  await connectDb();
  app.listen(port, () => console.log(`server running on port : ${port}`))

})()



