import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <Head>
        <title>Bestiario</title>
      </Head>
      <main>
        <h1>Totem</h1>
        <div className='d-flex flex-column w-100'>
          <Link href="./totem" className={`${styles.menuBtn} ${styles.menuBtnLeft} btn py-3`}>Trova il totem
          </Link>
          <Link href="./addAnimale" className={`${styles.menuBtn} ${styles.menuBtnRight} btn py-3 ms-auto`}>
            Aggiungi l'animale
          </Link>
          <Link href="./addAggettivo" className={`${styles.menuBtn} ${styles.menuBtnLeft} btn py-3`}>
            Aggiungi l'aggettivo
          </Link>
          
          <Link href="./allAnimal" className={`${styles.menuBtn} ${styles.menuBtnRight} btn py-3 ms-auto`}>
            Controlla i dati
          </Link>

          <Link href="https://www.scoutsengidsenvlaanderen.be/totemzoeker" className={`lightT text-center w-100 mt-5`}>
            <i><u>Sito simile</u></i>
          </Link>
          
        </div>
      </main>
    </>
  )
}
