import { filterByType, filterByRegion, filterByGeneration, filterByEgg } from './data.js';
import data from './data/pokemon/pokemon.js';

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
        console.log(filterByRegion(data.pokemon, e.target.id))
    })
})

