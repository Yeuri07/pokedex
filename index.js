
const contenedor = document.querySelector(".flex-container");

function crearPokemon(nombre,clase,habilidad){
 
    img = `<img class='pokemon' src='pokeon_imagen.png'>`;
    nombre = `<h2 class='color-text'>${nombre}</h2>`;
    clase = `<h3><b>${clase}</b></h3>`;
    habilidad = `<p>habilidad: <b>$${habilidad}</b></p>`;

    return [img,nombre,clase,habilidad]
}

let documentFragment = document.createDocumentFragment();

for(var i =1; i<=10; i++){
    let claseRandom = Math.round(Math.random()*10000);
    let habilidadRandom = Math.round(Math.random()*10+50);
    let pokemon = crearPokemon(`pokemon ${i}`,`clase: ${claseRandom}`,habilidadRandom)
    let div = document.createElement("DIV");
    div.addEventListener("click",()=>{
        document.querySelector(".key-data").value = claseRandom
    })
    div.tabIndex = i;
    div.classList.add(`item-${i}`,'flex-item');
    div.innerHTML = pokemon.join(" ")
    documentFragment.appendChild(div)

}

contenedor.appendChild(documentFragment)

