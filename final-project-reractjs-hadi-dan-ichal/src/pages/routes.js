import HomePage from "./home";
import NavbarCustom from "./navbar";
import Login from "../component/Auth/Login";
import Register from "../component/Auth/Register"; 
import MovieList from "../component/Movie/movieTable";
import Testing from "../component/Movie/testing";
import DetailGames from "../component/Game/gameDetails";
import DetailMovie from "../component/Movie/movieDetails";
import MovieFormWithAuth from "../component/Movie/movieForm";
import GameList from "../component/Game/gameList";
// import Dashboard from "../component/Movie/dashboard";

import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
 } from "react-router-dom";
import { UserContext, UserProvider } from "../component/Auth/UserContext";
import { useContext } from "react";
import ChangePwd from "../component/Auth/ChangePwd";
import GamesTable from "../component/Game/gameTable";
import GamesForm from "../component/Game/gameForm";
import MovieJust from "../component/Movie/movieList";



 const Routes = () => {
    const {
        userState:[user],
        // loadingState:[confirmLoading, setConfirmLoading]
      } = useContext(UserContext)
    // const [user] = useContext(UserContext)

        const PrivateRoute = ({...rest})=>{//Kembali ke halaman login
            if (user){
                return <Route {...rest}/>
            }else{
                return <Redirect to="/login"/>
            }
        }
    
        const LoginRoute = ({...rest})=>{
            if (user){
                return <Redirect to="/"/>
            }else{
                return <Route {...rest}/>
            }
        }
    



    return(          
        <div> 
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <PrivateRoute exact path="/dashboard">
                        {/* <Dashboard/>*/}
                        <MovieList/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/movie-with-auth/create">
                        <MovieFormWithAuth/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/games-with-auth/create">
                        <GamesForm/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/movie-with-auth/:id/edit">
                        <MovieFormWithAuth/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/games-with-auth/:id/edit">
                        <GamesForm/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/game-list">
                        <GamesTable/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/change-password">
                            <ChangePwd/>
                    </PrivateRoute>
                    <Route exact path="/movie-list">
                        <MovieList/>
                    </Route>
                    {/* <Route exact path="/game-list">
                        <GameList/>
                    </Route> */}
                    <LoginRoute exact path="/register">
                        <Register/>
                    </LoginRoute>
                    <LoginRoute exact path="/login">
                        <Login/>
                    </LoginRoute>
                    <Route exact path="/movie-detail/:id">
                            {/* <Details/> */}
                    </Route>
                    <Route exact path="/games-detail/:slug">
                            <DetailGames/>
                    </Route>
                    <Route exact path="/movies-detail/:slug">
                            <DetailMovie/>
                    </Route>
                    <Route exact path="/just-game">
                            <GameList/>
                    </Route>
                    <Route exact path="/just-movie">
                            <MovieJust/>
                    </Route>
                    </Switch>
            </div>
        </div>       
    )
 }

 export default Routes