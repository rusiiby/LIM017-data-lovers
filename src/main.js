// import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

let rootContainer = document.getElementById("root");
const searchBar = document.getElementById('searchBar');
const modalBody = document.getElementById('modal-body');
const modal = document.getElementById('modal-detalle');
let typesPokemonSelect = [];
let resistantPokemonSelect =[];
let weaknessesPokemonSelect =[];
let generationPokemonSelect = [];

let dataPokemon = [];
let pokemons = [];

searchBar.addEventListener('keyup', function(e){
    const searchString = e.target.value;
    // console.log(searchString);
    const filteredPokemons = dataPokemon.filter(function(pokemon){
        return pokemon.name.includes(searchString);
    });
    // console.log(filteredPokemons);
    renderPokemon(filteredPokemons);
    renderMaps(filteredPokemons);

})

const loadPokemons = async () => {
    try{
        const res = await fetch('./data/pokemon/pokemon.json');
        pokemons = await res.json();
        dataPokemon = pokemons.pokemon
        getPokemonTypes(dataPokemon);
        getPokemonResistant(dataPokemon);
        getPokemonWeaknesses(dataPokemon);
        getPokemonGeneration(dataPokemon);
        let test;
        dataPokemon.forEach(function(el){
            let lat = Math.random() * 20.5;
            let lon = Math.random() * -20.5;
            test = {'lat': lat, 'lon': lon};
             el.coordenadas = test;
            //  console.log(el);
        })
        //  console.log(dataPokemon)
        renderPokemon(dataPokemon);
        renderMaps(dataPokemon);
        
    }catch (error){

    }
}

function renderPokemon(pokemonsData){
    const hmtlString = pokemonsData.map(function(element,index){
        
        return `
        <div id="${index}" class="pokemon-card ${element.type[0]}">
            <div class="card-image">
                <img src="${element.img}" alt="">
            </div>
            <div class="card-info">
                <h3>${element.name}</h3>  
                <h3>${element.num}</h3>  
            </div>
            <div>
            <h3></h3>
            </div>

        </div>
        `
    }).join('');
    console.log(hmtlString)

    rootContainer.innerHTML = hmtlString;
    document.querySelectorAll(".pokemon-card").forEach((pokeCard) => {
        pokeCard.addEventListener('click', (event, element) => {
            let index =  parseInt(pokeCard.id);
            renderModal(pokemonsData,index);
            // getPokemonPopup(pokemonsData);
        });
    }); 
} 

function renderModal(pokemonsData,index){
    console.log(pokemonsData);
    let type = pokemonsData[index].type.toString();
    let preEV;
    let nextEV;
    let prevEvolution = pokemonsData[index].evolution['prev-evolution'];
    prevEvolution ? preEV = prevEvolution[0]['name'] : preEV = null;
    // if(prevEvolution){
    //     preEV = prevEvolution[0]['name'];
    // }else{
    //     preEV = 'No tiene';
    // }
    let nextEvolution = pokemonsData[index].evolution['next-evolution'];
    if(nextEvolution){
        nextEV = nextEvolution[0]['name'];
    }else{
        nextEV = null;
    }


    console.log(prevEvolution);
    const htmlModal=`
    <div class="${pokemonsData[index].type[0]}"style="width:575px ; height: 555px;"">
        <div class="card-image">
            <img src="${pokemonsData[index].img} "style="width:300px ; height: 200px;" alt="">
        </div>
        <div class="card-info">
            <h2>Name => ${pokemonsData[index].name}</h2>  
            <div><h3>Numero : ${pokemonsData[index].num}</h3></div>
        </div>
        <div>
        <div> <h4>About:</h4> ${pokemonsData[index].about}</div> 
        </div>
        <div> <h4>  Type: </h4>${type}</div>
        <div> <h4>Egg:</h4> ${pokemonsData[index].egg}</div> 
        <div> <h4>Resistant:</h4> ${pokemonsData[index].resistant}</div> 
        <div> <h4>Weaknesses:</h4> ${pokemonsData[index].weaknesses}</div> 
        ${preEV !== null? '<div> <h4>Pre Evolution:</h4>'+preEV + '</div>' : '<div> <h4>Pre Evolution:</h4>no tiene</div>'}
        ${nextEV !== null? '<div> <h4>Next Evolution:</h4>'+nextEV + '</div>' : '<div> <h4>Next Evolution:</h4>no tiene</div>'}
    </div>
    `;
    console.log(index)
    console.log(pokemonsData[index])

    modalBody.innerHTML = htmlModal;
    modal.style.display = "block";//mostrar modal

    // boton de cierre de motal
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    // click fuera del modal, cierra
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

}

loadPokemons()
let map = L.map('map').setView([4.639386,-74.082412],6)
 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
   
function renderMaps(dataPokemons){
    //console.log(dataPokemons)
    dataPokemons.forEach(function(el){
        var marker = L.marker(el.coordenadas).addTo(map);
        //console.log(marker);
    
         marker.bindPopup(`<img src="${el.img}" alt=""> <h6>${el.name}</h6>
         `).openPopup();
    })
    map = L.map('map', {
        
        scrollWheelZoom: false
    });
}
// select types

