//create a list of Pokemons



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
        getAll: getAll
    };

})();
//add some Pokemons to the list
pokemonList.push({name: "Bulbasaur", height: 7, types: ['grass', 'poison']});
pokemonList.push({name: "Ivysaur", height: 10, types: ['grass', 'poison']});
pokemonList.push({name: "Venusaur", height: 20, types: ['grass', 'poison']});
pokemonList.push({name: "Caterpie", height: 3, types: ['bug', 'electric']});
pokemonList.push({name: "Wartortle", height: 10, types: ['dark', 'steel']});

//print out each pokemon in the list 
pokemonList.forEach(function(pokemon){
    pokemon.height > 10? document.write(pokemon.name + " (height: " + pokemon.height + ") " + "- Wow, that's big!<br>"): document.write(pokemon.name + " (height: " + pokemon.height + ")<br>");
});
