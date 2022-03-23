import { filterByType, filterByRegion, filterByGeneration, filterByEgg } from './data.js';
import data from './data/pokemon/pokemon.js';

//lista de pokemon filtrados
const pokeArray = data.pokemon
const pokeList = document.querySelector("#Showpokelist")
const dpoke = (details) => `
<section class= "pokeList" id="pokeCard" >
  <div class="Number">${details.num}</div>
  <div class="Name">${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</div>
  <div><img class="Img" src="${details.img}"></div>
</section>
`;
for (let details of pokeArray) {
    pokeList.innerHTML += dpoke(details);
}
//Type buttons
const typeBtns = document.querySelectorAll('.type');
typeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(filterByType(data.pokemon, e.target.id))
    })
})
//Egg buttons
const eggBtns = document.querySelectorAll('.egg');
eggBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(filterByEgg(data.pokemon, e.target.id))
    })
})
//Generation buttons
const genBtns = document.querySelectorAll('.generation');
genBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(filterByGeneration(data.pokemon, e.target.id))
    })
})
//Region Buttons
const regBtns = document.querySelectorAll('.region');
regBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        //console.log(filterByRegion(data.pokemon, e.target.id))
        showData.innerHTML = "";
        document.getElementById("dataPokemon").classList.remove("hide");
        document.getElementById("bienvenida").classList.add("hide");
        for (let poke of g2) {
             showData.innerHTML += dpoke(poke);
         }
    })
})

//Main page to type page
const ftype= document.getElementById("btype");
ftype.addEventListener("click", () =>{
const main= document.querySelector(".main_page");
const type= document.querySelector(".Poketype");
main.style.display="none";
type.style.display="block";
});
//egg page
const fegg= document.getElementById("begg");
fegg.addEventListener("click", () =>{
const main= document.querySelector(".main_page");
const egg= document.querySelector(".PokeEgg");
main.style.display="none";
egg.style.display="block";
});
//region page
const fregion= document.getElementById("bregion");
fregion.addEventListener("click", () =>{
const main= document.querySelector(".main_page");
const region= document.querySelector(".PokeRegion");
main.style.display="none";
region.style.display="block";
});
