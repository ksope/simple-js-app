//create a list of Pokemons in an IIFE to avoid accidentally accessing the global state
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let modalContainer = document.querySelector("#modalBody");
    let $ = window.$;

    //add a new pokemon to the pokemonList
    function add(pokemon) {
        if (!pokemon) {
            console.log("pokemon is undefined!");
        } else if (Array.isArray(pokemon)) {
            console.log("pokemon is an array, not an object!");
        }
        //check if pokemon is an object
        else if (typeof pokemon === "object") {
            if (Object.keys(pokemon)[0] === "name") {
                pokemonList.push(pokemon);
                console.log("New pokemon added!");
            }
        }
        //if pokemon is not an object, display it's datatype
        else if (typeof pokemon !== "object") {
            console.log(
                "pokemon has a value, but it is not an object, pokemon is a",
                typeof pokemon,
                "."
            );
        }
    }

    //add a pokemon to the pokemon list using DOM
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("group-list-item", "list-group-item-action");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn", "btn-success");
        button.setAttribute("type", "button");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#exampleModal");
        listItem.classList.add("col-sm-6", "col-lg-4", "col-xl-2");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }
    //Load list of pokemon
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    //load details of pokemons
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                item["imageUrl"] = details.sprites.front_default;
                item["height"] = details.height;
                item["types"] = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    //print out details of Pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        });
    }

    //return all the pokemon objects in the pokemonList
    function getAll() {
        return pokemonList;
    }

    function showModal(title, text, imageUrl) {
        // Clear all existing modal content
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty();

        //display the title of the modal
        $("#exampleModalLabel").text(title);

        //set the attributes for the image of each pokemon
        let pokemonImage = $("<img>");
        pokemonImage.attr("src", imageUrl);
        pokemonImage.attr("width", "50%");
        pokemonImage.attr("height", "228");
        pokemonImage.attr("alt", title);

        //display the height of each pokemon
        let pokemonHeight = $("<p>" + "Height : " + text + "</p>");

        //Append the pokemon imae and height to the modal
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
    }

    // This function displays a list of pokemons based on the text entered in the search input.
    function searchPokemon() {
        let searchText = document
            .getElementById("search-input")
            .value.toLowerCase();
        let pokemonListItem = document.querySelectorAll(".group-list-item");

        pokemonListItem.forEach(function (pokemon) {
            let pokemonName = pokemon
                .querySelector(".btn")
                .innerText.toLowerCase();

            if (pokemonName.includes(searchText)) {
                pokemon.style.display = "block";
            } else {
                pokemon.style.display = "none";
            }
        });
    }

    // Attach an event listener to the search input element to filter list of pokemons based on input.
    let searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function () {
        searchPokemon();
    });

    //remove the modal when Escape key is pressed
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            modalContainer.classList.contains("is-visible")
        ) {
            hideModal();
        }
    });

    modalContainer.addEventListener("click", (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

//select the unordered list in the DOM tree using it's class name

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!

    //print out each pokemon in the list using DOM
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
