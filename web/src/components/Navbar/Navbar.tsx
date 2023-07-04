import styles from './styles/main.module.scss'
import { useRef } from 'react'
import { datasNavbar } from './datas'
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
        <nav className={styles.navbar}>
            <ul ref={navbarRef}>
                {datasNavbar.map(data => (
                    <NavLink 
                        to={data.redirect} 
                        key={data.name} 
                        className={({ isActive }) =>
                            `${styles.liNavbar} ${isActive ? styles.active : ''}`
                        }
                        ref={navbarItemRef}   
                    >
                        <div className={styles.itemNavbar}>
                            <div 
                                className={styles.icon}
                            >
                                {<data.icon />}
                            </div>
                            <div className={styles.name}>
                                {data.name}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </ul>
        </nav>        
    )
}