import './Pokemon.css'

function Pokemon({name, image}){
   return (
    <div className='pokemon'>
        <div className='name-pokemon'>{name}</div>
        <div>
           <img className='pokemon-image' src={image} alt="" />
        </div>
    </div>
   )
}

export default Pokemon;