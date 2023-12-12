const input = document.getElementById('input__pokemon');
const botonesTypes = document.querySelectorAll('.btn-header');

const cargarPokemon = async () =>{
 
    const valorDeInput = input.value;
  
    try{

    const responde = await fetch(`https://pokeapi.co/api/v2/pokemon/${valorDeInput}`);
    const partes = responde.url.split('/');
    let result;
    const ultimoFramento = partes[partes.length - 1];

    if(ultimoFramento === ''){

        if(responde.status === 200){
            let pokemons = '';
       
            for(let i = 1; i <= 50; i++){
                result = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const date = await result.json();
                let tipos = typesPoke(date);
                pokemons += `<div class="container-pokemon">
                <div class="id-pokemon"><span>ID</span><span>#${(date.id).toString().padStart(3,0)}</span></div>
                <img class='pokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${date.id}.svg">
                <div class="pokemon-tipos">${tipos}</div>
                <h3 class="color-text">${date.name}</h3>
                </div>`
               
            }
         
            document.getElementById('container').innerHTML = pokemons;
    
        }else if(responde.status === 401){
            console.log("Error no existe.")
        }else if(responde.status === 404){
            console.log("Pokemon no Existe!}.")
        }else{
            console.error("Error Unplanned !! ")
        }
    
    } else {

        let pokemons = '';
      
        fetch(responde.url)
       
        .then((responde) => responde.json())
        .then((date) =>{
        
            let tipos = typesPoke(date);
       
            pokemons += `<div class="container-pokemon solo">
            <div class="id-pokemon"><span>ID</span><span>#${(date.id).toString().padStart(3,0)}</span></div>
            <img class='pokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${date.id}.svg">
            <div class="pokemon-tipos">${tipos}</div>
            <h3 class="color-text">${date.name}</h3>
            
        </div>`
   
            document.getElementById('container').innerHTML = pokemons;
        })
     
    }

    }catch(error){
        console.error(error)
    } 
}

function typesPoke(poke){

let tipos = poke.types.map((type) =>
  `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    tipos = tipos.join('');

    return tipos;
}

const boton = document.getElementById('miBoton');

boton.addEventListener('click', cargarPokemon);

cargarPokemon();

botonesTypes.forEach(button => button.addEventListener("click",(e)=>{
    const buttonId = e.currentTarget.id;
    
    document.getElementById('container').innerHTML = '';
    let pokemons = '';

    for(let i = 1; i<= 649; i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    
        .then((responde) => responde.json())
        .then((date) =>{
        
           const detail = date.types.map(type => type.type.name);
            
           if(detail.some(tipo => tipo.includes(buttonId))){
            let tipos = typesPoke(date);
            pokemons += `<div class="container-pokemon">
            <div class="id-pokemon"><span>ID</span><span>#${(date.id).toString().padStart(3,0)}</span></div>
            <img class='pokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${date.id}.svg">
            <div class="pokemon-tipos">${tipos}</div>
            <h3 class="color-text">${date.name}</h3>
            
        </div>`
       
        document.getElementById('container').innerHTML = pokemons;
           }
          
        })
    }
    if(buttonId === 'ver-todos'){
        cargarPokemon();
    }
}))