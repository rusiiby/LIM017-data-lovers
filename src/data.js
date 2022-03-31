// estas funciones son de ejemplo

// // export const anotherExample = () => {
// //   return 'OMG';
let intro = document.getElementById("container");
pokemon.forEach(function(value,index){
intro.innerHTML +=`<div>Poke: ${value.type}</div>`
console.log(value.type);

});
