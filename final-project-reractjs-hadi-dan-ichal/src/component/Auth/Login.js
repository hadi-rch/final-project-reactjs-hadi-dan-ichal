import React, { useContext, useState } from "react"
import { Button, Form, Input, Modal } from 'antd';
import {UserContext} from "./UserContext"
import axios from "axios"
import { message } from "antd";
import LoginImage from "../loginImg.svg";
import { 
  Link
} from "react-router-dom";
const Login = () => {
    // const [, setUser,confirmLoading, setConfirmLoading] = useContext(UserContext)
    // const [confirmLoading, setConfirmLoading] = useState(false);
    const {
      userState:[user, setUser],
      loadingState:[confirmLoading, setConfirmLoading]
    } = useContext(UserContext)

const onFinish = (values) => {
      let {email, password} = values
      setConfirmLoading(true);
      setTimeout(() => {
          setConfirmLoading(false);
          if (confirmLoading === false) {
              // setUser(null)
              // localStorage.clear()
              // history.push("/login")
              axios.post("https://super-bootcamp-backend.sanbersy.com/api/login", {email, password}).then(
                (res)=>{
                  var user = res.data.user
                  var token = res.data.token
                  var currentUser = {name: user.name, email: user.email, token }
                  setUser(currentUser)
                  localStorage.setItem("user", JSON.stringify(currentUser))
                  if (currentUser) {
                    Modal.success({
                      content: `Welcome, ${user.name} Anda Berhasil Login`,
                    });
                  }
                }
              ).catch((err)=>{
                // alert(err)
                console.log(err);
                if (err) {
                  Modal.error({
                  title: 'Wrong Pasword and Email',
                  content: 'Please enter your correct Email & Password',
                });
                }
                
              })
          }
      }, 2000);
     
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };


    function Login() {
      return (
        <div className="card-login">
            <h1>
                Login
            </h1>
            <Form
              name="basic"
              labelCol={{span: 5,}}
              wrapperCol={{span: 16,}}
              initialValues={{remember: true,}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                offset:2,
                span: 20,
                }}
              >
                <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{ background: "#06283D"}}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Button type="link" block style={{color:"#06283D",fontSize:13}}>
            <Link to="/register">Belum Punya Account?</Link>
            
            </Button>
        </div>
      )
    }
    

    return (
        <>
        <div className="login-area">
          <img src={LoginImage} alt="alwiros content" width="400" height="400"/>
          <Login/>
        </div>
        
        </>
    )
}

export default Login