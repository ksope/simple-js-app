//create a list of Pokemons in an IIFE to avoid accidentally accessing the global state
let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

                if (Object.keys(pokemon)[0] === "name" ){
                    pokemonList.push(pokemon);
                    console.log("New pokemon added!")
                }
            
        }
        //if pokemon is not an object, display it's datatype
        else if (typeof pokemon !== 'object'){
            console.log('pokemon has a value, but it is not an object, pokemon is a', typeof pokemon, '.')
        }
    }

    //add a pokemon to the pokemon list using DOM
    function addListItem(pokemon){
        //select the unordered list in the DOM tree using it's class name
        let tempPokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-style');
        listItem.appendChild(button);
        tempPokemonList.appendChild(listItem);
        addButtonEvent(button, pokemon);

    }
    //Load list of pokemon
    function loadList(){
        return fetch(apiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
            });
          }).catch(function (e) {
            console.error(e);
          })
    }

    //load details of pokemons
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }


    //Add click event to a button
    function addButtonEvent(element, pokemon){
        element.addEventListener('click', function(){
            showDetails(pokemon);
        });

    }

    //print out details of Pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }

 

    //return all the pokemon objects in the pokemonList
    function getAll(){
        return pokemonList;
    }


    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
     };


})();







pokemonRepository.loadList().then(function() {
    // Now the data is loaded!

    //print out each pokemon in the list using DOM
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });