import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useStore from '@store';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {

  const r = useRouter();

  /**CAMPI STORE */
  const allAnimal = useStore((state) => state.animals);
  const setAnimalClick = useStore((state) => state.setAnimalClick);

  return (
    <>
      <Head>
        <title>Bestiario - Controlla Dati</title>
      </Head>
      <main className={`${styles.main} pb-5`}>
        <h1>Controlla i dati</h1>
        <div className='d-flex flex-wrap justify-content-around'>
        {allAnimal.map((item) => (
              <div key={item.nome} id={item.nome} className={styles.card} onClick={()=>{setAnimalClick(item); r.push('./animalDetail')}}>
                <Image src={"/animal/"+item.nome.toLowerCase().replaceAll(' ','')+'.webp'} alt="" width={100} height={10} priority/>
                <p>{item.nome}</p>
              </div>
            ))}
          
        </div>
        
        {/*<Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />*/}
        
        
      </main>
    </>
  )
}
