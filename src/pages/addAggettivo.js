import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import db from '@database';
import useStore from '@store';
import { useRouter } from 'next/router';

export default function Home() {

  const r = useRouter();

  /**CAMPI STORE */
  const addAdsP = useStore((state) => state.addAdjP);
  const addAdsN = useStore((state) => state.addAdjN);
  const addAdjAnimal = useStore((state) => state.addAdjAnimal);
  const adjs = useStore((state) => state.adjsN).concat(useStore((state) => state.adjsP));

  /**CAMPI PER CHECKBOX */
  const allAnimals = useStore((state) => state.animals);

  /**CAMPI COMPILAZIONE FORM */
  const [aggettivo, setAggettivo]=useState('');
  const [positivo, setPositivo]=useState(true);
  const [animals, updateAnimals]=useState([]);

  /**CONTROLLO */
  const [okAdj, setOkAdj]=useState('false');

  /*const addAggettivo = async () => {
    //await setDoc(doc(db,'aggettivo',aggettivo), {positivo: positivo});
    //setAggettivo('');
  }*/

  /**FUNZIONE CHE GESTISCE TUTTE LE AGGIUNTE */
  const addAggettivo = ()=>{
    const cap = aggettivo.charAt(0).toUpperCase() + aggettivo.slice(1);
    addDBAdj(cap);
    animals.forEach(animal => {
      const newAdj = addAdjAnimal(cap, animal, positivo);
      addDBAdjAnimale(animal, newAdj, positivo);
    });
  }

  /** AGGIUNGE L'AGGETTIO AGLI ANIMALI SELEZIONATI NEL DATABASE */
  const addDBAdjAnimale = async (animal, arr, p) => {
    const animale = doc(db, "animale", animal);
    if(p){
      await updateDoc(animale, { aggettiviP: arr }); 
    }else{
      await updateDoc(animale, { aggettiviN: arr }); 
    }
  }

  /** AGGIUNGE L'AGGETTIVO AL DATABASE E ALLO STORE */
  const addDBAdj = async (adj) => {
    if(okAdj){
      await setDoc(doc(db,'aggettivo',adj), {positivo: positivo});
      if(positivo){
        addAdsP(aggettivo);
      }else{
        addAdsN(aggettivo);
      }
    } else{
      /**Aggiungere toast di errore*/
    }
  }

  /**ATTIVATO DAL CLICK SU UN CHECKBOX
   * -Aggiunge l'elemento se viene selezionato
   * -Lo rimuove se viene deselezionato
   */
  const check = (e) => {
    e.target.checked 
      ? updateAnimals(animals => [...animals, e.target.value]) 
      : updateAnimals(animals.filter(item => item !== e.target.value));
  }

  
  return (
    <>
      <Head>
        <title>Bestiario Aggiungi Aggettivo</title>
      </Head>
      <main className={`${styles.main} pb-5`}>
        <h1>Aggiungi un aggettivo</h1>
        <Form.Control type="name" className={`${okAdj ? '' : 'is-invalid'} w-75 m-auto mt-3`}placeholder='Aggettivo'
          value={aggettivo} onChange={(e) => {
            setAggettivo(e.target.value); 
            setOkAdj(e.target.value!='' && !adjs.find(a => a.toLowerCase() === e.target.value.toLowerCase()));
          }}/>
        <div className='w-75 mx-auto text-center'><small className='text-danger'>{okAdj ? '' : "L'aggettivo è già presente"}</small></div>
       
      <div className='d-flex justify-content-center mt-3'>
        <span className='m-0 pe-2'>Negativo</span>
        <Form.Check type="switch" id="custom-switch" label="" checked={positivo} onChange={()=>{setPositivo(!positivo);}}/>
        <span className='m-0'>Positivo</span>
      </div>
        <Row className='mt-3 mx-2 px-3'>
            {allAnimals.map((item) => (
               <Col xs={6}><Form.Check value={item.nome} label={item.nome} key={item.nome} onChange={(e)=> check(e, true)}/></Col>
            ))}
        </Row>

       <Button className='btnY mt-3' onClick={()=>{addAggettivo(); r.push('/')}}>Aggiungi</Button>
        
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
