// estas funciones son de ejemplo

//  export const pokemon = () => {
// let intro = document.getElementById("root");
// intro.innerHTML += `<div>Poke: ${value.type}</div>`
// // pokemon.forEach(function(value,index){
// // // intro.innerHTML +=`<div>Poke: ${value.type}</div>`
// // // console.log(value.type);
// // console.log(index)

// // });
                                     

// // export const anotherExample = () => {
// //   return 'OMG';
let intro = document.getElementById("container");
pokemon.forEach(function(value,index){
intro.innerHTML +=`<div>Poke: ${value.type}</div>`
console.log(value.type);

});
