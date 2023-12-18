const router = require('express').Router();
const {
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
} = require('../controllers/blogController');



//GET ROUTES START
router.get('/', getHomePage);

router.get('/about', getAboutPage)

router.get('/make-post', getPostPage);

router.get('/view-blog', getAllBlogs);

router.get('/single-view/:id', getABlog)

router.get('/update-blog/:id', getUpdateForm);
// GET ROUTES END


//CREATE/POST START
router.post('/post-blog-api', postABlog);
//CREATE/POST END

//UPDATE START
router.patch('/update-blog/:id', updateABlog);
//UPDATE END

//DELETE POST START
router.delete('/delete-post/:id', deleteABlog);
//DELETE POST END

//ERROR ROUTE
router.get("*", errorController);

module.exports = router;