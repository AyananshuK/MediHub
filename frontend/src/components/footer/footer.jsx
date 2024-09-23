import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import {RiLinkedinFill} from 'react-icons/ri'
import {AiFillYoutube, AiFillGithub, AiOutlineInstagram, AiFillInstagram} from 'react-icons/ai'

const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: <AiFillYoutube className='group-hover:text-white w-4 h-5'/>
  },
  {
    path: "https://www.instagram.com",
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5'/>
  }
]
const quickLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/',
    display: 'About Us'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/',
    display: 'Blog'
  }
]
const quickLinks01 = [
  {
    path: '/find-a-doctor',
    display: 'Find a Doctor'
  },
  {
    path: '/',
    display: 'Request a Appointment'
  },
  {
    path: '/',
    display: 'Find a location'
  },
  {
    path: '/',
    display: 'Get a opinion'
  }
]
const quickLinks02 = [
  {
    path: '/',
    display: 'Doante'
  },
  {
    path: '/contact',
    display: 'Contact Us'
  }
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='pb-16 pt-10'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <img src={Logo} alt="" />
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>
              Copyright &copy; {year} developed by Ayananshu Koner all rights reserved.
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index)=>(
                <Link to={link.path} target='_blank' key={index} className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        
          <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Quick Links
          </h2>
          <ul>
            {quickLinks.map((link, index)=>(
              <li key={index} className='mb-4'>
                <Link to={link.path} className='text-[16px] leading-7 font-[400] text-textColor'>{link.display}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            I want to:
          </h2>
          <ul>
            {quickLinks01.map((link, index)=>(
              <li key={index} className='mb-4'>
                <Link to={link.path} className='text-[16px] leading-7 font-[400] text-textColor'>{link.display}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Support:
          </h2>
          <ul>
            {quickLinks02.map((link, index)=>(
              <li key={index} className='mb-4'>
                <Link to={link.path} className='text-[16px] leading-7 font-[400] text-textColor'>{link.display}</Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
