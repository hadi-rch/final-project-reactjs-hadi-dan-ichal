import { Layout, Button, Dropdown, Menu,Input, Space} from 'antd';
import { EditOutlined , DeleteOutlined, StarFilled} from '@ant-design/icons';
import { 
    Link
 } from "react-router-dom";
 import { useState, useEffect } from "react"
import axios from "axios"
const { Sider } = Layout;
const { Search } = Input;




const Movie = () => {
    const url = "https://super-bootcamp-backend.sanbersy.com/api"

    const [movie,setMovie] = useState([]);
    const [search,setSearch] = useState(movie);
    const [fetchTrigger, setFetchTrigger] = useState(true)


    

 

    
    // const menu = (
    //     <Menu
    //       items={[
    //         {
    //           onClick:{},  
    //           key: '1',
    //           label: (
    //             <a target="_blank" >
    //               Filter
    //             </a>
    //           ),
    //         },
    //         {
    //           key: '2',
    //           label: (
    //             <a target="_blank" >
    //               Sort
    //             </a>
    //           ),
    //         },
    //         {
    //           key: '3',
    //           label: (
    //             <a target="_blank" >
    //               Search
    //             </a>
    //           ),
    //         },
    //       ]}
    //     />
    //   );
    useEffect(()=>{
        const fecthData = async () => {
            let resultMovie = await axios.get(`${url}/movies`) 
            let dataMovie = resultMovie.data
            console.log(dataMovie);
            setMovie(dataMovie);
            setSearch(dataMovie.map((itemMovie) =>{
                return {
                    id: itemMovie.id,
                    title: itemMovie.title,
                    year: itemMovie.year, 
                    image_url: itemMovie.image_url,
                    genre: itemMovie.genre,
                    description: itemMovie.description,
                    duration: itemMovie.duration,
                    rating: itemMovie.rating,
                    }}
                ))
            }
            setFetchTrigger(false)
        if (fetchTrigger) {
            fecthData()
            
        }
    },[fetchTrigger])

    

    // useEffect(() => {
    //     axios(`https://super-bootcamp-backend.sanbersy.com/api/movies`).then(response => 
    //     {console.log(response.data)
    //         setMovie(response.data);
    //         setSearch(response.data);
    //     }).catch(error => {
    //         console.log('Error getting fake data: ' + error);
    //     })}, []);
            
            
            const handleSearch = (event) => {
                let value = event.target.value.toLowerCase();
                let result = [];console.log(value);
                result = movie.filter((data) => {
                    return data.title.search(value) != -1;
                });
            setSearch(result);
        }

    // const enterLoading = (index) => {
    //     setLoadings(prevLoadings => {
    //       const newLoadings = [...prevLoadings];
    //       newLoadings[index] = true;
    //       return newLoadings;
    //     });
    
    //     setTimeout(() => {
    //       setLoadings(prevLoadings => {
    //         const newLoadings = [...prevLoadings];
    //         newLoadings[index] = false;
    //         return newLoadings;
    //       });
    //     }, 6000);
    //   };
    
    return(
        <div>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 50,
            bottom: 0,
            color:'white'
          }}
        >
        <div className='side-bar'>
           <ul>
            <li>
                <Link to="/movie-list">Movie List</Link>
            </li>
            <li>
                <Link to="/game-list">Game List</Link>
            </li>
        </ul> 
        </div>
        
        
        {/* <Menu theme="dark" mode="inline" items={}  /> */}
        </Sider>
        <div className='title-movielist'>
        <p>
            MOVIE LIST
        </p> 
        {/* <div className='dropdown-filter'>
        <Dropdown overlay={menu} placement="bottom" arrow >
            <Button>Filter</Button>
        </Dropdown>
        </div> */}
        <div className='filter'>
            <Search
            placeholder="input search text"
            allowClear
            onChange={(event) => {handleSearch(event)}}
            // onKeyUp={onSearch()}
            enterButton="Search"
            size="large"/>
        </div>
         
    
        </div>
        <table className="custom-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Movie</th>
                        <th>Genre</th>
                        <th>Tahun Rilis</th>
                        <th>Rating</th>
                        <th>Aksi</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {search.map((item, index) => {
                        return (
                           <tr key={index}>
                               <td>{index+1}</td>
                               <td>{item.title}</td>
                               <td>{item.genre}</td>
                               <td>{item.year}</td>
                               <td><StarFilled style={{color: "#FFCE45",}}/> {item.rating}</td>
                               <td>
                               <Button
                                    type="default"
                                    
                                    icon={<EditOutlined />}
                                    style={{background: "#FFCE45",color:"#06283D",marginRight:10,borderRadius:"4px"}}
                                    >
                                      Edit
                                </Button>
                                <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                style={{color:"white", borderRadius:"4px"}}
                                >
                                  Delete
                                </Button>
                               </td>
                           </tr>
                        )
                    })

                    }
                            
                    
                </tbody>
            </table>
        </div>
    )
}

export default Movie