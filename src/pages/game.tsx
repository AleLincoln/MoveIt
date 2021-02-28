import Head from 'next/head'
import ChallengeBox from '../components/ChallengeBox'
import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdow'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import styles from '../styles/pages/Game.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import  {GetServerSideProps} from 'next'
import { ChallengesProvider } from '../contexts/ChallengesContext'


interface GameProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}




export default function Game(props: GameProps) {
  
  


  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>

    <div className={styles.container}>
      <Head>
        <title>
          Início
        </title>
      </Head>
     
      <ExperienceBar />
    <CountdownProvider>

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
        
      </section>
    </CountdownProvider>
    </div>

    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return {
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted),
    }
  }
}
