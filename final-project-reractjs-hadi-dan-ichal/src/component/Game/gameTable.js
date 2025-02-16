import { Modal ,Layout, Button, Dropdown,Input, Menu,InputNumber, message, Tooltip} from 'antd';
import { UserOutlined,
    VideoCameraOutlined,
    PlayCircleOutlined,
    InfoCircleOutlined,
    VideoCameraAddOutlined, 
    PlaySquareFilled,
    WalletFilled,
    CalendarFilled, 
    EditOutlined, 
    DeleteOutlined, 
    StarFilled} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { UserContext } from '../Auth/UserContext';
const { Sider } = Layout;

const GamesTable = () => {
    const url = "https://super-bootcamp-backend.sanbersy.com/api"
    let history = useHistory()
    let gamesObj={
        name: "", 
        platform: "", 
        release: 2022, 
        singlePlayer: 1, 
        genre: "", 
        multiplayer: 2, 
        image_url: "", 
        id: null
    }
    const [games,setGames] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(true)

    const {
        userState:[user, setUser],
        loadingState:[confirmLoading, setConfirmLoading]
      } = useContext(UserContext)
      const [open, setOpen] = useState(false);
    // const [input, setInput] = useState(gamesObj)
  




    const hendleSortBy = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent });
   

        if (key === "1") {
            console.log("Sort By Release");
            games.sort(function(a,b){
                if (a.release > b.release) return 1;
                if (a.release < b.release ) return -1;
                return 0
            })
            if (games.length > 0){
                console.log(games[0].release)
                setGames([...games])
            } 
            console.log(games);
        } else if (key === "2") {
            console.log("Sort By Platform");
            games.sort(function(a,b){
                if (a.platform > b.platform) return -1;
                if (a.platform < b.platform ) return 1;
                return 0
            })
            if (games.length > 0){
                console.log(games[0].platform)
                setGames([...games])
            }console.log(games);
        } else if (key === "3") {
            console.log("Sort By Genre");
            games.sort(function(a,b){
                if (a.genre > b.genre) return 1;
                if (a.genre < b.genre) return -1;
                return 0
            })
            if (games.length > 0){
                console.log(games[0].genre)
                setGames([...games])
            } 
            console.log(games);
            
        } else if (key === "4") {
            console.log("Sort By Title");
            games.sort(function(a,b){
                if (a.title > b.title) return 1;
                if (a.title < b.title ) return -1;
                return 0
            })
            if (games.length > 0){
                console.log(games[0].title)
                setGames([...games])
            } 
            console.log(games);
        }
    }
      
      const menu = (
        <Menu
          onClick={hendleSortBy}
        //   onChange={hendleSortByYears}
          items={[
            {
              label: 'Release',
              key: '1',
            //   onSelect:{hendleSortByYears},
              icon: <CalendarFilled />,
            },
            {
              label: 'Platform',
              key: '2',
            //   onSelect:{hendleSortByRating},
              icon: <StarFilled />,
            },
            {
              label: 'Genre',
              key: '3',
            //   onSelect:{hendleSortByGenre},
              icon:<WalletFilled />,
            },
            {
               label: 'Games',
               key: '4',
            //    onSelect:{hendleSortByName},
               icon: <PlaySquareFilled />,
            },
          ]}
        />
      );

    useEffect(()=>{
        const fecthData = async () => {
            let resultMovie = await axios.get(`${url}/games`) 
            let dataGames = resultMovie.data
            console.log(dataGames);
            setGames(dataGames);
            setGames(dataGames.map((itemGames) =>{
                return {
                    id: itemGames.id,
                    name: itemGames.name,
                    platform: itemGames.platform,
                    release: itemGames.release,
                    singlePlayer: itemGames.singlePlayer,
                    genre: itemGames.genre,
                    multiplayer: itemGames.multiplayer,
                    image_url: itemGames.image_url
                    }}
                ))
            }
            setFetchTrigger(false)
        if (fetchTrigger) {
            fecthData()
            
        }
    },[fetchTrigger])
    
    const addNewGames = () => {
        history.push("/games-with-auth/create")
    }

    const handleEdit = async (id) => {
        let idGames = Number(id)
        // console.log(id);
        history.push(`/games-with-auth/${idGames}/edit`)
    }

    const showModal = (event) => {
        setOpen(true);
      };
    
    const handleOk = (id) => {
        // setModalText('The modal will be closed after two seconds');
      let idGames = (id)
      console.log(`Ini Id ${idGames}`);
      setConfirmLoading(true);
      setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      if (confirmLoading === false) {
            // console.log(idGames);
            axios.delete(`${url}/games/${idGames}`, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
            setFetchTrigger(true)
        }).catch((error)=>{
            console.log(error);
        })
        }
    }, 2000);
      };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };
      const filterTitle = (e) => {
        let input = e.target.value
        console.log(input);
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/games`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.name.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })
    }

    const filterGenre = (e) => {
        let input = e.target.value
        console.log(input);
        console.log("hallo");
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/games`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.genre.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })
    }

    const filterPlatform = (e) => {
        let input = e.target.value
        console.log("hallo");
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/games`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.platform.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })
    }

    const filterRelease = (value) => {
        let input = value
        console.log(input);
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/games`)
            .then(res => {
                console.log(res.data);
                let resGames = res.data.map(el => {

                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })
                let filteredGames = resGames.filter(x => x.release == input)
                console.log(filteredGames);
                setGames([...filteredGames])
            })
    }

      function Tabel (props) {
        return(
            <tbody>
                    {props.games.map((item, index) => {
                        return (
                           <tr key={index}>
                               <td>{index+1}</td>
                               <td><div className='preview-list'>
                                <img src={item.image_url} alt="preview-image"/>
                                </div></td>
                               <td>{item.name}</td>
                               <td>{item.platform}</td>
                               <td>{item.release}</td>
                               <td>{item.genre}</td>
                               <td>{item.singlePlayer == 1 ? "Ya" : "Tidak"}</td>
                               <td>{item.multiplayer == 1 ? "Ya" : "Tidak"}</td>
                               {/* <td>{item.id}</td> */} 
                               <td>
                               {/* <button className="button-edit mr-10" onClick={handleEdit} value={item.id}>Edit</button> */}
                               <Button
                                    // type="default"
                                    // onClick={handleEdit}
                                    // value={item.id}
                                    onClick={()=>{handleEdit(item.id)}}
                                    icon={<EditOutlined />}
                                    style={{background: "#FFCE45",color:"#06283D",marginRight:10,borderRadius:"4px"}}
                                    >
                                      Edit
                                </Button>
                                <Button
                                type="danger"
                                // onClick={deleteValidation} 
                                onClick={showModal}
                                value={item.id}
                                icon={<DeleteOutlined />}
                                style={{color:"white", borderRadius:"4px"}}
                                >
                                  Delete
                                </Button>
                                <Modal
                                  title="Delete This Games?"
                                  open={open}
                                  onOk={()=>{handleOk(item.id)}}
                                  confirmLoading={confirmLoading}
                                  onCancel={handleCancel}
                                >
                                  <p>Menghapus Games Dari Data</p>
                                </Modal>
                               </td>
                           </tr>
                        )
                    })

                    }
                            
                    
                </tbody>
        )
      }

    return(
    <div>
        <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                    <Menu.Item key="1"><Link to="/movie-list"><PlayCircleOutlined /> Movie Dashboard</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/game-list"><VideoCameraOutlined /> Game Dashboard</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/change-password"><InfoCircleOutlined /> Change Password</Link></Menu.Item>
                    </Menu>

        </Sider>
          
        <div className='title-movielist'>
        
      <Dropdown.Button
            style={{
                // backgroundColor:'red',
                height:50,
                paddingTop:15,
                margin:"0 0 0 150px",
                // position:'absolute',
                // right:'20'
            }}
            onClick={hendleSortBy} 
            overlay={menu}>
            Sort
        </Dropdown.Button>
        <p>
            GAMES DASHBOARD
        </p> 
        </div>


        <div style={{ marginBottom: 30 }}>
            <Input onChange={filterTitle} style={{ width: 200, marginRight: 20 }} placeholder="Search for name" />
            <Input onChange={filterGenre} style={{ width: 200, marginRight: 20 }} placeholder="Search for genre" />
            <Input onChange={filterPlatform} style={{ width: 200, marginRight: 20 }} placeholder="Search for platform" />
            <strong style={{ color: "#333" }}>Release : </strong>
            <InputNumber min={1970} max={2020} onChange={filterRelease} />
        </div>
        <Button
            type="default"
            icon={<VideoCameraAddOutlined />}
            onClick={addNewGames}
            style={{
                
                left:540,
                marginBottom:20,
                background: "#00C897",
                color:"#06283D",
                marginRight:10,
                borderRadius:"4px"}}
            >
              Add Games
        </Button>
        <table className="custom-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Preview</th>
                        <th>Nama Games</th>
                        <th>Platform</th>
                        <th>Tahun Rilis</th>
                        <th>Genre</th>
                        <th>Singe Player</th>
                        <th>Multi Player</th>
                        <th>Aksi </th>
                        {console.log({games})}
                    </tr>
                </thead>
                <Tabel games={games} />
            </table>
        </div>
    )
}

export default GamesTable
