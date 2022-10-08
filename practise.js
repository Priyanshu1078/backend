// //post -> use to send data from frontend to backend
// //jo bhi data hum frontend se backend me bhete h woh req ki body me hota h 
// const express=require('express');

// const app=express();
// const mongoose=require('mongoose');
// const emailValidator=require('email-validator');
// //middleware function -> post, change frontend data to json
// app.use(express.json());//globle middleware 
// app.listen(3000);

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
// //mongodb
// const db_link='mongodb+srv://priyanshu:tff123456@cluster0.hllrgzc.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(db_link)
// .then(function(db){
//     console.log('db connected');
// })
// .catch(function(err){
//     console.log(err);
// });

// const userSchema=mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         validate:function(){
//             return emailValidator.validate(this.email);
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:8
//     },
//     confirmPassword:{
//         type:String,
//         required:true,
//         minLength:8,
//         validate:function(){
//             return this.confirmPassword==this.password
//         }
//     }
// });
// //pre post hooks
// //you can use post before pre it will only run post after runing pre 
// // userSchema.pre('save',function(){
// //     console.log('before saving in db',this);
// // });
// // userSchema.post('save',function(doc){
// //     console.log('after saving in db',doc);
// // });

// userSchema.pre('save',function(){
//     this.confirmPassword=undefined;
// })
// //model
// const userModel=mongoose.model('userModel',userSchema);

// // (async function createUser(){
// //     let user={
// //         name:'Priyanshu',
// //         email:'py1346792580@gmail.com',
// //         password:'12345678',
// //         confirmPassword:'12345678'
// //     };
// //     let data=await userModel.create(user);
// //     console.log(data);
// // })();
