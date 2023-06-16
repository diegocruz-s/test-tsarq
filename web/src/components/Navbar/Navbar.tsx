import { useState, useRef, useLayoutEffect } from 'react'
import './styles/main.scss'
import { resetStates } from '../../store/slices/auth/authSlice'
import { datasNavbar } from './datas'
import { gsap } from 'gsap'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {

    const navbarRef = useRef(null)
    const navbarItemRef = useRef(null)

    // useLayoutEffect(() => {
    //   gsap.to(navbarItemRef.current, {
    //     borderRadius: '30px',
    //     justifySelf: 'start'
    //   })
    // })

    return (
        <nav className="navbar">
            <ul ref={navbarRef}>
                {datasNavbar.map(data => (
                    <NavLink 
                        to={data.redirect} 
                        key={data.name} 
                        className="liNavbar" 
                        ref={navbarItemRef}   
                    >
                        <div className="itemNavbar">
                            <div 
                                className="icon"
                            >
                                {<data.icon />}
                            </div>
                            <div className="name">
                                {data.name}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </ul>
        </nav>        
    )
}