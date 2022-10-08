
const userModel=require('../models/userModels');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');
const{sendMail}=require('../utility/nodemailer');

//signup
module.exports.signup=async function signup(req,res){
    try{
        let dataObj=req.body;
        let user=await userModel.create(dataObj);
        sendMail("signup",user);
        if(user){
            res.json({
                message:"user signed up",
                data:user
            });
        }
        else{
            res.json({
                message:"error while signup"
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }

}

//login
module.exports.login=async function login(req,res){
    try{
        let data=req.body;
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                //bycript -> compare
                if(user.password==data.password){
                    let uid=user['_id']; //uid
                    let token=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({
                        message:'User logged in successfully',
                        userDetails:data
                    })
                }
                else{
                    return res.json({
                        message:'wrong credentials'
                    })
                }
            }else{
                return res.json({
                    message:'User not found'
                })
            }
        }
        else{
            return res.json({
                message:'Empty Field Found'
            }) 
        }    
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

//isAuthorised-> to check the user's role[admin,user,farmer,deliveryboy]
module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:'operation not allowed'
            });
        }
    }
}

//protect route
module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
            console.log(req.cookies);
            token=req.cookies.login;
            let payload=jwt.verify(token,JWT_KEY);
            if(payload){
                console.log('payload token',payload);
                const user=await userModel.findById(payload.payload);
                req.role=user.role;
                req.id=user.id;
                console.log(req.role,req.id);
                next();
            }
            else{
                return res.json({
                    message:'please login again'
                })
            }
        }
        else{
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.redirect('/login');
            }
            //postman
            res.json({
                message:"please login"
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        });
    }
}

//forgetpassword
module.exports.forgetpassword=async function forgetpassword(req,res){
    let{email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            const resetToken=user.createResetToken();
            // http://abc.com/resestpassword/resetToken
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to the user
            let obj={
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword",obj);
            return res.json({
                message:"email reset succesfully"
            })
        }
        else{
            return res.json({
                message:"please signup"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }

}

//resetpassword
module.exports.resetpassword=async function resetpassword(req,res){
    try{
        const token=req.token;
        let {password,confirmPassword}=req.body;
        const user=await userModel.findOne(
            {resetToken:token}
        );
        //resetpassword in db
        if(user){
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.json({
                message:"password changed succesfully"
            })
        }else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
    
}

//logout
module.exports.logout=function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"user logged out succesfully"
    });
}