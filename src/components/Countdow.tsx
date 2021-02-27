import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'



export default function Countdown() {

    const { minutes, seconds, hasFinished, resetCountdown, startCountdown, isActive } = useContext(CountdownContext)


    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondeLeft, secondeRight] = String(seconds).padStart(2, '0').split('');





    return (
        <div>
            <div className={styles.CountdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondeLeft}</span>
                    <span>{secondeRight}</span>
                </div>
            </div>

            {
                hasFinished ? (
                    <button disabled className={styles.CountdownButton}>
                        Ciclo encerrado
                    </button>
                ) :
                    (
                        isActive ?
                            (<button type='button' className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`} onClick={resetCountdown}>
                                Abandonar ciclo
                            </button>) :
                            (<button type='button' className={styles.CountdownButton} onClick={startCountdown}>
                                Iniciar um ciclo
                            </button>)

                    )
            }

        </div>
    )
}