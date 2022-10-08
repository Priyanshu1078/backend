// //server creation

// //1. http module
// //start
// const { fstat } = require('fs');
// const http=require('http');
// const fs=require('fs');

// const server=http.createServer((req,res)=>{
//     console.log('request has been made from browser to server');
//     //console.log(req.method);
//     //console.log(req.url);
//     res.setHeader('content-type','text/html');
//     // res.write('<h1> hello, Priyanshu ! :)</h1>');
//     // res.write('<h1>how you doing</h1>');
//     // res.end();
//     let path='';
//     switch(req.url){
//         case '/':
//             path+='The Fresh Farmers/homepage1.html'
//             res.statusCode=200;
//             break;
//         case '/aboutus':
//             path+='The Fresh Farmers/aboutus.html'
//             res.statusCode=200;
//             break;
//         case '/aboutus1':
//             res.statusCode=200;
//             res.setHeader('Location','/aboutus');
//             res.end();
//             break;
//         default:
//             path+='404.html'
//             res.statusCode=404;
//             break;

//     };

//     fs.readFile(path,(err,fileData)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.write(fileData);
//             res.end();
//         }
//     })
// });

// //port number,host,callback func
// server.listen(3000,'localhost',()=>{
//     console.log('server is listening on port 3000');
// });