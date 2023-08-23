
function fetchPokemon(id){

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(res => res.json())
.then(response =>{
    console.log(response)
   
const contenedor = document.querySelector(".flex-container");

function crearPokemon(nombre,id,habilidad){
 
    id = `<div class='color-text id-pokemon'>
    <span>ID</span>
    <h3 ><b>#${response.id.toString().padStart(3,0)}</b></h3>
    
    </div>`;
    img = `<img class='pokemon' src='${response.sprites.other.dream_world.front_default}'>`;
    nombre = `<h2 class='color-text'>${response.name}</h2>`;
    habilidad = `<p>habilidad: <b>$${habilidad}</b></p>`;

    return [id,img,nombre,habilidad]
}

let documentFragment = document.createDocumentFragment();

    let pokemon = crearPokemon(`pokemon`)
    let div = document.createElement("DIV");
    div.classList.add("container-pokemon");
    div.innerHTML = pokemon.join(" ")
    documentFragment.appendChild(div)
    
contenedor.appendChild(documentFragment)

}).catch(e => console.error(new Error(e)));

}
function fetchPokemons(){
    for(let i = 1; i<= 16; i++){
        fetchPokemon(i)
    }
}

fetchPokemons()
