const BlogModel = require('../models/BlogModel');
//GET ROUTES

//GET HOME PAGE
const getHomePage = async (req, res) => {
    try {

        res.status(200).render("home", { title: "home page" });
    } catch (err) {
        console.log(err.message);
    }
};

//GET ABOUT PAGE
const getAboutPage = async (req, res) => {
    try {
        res.status(200).render("about", { title: "about page" })
    } catch (err) {
        console.log(err)
    }
};

//GET THE POST BLOG PAGE
const getPostPage = async (req, res) => {
    try{
       res.render("post");
    }
    catch(err){
        console.log(err)
    }
};

//GET ALL BLOGS
const getAllBlogs = async (req, res) => {
    try{
      const blogs = await BlogModel.find().sort({createdAt: -1});
      //console.log(blogs);
      res.status(200).render('viewBlog', {blogs});
    }
    catch(err){
      console.log(err.message)
    }
  };

  //GET A SINGLE BLOG
  const getABlog = async (req, res) => {
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
};

//GET THE UPDATE FORM TO MAKE THE PUT/PATCH REQUEST
const getUpdateForm = async (req, res) => {
    try{
       const {id } = req.params;
       const blog = await BlogModel.findById(id);
       console.log(blog);
       res.status(200).render('update', {blog});
       
    }
    catch(err){
        console.log(err.message)
    }
};

//POST A BLOG
const postABlog = async (req, res) => {
    try{
      const {blogname, email, subject, message} = req.body;
      
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
};

//UPDATE BLOG DETAILS
const updateABlog = async (req, res) => {
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
};

//DELETE A BLOG
const deleteABlog = async (req, res) => {
    try{
     const {id} = req.params;
     const deleted = await BlogModel.findByIdAndDelete(id);
     res.status(200).json({
        success: true,
        message: {redirect: "/view-blog"}
     });
    }
    catch(err){
        console.log(err);
    }
};

//ERROR ROUTING
const errorController = async (req, res) => {
    try {
        res.status(404).render("error", { title: "error page" });
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getABlog,
    getAboutPage,
    getAllBlogs,
    getHomePage,
    getPostPage,
    getUpdateForm,
    postABlog,
    updateABlog,
    deleteABlog,
    errorController
};