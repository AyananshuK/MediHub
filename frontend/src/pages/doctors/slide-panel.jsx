import convertTime from "../../utils/convertTime.js"

const SlidePanel = ({doctorId, ticketPrice, timeSlots}) => {
  return (
    <div>
      <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text-para mt-0 font-semibold'>
                Ticket Price
            </p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                Rs. {ticketPrice}
            </span>
        </div>

        <div className='mt-3'>
            <p className='text-para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>
            <ul className='mt-3'>
                {timeSlots?.map((timeSlot, index)=>(
                    <li key={index} className='flex items-center justify-between mb-2'> 
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {timeSlot.day.charAt(0).toUpperCase() + timeSlot.day.slice(1)}
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {convertTime(timeSlot.startingTime)} - {convertTime(timeSlot.endingTime)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
        <button className='btn px-2 w-full rounded-md'>
            Book Appointment
        </button>
      </div>
    </div>
  )
}

export default SlidePanel
