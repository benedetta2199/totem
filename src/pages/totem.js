import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useState } from 'react';
import { useRouter } from 'next/router';

import useStore from "@store";

export default function Home() {

  const r = useRouter();
  
  /**CAMPI PER CHECKBOX */
  const allAdjP = useStore((state) => state.adjsP);
  const allAdjN = useStore((state) => state.adjsN);
  const searchAnimals = useStore((state) => state.searchAnimals);

  /**CAMPI COMPILAZIONE */
  const [adjsP, updateAdjP] = useState([]);
  const [adjsN, updateAdjN] = useState([]);
  /**ATTIVATO DAL CLICK SU UN CHECKBOX
   * -Aggiunge l'elemento se viene selezionato
   * -Lo rimuove se viene deselezionato
   */

  const searchAnim = ()=>{
    searchAnimals(adjsP, adjsN);
    r.push('./serchAnimali');
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
        <title>Bestiario - Trova il totem</title>
      </Head>
      <main className={`${styles.main} pb-5`}>
        <h1>Trova il totem</h1>
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

       <Button className='btnY mt-3' onClick={()=>{searchAnim()}}>Conferma</Button>
        
      </main>
    </>
  )
}
