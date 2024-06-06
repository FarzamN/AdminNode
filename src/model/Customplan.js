import mongoose from "mongoose";


const CustommSchema= new mongoose.Schema({
    amazonProduct:{
        type:Number
    },
    csvProduct:{
        type:Number
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
    store_id:{
        type:String,
    },
},{
    timestamps:true
})

const CustomPlaneModel= mongoose.model('cusotm_plan',CustommSchema)

export default CustomPlaneModel