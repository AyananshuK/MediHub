import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'

export const getCheckout = async (req, res)=>{
    try{
        const findBooking = await Booking.find({user: req.userId, doctor: req.params.doctorId})
        if(findBooking){
            return res.status(404).json({success:false, message:'User already have an appointment with this doctor.'});
        }

        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);


        const booking  = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
        })

        await booking.save();
        res.status(200).json({success: true, message: "Payment successful"})
    }catch(err){
        res.status(500).json({success: false, message: "Error creating checkout."})
    }
}