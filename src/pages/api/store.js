import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand'
import db from '@database';

const useStore = create((set,get) => ({
  animals: [],
  adjsP: [],
  adjsN: [],
  animalClick: {},
  animalSearch: [],

  /**INIZIALIZZA TUTTI GLI ANIMALI NELLO STORE*/
  inizializeAnimals: async() => {
      let animal = [];
      const querySnapshot = await getDocs(collection(db, "animale"));
      querySnapshot.forEach((doc) => {
        animal = animal.concat(Object.assign({nome: doc.id.trim()}, doc.data()));
       });
    set({ animals: animal });
  },
  /**INIZIALIZZA TUTTI GLI AGGETTIVI (DIVISI IN POSITIVI E NEGATIVI) NELLO STORE*/
  inizializeAdjs: async() => {
    let pos = [];
    let neg = [];
    const querySnapshot = await getDocs(collection(db, "aggettivo"));
    querySnapshot.forEach((doc) => {
      doc.data().positivo 
        ? pos = pos.concat(doc.id.trim())
        : neg = neg.concat(doc.id.trim());
      });
    set({ adjsP: pos });
    set({ adjsN: neg });
  },

  /**AGGIUNGE UN NUOVO ANIMALE AL DATABASE E ALLO STORE */
  addAnimal: async (nome, data) => {
    nome = nome.trim();
    const elem = Object.assign({nome: nome}, data);
    set((state) => ({ animals: [...state.animals, elem].sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)) }));
    await setDoc(doc(db,'animale',nome), data); 
  },
  /** AGGIUNGE UN NUOVO AGGETTIVO AL DATABASE E ALLO STORE */
  addAdj: async (adj, p) => {
    adj = adj.trim();
    console.log(adj+', '+p);
    await setDoc(doc(db,'aggettivo',adj), {positivo: p});
    if(p){
      set((state) => ({ adjsP: [...state.adjsP, adj] })); get().adjsP.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    }else{
      set((state) => ({ adjsN: [...state.adjsN, adj] }));  get().adjsN.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    }
  },

  /*AGGIUNGI UN AGGETTIVO IN MODO ORDINATO ALL'ANIMALE NEL DATABASE E NELLA LISTA DELLO STORE*/
  addAdjAnimal: async (adj, animal, pos) => {
    adj = adj.trim();
    const animale = doc(db, "animale", animal);
    let newAdjs = [];
    const index = get().animals.findIndex((e => e.nome === animal));
    const anim = get().animals[index];
    console.log(anim);
    if(pos){
        newAdjs = anim.aggettiviP.concat(adj);
        newAdjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        get().animals[index].aggettiviP = newAdjs;
        await updateDoc(animale, { aggettiviP: newAdjs }); 
    } else {
        newAdjs = anim.aggettiviN.concat(adj);
        newAdjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        get().animals[index].aggettiviN = newAdjs;
        await updateDoc(animale, { aggettiviN: newAdjs }); 
    }
  },

  /** AGGIUNGE GLI AGGETTIVI IN MODO ORDINATO ALL'ANIMALE NEL DATABASE E NELLA LISTA DELLO STORE*/
  addAdjsAnimal: async (animal, adjs, p) => {
    animal=animal.trim();
    const animale = doc(db, "animale", animal);
    const index = get().animals.findIndex((e => e.nome == animal));
    adjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    if(p){
      await updateDoc(animale, { aggettiviP: adjs }); 
      get().animals[index].aggettiviP = adjs;
    }else{
      await updateDoc(animale, { aggettiviN: adjs }); 
      get().animals[index].aggettiviN = adjs;
    }
  },

  setAnimalClick:  (anim) => set((state) => ({ animalClick: anim })),

  /**FILTRA GLI ANIMALI CHE HANNO ALMENO I 2/7 DEGLI AGGETTIVI RICERCATI UGUALI*/
  searchAnimals: (p,n) =>{
    set({ animalSearch: [] });
    const animalSearch=[];
    const r = Math.ceil((p.length+n.length)*2/7);
    get().animals.forEach(element => {
        const intersection = p.filter((x) => element.aggettiviP.includes(x.trim())).length + n.filter((x) => element.aggettiviN.includes(x.trim())).length;
        if(intersection>=r){
          animalSearch.push(Object.assign(element,{intersection: intersection}));
          /*set((state) => ({ animalSearch: [...state.animalSearch, Object.assign(element,{intersection: intersection})] }));*/
        }
    });
    /*get().animalSearch.sort((a,b) =>  b.intersection-a.intersection);*/
    animalSearch.sort((a,b) =>  b.intersection-a.intersection); 
    set({ animalSearch: animalSearch });  
  },

  /**TOGLI TUTTI GLI SPAZI */
  trimAll: async() =>{
    const querySnapshot = await getDocs(collection(db, "animale"));
    console.log(querySnapshot);
    for (const d of querySnapshot.docs) {
        let adjsP = [];
        let adjsN = [];
        d.data().aggettiviP.forEach((a) => adjsP = adjsP.concat(a.trim())); 
        d.data().aggettiviN.forEach((a) => adjsN = adjsN.concat(a.trim()));
        const w = doc(db, "animale", d.id);    
        await updateDoc(w, { aggettiviP: adjsP  });   
        await updateDoc(w, { aggettiviN: adjsN  });
    }
  }

}));

export default useStore;