const express=require('express');
const userRouter=express.Router();
const multer=require('multer');
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage}=require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout}=require('../controller/authController');

//user ke options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

//multer for fileupload

//upload -> storage,filter
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter=function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("Not an Image! Please upload an Image"),false)
    }
};

const upload=multer({
    storage: multerStorage,
    fileFilter:filter
});

userRouter
.route('/logout')
.get(logout)

userRouter.post("/ProfileImage",upload.single('photo'),updateProfileImage);
//get request
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("C:/Users/priya/Desktop/Notes/backend/multer.html")
});


//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)


//admin specific func
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)


// //app.get('/user',(req,res)=>{
//     console.log(req.query);
//     res.send(users);
// });

// app.post('/user',(req,res)=>{
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// });

//update -> patch
// app.patch('/user',(req,res)=>{
//     console.log('req.body-> ',req.body);
//     //update data in users obj
//     let dataToBeUpdated=req.body;
//     for(key in dataToBeUpdated){
//         users[key]=dataToBeUpdated[key];
//     }
//     res.json({
//         message:"data updated successfully",
//     });
// });

//to delete a data
// app.delete('/user',(req,res)=>{
//     users={};
//     res.json({
//         message:"data has been deleted"
//     });
// });

//params
// app.get('/user/:id',(req,res)=>{
//     console.log(req.params.id);
//     res.send("user id recived");
// });
// app.get('/user/:username',(req,res)=>{
//     console.log(req.params.username);
//     console.log(req.params);
//     res.send("username recived");
// });

//REST
//response should be same by every platfrom(macos,windows,etc)
//routs should be on the basis of noun(name,place,animal,etc)
//HTTP methods should be used for doing opreation on routs
//always JSON format
//stateless 


//old route
// userRouter
// .route('/')
// .get(protectRoute,getUsers)//path specific middleware
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser)

// userRouter
// .route("/getCookies")
// .get(getCookies);

// userRouter
// .route("/setCookies")
// .get(setCookies);

// userRouter
// .route('/:id')
// .get(getUserById);

//mini app


module.exports=userRouter;