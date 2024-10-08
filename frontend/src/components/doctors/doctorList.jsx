import React from 'react'
import DoctorCard from './doctorCard'
import {BASE_URL} from '../../config.js'
import useFetchData from '../../hooks/useFetchData.jsx'
import Loader from '../loader/loading.jsx'
import Error from '../error/error.jsx'

const DoctorList = () => {

  const {data:doctors, loading, error} = useFetchData(`${BASE_URL}/doctors`)

  return (
    <>
      <div className='container'>
        {loading && <Loader/>}
        {error && <Error/>}
        {!loading && !error && (
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {doctors.map((doctor)=>(
                <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </> 
  )
}

export default DoctorList
