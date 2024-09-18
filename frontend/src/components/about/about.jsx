import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
    <section>
        <div className="container">
            <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                {/* About img */}
                <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                    <img src={aboutImg} alt="" />
                    <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
                        <img src={aboutCardImg} alt="" />
                    </div>
                </div>

                {/* about  */}
                <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                    <h2 className='heading'>
                        Proud to be one of the nations best
                    </h2>
                    <p className='text-para'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, perspiciatis saepe deleniti, eius sunt, odio facere quibusdam minus placeat molestias debitis quidem non consequuntur optio maiores maxime enim culpa veniam!
                    </p>

                    <p className='text-para mt-[30px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati fugiat commodi pariatur excepturi impedit id ducimus delectus in nemo?</p>

                    <Link to='/'><button className='btn'>Learn More</button></Link>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default About
