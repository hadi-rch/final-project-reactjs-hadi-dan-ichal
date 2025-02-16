import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../Auth/UserContext"
import { logout } from "../Utils/funtions"
import { Button } from "antd"


const GamesForm = () => {
    let {id} = useParams()
    let history = useHistory()
    const url = "https://super-bootcamp-backend.sanbersy.com/api"
    let gamesObj={
        name: "", 
        platform: "", 
        release: 0, 
        singlePlayer: "", 
        genre: "", 
        multiplayer: "", 
        image_url: "", 
        id: null,
    }
    const [input, setInput] = useState(gamesObj)
    const [currendId,setCurrentId] = useState(null)
    const {
        userState:[user, setUser]
      } = useContext(UserContext)
    const [confirmLoading, setConfirmLoading] = useState(false)

    useEffect(()=>{
        const fecthData = async () => {
            let result = await axios.get(`${url}/games/${id}`)
            let currentGames = result.data
            console.log(currentGames)
            setCurrentId(id)
            setInput(
            {
                id: currentGames.id,
                name: currentGames.name,
                platform: currentGames.platform,
                release: currentGames.release,
                singlePlayer: currentGames.singlePlayer,
                genre: currentGames.genre,
                multiplayer: currentGames.multiplayer,
                image_url: currentGames.image_url                
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
        if (currendId === null) {
            axios.post(`${url}/games`,{
                id: input.id,
                name: input.name,
                platform: input.platform,
                release: input.release,
                singlePlayer: input.singlePlayer,
                genre: input.genre,
                multiplayer: input.multiplayer,
                image_url: input.image_url}
                    ,{headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                let data = res.data
                console.log(data);
                history.push("/game-list")
            }).catch((err) => {
                console.log(err);
                const {status} = err.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    
                    logout({setUser, status: "expired"})
                }
            } )
            
        } else {
            axios.put(`${url}/games/${currendId}`,{
                id: input.id,
                name: input.name,
                platform: input.platform,
                release: input.release,
                singlePlayer: input.singlePlayer,
                genre: input.genre,
                multiplayer: input.multiplayer,
                image_url: input.image_url,}, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                let data = res.data 
                console.log(data);
                history.push("/game-list")
            }).catch((err)=>{
                console.log(err.response.data);
                const {status} = err.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    
                    logout({setUser, status: "expired"})
                }
            })
        }

        setCurrentId(null)
        setInput(gamesObj)
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
        history.push("/game-list") //untuk berpindah ke form
    }
    return(
        
            <>  
                <div id="form" className="hide-display" style={{ marginTop: 30, padding: 50, backgroundColor: '#001529', textAlign:'center', height: '680px' }}>
                            {/* <h1 style={{ color: "#fff", marginBottom: 50 }}>Form Games</h1> */}
                            <h1>{id === undefined ? `Input Game Baru` :`Form Edit ${input.name}`}</h1>
                            <form onSubmit={handleSubmit}>
                                <table>
                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Name : </strong>
                                        </td>
                                        <td>
                                            <input style={{ width: 400 }} value={input.name} onChange={handleChange} name="name" required /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Platform :</strong>
                                        </td>
                                        <td>
                                            <input rows={4} style={{ width: 400 }} value={input.platform} onChange={handleChange} name="platform" required /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Release : </strong>
                                        </td>
                                        <td>
                                            <input type="number" style={{ width: 100 }} min={2000} max={2021} value={input.release} onChange={handleChange} name="release" required /><br />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Genre : </strong>
                                        </td>
                                        <td>
                                            <input style={{ width: 400 }} value={input.genre} onChange={handleChange} name="genre" required /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Single Player : </strong>
                                        </td>
                                        <td>
                                            {/* <input type="number" style={{ width: 100 }} min={0} max={1} value={input.singlePlayer} onChange={handleChange} name="singlePlayer" required /><br />
                                             */}
                                            <select
                                            name="singlePlayer"
                                            id="singlePlayer"
                                            value={input.singlePlayer}
                                            onChange={handleChange}
                                            className="form-input form-add"
                                        >
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Multiplayer : </strong>
                                        </td>
                                        <td>
                                            {/* <input type="number" style={{ width: 100 }} min={0} max={1} value={input.multiplayer} onChange={handleChange} name="multiplayer" required /><br />
                                            */}
                                            <select
                                                name="multiplayer"
                                                id="multiplayer"
                                                value={input.multiplayer}
                                                onChange={handleChange}
                                                className="form-input form-add"
                                            >
                                                <option value={1}>Yes</option>
                                                <option value={0}>No</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong style={{ color: "#fff" }}>Image URL : </strong>
                                        </td>
                                        <td>
                                            <input rows={4} style={{ width: 400 }} value={input.image_url} onChange={handleChange} name="image_url" required />
                                        </td>
                                        
                                    </tr>

                                </table>
                                <Button onClick={handleBack} type="danger" block htmlType="submit" style={{ height:50, width:'auto', borderRadius:'7px',marginRight:'50px'}}>
                                    Cancel
                                </Button>
                                <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{ background: "#06283D",width:'auto', height:50, borderRadius:'7px', margin:'10px 0'}}>
                                    Submit
                                </Button>
                               
                            </form>
                        </div>


            </>

                
    )
}

export default GamesForm