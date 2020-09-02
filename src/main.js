import * as DataFunctions from './data.js';
import data from './data/pokemon/pokemon.js';

const pokemonDataConst = data.pokemon;
let pokemonData = pokemonDataConst.slice();

// llamamos a "home", que es el espacio donde se mostrará toda la data
const home = document.getElementById("home-index");
const countBox = document.querySelector(".sortBy span");
const btnHome = document.getElementById("btn-home-phone");
const btnInicio = document.getElementById("btn-home-pc");
const btnFilterPc = document.getElementById("btn-type-pc");
const btnFilterPhone = document.getElementById("btn-type-phone");
const btnSortByNumber = document.getElementById("btn-sort-number");
const btnSortByLetter = document.getElementById("btn-sort-letter");
const nameType= document.getElementById("type-name");
const boxType = document.getElementById("type-box");
const searchBar = document.getElementById("search");


//CONTEO DE ARRAYS
function countData(data) {
    countBox.innerHTML = `${data.length} of 251 pokémons`;
}

//función que muestra los pokemones
function showData(data) {
    //Convertir a string "pokemonTemplate"
    home.innerHTML = `${data.map(pokemonTemplate).join('')}`;
    countData(data);
    //Tarjeta del pokémon a la que luego se le hará clic.
    const pokemonCard = document.querySelectorAll(".pokemon-card");
    pokemonCard.forEach((i) => i.addEventListener('click', (e) => showMoreData(e)));
}

//ShowData ejecuta la función al cargar la página. Para mostrar los pk con la data original
showData(pokemonDataConst);

function typesList(type) {
    return `
        <ul class="poke-types">
            ${type.map((type) => {
        return `<li class="poke-list">${type}</li>`;
                }).join('')}
        </ul>
        `;
}

function attackList(pokemon) {
    return `
        <ul class="poke-types" >
            ${pokemon.map((attack) => {
        return `<li class="poke-list">${attack.name}</li>`;
                }).join('')}
        </ul>
        `;
}

function evolutionList(pokemon) {
    if (pokemon.egg !== "not in eggs") {
        return `
        <ul class="poke-types" >
            <li class="poke-list">${pokemon.egg}</li>
        </ul>
        `;
    }
    else {
        return `  `;
    }
}

function prevEvolution(pokemon) {

    if (pokemon.evolution["prev-evolution"] !== undefined) {
        const prevevolution = pokemon.evolution["prev-evolution"];
        const numevolution = prevevolution[0].num;
        const nameevolution = prevevolution[0].name;
        const candycost = prevevolution["candy-cost"];

        if (pokemon.evolution["prev-evolution"][0]["prev-evolution"] !== undefined) {
            const prevevolution2 = pokemon.evolution["prev-evolution"][0]["prev-evolution"];
            const numevolution2 = prevevolution2[0].num;
            const nameevolution2 = prevevolution2[0].name;
            const candycost2 = prevevolution2[0]["candy-cost"];

            return `
            <div class="evolution-card">
                <ul class="poke-types">
                    <li>${numevolution} </li>
                    <li>${nameevolution} </li>
                    <li>${candycost} candies </li>
                </ul>
            </div>
            <div class="evolution-card">
                <ul class="poke-types">
                    <li>${numevolution2} </li>
                    <li>${nameevolution2} </li>
                    <li>${candycost2} candies </li>
                </ul>
            </div>
            `;
        }

        return `
    <div class="evolution-card">
        <ul class="poke-types">
            <li>${numevolution} </li>
            <li>${nameevolution} </li>
            <li>${candycost} candies </li>
        </ul>
    </div>

    `;
    }

    else {
        return ` `;
    }

}

function nextEvolution(pokemon) {

    if (pokemon.evolution["next-evolution"] !== undefined) {
        const nextevolution = pokemon.evolution["next-evolution"];
        const numevolution = nextevolution[0].num;
        const nameevolution = nextevolution[0].name;
        const candycost = nextevolution[0]["candy-cost"];


        if (pokemon.evolution["next-evolution"][0]["next-evolution"] !== undefined) {
            const nextevolution2 = pokemon.evolution["next-evolution"][0]["next-evolution"];
            const numevolution2 = nextevolution2[0].num;
            const nameevolution2 = nextevolution2[0].name;
            const candycost2 = nextevolution2[0]["candy-cost"];

            return `
                <div class="evolution-card">
                    <ul class="poke-types">
                        <li>${numevolution} </li>
                        <li>${nameevolution} </li>             
                        <li>${candycost} candies </li>
                    </ul>
                </div>
                <div class="evolution-card">
                    <ul class="poke-types">
                        <li>${numevolution2} </li>
                        <li>${nameevolution2} </li>
                        <li>${candycost2} candies </li>
                    </ul>
                </div>
                `;
        }

    return `
            <div class="evolution-card">
                <ul class="poke-types">
                    <li>${numevolution} </li>
                    <li>${nameevolution} </li>
                    <li>${candycost} candies </li>
                </ul>
            </div>
                `;
    }

    else {
        return ``;
    }
}

