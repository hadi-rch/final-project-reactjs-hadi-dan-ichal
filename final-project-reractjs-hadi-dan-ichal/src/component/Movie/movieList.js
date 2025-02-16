import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useHistory} from "react-router-dom"


const MovieJust = () => {
    const url = "https://super-bootcamp-backend.sanbersy.com/api"

    const [movie,setMovie] = useState([])
    const [movieId,setMovieID] = useState([])
    const [fetchTrigger, setFetchTrigger] = useState(true)
    let history = useHistory()
    
    useEffect(()=>{
        const fecthData = async () => {
           
            let resultMovie = await axios.get(`${url}/movies`) 
            let dataMovie = resultMovie.data
            setMovie(dataMovie.map((itemMovie) =>{
                return {
                    id: itemMovie.id,
                    title: itemMovie.title,
                    year: itemMovie.year, 
                    image_url: itemMovie.image_url,
                    genre: itemMovie.genre,
                    description: itemMovie.description,
                    duration: itemMovie.duration,
                    rating: itemMovie.rating,
                    review: itemMovie.review
                    }}
                ))
                    //Fetch By ID
                    axios.get(`${url}/movies/160`).then((res) => {
                        let { data } = res
                        setMovieID(data)
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
                <h1>Daftar Movie </h1>
        </div>
        <div className="container">
            {movie.map((item, index)=>{
                return(
                    <Link to={`movies-detail/${item.id}`} key={index}>
                    <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front"  >
                        <img src={item.image_url} alt="movie-image"/>
                      </div>
                      <div class="flip-card-back">
                        <h1>{item.title}</h1>
                        <p>- {item.genre} -</p>
                        <p>{item.description}</p>
                        <p> </p>
                        <p><strong>Review</strong></p>
                        <p>" {item.review} "</p>
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


export default MovieJust
