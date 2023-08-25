const input = document.getElementById('input__pokemon')

const cargarPokemon = async () =>{
 
    const valorDeInput = input.value;
  
    try{
    const responde = await fetch(`https://pokeapi.co/api/v2/pokemon/${valorDeInput}`);

    
    const partes = responde.url.split('/');

    const ultimoFramento = partes[partes.length - 1];

    if(ultimoFramento === ''){

        if(responde.status === 200){
            const date = await responde.json();
        
            let pokemons = '';
    
            date.results.forEach((pokemon,index) => {
               
                pokemons += `
                <div class="container-pokemon">
                    <div class="id-pokemon"><span>ID</span><span>#${(index+1).toString().padStart(3,0)}</span></div>
                    <img class='pokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg">
                    <h3 class="color-text">${pokemon.name}</h3>
                </div>`
               
            });
           
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
            pokemons += `<div class="container-pokemon solo">
            <div class="id-pokemon"><span>ID</span><span>#${(date.id).toString().padStart(3,0)}</span></div>
            <img class='pokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${date.id}.svg">
            <h3 class="color-text">${date.name}</h3>
        </div>`

        console.log(date)
            document.getElementById('container').innerHTML = pokemons;
        })
}
    
    

    }catch(error){
        console.error(error)
    } 
}

const boton = document.getElementById('miBoton');

boton.addEventListener('click', cargarPokemon);
