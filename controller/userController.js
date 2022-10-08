const userModel=require('../models/userModels');

module.exports.getUser=async function getUser(req,res){
    // console.log(req.query);
    // let allUsers=await userModel.find();
    // res.json({message:'list of all users',data:allUsers});
    try{
        let id=req.id;
        let user=await userModel.findById(id);
        if(user){
            return res.json(user);
        }
        else{
            return res.json({
                message:'user not found'
            });
        }
    }catch(err){
        return res.json({
            message:err.message
        })
    } 
};
// module.exports.postUsers=function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// };
module.exports.updateUser=async function updateUser(req,res){
    // console.log('req.body-> ',req.body);
    //update data in users obj
    try{
        let id=req.params.id;
        let user=await userModel.findById(id);
        let dataToBeUpdated=req.body;
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }

            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
            const updatedData=await user.save();
            res.json({
                message:"data updated successfully",
                data:user
            });
        }
        else{
            res.json({
                message:"user not found",
            });
        }
    }catch(err){
        return res.json({
            message:err.message
        })
    }    
};

module.exports.deleteUser=async function deleteUser(req,res){
    // users={};
    try{
        let id=req.params.id;
        let user=await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:'user not found'
            })
        }
        res.json({
            message:"data has been deleted",
            data:user
        });
    }
    catch(err){
        return res.json({
            message:err.message
        })
    } 
};

module.exports.getAllUser=async function getAllUser(req,res){
    try{
        let users=await userModel.find();
        if(users){
            res.json({
                message:'users retrieved',
                data:users
            });
        } else{
            res.json({
                message:'data not found'
            })
        }
        res.send("user id received");
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
};

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
        message:'file uploaded succesfully'
    });
}

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