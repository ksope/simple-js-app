//create a list of Pokemons
let pokemonList = [];

//add some Pokemons to the list
pokemonList.push({name: "Bulbasaur", height: 7, types: ['grass', 'poison']});
pokemonList.push({name: "Ivysaur", height: 10, types: ['grass', 'poison']});
pokemonList.push({name: "Venusaur", height: 20, types: ['grass', 'poison']});
pokemonList.push({name: "Caterpie", height: 3, types: ['bug', 'electric']});
pokemonList.push({name: "Wartortle", height: 10, types: ['dark', 'steel']});

//print out each pokemon in the list 
for(let i = 0; i < pokemonList.length; i++){
    pokemonList[i].height > 10? document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") " + "-Wow, that's big!<br>"): document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
}