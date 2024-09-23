import { useEffect, useState } from "react"
import {AiOutlineDelete} from 'react-icons/ai'
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js'
import { BASE_URL, token } from "../../config"
import {toast} from 'react-toastify'
import HashLoader from "react-spinners/HashLoader.js"

const Profile = ({doctorData}) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",       
        email: "",
        password:"",
        phone: "",
        bio:"",
        gender:"",
        specialization:"",
        ticketPrice:"",
        qualifications:[],
        experiences:[],
        timeSlots:[],
        about:'',
        photo:null
    })

    useEffect(()=>{
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    }, [doctorData])

    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleFileInputChange = async (e)=>{
        const file = e.target.files[0]
        const data = await uploadImageToCloudinary(file)
        setFormData({...formData, photo: data?.url})
    }

    const updateProfileHandler= async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json()

            if(!res.ok){
                throw new Error(result.message)
            }
            toast.success(result.message)
            setLoading(false)
        } catch (err) {
            toast.error(err.message)        
            setLoading(false)
        }
    }

    //adding items
    const addItem = (key, item)=>{
        setFormData(prevFormData => ({...prevFormData, [key]:[...prevFormData[key], item]}))
    }

    //delete item
    const deleteItem = (key, index)=>{
        setFormData(prevFormData => ({...prevFormData, [key]:[...prevFormData[key].filter((_,i)=> i !== index)]}))
    }

    //reusable input change fn
    const handleReusableInputChange = (key, index, event)=>{
        const {name, value} = event.target
        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]
            updateItems[index][name] = value

            return {...prevFormData, [key]:updateItems}
        })
    }

    const addQualification = (e)=>{
        e.preventDefault()
        addItem('qualifications', {startingDate:'', endingDate:'', degree:'', university:''})
    }

    const handleQualificationChange = (event, index)=>{
        handleReusableInputChange('qualifications', index, event)
    }

    const deleteQualification = (e, index)=>{
        e.preventDefault()
        deleteItem('qualifications', index)
    }

    const addExperience = (e)=>{
        e.preventDefault()
        addItem('experiences', {startingDate:'', endingDate:'', position:'', hospital:''})
    }

    const handleExperienceChange = (event, index)=>{
        handleReusableInputChange('experiences', index, event)
    }

    const deleteExperience = (e, index)=>{
        e.preventDefault()
        deleteItem('experiences', index)
    }

    const addTimeSlot = (e)=>{
        e.preventDefault()
        addItem('timeSlots', {startingTime:'', endingTime:'', day:''})
    }

    const handleTimeSlotChange = (event, index)=>{
        handleReusableInputChange('timeSlots', index, event)
    }

    const deleteTimeSlot = (e, index)=>{
        e.preventDefault()
        deleteItem('timeSlots', index)
    }

    return (
    <div>
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Profile</h2>
        <form>
            <div className="mb-5">
                <p className="form-label">Name*</p>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="form-input"/>
            </div> 
            <div className="mb-5">
                <p className="form-label">Email*</p>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="form-input" readOnly aria-readonly disabled={true}/>
            </div> 
            <div className="mb-5">
                <p className="form-label">Phone*</p>
                <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="form-input" maxLength={10} minLength={10}/>
            </div> 
            <div className="mb-5">
                <p className="form-label">Bio*</p>
                <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio" className="form-input" maxLength={100}/>
            </div> 

            <div className="mb-5">
                <div className="grid grid-cols-3 gap-5 mb-[30px]">
                    <div>
                        <p className="form-label py-3.5">Gender*</p>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-input py-3.5">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p className="form-label py-3.5">Specialization*</p>
                        <select name="specialization" value={formData.specialization} onChange={handleInputChange} className="form-input py-3.5">
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p className="form-label py-3.5">Ticket Price*</p>
                        <input type="number" name="ticketPrice" placeholder="Ticket Price" value={formData.ticketPrice} onChange={handleInputChange} className="form-input"/>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <p className="form-label">Qualifications*</p>
                {formData.qualifications?.map((item, index)=>(
                    <div key={index}>
                        <div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form-label">Starting Date*</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type="date" name="startingDate" value={item.startingDate} className="form-input"/>
                                </div>
                                <div>
                                    <p className="form-label">Ending Date*</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type="date" name="endingDate" value={item.endingDate} className="form-input"/>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form-label">Degree*</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type="text" name="degree" value={item.degree} placeholder="Degree" className="form-input"/>
                                </div>
                                <div>
                                    <p className="form-label">University*</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type="text" name="university" value={item.university} placeholder="University" className="form-input"/>
                                </div>
                            </div>
                            
                            <button onClick={e => deleteQualification(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                                <AiOutlineDelete />
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={addQualification} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Qualification</button>
            </div>

            <div className="mb-5">
                <p className="form-label">Experiences*</p>
                {formData.experiences?.map((item, index)=>(
                    <div key={index}>
                        <div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form-label">Starting Date*</p>
                                    <input type="date" name="startingDate" value={item.startingDate} className="form-input"
                                    onChange={e => handleExperienceChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className="form-label">Ending Date*</p>
                                    <input type="date" name="endingDate" value={item.endingDate} className="form-input"
                                    onChange={e => handleExperienceChange(e, index)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form-label">Position*</p>
                                    <input type="text" name="position" value={item.position} placeholder="Position" className="form-input"
                                    onChange={e => handleExperienceChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p className="form-label">Hospital*</p>
                                    <input type="text" name="hospital" value={item.hospital} placeholder="Hospital" className="form-input"
                                    onChange={e => handleExperienceChange(e, index)}
                                    />
                                </div>
                            </div>
                            
                            <button onClick={e=>deleteExperience(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                                <AiOutlineDelete />
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={addExperience} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                    Add Experience
                </button>
            </div>

            <div className="mb-5">
                <p className="form-label">Time Slots*</p>
                {formData.timeSlots?.map((item, index)=>(
                    <div key={index}>
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                <div>
                                    <p className="form-label">Day*</p>
                                    <select name="day" value={item.day} className="form-input py-3.5" onChange={e => handleTimeSlotChange(e,index)}>
                                        <option value="">Select</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="form-label">Starting Time*</p>
                                    <input type="time" name="startingTime" value={item.startingTime} className="form-input" onChange={e => handleTimeSlotChange(e,index)}/>
                                </div>
                                <div>
                                    <p className="form-label">Ending Time*</p>
                                    <input type="time"  name="endingTime" value={item.endingTime} className="form-input" onChange={e => handleTimeSlotChange(e,index)}/>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={e => deleteTimeSlot(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer">
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div> 
                        </div>
                    </div>
                ))}

                <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                    Add Timeslot
                </button>
            </div>

            <div className="mb-5">
                <p className="form-label">About*</p>
                <textarea name="about" rows={5} value={formData.about} placeholder="Write about you" onChange={handleInputChange} className="form-input"></textarea>
            </div>

            <div className="mb-5 flex items-center gap-3">
                {formData.photo && (
                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img src={formData.photo} alt="" className="w-full rounded-full" />
                    </figure>
                )}

                <div className="relative w-[160px] h-[50px]">
                    <input
                        type="file"
                        name="photo"
                        id="customFile"
                        onChange={handleFileInputChange}
                        accept=".jpg, .png"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                        htmlFor="customFile"
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                    >
                        Upload Photo
                    </label>
                </div>
            </div>

            <div className="mt-7">
                <button disabled={loading && true} type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">
                    {loading ? <HashLoader size={25} color="#ffffff"/> : 'Update Profile'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Profile
