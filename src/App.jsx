import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import PokemonList from './Components/PokemonList/PokemonList'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'
function App() {
return (
    <div className='outer-pokedex'>
       {/* <Pokedex></Pokedex>
       <PokemonList></PokemonList> */}
       <h1 id='Pokedex-heading'>
         <Link to="/">Pokedex</Link>
       </h1>
       <CustomRoutes></CustomRoutes>
    </div>
  )
}

export default App
