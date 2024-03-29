import { useState } from "react";
import { useEffect } from "react"
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css';

function PokemonList() {
  // const [x,setX]=useState(0);
  // const [y,setY]=useState(0);
    
    // const [pokemonList,setPokemonList]=useState([]);
    // const [isLoading,setIsLoading]=useState(true);
    // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl, setNextUrl]=useState('');
    // const [prevUrl, setPrevUrl]=useState('');

    const [pokemonListState, setPokemonListState]=useState({
      pokemonList:[],
      isLoading:true,
      pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
      nextUrl:'',
      prevUrl:''
    })

   async function downloadPokemons(){
        // setIsLoading(true);
        setPrevUrl({...pokemonListState,isLoading:true});
        const response=await axios.get(pokemonListState.pokedexUrl); //this downloads list of 20 pokemons
        const pokemonResults=response.data.results; //we get the array of pokemons from result
         
        setPokemonListState((state)=>({
          ...state,
          nextUrl:response.data.next,
          prevUrl:response.data.previous
        }));

        //  setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);

        //iterating over the array of pokemons, and using their url, to create an array of promises
        //that will download those 20 pokemons
        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));

        //passing that promise array to axios.all
        const pokemonData=await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data

        // console.log(pokemonData);

        //now iterate on the data of each pokemon, and extract id, name, image, types
        const res=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types
            }
        })

        setPokemonListState((state)=>({
          ...state,
          pokemonList:res,
          isLoading:false
        }))

        setIsLoading(false);
        
   }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);

   

  return (
    <div className="pokemonlist-wrapper">
           <div>
                <div>pokemon List</div>
                <div className="pokemon-wrapper">
                  {(isLoading) ? 'Loading...': pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}></Pokemon>)}
                </div>
           </div>
           
       
        <div className="controls">
           <button disabled={pokemonListState.prevUrl==null} onClick={()=>{
            const urlToSet=pokemonListState.prevUrl;
             setPokemonListState({...pokemonListState, pokedexUrl:urlToSet})
           }}>Prev</button>
           <button disabled={pokemonListState.nextUrl==null} onClick={()=>{
            const urlToSet=pokemonListState.nextUrl;
           setPokemonListState({...pokemonListState, pokedexUrl:urlToSet})
           }}>Next</button>
        </div>
    </div>
  )
}

export default PokemonList