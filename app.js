const express = require('express');
const {connectDb} = require('./database/db');
const BlogModel = require('./models/BlogModel');
const methodOverride = require('method-override');
const app = express();
const port = 4000;


//connect to mongodb 


//middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//status code ok-200 create-201 //not-found-404 bad-request-400 401-unauthorized 402- payment needed 500- server side error
//crud c-post r-get u-put d-delete

//READ START
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

app.get('/view-blog', async (req, res) => {
  try{
    const blogs = await BlogModel.find();
    //console.log(blogs);
    res.status(200).render('viewBlog', {blogs});
  }
  catch(err){
    console.log(err.message)
  }
});


app.get('/single-view/:id', async (req, res) => {
    try{
       const {id } = req.params;
       //console.log(id);
       const blog = await BlogModel.findById(id);
       //console.log(blog);
       res.status(200).render('singleView', {blog});
       
    }
    catch(err){
        console.log(err.message)
    }
})
app.get('/update-blog/:id', async (req, res) => {
    try{
       const {id } = req.params;
       console.log(id);
       const blog = await BlogModel.findById(id);
       console.log(blog);
       res.status(200).render('update', {blog});
       
    }
    catch(err){
        console.log(err.message)
    }
});
// READ END


//CREATE/POST START
app.post('/post-blog-api', async (req, res) => {
    try{
      const {blogname, email, subject, message} = req.body;
      console.log(req.body);

      const newBlogDetail = new BlogModel({
        name: blogname,
        email: email,
        subject: subject,
        message: message
      });

      const savedBlog = await newBlogDetail.save();
      res.status(201).redirect('/view-blog');
    }
    catch(err){
        console.log(err)
    }
});

//CREATE/POST END


//UPDATE START
app.patch('/update-blog/:id', async (req, res) => {
    try{
        const {id} = req.params;
      const {blogname, email, subject, message} = req.body;
      const updatedBlog = await BlogModel.findByIdAndUpdate(id, {
        name: blogname,
        email,
        subject,
        message
      });
      res.status(200).redirect('/view-blog')
    }
    catch(err){
        console.log(err)
    }
});

//UPDATE END

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



