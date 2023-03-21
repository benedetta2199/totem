import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import useStore from '@store';
import { useRouter } from 'next/router';

export default function Home() {

  const r = useRouter();

  /**CAMPI STORE */
  const addAdj = useStore((state) => state.addAdj);
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

  /**FUNZIONE CHE GESTISCE TUTTE LE AGGIUNTE */
  const addAggettivo = ()=>{
    const cap = aggettivo.charAt(0).toUpperCase() + aggettivo.slice(1);
    if(okAdj){
      addAdj(cap, positivo);
      animals.forEach(animal => {
        console.log(cap+', '+animal+', '+positivo);
        addAdjAnimal(cap, animal, positivo);
      });
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
               <Col xs={6} key={item.nome}><Form.Check value={item.nome} label={item.nome} onChange={(e)=> check(e, true)}/></Col>
            ))}
        </Row>

       <Button className='btnY mt-3' onClick={()=>{addAggettivo(); r.push('/')}}>Aggiungi</Button>        
      </main>
    </>
  )
}
