let pokemonRepository = (function () {
    let t = [],
        e = document.querySelector("#modalBody"),
        n = window.$;
    function o(e) {
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
    function i(t) {
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
    function a(t) {
        i(t).then(function () {
            var e, o, i;
            let a, l, r;
            (e = t.name),
                (o = t.height),
                (i = t.imageUrl),
                (a = n(".modal-body")),
                n(".modal-title").empty(),
                a.empty(),
                n("#exampleModalLabel").text(e),
                (l = n("<img>")),
                l.attr("src", i),
                l.attr("width", "50%"),
                l.attr("height", "228"),
                l.attr("alt", e),
                (r = n("<p>Height : " + o + "</p>")),
                a.append(l),
                a.append(r);
        });
    }
    function l() {
        return t;
    }
    return (
        document
            .getElementById("search-input")
            .addEventListener("input", function () {
                let t;
                (t = document
                    .getElementById("search-input")
                    .value.toLowerCase()),
                    document
                        .querySelectorAll(".group-list-item")
                        .forEach(function (e) {
                            e
                                .querySelector(".btn")
                                .innerText.toLowerCase()
                                .includes(t)
                                ? (e.style.display = "block")
                                : (e.style.display = "none");
                        });
            }),
        window.addEventListener("keydown", (t) => {
            "Escape" === t.key &&
                e.classList.contains("is-visible") &&
                hideModal();
        }),
        e.addEventListener("click", (t) => {
            t.target === e && hideModal();
        }),
        {
            add: o,
            getAll: l,
            addListItem: function t(e) {
                let n = document.querySelector(".pokemon-list"),
                    o = document.createElement("li");
                o.classList.add("group-list-item", "list-group-item-action");
                let i = document.createElement("button");
                (i.innerText = e.name),
                    i.classList.add("btn", "btn-success"),
                    i.setAttribute("type", "button"),
                    i.setAttribute("data-toggle", "modal"),
                    i.setAttribute("data-target", "#exampleModal"),
                    o.classList.add("col-sm-6", "col-lg-4", "col-xl-2"),
                    o.appendChild(i),
                    n.appendChild(o),
                    i.addEventListener("click", function (t) {
                        a(e);
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
                            o(e), console.log(e);
                        });
                    })
                    .catch(function (t) {
                        console.error(t);
                    });
            },
            loadDetails: i,
            showDetails: a,
        }
    );
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (t) {
        pokemonRepository.addListItem(t);
    });
});