let selectTypes = document.getElementById('select-types');

selectTypes.addEventListener('change', function(e){
    const searchString = e.target.value;
    console.log(searchString);
    const filteredPokemons = dataPokemon.filter(function(pokemon){
        return pokemon.type.includes(searchString);
    });
    // console.log(filteredPokemons);
    renderPokemon(filteredPokemons);
    renderMaps(filteredPokemons);
})

let aux = [];

function getPokemonTypes(dataPokemon){
//    console.log(dataPokemon);
   dataPokemon.forEach(function(element){
    typesPokemonSelect.push(element.type);
   })
   typesPokemonSelect.forEach(function(el){
    el.forEach(function(e){
        aux.push(e);
    })
   })

   const dataArrType = new Set(aux);
   const typesPokemon = [...dataArrType]; //spread operator
   renderTypesSelect(typesPokemon);
}


function renderTypesSelect(arrTypes){
    // console.log(arrTypes);
    const hmtlString = arrTypes.map(function(element,index){
        return `
        <option value='${element}'>${element}</option>
        `
    }).join('');

    selectTypes.innerHTML = hmtlString;
}

// selct for resistant

let selectResistant = document.getElementById('select-resistant');
// console.log(selectResistant);
selectResistant.addEventListener('change', function(e){
    const searchString = e.target.value;
    // console.log(searchString);
    const filteredPokemons = dataPokemon.filter(function(pokemons){
        return pokemons.resistant.includes(searchString);
    });
    // console.log(filteredPokemons);
    renderPokemon(filteredPokemons);
    // renderMaps(filteredPokemons);
})

let auxR = [];

function getPokemonResistant(dataPokemon){
//    console.log(dataPokemon);
   dataPokemon.forEach(function(element){
    resistantPokemonSelect.push(element.resistant);
   })
   resistantPokemonSelect.forEach(function(el){
    el.forEach(function(e){
        auxR.push(e);
    })
   })

   const dataArrResistant = new Set(auxR);
   const resistantPokemon = [...dataArrResistant]; //spread operator
   renderResistantSelect(resistantPokemon);
}


function renderResistantSelect(arrResistant){
    // console.log(arrResistant);
    const hmtlString = arrResistant.map(function(element,index){
        return `
        <option value='${element}'>${element}</option>
        `
    }).join('');

    selectResistant.innerHTML = hmtlString;
}
// select Weaknesses

let selectWeaknesses = document.getElementById('select-weaknesses');
selectWeaknesses.addEventListener('change', function(e){
    const searchString = e.target.value;
    // console.log(searchString);
    const filteredPokemons = dataPokemon.filter(function(pokemons){
        return pokemons.weaknesses.includes(searchString);
    });
    // console.log(filteredPokemons);
    renderPokemon(filteredPokemons);
    // renderMaps(filteredPokemons);
})

let auxW = [];

function getPokemonWeaknesses(dataPokemon){
//    console.log(dataPokemon);
   dataPokemon.forEach(function(element){
    weaknessesPokemonSelect.push(element.weaknesses);
   })
   weaknessesPokemonSelect.forEach(function(el){
    el.forEach(function(e){
        auxW.push(e);
    })
   })

   const dataArrWeaknesses = new Set(auxW);
   const weaknessesPokemon = [...dataArrWeaknesses]; //spread operator
   renderWeaknessesSelect(weaknessesPokemon);
}


function renderWeaknessesSelect(arrWeaknesses){
    // console.log(arrWeaknesses);
    const hmtlString = arrWeaknesses.map(function(element,index){
        return `
        <option value='${element}'>${element}</option>
        `
    }).join('');

    selectWeaknesses.innerHTML = hmtlString;
}
// filtrando por generacion
let selectGeneration = document.getElementById('select-generation');

selectGeneration.addEventListener('change', function(e){
    const searchString = e.target.value;
    // console.log(searchString);
    const filteredPokemons = dataPokemon.filter(function(pokemons){
        return pokemons.generation.name.includes(searchString);
    });
    // console.log(filteredPokemons);
    renderPokemon(filteredPokemons);
    // renderMaps(filteredPokemons);
})

function getPokemonGeneration(dataPokemon){
console.log(dataPokemon);
   dataPokemon.forEach(function(element){
       console.log(element.generation.name)
    generationPokemonSelect.push(element.generation.name);
   })

   console.log(generationPokemonSelect)
   //spread operator
   
   const dataArrGen = new Set(generationPokemonSelect);
   const generationPokemon = [...dataArrGen];
   console.log(generationPokemon)
   renderGenerationSelect(generationPokemon);
}


function renderGenerationSelect(arrGeneration){
    console.log(arrGeneration);
    const hmtlString = arrGeneration.map(function(element,index){
        return `
        <option value='${element}'>${element}</option>
        `
    }).join('');

    selectGeneration.innerHTML = hmtlString;
}
//Main page to type page
const ftype= document.getElementById("btype");
ftype.addEventListener("click", () =>{
const main= document.querySelector(".main_page");
const type= document.querySelector(".Poketype");
main.style.display="none";
type.style.display="block";
});