function pokemonTemplate(pokemon) {

    return `
        <div class="pokemon-card" id="pokemon-card">
            <p>${pokemon.num}</p>
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img class="pokemon-img" src="${pokemon.img}">
            ${typesList(pokemon.type)}
        </div>

        <div class="pokemon-card-modal hidden">
            <h3>Resistant</h3>
            ${typesList(pokemon.resistant)}
            <h3>Weaknesses</h3>
            ${typesList(pokemon.weaknesses)}
            <h3>Special attacks</h3>   
            ${attackList(pokemon["special-attack"])}
            <h3>Quick moves</h3>   
            ${attackList(pokemon["quick-move"])}
                <div class="evolution"><label>Evolution</label>
                    ${evolutionList(pokemon)}
                    
                        <ul class="poke-types">
                            <li class="poke-list"> ${pokemon["buddy-distance-km"]} eggs</li>
                        </ul>

                    <div class="evolution-container">           
                        ${prevEvolution(pokemon)}
                        ${nextEvolution(pokemon)}     
                    </div>  
                </div>        
        </div> `
}

//BARRA DE NAVEGACIÓN 

//botón HOME
btnHome.addEventListener("click", dataHome);
btnInicio.addEventListener("click", dataHome);

function dataHome(){
    pokemonData = pokemonDataConst;
    showData(pokemonData);
    boxType.style.display = 'none';
}

//FUNCIÓN FILTRAR POR TIPO
document.getElementById("type-phone").addEventListener("click", function (){
    document.querySelector('.modal-content').style.display ='flex';
});

document.getElementById("btn-type-pc").addEventListener("click", function (){
    document.querySelector('.modal-content').style.display ='flex';
});

btnFilterPhone.addEventListener("change", filterData);
btnFilterPc.addEventListener("change", filterData);

function filterData () {
    document.querySelector('.modal-content').style.display ='none';

    pokemonData = pokemonDataConst;
    pokemonData = DataFunctions.filterData(pokemonData, btnFilterPhone.value);
    
    boxType.style.display = 'flex';
    nameType.innerHTML = btnFilterPhone.value.toUpperCase() ;
    showData(pokemonData);
}

//searchBar
searchBar.addEventListener ('keyup', (x) => {
    pokemonData = pokemonDataConst;
    pokemonData = DataFunctions.filterByName(pokemonData, x.target.value);
    showData(pokemonData);
});


                            // SECTION: SORT BY


// sortByNumber
btnSortByNumber.addEventListener("change", sortByNumber);

function sortByNumber() {
    if (btnSortByNumber.value == "ascendingOrder") {
        //Mantener como array
        DataFunctions.sortDataByAscNumber(pokemonData);
        showData(pokemonData);
    }
    else {
        DataFunctions.sortDataByDescNumber(pokemonData);
        showData(pokemonData);
    }
}

// sortByLetter
btnSortByLetter.addEventListener("change", sortByLetter);

function sortByLetter() {
    if (btnSortByLetter.value == "ascendingLetter") {
        DataFunctions.sortDataByLetA(pokemonData);
        showData(pokemonData);
    }
    else {
        DataFunctions.sortDataByLetZ(pokemonData);
        showData(pokemonData);
    }
}


/*      en comentarios hasta seguir probando 
//Filter-menu
document.getElementById("type-phone").addEventListener("click", function () {
    document.querySelector('.modal-content').style.display = 'flex';
});


function filterData() {
    document.querySelector('.modal-content').style.display = 'none';
    pokemonData = pokemonDataConst;
    pokemonData = DataFunctions.filterData(pokemonData, btnFilterPhone.value);
    showData(pokemonData);
} */


//Tarjeta del pokémon a la que luego se le hará clic. Revisar en que momento se puede llamar. window onload.

const closeMoreData = document.getElementById("closeModal");
closeMoreData.addEventListener("click", () => moreDataModal.classList.add("hidden"));

const moreDataModal = document.getElementById("moreDataModal");
const contentMoreDataModal = document.getElementById("contentMoreDataModal");

function showMoreData(e) {

    moreDataModal.classList.remove("hidden");
    moreDataModal.classList.add("moreData");

    contentMoreDataModal.innerHTML = ` ${e.currentTarget.innerHTML} ${e.currentTarget.nextElementSibling.innerHTML} `;
}

