import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

import db from '@database';
import useStore from "@store";

export default function Home() {
  /**CAMPI STORE */
  const addAnimal = useStore((state) => state.addAnimal);
  const animals = useStore((state) => state.animals);

  /**CAMPI PER CHECKBOX */
  const allAdjP = useStore((state) => state.adjsP);
  const allAdjN = useStore((state) => state.adjsN);

  /**CAMPI COMPILAZIONE FORM */
  const [animale, setAnimale]=useState('');
  const [famiglia, setFamiglia]=useState('');
  const [alimentazione, setAlimentazione]=useState('');
  const [adjsP, updateAdjP] = useState([]);
  const [adjsN, updateAdjN] = useState([]);

  /**CAMPI CONTROLLO */
  const [okAnimal, setOkAnimal] = useState(false);
  const [okFamiglia, setOkFamiglia] = useState(false);
  const [okAlimentazione, setOkAlimentazione] = useState(false);

  /** AGGIONGE L'ANIMALE AL DATABASE E ALLO STORE */
  const addanimale = async () => {
    const cap=animale.charAt(0).toUpperCase() + animale.slice(1);
    if(okAnimal && okAnimal && okFamiglia){
      const temp = {famiglia: famiglia, alimentazione: alimentazione, aggettiviP: adjsP.sort(), aggettiviN: adjsN.sort()}
      await setDoc(doc(db,'animale',cap), temp);
      addAnimal(Object.assign({nome: cap}, temp));
    } else{
      /**Aggiungere toast di errore*/
    }
  }
  
  /**ATTIVATO DAL CLICK SU UN CHECKBOX
   * -Aggiunge l'elemento se viene selezionato
   * -Lo rimuove se viene deselezionato
   */
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
        <title>Bestiario - Aggiungi ANimale</title>
      </Head>
      <main className={`${styles.main} pb-5`}>
        <h1>Aggiungi un animale</h1>
        <Form.Control type="name" className={`${okAnimal ? '' : 'is-invalid'} w-75 m-auto mt-3`} placeholder='Animale' value={animale}
          onChange={(e) => {
            setAnimale(e.target.value); 
            setOkAnimal(e.target.value!='' && !animals.find(a => a.nome.toLowerCase() === e.target.value.toLowerCase()));
          }}
          />
        <div className='w-75 mx-auto text-center'><small className='text-danger'>{okAnimal ? '' : "L'animale è già presente"}</small></div>
       
       <Form.Select aria-label="Scegli la famiglia" className={`${okFamiglia ? '' : 'is-invalid'} w-75 m-auto mt-3`}
          onChange={(e)=>{ setFamiglia(e.target.value);  setOkFamiglia(e.target.value!='null')}}>
          <option value='null'>Scegli la famiglia</option>
          <option value="Anfibi">Anfibi</option>
          <option value="Invertebrati">Invertebrati</option>
          <option value="Mammiferi">Mammiferi</option>
          <option value="Pesci">Pesci</option>
          <option value="Rettili">Rettili</option>
          <option value="Uccelli">Uccelli</option>
        </Form.Select>

        <Form.Select aria-label="Scegli l'alimentazione" className={`${okAlimentazione ? '' : 'is-invalid'} w-75 m-auto mt-3`}
          onChange={(e)=>{setAlimentazione(e.target.value); setOkAlimentazione(e.target.value!='null')}}>
          <option value='null'>Scegli l'alimentazione</option>
          <option value="Carnivoro">Carnivoro</option>
          <option value="Erbivoro">Erbivoro</option>
          <option value="Granivoro">Granivoro</option>
          <option value="Insettivoro">Insettivoro</option>
          <option value="Onnivoro">Onnivoro</option>
        </Form.Select>

        <Row className='mt-3 mx-2 px-3'>
          <Col xs={6}>
            <p className='t-khand lightT text-center h6'>Aggettivi positivi</p>
            {allAdjP.map((item) => (
               <Form.Check value={item} label={item} key={item} onChange={(e)=> check(e, true)}/>
            ))}
          </Col>
          <Col xs={6}>
            <p className='t-khand lightT text-center h6'>Aggettivi negativi</p>
            {allAdjN.map((item) => (
               <Form.Check value={item} label={item} key={item} onChange={(e)=> check(e, false)}/>
            ))}
          </Col>
        </Row>

       <Button className='btnY mt-3' onClick={()=>{addanimale()}}>Aggiungi</Button>
        
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
