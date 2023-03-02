import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useStore from '@store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import db from '@database';

export default function Home() {

  const r = useRouter();

  /**CAMPI STORE */
  const item = useStore((state) => state.animalClick);

  const diffAdjsP = useStore((state) => state.adjsP).filter(x => !item.aggettiviP.includes(x));
  const diffAdjsN = useStore((state) => state.adjsN).filter(x => !item.aggettiviN.includes(x));

  const img = (item.nome || '').toLowerCase().replaceAll(' ','');
  const aP = (item.aggettiviP || []).toString().replaceAll(',',', ');
  const aN = (item.aggettiviN || []).toString().replaceAll(',',', ');

  const [adjsP, updateAdjP] = useState([]);
  const [adjsN, updateAdjN] = useState([]);

  const addAjs = () =>{
    if(adjsP.length>0){
      const newAdjs = item.aggettiviP.concat(adjsP);
      newAdjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
      addDBAdjAnimale(item.nome, newAdjs, true);
    }
    if(adjsN.length>0){
      const newAdjs = item.aggettiviN.concat(adjsN);
      newAdjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
      addDBAdjAnimale(item.nome, newAdjs, false);
    }
  }

   /** AGGIUNGE L'AGGETTIVO AGLI ANIMALI SELEZIONATI NEL DATABASE */
   const addDBAdjAnimale = async (animal, arr, p) => {
    const animale = doc(db, "animale", animal);
    if(p){
      await updateDoc(animale, { aggettiviP: arr }); 
    }else{
      await updateDoc(animale, { aggettiviN: arr }); 
    }
  }

  const check = (e, positivo) => {
    if(positivo){
      e.target.checked ? updateAdjP(adjsP => [...adjsP, e.target.value]) : updateAdjP(adjsP.filter(item => item !== e.target.value));
    } else{
      e.target.checked ? updateAdjN(adjsN => [...adjsN, e.target.value]) : updateAdjN(adjsN.filter(item => item !== e.target.value));
    }
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
                  <Form.Check value={item} label={item} key={item} className='w-50'  onChange={(e)=> check(e, false)}/>
              ))}
          </div>
          <Button className='btnG mt-3' onClick={()=> {addAjs(); r.push('/allAnimal')}}>Aggiungi</Button>
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
