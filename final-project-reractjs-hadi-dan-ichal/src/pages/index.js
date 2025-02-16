import { UserProvider } from "../component/Auth/UserContext"
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routes";
import NavbarCustom from "./navbar";
import { Layout } from 'antd';
import Dashboard from "../component/Movie/dashboard";

const {Footer} = Layout;


const Main = () => {
    return (
        <>

            <UserProvider>
                <BrowserRouter>
                    {/* <Dashboard/> */}

                    <NavbarCustom/>
                    <Routes/>
                    <Footer
                    style={{
                        textAlign: 'center',
                        position: 'fixed',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        background:'#06283D',
                        // background: 'rgb(6,40,61)',
                        // background: 'linear-gradient(223deg, rgba(6,40,61,1) 70%, rgba(19,99,223,1) 100%)',
                        color: 'white',
                        fontWeight: 500,
                    }}
                    >
                    Final Project ©2022 Created by Kelompok4
                    </Footer>

                </BrowserRouter>
            </UserProvider>
        
        </>
    )
}

export default Main