import { useState, useEffect } from "react"
import axios from "axios"
import HomeImage from "../assets/home-img.svg";
import ContentImage from "../assets/content-img.svg";
import errorImg from "../assets/noimage.webp";
import { Link, useHistory} from "react-router-dom"
import { Carousel } from 'antd';
import { GameContext } from "../Context/GameContext";


const HomePage = () => {
    const url = "https://super-bootcamp-backend.sanbersy.com/api"

    const [movie,setMovie] = useState([])
    const [games,setGames] = useState([])
    const [movieId,setMovieID] = useState([])
    const [gameId,setGameID] = useState([])
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
                    axios.get(`${url}/movies/160`).then((res) => {
                        let { data } = res
                        setMovieID(data)
                    })
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
    
   
    const contentStyle = {
        height: '558px',
        width:'100%',
        color: '#fff',
        margin:'auto',
        padding:"100px",
        // lineHeight: '1600px',
        textAlign: 'center',
        background: '#06283d',
      };

    //   const content2 = {
    //     display: 'flex',
    //     justify-content:' space-between',
    //     padding: '0 170px',
    //     align-items: 'center',
    //     height: '500px',
    //     background-color: 'whitesmoke',
    //   }

    return (
        <>
        <Carousel autoplay>
            <div>
            <img src={HomeImage} style={contentStyle}/>
            </div>
            <div>
                <div style={{padding: '100px 100px 0 100px',marginBottom:'100px'}}>
                    <div style={{display: 'flex',
                                justifyContent:'space-between',
                                padding:'170px',
                                alignItems:'center',
                                height:'100px',
                                borderRadius:'10px',
                                background: 'rgb(6,40,61)',
                                background: 'linear-gradient(260deg, rgba(6,40,61,1) 13%, rgba(19,99,223,1) 100%)' 
                                }}>
                        <img src={movieId.image_url} alt="alwiros content" width="300" height="400" style={{borderRadius:'20px', objectFit:'cover',boxShadow : 'rgb(38, 57, 77) 0px 20px 30px -10px',}}/>
                        <div style={{borderStyle:'ridge',padding:'40px', borderColor:'whitesmoke'}}>
                        <h3 style={{color:'whitesmoke'}}><strong>Tonton</strong>, Film Terkini <br/>Berbagai Genre Kesukaan Anda<br/>dan Keluarg</h3>
                        </div>   
                    </div>
                </div>
            </div>
        </Carousel>
        <div className="titleMain">
        
            
            <div className="content-disclaimer">
                <div className="content">
                    <div className="main-content">
                        <div className="paragraph">
                        <h3><strong>Nikmatilah</strong>, akhir pekan anda <br/>bersama keluarga dengan menonton <br/>film dan bermain game kesukaan keluarga</h3>
                        </div>
                       
                        <img src={ContentImage} alt="alwiros content" width="400" height="400"/>
                    </div>

                </div>
            </div>
            
            <div className="title-header" style={{marginBottom:"80px"}}>
                <h1>Daftar Movie </h1>
            </div>
        </div>

        <div className="container">
            {movie.map((item, index)=>{
                return(
                    <Link to={`movies-detail/${item.id}`} key={index}>
                    <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front"  >
    
                        {/* <img src={item.image_url} alt="" onerror={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src="https://hgk28y.csb.app/empty-product-image.svg";
                                                                }}/> */}
                        
                        {/* <img src={item.image_url} alt="" onerror="this.onerror=null;this.src='https://hgk28y.csb.app/empty-product-image.svg';"/> */}

                    <img src={item.image_url} alt="" onerror={(e)=>{e.target.onerror = null; e.target.src="https://hgk28y.csb.app/empty-product-image.svg"}}/>
                        {/* <script>
                        {
                            window.handleImgError = function handleImgError(e, where) {

                                e.target.onerror = null;
                                Array.from(e.target.parentNode.children).forEach(element => {
                                  element.srcset = "https://hgk28y.csb.app/empty-product-image.svg"
                                })
                                e.target.src = "https://hgk28y.csb.app/empty-product-image.svg"
                              }}
                        </script> */}
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
        
            <div>
            <div style={{padding: '220px 100px 0 100px',marginBottom:'250px'}}>
                    <div style={{display: 'flex',
                                justifyContent:'space-between',
                                padding:'170px',
                                alignItems:'center',
                                height:'100px',
                                borderRadius:'10px',
                                background: 'rgb(6,40,61)',
                                background: 'linear-gradient(260deg, rgba(6,40,61,1) 13%, rgba(19,99,223,1) 100%)' 
                                }}>
                        <div style={{borderStyle:'ridge',padding:'40px', borderColor:'whitesmoke'}}>
                        <h3 style={{color:'whitesmoke'}}><strong>Mainkan</strong>, Game Terbaru <br/>Berbagai Genre Kesukaan Anda<br/>dan Keluarg</h3>
                        </div>
                        <img src={gameId.image_url} alt="alwiros content" width="300" height="400" style={{borderRadius:'20px', objectFit:'cover',boxShadow : 'rgb(38, 57, 77) 0px 20px 30px -10px',}}/>   
                    </div>
                </div>
            </div>
        <div className="title-header" style={{marginBottom:"80px"}}>
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


export default HomePage
