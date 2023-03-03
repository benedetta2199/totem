import { create } from 'zustand'

const useStore = create((set,get) => ({
  animals: [],
  adjsP: [],
  adjsN: [],
  animalClick: {},
  animalSearch: [],

  inizializeAnimals: (allAnimals) => set((state) => ({ animals: allAnimals })),
  initializeAdjsP: (allAdjs) =>  set((state) => ({ adjsP: allAdjs })),
  inizializeAdjsN: (allAdjs) => set((state) => ({ adjsN: allAdjs })),


  addAnimal: (elem) => {set((state) => ({ animals: [...state.animals, elem].sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)) }));},
  addAdjP: (elem) => {set((state) => ({ adjsP: [...state.adjsP, elem] })); get().adjsP.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));},
  addAdjN: (elem) => { set((state) => ({ adjsN: [...state.adjsN, elem] }));  get().adjsN.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0)); },
  addAdjAnimal: (adj, animal, pos) => {
    let newAdjs = [];
    const anim = get().animals.find(e => e.nome === animal);
    if(pos){
        newAdjs = anim.aggettiviP.concat(adj);
        newAdjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    } else {
        newAdjs = anim.aggettiviN.concat(adj);
        newAdjs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    }
    return newAdjs;
  },

  setAnimalClick:  (anim) => set((state) => ({ animalClick: anim })),

  searchAnimals: (p,n) =>{
    set((state) => ({ animalSearch: [] }));
    const r = Math.ceil((p.length+n.length)*2/7);
    get().animals.forEach(element => {
        const intersection = p.filter((x) => element.aggettiviP.includes(x)).length + n.filter((x) => element.aggettiviN.includes(x)).length;
        if(intersection>=r){
            set((state) => ({ animalSearch: [...state.animalSearch, Object.assign(element,{intersection: intersection})] }));
        }
    });
    get().animalSearch.sort((a,b) =>  b.intersection-a.intersection);   
  }

}));

export default useStore;