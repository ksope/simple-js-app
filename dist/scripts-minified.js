let pokemonRepository = (function () {
    let t = [],
        e = document.querySelector("#modalBody");
    function n(e) {
        e
            ? Array.isArray(e)
                ? console.log("pokemon is an array, not an object!")
                : "object" == typeof e
                ? "name" === Object.keys(e)[0] &&
                  (t.push(e), console.log("New pokemon added!"))
                : "object" != typeof e &&
                  console.log(
                      "pokemon has a value, but it is not an object, pokemon is a",
                      typeof e,
                      "."
                  )
            : console.log("pokemon is undefined!");
    }
    function o(t) {
        return fetch(t.detailsUrl)
            .then(function (t) {
                return t.json();
            })
            .then(function (e) {
                (t.imageUrl = e.sprites.front_default),
                    (t.height = e.height),
                    (t.types = e.types);
            })
            .catch(function (t) {
                console.error(t);
            });
    }
    function i(t) {
        o(t).then(function () {
            var e, n, o;
            let i, a, l;
            (e = t.name),
                (n = t.height),
                (o = t.imageUrl),
                (i = $(".modal-body")),
                $(".modal-title").empty(),
                i.empty(),
                $("#exampleModalLabel").text(e),
                (a = $("<img>")),
                a.attr("src", o),
                a.attr("width", "50%"),
                a.attr("height", "228"),
                a.attr("alt", e),
                (l = $("<p>Height : " + n + "</p>")),
                i.append(a),
                i.append(l);
        });
    }
    function a() {
        return t;
    }
    return (
        window.addEventListener("keydown", (t) => {
            "Escape" === t.key &&
                e.classList.contains("is-visible") &&
                hideModal();
        }),
        e.addEventListener("click", (t) => {
            t.target === e && hideModal();
        }),
        {
            add: n,
            getAll: a,
            addListItem: function t(e) {
                let n = document.querySelector(".pokemon-list"),
                    o = document.createElement("li");
                o.classList.add("group-list-item", "list-group-item-action");
                let a = document.createElement("button");
                (a.innerText = e.name),
                    a.classList.add("btn", "btn-primary"),
                    a.setAttribute("type", "button"),
                    a.setAttribute("data-toggle", "modal"),
                    a.setAttribute("data-target", "#exampleModal"),
                    o.classList.add("col-sm-6", "col-lg-4", "col-xl-2"),
                    o.appendChild(a),
                    n.appendChild(o),
                    a.addEventListener("click", function (t) {
                        i(e);
                    });
            },
            loadList: function t() {
                return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
                    .then(function (t) {
                        return t.json();
                    })
                    .then(function (t) {
                        t.results.forEach(function (t) {
                            let e = { name: t.name, detailsUrl: t.url };
                            n(e), console.log(e);
                        });
                    })
                    .catch(function (t) {
                        console.error(t);
                    });
            },
            loadDetails: o,
            showDetails: i,
        }
    );
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (t) {
        pokemonRepository.addListItem(t);
    });
});
