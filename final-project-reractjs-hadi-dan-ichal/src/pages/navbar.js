import { useContext,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from "../component/Auth/UserContext";
import { Button} from 'antd';
// import { logout } from "../Utils/Utils ";

const NavbarItem = () => {
    const {
        userState:[user, setUser],
        loadingState:[confirmLoading, setConfirmLoading]
      } = useContext(UserContext)
    // const [user, setUser,confirmLoading, setConfirmLoading] = useContext(UserContext)
    // const [confirmLoading, setConfirmLoading] = useContext(MovieContext)
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const history = useHistory();

    const logout = ()=>{

        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            if (confirmLoading === false) {
                setUser(null)
                localStorage.clear()
                history.push("/login")
            }
        }, 2000);
    }

    return (
        <nav className="custom-nav-light">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/just-game">Games</Link>
                </li>
                <li>
                    <Link to="/just-movie">Movie</Link>
                </li>
                {
                user ? (
                    <>
                <li>
                <Link to="/dashboard">Dashboard</Link>
                </li>
               
                <li>
                <strong style={{ right: '100px',top:'4px', position: 'absolute', margin:'0px 10px 0 0' }}><UserOutlined /> Hallo {user.name}</strong>
                <Button loading={confirmLoading} type="primary" size="large" danger onClick={logout} style={{top:'4px',right:'0', position: 'absolute', margin:'0px 10px 0 0'}}>Logout</Button>
                    </li>
                    </>
                ):
                (<>      
                    <li>
                    
                    </li>          

                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </>)}
            </ul>
            
        </nav>
    )
}

export default NavbarItem