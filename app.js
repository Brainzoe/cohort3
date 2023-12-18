const express = require('express');
const {connectDb} = require('./database/db');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
const port = 4000;


//connect to mongodb 


//middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(blogRoutes);

//status code ok-200 create-201 //not-found-404 bad-request-400 401-unauthorized 402- payment needed 500- server side error
//crud c-post r-get u-put d-delete

//READ START



(async function(){
  await connectDb();
  app.listen(port, () => console.log(`server running on port : ${port}`))

})()



