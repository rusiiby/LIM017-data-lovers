//Filter by type
export const filterByType = (data, type) => {
  const arrPokeType = data.filter((pokemon) => {
    if (pokemon.type.includes(type)) {
      return true;
    } else {
      return false;
    }
  })
  return arrPokeType;
};
//Filter by egg
export const filterByEgg = (data, egg) => {
  const arrPokeEgg = data.filter((pokemon) => {
    if (pokemon.egg.includes(egg)) {
      return true;
    } else {
      return false;
    }
  })
  return arrPokeEgg;
};
//Filter by generation
export const filterByGeneration = (data, generation) => {
  const arrPokeGeneration = data.filter((pokemon) => {
    if (pokemon.generation.num == generation) {
      return true;
    } else {
      return false;
    }
  })
  return arrPokeGeneration;
};
//Filter by region
export const filterByRegion = (data, generation) => {
  const arrPokeRegion = data.filter((pokemon) => {
    if (pokemon.generation.name == generation) {
      return true;
    } else {
      return false;
    }
  })
  return arrPokeRegion;
};
//Search by name
export const search = (data, name) => {
  const searchPoke = data.find(element => element.name.toLowerCase() === name.toLowerCase());
  return searchPoke;
}