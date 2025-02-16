import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../Auth/UserContext"
import { logout } from "../Utils/funtions"
import { Button} from "antd"


const MovieForm = () => {
    let {id} = useParams()
    let history = useHistory()
    const url = "https://super-bootcamp-backend.sanbersy.com/api"
    let moviesObj={
        title: "",
        description: "",
        year: 0,
        genre:"",
        rating:0,
        image_url:"",
    }
    const [input, setInput] = useState(moviesObj)
    const [currendId,setCurrentId] = useState(null)
    // const [user, setUser] = useContext(UserContext)
    const {
        userState:[user, setUser],
      } = useContext(UserContext)
    const [confirmLoading, setConfirmLoading] = useState(false)

    useEffect(()=>{
        const fecthData = async () => {
            let result = await axios.get(`${url}/movies/${id}`)
            let currentMovies = result.data
            // console.log(currentMovies);
            setCurrentId(id)
            setInput(
            {
                title:currentMovies.title,
                description:currentMovies.description,
                year:currentMovies.year,
                genre:currentMovies.genre,
                rating:currentMovies.rating,
                image_url:currentMovies.image_url,
                
            }
        )
        }
        if (id){
            console.log(id);
            fecthData()
        }

        
    },[id])

    const handleSubmit = (event)=>{
        event.preventDefault()
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            if (confirmLoading === false) {
                if (currendId === null) {
                    axios.post(`${url}/movies`,{
                            title:input.title,
                            description:input.description, 
                            year:input.year,
                            genre:input.genre,
                            rating:input.rating,
                            image_url:input.image_url}
                            ,{headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                        let data = res.data
                        console.log(data);
                        history.push("/movie-list")
                    }).catch((err) => {
                        console.log(err);
                        const {status} = err.response.data
                        if (status === "Token is Invalid" || status === "Token is Expired") {
                            
                            logout({setUser, status: "expired"})
                        }
                    } )
                    
                } else {
                    axios.put(`${url}/movies/${currendId}`,{
                            title:input.title,
                            description:input.description, 
                            year:input.year,
                            genre:input.genre,
                            rating:input.rating,
                            image_url:input.image_url,}, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                        let data = res.data 
                        console.log(data);
                        history.push("/movie-list")
                    }).catch((err)=>{
                        console.log(err.response.data);
                        const {status} = err.response.data
                        if (status === "Token is Invalid" || status === "Token is Expired") {
                            
                            logout({setUser, status: "expired"})
                        }
                    })
                }
            }
        }, 2000);

        setCurrentId(null)
        setInput(moviesObj)
        // setShowForm(false)
    }
    const handleChange = (event) => {
        let value = event.target.value
        let title = event.target.name
        console.log(title);
        setInput({
            ...input,
            [title]:value
        })
    }


    const handleBack = ()=>{
        history.push("/movie-list") //untuk berpindah ke form
    }
    const dates = new Date()
    let tahun = dates.getFullYear
    return(
        
            <>  
                <div className="title-form">
                    <h1>{id === undefined ? `Input Movie Baru` :`Form Edit ${input.title}`}</h1>
                </div>
                <div className="form-area">
                <div className="custom-form">
                    <form onSubmit={handleSubmit}>
                        <div className="custom-input">
                            <label htmlFor="name">Judul</label>
                            <input required autoComplete="off" type="text" name="title" value={input.title} onChange={handleChange} placeholder="Masukkan Judul Film ...."/>
                        </div>
                        <div className="custom-input">
                            <label htmlFor="name">Descripsi</label>
                            <input required autoComplete="off" type="text" name="description" value={input.description} onChange={handleChange} placeholder="Masukkan Deskripsi ...."/>
                        </div>
                        <div className="custom-input">
                            <label htmlFor="name">Genre</label>
                            <input required autoComplete="off" type="text" name="genre" value={input.genre} onChange={handleChange} placeholder="Masukkan Genre ...."/>
                        </div>
                        <div className="custom-input">
                            <label htmlFor="name">Rating</label>
                            <input required autoComplete="off" min={1} max={10} type="number" name="rating" value={input.rating} onChange={handleChange} placeholder="Masukkan Rating .."/>
                        </div>
                        <div className="custom-input">
                            <label htmlFor="name">Rilis</label>
                            <input required autoComplete="off" min={1999} max={tahun} type="number" name="year" value={input.year} onChange={handleChange} placeholder="Masukkan Tahun Rilis .."/>
                        </div>
                        <div className="custom-input">
                            <label htmlFor="name">ImageUrl</label>
                            <input required autoComplete="off"  type="text" name="image_url" value={input.image_url} onChange={handleChange} placeholder="Masukkan Link Image .."/>
                        </div>
                        {/* <input type="submit" value="Submit"/> */}
                        <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{ background: "#06283D", height:50, borderRadius:'7px', margin:'10px 0'}}>
                            Submit
                        </Button>
                        <Button onClick={handleBack} type="danger" block htmlType="submit" style={{ height:50, borderRadius:'7px', margin:'10px 0'}}>
                            Cancel
                        </Button>
                        {/* <button className="button-cancel" onClick={handleBack}>Back</button> */}
                    </form>
                </div>
                </div>
                
            </>

                
    )
}

export default MovieForm