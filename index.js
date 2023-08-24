const cargarPokemon = async () =>{
    try{
    const responde = await fetch('https://pokeapi.co/api/v2/pokemon/')

    if(responde.status === 200){
        const date = await responde.json();
        console.log(date)
        let pokemons = '';

        date.results.forEach((pokemon,index) => {
           
            pokemons += `
            <div class="container-pokemon">
                <div class="id-pokemon"><span>ID</span><span>#${(index+1).toString().padStart(3,0)}</span></div>
                <img class='pokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg">
                <h3 class="color-text">${pokemon.name}</h3>
            </div>`
            console.log((index+1).toString().padStart(3,0))
        });
       
        document.getElementById('container').innerHTML = pokemons;

    }else if(responde.status === 401){
        console.log("Error no existe.")
    }else if(responde.status === 404){
        console.log("Pokemon no Existe!}.")
    }else{
        console.error("Error Unplanned !! ")
    }


    }catch(error){
        console.error(error)
    } 
}


cargarPokemon();