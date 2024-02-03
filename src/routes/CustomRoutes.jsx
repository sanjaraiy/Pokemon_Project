import {Routes,Route} from "react-router-dom"
import Pokedex from "../Components/Pokedex/Pokedex";
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails";
import Pokemon from "../Components/Pokemon/Pokemon";
export default function CustomRoutes(){
  return (
    <Routes>
        <Route path="/" element={<Pokedex></Pokedex>}></Route>
        <Route path="/pokemon/:id" element={<PokemonDetails></PokemonDetails>}></Route>
    </Routes>
  );
}