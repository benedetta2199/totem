import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useStore from '@store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';

export default function Home() {

  const r = useRouter();

  /**CAMPI STORE */
  const item = useStore((state) => state.animalClick);
  const img = (item.nome || '').toLowerCase().replaceAll(' ','');
  const aP = (item.aggettiviP || []).toString().replaceAll(',',', ');
  const aN = (item.aggettiviN || []).toString().replaceAll(',',', ');

  const diffAdjsP = useStore((state) => state.adjsP).filter(x => !item.aggettiviP.includes(x));
  const diffAdjsN = useStore((state) => state.adjsN).filter(x => !item.aggettiviN.includes(x));

  if(item==={}){
    //r.push()
    //reindirizza a all animal
  }

  return (
    <>
      <Head>
        <title>Bestiario -Aggiungi Aggettivo</title>
      </Head>
      <main className={styles.main}>
        {item &&
          <div className={styles.detailFixed}>
            
            <h1>{item.nome}</h1>
            <Image src={"/animal/"+ img +'.webp'} alt="" width={500} height={500} priority/>
          </div>
        }
        <div className={styles.detailScroll}>
          <p className='text-end h6'>Famiglia: {item.famiglia}</p>
          <p className='text-end h6'>Alimentazione: {item.alimentazione}</p>
          <p className='darkT t-khand h5 pt-2'>Aggettivi positivi:</p>
          <p>{aP}</p>
          <p className='darkT t-khand h5 pt-2'>Aggettivi negativi:</p>
          <p>{aN}</p>
          <p className='darkT t-khand h5 pt-3 text-center'>Aggiungi aggettivi positivi:</p>
          <div className='d-flex flex-wrap px-2'>
            {diffAdjsP.map((item) => (
                  <Form.Check value={item} label={item} key={item} className='w-50'  onChange={(e)=> check(e, true)}/>
              ))}
          </div>
          <p className='darkT t-khand h5 pt-3 text-center'>Aggiungi aggettivi negativi:</p>
          <div className='d-flex flex-wrap px-2'>
            {diffAdjsN.map((item) => (
                  <Form.Check value={item} label={item} key={item} className='w-50'  onChange={(e)=> check(e, true)}/>
              ))}
          </div>
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
