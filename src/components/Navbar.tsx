import styles from '../styles/components/Navbar.module.css'
import {BiHomeAlt} from 'react-icons/bi'
import Link from 'next/link'


export function Navbar(){
    return (
        <div className={styles.Navbar}>
            <img className={styles.NavbarLogo} src='/NavbarLogo.png' alt='logo' />
            <Link href='/'>
                <p>
                 <BiHomeAlt className={styles.HomeLogo} />
                
                </p> 
            </Link>
            
        </div>
    )
}