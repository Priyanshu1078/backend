// //post -> use to send data from frontend to backend
// //jo bhi data hum frontend se backend me bhete h woh req ki body me hota h 
// const express=require('express');
// const app=express();
// const userModel=require('./models/userModels');
// const cookieParser=require('cookie-parser');
// //middleware function -> post, change frontend data to json
// app.use(express.json());//globle middleware 
// app.listen(3000);
// app.use(cookieParser());

// // let users=[
// //     {
// //         'id':1,
// //         'name':"Priyanshu"
// //     },
// //     {
// //         'id':2,
// //         'name':"Gautam"
// //     },
// //     {
// //         'id':3,
// //         'name':"Paras"
// //     }
// // ];
// //mini app
// const userRouter=express.Router();
// const authRouter=express.Router();
// app.use('/user',userRouter);
// app.use('/auth',authRouter);

// userRouter
// .route('/')
// .get(getUsers)//path specific middleware
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

// authRouter
// .route('/signup')
// .get(middleware1,getSignUp,middleware2)
// .post(postSignUp);

// // //app.get('/user',(req,res)=>{
// //     console.log(req.query);
// //     res.send(users);
// // });

// // app.post('/user',(req,res)=>{
// //     console.log(req.body);
// //     users=req.body;
// //     res.json({
// //         message:"data received successfully",
// //         user:req.body
// //     });
// // });

// //update -> patch
// // app.patch('/user',(req,res)=>{
// //     console.log('req.body-> ',req.body);
// //     //update data in users obj
// //     let dataToBeUpdated=req.body;
// //     for(key in dataToBeUpdated){
// //         users[key]=dataToBeUpdated[key];
// //     }
// //     res.json({
// //         message:"data updated successfully",
// //     });
// // });

// //to delete a data
// // app.delete('/user',(req,res)=>{
// //     users={};
// //     res.json({
// //         message:"data has been deleted"
// //     });
// // });

// //params
// // app.get('/user/:id',(req,res)=>{
// //     console.log(req.params.id);
// //     res.send("user id recived");
// // });
// // app.get('/user/:username',(req,res)=>{
// //     console.log(req.params.username);
// //     console.log(req.params);
// //     res.send("username recived");
// // });

// //REST
// //response should be same by every platfrom(macos,windows,etc)
// //routs should be on the basis of noun(name,place,animal,etc)
// //HTTP methods should be used for doing opreation on routs
// //always JSON format
// //stateless 

// //mini app
// async function getUsers(req,res){
//     // console.log(req.query);
//     let allUsers=await userModel.find();

//     res.json({message:'list of all users',data:allUsers});
// };
// function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// };
// async function updateUser(req,res){
//     console.log('req.body-> ',req.body);
//     //update data in users obj
//     let dataToBeUpdated=req.body;
//     let user=await userModel.findOneAndUpdate({email:'priyanshu0414@gmail.com'},dataToBeUpdated);
//     // for(key in dataToBeUpdated){
//     //     users[key]=dataToBeUpdated[key];
//     // }
//     res.json({
//         message:"data updated successfully",
//         data:user
//     });
// };
// async function deleteUser(req,res){
//     // users={};
//     let dataToBeDeleted=req.body;
//     let user=await userModel.findOneAndDelete(dataToBeDeleted);
//     res.json({
//         message:"data has been deleted",
//         data:user
//     });
// };
// function getUserById(req,res){
//     console.log(req.params.id);
//     let paramsId=req.params.id;
//     let obj={};
//     for(let i=0;i<users.length;i++){
//         if(users[i]['id']==paramsId){
//             obj=users[i];
//         }
//     }
//     res.json({
//         message:"req received",
//         data:obj
//     });
// }
// //middleware
// function middleware1(req,res,next){
//     console.log('middleware1 encountered');
//     next();
// }
// function middleware2(req,res){
//     console.log('middleware2 encountered');
//     console.log('middleware 2 ended req/res cycle');
//     res.sendFile('signup.html',{root:__dirname});
// }
// function getSignUp(req,res,next){
//     console.log('getsignup called');
//     next();
//     // res.sendFile('signup.html',{root:__dirname});
// }
// async function postSignUp(req,res){
//     let dataObj=req.body;
//     let user=await userModel.create(dataObj);
//     // console.log('backend',user);
//     res.json({
//         message:"user signed up",
//         data:user
//     });
// }
// function setCookies(req,res){
//     // res.setHeader('Set-Cookies','isLoggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
//     res.send('cookies has been set');
// }
// function getCookies(req,res){
//     let cookies=req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send('cookies recieved');
// }