import styles from '../styles/pages/Home.module.css'
import { AiOutlineArrowRight, AiFillGithub } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {

    const router = useRouter()
    const [userName, setUserName] = useState('')

    function handleChange(event) {
        setUserName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        console.log(userName)

        router.push(`/game?username=${userName}`)

        
    }

  


    return (


        <div className={styles.container}>
            <Head>
                <title>
                    Início
                </title>
            </Head>
            <div className={styles.firstDiv}>
                <img src='/icons/Simbolo.png' alt='logo de fundo' />
            </div>

            <div className={styles.secondDiv} onSubmit={handleSubmit}>
                <img src='/icons/Logo.png' alt='Move it Logo' />
                <strong>Bem vindo</strong>
                <p><AiFillGithub />Faça login com seu Github para começar</p>

                <form>
                    <input placeholder='Digite seu username' onChange={handleChange}></input>
                    <button style={{ margin: '0px' }}><AiOutlineArrowRight style={{ color: 'white' }} /></button>
                </form>

            </div>

        </div>
    )
}