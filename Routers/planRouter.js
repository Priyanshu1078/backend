const express=require('express');
const planRouter=express.Router();
const{protectRoute,isAuthorised}=require('../controller/authController');
const{getAllPlans,getPlan,createPlan,deletePlan,updatePlan, top3Plans}=require('../controller/planController');

//will get all plans
planRouter.route('/allPlans')
.get(getAllPlans)

//own plan -> login necessary
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

//admin and restaurant owner can only create,update or delete plans
planRouter.use(isAuthorised(['admin']));
planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)

planRouter
.route('/top3')
.get(top3Plans)

module.exports=planRouter;