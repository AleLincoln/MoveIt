
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile(){

    const {level, userName} = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${userName}.png`} alt={userName}></img>
            <div>
                <strong>
                    {userName}    
                </strong>
                <p>
                    <img src='icons/level.svg' alt='Level' />
                    Level {level}
                </p>
            </div> 
        </div>
    )

}