import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'
import Header from '../components/Header';

export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         Social Media <a href="https://nextjs.org">Authentication!</a>
        </h1>

        {!session && <>
          Not signed in <br/>
        </>}
      {session && <>
        Signed in as {session.user.email} <br/>
      </>}

      <Header />

        
      </main>

      
    </div>
  )
}
