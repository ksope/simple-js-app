//create a list of Pokemons in an IIFE to avoid accidentally accessing the global state
let pokemonRepository = (function(){
    let pokemonList = [];

    function add(pokemon){
        pokemonList.push(pokemon);
    }

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
