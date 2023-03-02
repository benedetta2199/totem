import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';


import jungle from '@img/jungle.png'
import Image from 'next/image'

import useStore from "@store";
import db from '@database';

export default function App({ Component, pageProps }) {

  const inizializeAdjsN = useStore((state) => state.inizializeAdjsN);
  const initializeAdjsP = useStore((state) => state.initializeAdjsP);
  const inizializeAnimals = useStore((state) => state.inizializeAnimals);

  const getAllAdj = async() =>{
    let pos = [];
    let neg = [];
    const querySnapshot = await getDocs(collection(db, "aggettivo"));
    querySnapshot.forEach((doc) => {
      doc.data().positivo 
        ? pos = pos.concat(doc.id)
        : neg = neg.concat(doc.id)
      });
    initializeAdjsP(pos);
    inizializeAdjsN(neg);
  }

  const getAllAnimal = async() =>{
    let animal = [];
    const querySnapshot = await getDocs(collection(db, "animale"));
    
    querySnapshot.forEach((doc) => {
      animal = animal.concat(Object.assign({nome: doc.id}, doc.data()));
      //animal = animal.concat({nome: doc.id, afamiglia: doc.data().famiglia, alimentazione: doc.data().alimentazione, aggettiviP: doc.data().aggettiviP, aggettiviN: doc.data().aggettiviN});;
    });
    inizializeAnimals(animal);
  }

  useEffect(()=>{
    getAllAdj();
    getAllAnimal();
  },[]);

  return (
  <>
    <Component {...pageProps} />
    <Image src={jungle} alt="" className='jungle'/>
  </>);
}
