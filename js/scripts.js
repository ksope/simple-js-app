//create a list of Pokemons in an IIFE to avoid accidentally accessing the global state
let pokemonRepository = (function(){
    let pokemonList = [];

    //add a new pokemon to the pokemonList
    function add(pokemon){
        if(!pokemon){
            console.log("pokemon is undefined!");
        }
        else if(Array.isArray(pokemon)){
            console.log("pokemon is an array, not an object!");
        }
        //check if pokemon is an object
        else if(typeof pokemon === 'object'){
            if (Object.keys(pokemon).length === 3) {
                if (Object.keys(pokemon)[0] === "name" && Object.keys(pokemon)[1] === "height" && Object.keys(pokemon)[2] === "types"){
                    pokemonList.push(pokemon);
                    console.log("New pokemon added!")
                }
            }
        }
        //if pokemon is not an object, display it's datatype
        else if (typeof pokemon !== 'object'){
            console.log('pokemon has a value, but it is not an object, pokemon is a', typeof pokemon, '.')
        }
    }

    
    //filter the pokemonList based on the height of the pokemons
    function filterPokemon(pokemonHeight){
        return pokemonList.filter(pokemon.height >= pokemonHeight);
    }

    //return all the pokemon objects in the pokemonList
    function getAll(){
        return pokemonList;
    }

    return{
        add: add,
        getAll: getAll,
     };


})();

//add some Pokemons to the list
pokemonRepository.add({name: "Bulbasaur", height: 7, types: ['grass', 'poison']});
pokemonRepository.add({name: "Ivysaur", height: 10, types: ['grass', 'poison']});
pokemonRepository.add({name: "Venusaur", height: 20, types: ['grass', 'poison']});
pokemonRepository.add({name: "Caterpie", height: 3, types: ['bug', 'electric']});
pokemonRepository.add({name: "Wartortle", height: 10, types: ['dark', 'steel']});


//print out each pokemon in the list 

pokemonRepository.getAll().forEach(function(pokemon){
    pokemon.height > 10? document.write(pokemon.name + " (height: " + pokemon.height + ") " + "- Wow, that's big!<br>"): document.write(pokemon.name + " (height: " + pokemon.height + ")<br>");
});
