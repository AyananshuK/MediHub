import { formatDate } from '../../utils/formatDate'

const DoctorAbout = () => {
  return (
    <>
      <div>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
            About of
            <span className='text-blueColor font-bold text-[24px] leading-9'>
                Rajat Sharma 
            </span>
        </h3>
        <p className='text-para'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum reprehenderit beatae quasi iusto porro cumque molestias velit cum officiis quibusdam sapiente maxime fugiat animi nihil, sunt saepe vitae mollitia aut voluptatum! Deserunt fugit voluptas tempore, incidunt odio vel sunt, est, ipsum temporibus doloribus unde! Ab officiis voluptas a praesentium necessitatibus! Repudiandae nisi consequuntur repellat, aspernatur laboriosam rem quidem sint? Sapiente sed voluptates mollitia provident minus cum, quia architecto ad tenetur molestias suscipit ex quaerat placeat excepturi assumenda tempora blanditiis iste laborum necessitatibus. Excepturi eveniet repellendus eaque, doloremque ex nam aut inventore omnis deserunt esse obcaecati tempore dolorem, sequi velit exercitationem.
        </p>
      </div>

      <div className="mt-12">
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
            Education
        </h3>

        <ul className='pt-4 md:p-5'>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end sm:gap-5 mb-[30px]'>
                <div>
                    <span className='text-blueColor text-[15px] leading-6 font-semibold'>
                        {formatDate('10-6-2015')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        PHD
                    </p>
                </div>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                    Medical College and Hospital, Katpadi
                </p>
            </li>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end sm:gap-5 mb-[30px]'>
                <div>
                    <span className='text-blueColor text-[15px] leading-6 font-semibold'>
                        {formatDate('12-4-2010')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        MS
                    </p>
                </div>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                    Medical College and Hospital, Katpadi
                </p>
            </li>
        </ul>
      </div>

      <div className="mt-12">
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
            Experience
        </h3>
        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
            <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                    {formatDate('07-04-2011')} - {formatDate('07-11-2011')}
                </span>
                <p className='text-[16px] leading-6 font-medium text-textColor'>
                    Surgeon
                </p>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                    New Apollo Hospital, Katpadi
                </p>
            </li>

            <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                    {formatDate('09-11-2011')} - {formatDate('10-10-2015')}
                </span>
                <p className='text-[16px] leading-6 font-medium text-textColor'>
                    Surgeon
                </p>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                    New Apollo Hospital, Chennai
                </p>
            </li>

        </ul>
      </div>

    </>
  )
}

export default DoctorAbout
