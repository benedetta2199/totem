import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from 'react';
import Image from 'next/image'

import jungle from '@img/jungle.png'
import useStore from "@store";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  const inizializeAdjs = useStore((state) => state.inizializeAdjs);
  const inizializeAnimals = useStore((state) => state.inizializeAnimals);
  let inizialize = false;

  useEffect(()=>{
    if(!inizialize){
      inizialize=true;
      console.log(inizialize);
      inizializeAdjs();
      inizializeAnimals();
    }
  },[]);

  return (
  <>
    <Component {...pageProps} />
    <Image src={jungle} alt="" className='jungle'/>
  </>);
}
