import { useState } from "react";
import { BASE_URL } from "../../config";
import Testimonial from "../../components/testimonial/testimonial";
import DoctorCard from "../../components/doctors/doctorCard";
import Loader from '../../components/loader/loading.jsx'
import Error from '../../components/error/error.jsx'

const DoctorsAI = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    setData(null);
    setLoading(true);
    try {
      setQuery(query.trim());
      const res = await fetch(`${BASE_URL}/doctors-ai?query=${query}`);
      const result = await res.json();
      
      if(!res.ok){
        throw new Error(result.message);
      }  
      
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find Doctors By Synptoms</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 bg-transparent w-full focus:outline-none place"
              placeholder="Enter synptoms"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader/>}
          {error && <Error/>}

          {data && data.reasons.length > 0 && <div className="mb-10">
            <h2 className="font-bold text-2xl text-center mb-3">Reason</h2>
            {data.reasons.map((r)=>(<div className="text-center mb-1"> <span className="capitalize text-xl font-semibold">{r.SpecializationName}</span>: {r["Why it's appropriate"]}</div>))}
          </div>}

          {data && data.other_recommendations.length > 0 && <div className="mb-10">
            <h2 className="font-bold text-2xl text-center mb-3">Other Recommendations</h2>
            {data.other_recommendations.map((r)=>(<div className="text-center mb-1"> <span className="capitalize text-xl font-semibold">{r.SpecializationName}</span>: {r["Why it's relevant but not in the available list"]}</div>))}
          </div>}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data && data.doctors && data.doctors.length > 0 ? data.doctors.map((doctor)=>(
                  <DoctorCard key={doctor._id} doctor={doctor}/>
              )) : <div className="text-center text-xl">No doctors available</div>}
            </div>
          )}
            
        </div>
      </section>

      <section>
      <div className="container">
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            What our patient say
          </h2>
          <p className='text-para text-center'>
            World class care for everyone. Our health system offers expert health care.
          </p>
        </div>

        <Testimonial />
      </div>
    </section>
    </>
  );
};

export default DoctorsAI;
