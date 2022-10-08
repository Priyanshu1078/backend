const reviewModel=require('../models/reviewModel');
const planModel=require('../models/planModels');

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'review not found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.top3reviews=async function top3reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({
            rating:-1
        }).limit(3);
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'review not found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        // const id=req.params.id;
        // const review=await reviewModel.findById();
        // if(review){
        //     return res.json({
        //         message:"reviews retrieved",
        //         data:review
        //     })
        // }
        // else{
        //     return res.json({
        //         message:'review not found'
        //     })
        // }
        let planid=req.params.id;
        let reviews=await reviewModel.find();
        reviews=reviews.filter(review => review.plan._id==planid);
        return res.json({
            message:"review retrieved for a particular plan succesfully",
            data:reviews
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModel.findById(id);
        let review=await reviewModel.create(req.body);
        plan.ratingsAverage=(plan.ratingsAverage+req.body.rating)/2;
        await plan.save();
        res.json({
            message:"review created",
            data:review
        });
    }
    catch(err){
        res.status(500).json({
            message:"error",
            message:err.message
        });
    }
}

module.exports.updateReview=async function updateReview(req,res){
    try{
        let planid=req.params.id;
        //review id from fronted
        let id=req.body.id;
        let dataToBeUpdated=req.body;
            let keys=[];
            for(let key in dataToBeUpdated){
                if(key=='id') continue;
                keys.push(key);
            }
            let review=await reviewModel.findById(id);
            for(let i=0;i<keys.length;i++){
                review[keys[i]]=dataToBeUpdated[keys[i]];
            }
            //doc
            await review.save();
            return res.json({
                message:'review updated succesfully',
                data:review
            })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let planid=req.params.id;
        //review id from fronted
        let id=req.body.id;
        let deletedReview=await reviewModel.findByIdAndDelete(id);
        return res.json({
            message:'review deleted succesfully',
            data:deletedReview
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}