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
import { 
    Link
 } from "react-router-dom";
 import { useState, useEffect, useContext , } from "react"
 import React from "react";
 import { useHistory } from "react-router-dom"
import axios from "axios"
import { UserContext } from '../Auth/UserContext';
import { logout } from "../Utils/funtions";
const { Sider } = Layout;





const Movie = () => {
    const url = "https://super-bootcamp-backend.sanbersy.com/api"
    let history = useHistory()
    const [movie,setMovie] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(true)
    const [open, setOpen] = useState(false); 
    const {
        userState:[user, setUser],
        loadingState:[confirmLoading, setConfirmLoading]
      } = useContext(UserContext)

  




    const hendleSortBy = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent });
   

        if (key === "1") {
            console.log("Sort By Year");
            movie.sort(function(a,b){
                if (a.year > b.year) return 1;
                if (a.year < b.year ) return -1;
                return 0
            })
            if (movie.length > 0){
                console.log(movie[0].year)
                setMovie([...movie])
            } 
            console.log(movie);
        } else if (key === "2") {
            console.log("Sort By Rating");
            movie.sort(function(a,b){
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating ) return 1;
                return 0
            })
            if (movie.length > 0){
                console.log(movie[0].rating)
                setMovie([...movie])
            }console.log(movie);
        } else if (key === "3") {
            console.log("Sort By Genre");
            movie.sort(function(a,b){
                if (a.genre > b.genre) return 1;
                if (a.genre < b.genre) return -1;
                return 0
            })
            if (movie.length > 0){
                console.log(movie[0].title)
                setMovie([...movie])
            } 
            console.log(movie);
            
        } else if (key === "4") {
            console.log("Sort By Title");
            movie.sort(function(a,b){
                if (a.title > b.title) return 1;
                if (a.title < b.title ) return -1;
                return 0
            })
            if (movie.length > 0){
                console.log(movie[0].title)
                setMovie([...movie])
            } 
            console.log(movie);
        }
    }




  
    
    // const handleButtonClick = (e) => {
    //     message.info('Click on left button.');
    //     console.log('click left button', e);
    //   };
      
    //   const handleMenuClick = (e) => {
    //     message.info('Click on menu item.');
    //     console.log('click', e);
    //   };
      
      const menu = (
        <Menu
          onClick={hendleSortBy}
        //   onChange={hendleSortByYears}
          items={[
            {
              label: 'Year',
              key: '1',
            //   onSelect:{hendleSortByYears},
              icon: <CalendarFilled />,
            },
            {
              label: 'Rating',
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
               label: 'Movie',
               key: '4',
            //    onSelect:{hendleSortByName},
               icon: <PlaySquareFilled />,
            },
          ]}
        />
      );

    useEffect(()=>{
        const fecthData = async () => {
            let resultMovie = await axios.get(`${url}/movies`) 
            let dataMovie = resultMovie.data
            console.log(dataMovie);
            setMovie(dataMovie);
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
                    }}
                ))
            }
            setFetchTrigger(false)
        if (fetchTrigger) {
            fecthData()
            
        }
    },[fetchTrigger])



   const addNewMovie = () => {
        history.push("/movie-with-auth/create")
    }


    const handleEdit = async (id) => {
        let idMovie = Number(id)
        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setConfirmLoading(false);
            // if (confirmLoading === false) {
                console.log(id);
                history.push(`/movie-with-auth/${idMovie}/edit`)
        //     }
        // }, 2000);
        
       
    }


      const showModal = (event) => {
        setOpen(true);
      };
    
      const handleOk = (id) => {
        // setModalText('The modal will be closed after two seconds');
      let idMovie = parseInt(id)
      console.log(`Ini Id ${idMovie}`);
      setConfirmLoading(true);
      setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      if (confirmLoading === false) {
            // console.log(idMovie);
            axios.delete(`${url}/movies/${idMovie}`, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
            setFetchTrigger(true)
        }).catch((error)=>{
            console.log(error);
            const {status} = error.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    logout({setUser, status: "expired"})
                }
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
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/movies`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {
                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.title.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setMovie([...filteredMovies])
            })
    }
    const filterGenre = (e) => {
        let input = e.target.value
        console.log(input);
        console.log("hallo");
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/movies`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter((x) => x.genre.toLowerCase().indexOf(input.toLowerCase()) !== -1)
                setMovie([...filteredMovies])
            })
    }

    const filterRating = (value) => {
        let input = value
        console.log(input);
        console.log("hallo");
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/movies`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.rating == input)
                setMovie([...filteredMovies])
            })
    }

    const filterYear = (value) => {
        let input = value
        console.log(input);
        console.log("hallo");
        axios.get(`https://super-bootcamp-backend.sanbersy.com/api/movies`)
            .then(res => {
                console.log(res.data);
                let resMovies = res.data.map(el => {

                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.year == input)
                setMovie([...filteredMovies])
            })
    }












      function Tabel (props) {
        return(
            <>
            <thead>
                    <tr>
                        <th>No</th>
                        <th>Preview</th>
                        <th>Nama Movie</th>
                        <th>Genre</th>
                        <th>Tahun Rilis</th>
                        <th>Rating</th>
                        <th>Aksi </th>
                        {console.log({movie})}
                        
                        
                        
                    </tr>
            </thead>
            <tbody>
                    {props.movie.map((item, index) => {
                        return (
                           <tr key={index}>
                               <td>{index+1}</td>
                               <td><div className='preview-list'>
                                <img src={item.image_url} alt="preview-image"/>
                                </div></td>
                               <td>{item.title}</td>
                               <td>{item.genre}</td>
                               <td>{item.year}</td>
                               {/* <td>{item.id}</td> */}
                               <td><StarFilled style={{color: "#FFCE45",}}/> {item.rating}</td>
                               <td>
                               {/* <button className="button-edit mr-10" onClick={handleEdit} value={item.id}>Edit</button> */}
                               <Button
                                    // type="default"
                                    // onClick={handleEdit}
                                    // value={item.id}
                                    // loading={confirmLoading}
                                    onClick={()=>{handleEdit(item.id)}} 
                                    // target={item.id}
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
                                  title="Delete This Movie?"
                                  open={open}
                                  okText="Delete"
                                //   bodyStyle={{
                                //     backgroundColor: 'red'
                                // }}
                                  style={{
                                    // background:"red"
                                  }}
                                  onOk={()=>{handleOk(item.id)}}
                                  confirmLoading={confirmLoading}
                                  onCancel={handleCancel}
                                >
                                  <p>Anda Yakin Menghapus Movie Dari Data</p>
                                </Modal>
                               </td>
                           </tr>
                        )
                    })

                    }
                            
                    
                </tbody>
            </>
            
        )
      }




      const items = [
        <Link to="/movie-list"><PlayCircleOutlined /> Movie Dashboard</Link>,
        <Link to="/game-list"><VideoCameraOutlined /> Game Dashboard</Link>,
        <Link to="/change-password"><InfoCircleOutlined /> Change Password</Link>,
      ].map((itemLink, index) => ({
        key: String(index + 1),
        // icon: React.createElement(icon),
        label:itemLink,
      }));
    return(
    <div>
         <Sider  breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
          style={{
 
            position: 'fixed',
            left: 0,
            top: 50,
            bottom: 0,

          }}
        >
        <Menu
            mode='inline'
            // theme="dark"
            defaultSelectedKeys={['1']}
            items={items}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%', minHeight: 0,}}
        />

        
        
        </Sider>
   
        <div className='title-movielist'>
        
      <Dropdown.Button
            style={{
                // backgroundColor:'red',
                height:50,
                paddingTop:15,
                margin:"0 0 0 250px",
                // position:'absolute',
                // right:'20'
            }}
            onClick={hendleSortBy} 
            overlay={menu}>
            Sort
        </Dropdown.Button>
        <p>
            MOVIE DASHBOARD
        </p> 
        <Button
            type="default"
            icon={<VideoCameraAddOutlined />}
            onClick={addNewMovie}
            style={{
                
                left:250,
                top:83,
                background: "#00C897",
                color:"#06283D",
                marginRight:10,
                borderRadius:"4px"}}
            >
              Add Movie
        </Button>
        {/* <div className='filter'>
            <Search
            placeholder="input search text"
            allowClear
            onChange={handleSearch}
            // enterButton="Search"
            size="large"/>
        </div> */}
        
        </div>


<div className='filter-rating'>
        <form >
        
            {/* <p>Filter Rating</p> */}
        <div style={{ marginBottom: 30 }}>
            <Input onChange={filterTitle} type="text" style={{ width: 200, marginRight: 20 }} placeholder="Search for title" />
            <Input onChange={filterGenre} type="text" style={{ width: 200, marginRight: 20 }} placeholder="Search for genre" />
            <strong style={{ color: "#333" }}>Rating : </strong>
            <InputNumber style={{ marginRight: 20 }} type="number"  min={1} max={10} onChange={filterRating} placeholder="Ratings"/>
            <strong style={{ color: "#333" }}>Year : </strong>
            <InputNumber type="number" min={1970} max={2020} onChange={filterYear} placeholder="Year" />
        </div>
        {/* <form onSubmit={submitFilter}>
        <div className='filter-rating'>
            <p>Filter Rating</p>
            // <Input 
            //     placeholder="Rating"
            //     name='rating'
            //     value={input.rating}
            //     onChange={filterRating}
            //     style={{
            //         width:100,
            //         margin:"0 0 0 10px",
    
            //     }}
            //     />
            //     <Input 
            //     placeholder="Genre"
            //     name='genre'
            //     value={input.genre}
            //     onChange={filterGenre}
            //     style={{
            //         width:100,
            //         margin:"0 0 0 10px",
    
            //     }}
            //     />
            //     <Input 
            //     placeholder="Tahun"
            //     name='year'
            //     value={input.year}
            //     onChange={filterYear}
            //     style={{
            //         width:100,
            //         margin:"0 0 0 10px",
    
            //     }}
            //     />
            //      <Input 
            //     type='submit'
            //     value="Submit"
            //     style={{
            //         background: "#FD841F",
            //         color:"#06283D",
            //         borderRadius:"4px",
            //         width:90
    
            //     }}
            //     />
            //     {/* <Button
            //     type="submit"
            //     value="Submit"
            //     icon={<FilterOutlined />}
            //     onClick={submitFilter}
            //     style={{
            //         background: "#FD841F",
            //         color:"#06283D",
            //         borderRadius:"4px"}}
<<<<<<< HEAD
                >
              Filter
        </Button> */}
      
        </form>
        </div>
                        {/* >
                    Filter
                </Button>
      </div>
        </form>
         */}

        {/* <Button
            type="default"
            icon={<VideoCameraAddOutlined />}
            onClick={addNewMovie}
            style={{
                
                // left:540,
                marginBottom:20,
                background: "#00C897",
                color:"#06283D",
                marginRight:10,
                borderRadius:"4px"}}
            >
              Add Movie
        </Button> */}



        <div className='table-area'>
            <table className="custom-table">
                
                <Tabel movie={movie} />
                
            </table>
        </div>
        </div>
       
        
  
        
    )
}

export default Movie