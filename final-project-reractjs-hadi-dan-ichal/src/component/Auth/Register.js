import React, { useContext, useState } from "react"
import { Button, Form, Input, Modal } from 'antd';
import {UserContext} from "./UserContext"
import axios from "axios"
import  RegisterImage  from "../registerImg.svg";


const Register = () => {
    // const [,setUser] = useContext(UserContext)    // const [, setUser] = useContext(UserContext)
//   const [input, setInput] = useState({name: "", email: "" , password: ""})
// const [, setUser,confirmLoading, setConfirmLoading] = useContext(UserContext)
// const [confirmLoading, setConfirmLoading] = useState(false);
const {
  userState:[, setUser],
  loadingState:[confirmLoading, setConfirmLoading]
} = useContext(UserContext)

const onFinish = (values) => {
      let {name, email, password} = values
      setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            if (confirmLoading === false) {
              axios.post("https://super-bootcamp-backend.sanbersy.com/api/register", {name, email, password}).then(
                (res)=>{
                  var user = res.data.user
                  var token = res.data.token
                  var currentUser = {name: user.name, email: user.email, token }
                  setUser(currentUser)
                  localStorage.setItem("user", JSON.stringify(currentUser))
                  if (currentUser) {
                    Modal.success({
                      content: `Welcome, ${user.name} Anda Berhasil Register`,
                    });
                  }
                }
              ).catch((err)=>{
                // alert(err)
                console.log(err.response);
                let thisError = JSON.parse(err.response.data)
                // let thisErrorCatch = thisError.map((itemErr) => {
                //   if (thisError) {
                //     Modal.error({
                //     title: 'Cannot Register',
                //     content: `${itemErr.email} Register Ulang`,
                //   });
                //   }
                // })
                if (thisError) {
                  Modal.error({
                  title: 'Cannot Register',
                  content: `${thisError.email ? thisError.email[0] :''} ${thisError.password?  `dan ${thisError.password[0]}` : ""} Please Register Again`,
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
        <div className="card-register">
            <h1>
                Resgister
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
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item

                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your Correct Email!',
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
                <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{background: "#06283D"}}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </div>
      )
    }
    
    return (
        <>
        <div className="register-area">
          <img src={RegisterImage} alt="alwiros content" width="400" height="400"/>
          <Login/>
        </div>
        
        </>
    )
}

export default Register
