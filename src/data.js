export const filterByType = function (data, type) {
  const arrPokeType = data.filter((pokemon) => {
    if (pokemon.type <= type) {
      return true;
    } else {
      return false;
    }
  })
  return arrPokeType;
}
console.log("filter", filterByType(pokemon, grass));

export const filterByName = function (data, name) {
  const arrPokeName = data.filter((pokemon) => {
    if (pokemon.name <= name) {
      return true;
    } else {
      return false;
    }
  })
  return arrPokeName;
};
