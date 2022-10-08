//post -> use to send data from frontend to backend
//jo bhi data hum frontend se backend me bhete h woh req ki body me hota h 
const express=require('express');
const app=express();
var cors = require('cors');
app.use(cors()) ;
app.use(express.static('public/build'));

const cookieParser=require('cookie-parser');
//middleware function -> post, change frontend data to json
app.use(express.json()); //global middleware 
const port=process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port ${port}`); 
});
app.use(cookieParser());

// let users=[
//     {
//         'id':1,
//         'name':"Priyanshu"
//     },
//     {
//         'id':2,
//         'name':"Gautam"
//     },
//     {
//         'id':3,
//         'name':"Paras"
//     }
// ];
//mini app
const userRouter=require('./Routers/userRouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter');
app.use('/user',userRouter);
app.use('/plans',planRouter);
app.use('/reviews',reviewRouter);
app.use('/booking',bookingRouter);