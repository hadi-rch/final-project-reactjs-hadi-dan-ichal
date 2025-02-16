import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useHistory} from "react-router-dom"


const GameList = () => {
    const url = "https://super-bootcamp-backend.sanbersy.com/api"

    const [games,setGames] = useState([])
    const [gameId,setGameID] = useState([])
    const [fetchTrigger, setFetchTrigger] = useState(true)
    let history = useHistory()
    
    useEffect(()=>{
        const fecthData = async () => {
           
                let resultGame = await axios.get(`${url}/games`) 
                let dataGame = resultGame.data
                setGames(dataGame.map((itemGame) =>{
                    return {
                        id: itemGame.id,
                        genre: itemGame.genre,
                        image_url: itemGame.image_url,
                        name: itemGame.name,
                        platform: itemGame.platform, 
                        release: itemGame.release,                     
                        }}
                    ))


                    //Fetch By ID
                    axios.get(`${url}/games/34`).then((res) => {
                        let { data } = res
                        setGameID(data)
                    })           
            }

            setFetchTrigger(false)
        if (fetchTrigger) {
            fecthData()    
        }
    },[fetchTrigger])

    return (
        <>
        <div className="title-header" style={{marginBottom:"30px",marginTop:"30px"}}>
                <h1>Daftar Games </h1>
        </div>
        <div className="container">
            {games.map((item, index)=>{
                return(
                    <Link to={`games-detail/${item.id}`} key={index}>
                    <div class="flip-card" >
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                      <img src={item.image_url}  alt="movie-image"/>
                      </div>
                      <div class="flip-card-back">
                        <h1>{item.name}</h1>
                        <p>- {item.genre} -</p>
                        <p>{item.platform}</p>
                      </div>
                    </div>
                  </div>
                  </Link> 
                )
            })}
        </div>


            


        </>
    )
}


export default GameList
