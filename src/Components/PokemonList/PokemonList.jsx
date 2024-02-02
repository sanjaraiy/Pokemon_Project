import { useState } from "react";
import { useEffect } from "react"
import axios from "axios";
import './PokemonList.css';
function PokemonList() {
    
    const [pokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [x,setX]=useState(0);
    const [y,setY]=useState(0);
    
   async function downloadPokemons(){
        const response=await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResults=response.data.results;
        const pokemonResultPromise=pokemonResults.map((pokemon)=axios.get(pokemon.url));
        const pokemonData=await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const res=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                name:pokemon.name,
                image:pokemonData.sprites.other.dream_world.front_default,
                types:pokemon.types
            }
        })
        setIsLoading(false);
   }
    useEffect(()=>{
        downloadPokemons();
    },[]);

   

  return (
    <div className="pokemonlist-wrapper">
       <div>pokemon List</div>
      {(isLoading)? 'Loading...':'Data download'}
    </div>
  )
}

export default PokemonList