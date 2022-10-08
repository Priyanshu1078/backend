let SK="sk_test_51LoaGKSJ3WF8fnOatBdxeLUJTv9ZFHOV6bHAMaMd07mYUKu4RCxuSFEbD0fgH4tX3JwGwswngy3YQA1azLcfqLKy00kxjITAPT"
const stripe=require('stripe')(SK);
const planModel=require("../models/planModels");
const userModel=require("../models/userModels");

module.exports.createSession=async function createSession(req,res){
    try{
        let userId=req.id;
        let planId=req.params.id;

        const user=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            customer_email:user.email,
            client_refernce_id:planId.id,
            line_items:[
                {
                    name:planId.name,
                    description:planId.description,
                    //deploy website
                    amount:planId.price*100,
                    currency:"inr",
                    quantity:1
                }
            ],
            //dev => http
            //production => https
            success_url:`${req.protocol}://${req.get("host")}/profile`,
            cancel_url:`${req.protocol}://${req.get("host")}/profile`
        })
        res.status(200).json({
            status:"success",
            session
        })
    } catch(err){
        res.status(200).json({
            err:err.message
        })
    }
}