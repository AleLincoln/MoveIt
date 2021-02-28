import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal'
import { useRouter } from 'next/router'



interface Challenge{
    type: 'body' | 'eye';
    description:string;
    amount:number
}

interface ChallengesContextData {
    level:number;
    levelUp:() => void;
    currentExperience:number;
    challengesCompleted:number;
    startNewChallenge:() => void;
    activeChallenge: Challenge;
    resetChallenge:() => void;
    experienceToNextLevel:number;
    completChallenge:() => void;
    closeLevelUpModal:() => void;
    userName:string;
    
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const experienceToNextLevel = Math.pow((rest.level + 1)*4, 2)
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)
    const userName = useRouter().query.username

    async function getData(){
        await fetch(`https://api.github.com/users/${userName}`)
        .then(function(response){
            return response.json()
        }).then(function(data){
            console.log(data)
        })
    }


    getData()

    
    
    useEffect(() =>{
        Notification.requestPermission()
    }, [])

    useEffect(() => {

        Cookies.set('userName', String(userName))
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))

    }, [userName, level, currentExperience, challengesCompleted])



    function levelUp() {
        setLevel(rest.level + 1);
        setIsLevelModalOpen(true)

    }
    function closeLevelUpModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[ramdomChallengeIndex]
        const challengeEmoji = challenge.type === 'body'? '💪':'👁️'

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification(`Novo desafio ${challengeEmoji}`, {
                body:`Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
            setActiveChallenge(null)
    }

    function completChallenge(){
        if(!activeChallenge){return;}

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted)
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                levelUp,
                currentExperience,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completChallenge,
                closeLevelUpModal,
                userName

            }}>
           {isLevelModalOpen && <LevelUpModal />}
            {children}

        </ChallengesContext.Provider>
    )
}