import {useContext, useEffect, useRef} from 'react'
import Logo from '../../assets/images/logo.png'
import {NavLink, Link} from 'react-router-dom'
import {BiMenu} from 'react-icons/bi'
import { authContext } from '../../context/authContext.jsx'

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  }
]

const Header = () => {
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const {user, role, token} = useContext(authContext)

  const handleStickyHeader = ()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky-header')
      }else{
        headerRef.current.classList.remove('sticky-header')
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()
    return ()=>window.removeEventListener('scroll', handleStickyHeader)
  })

  const toggleNav = ()=> navRef.current.classList.toggle('show-menu')

  return (
  <>
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div>
            <img src={Logo} alt="" />
          </div>

          {/* Nav */}
          <div className="navigation" ref={navRef} onClick={toggleNav}>
            <ul className='menu flex items-center gap-[2.9rem]'>
              {
              navLinks.map((link, index)=>
                (<li key={index}>
                  <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink>
                </li>))
              }
            </ul>
          </div>

          {/* Nav right userImage, Login, */}
          <div className="flex items-center gap-4">

              {
                token && user ? (
                <div> 
                  <Link to={`${role==='doctor' ? 'doctors/profile/me' : 'users/profile/me'}`}>
                    <figure className='w-[35px] h-[35px] rounded-full'>
                      <img src={user?.photo} alt="" className='w-full rounded-full'/>
                    </figure>
                    {/* <h2>{user?.name}</h2> */}
                  </Link>
                </div>) : (
                <Link to='/login'>
                  <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>Login</button>
                </Link>
              )}

            <span className='md:hidden' onClick={toggleNav}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div> 
        </div>
      </div>
    </header>
  </>    
  )
}

export default Header
