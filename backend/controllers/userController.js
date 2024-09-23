import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true}).select('-password');

        res.status(200).json({success:true, message:'Successfully updated', data: updatedUser});

    }catch(err){
        res.status(500).json({success:false, message:'Failed to update'});
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try{
        await User.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully deleted'});

    }catch(err){
        res.status(500).json({success:false, message:'Failed to delete'});
    }
}

export const getSingleUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id).select('-password');

        res.status(200).json({success:true, message:'User found', data: user});

    }catch(err){
        res.status(404).json({success:false, message:'User not found'});
    }
}

export const getAllUser = async(req,res)=>{
    try{
        const users = await User.find({}).select('-password');

        res.status(200).json({success:true, message:'Users found', data: users});

    }catch(err){
        res.status(404).json({success:false, message:'No user found'});
    }
}

export const getUserProfile = async(req, res)=>{
    const userId = req.userId
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        const {password, ...rest} = user._doc
        res.status(200).json({success:true, message:'Profile found', data:{...rest}})
    }catch(err){
        res.status(500).json({success:false, message:'Something went wrong, please try again'})
    }
}

export const getMyAppointments = async(req, res)=>{
    try{
        //Retrieve appointments from booking
        const bookings = await Booking.find({user: req.userId})

        //Extract doctor ids from appointment bookings
        const doctorIds = bookings.map(booking => booking.doctor.id)

        //Retrieve doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

        res.status(200).json({success:true, message:'Appointments got', data:doctors})

    }catch(err){
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}