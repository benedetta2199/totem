/*import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { doc, getDoc} from 'firebase/firestore';
import db from '@database';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';

export default function Home() {

  const r = useRouter();

  const {img, setImg} = useState('');
  const {nome, setNome} = useState('');
  const {famiglia, setFamiglia} = useState('');
  const {alimentazione, setAlimentazione} = useState('');
  const {info, setInfo} = useState('');
  const {daimon, setDaimon} = useState('');
  const {aP, setAP} = useState('');
  const {aN, setAN} = useState('');
  let flag = true;

  useEffect(async()=> {
    const {name} = r.query;
      if(flag && typeof(name)=='string'){
        console.log(name);
        flag=false;
        const item = getAnimal(name.replace('.', ' '));
        console.log(item);
        setImg(item.nome.toLowerCase().replaceAll(' ',''));
        setNome(item.nome);
        setFamiglia(item.famiglia);
        setAlimentazione(item.alimentazione);
        if(item.hasOwnProperty('info')){
          setInfo(item.info);
        }
        if(item.hasOwnProperty('daimon')){
          setDaimon(item.daimon);
        } 
        setAP(item.aggettiviP.toString().replaceAll(',',', '));
        setAN(item.aggettiviN.toString().replaceAll(',',', '));
      } 
      else{
        console.log('ok');
      }     
  }, []);

  const getAnimal = async (name) => {
    const docRef = doc(db, "animale", name);
    const docDate = await getDoc(docRef);
    return Object.assign({nome: docDate.id.trim()}, docDate.data())
  }


  return (
    <>
      <Head>
        <title>Bestiario -Aggiungi Aggettivo</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.detailFixed}>
          
          <h1>{nome}</h1>
          <Image src={"/animal/"+ img +'.webp'} alt="" width={500} height={500} priority/>
          <div>
            {info!=''
              ? <Link className='btn btnY my-1' href={'https://animalia.bio/it/'+info} target="_blank">Info</Link> 
              : <></>
            }
            {daimon!=''
              ? <Link className='btn btnY my-1' href={'https://daimonismo.altervista.org/forum/viewtopic.php?'+daimon} target="_blank">Daimon</Link> 
              : <></>
            }
          </div>
          
        </div>
        <div className={styles.detailScroll}>
          <p className='text-end h6'>Famiglia: {famiglia}</p>
          <p className='text-end h6'>Alimentazione: {alimentazione}</p>
          <p className='darkT t-khand h5 pt-2'>Aggettivi positivi:</p>
          <p>{aP}</p>
          <p className='darkT t-khand h5 pt-2'>Aggettivi negativi:</p>
          <p>{aN}</p>
        </div>
      </main>
    </>
  )
}*/
