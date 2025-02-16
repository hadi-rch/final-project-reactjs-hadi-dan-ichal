import { 
  LaptopOutlined, 
  NotificationOutlined,
  PlayCircleOutlined, 
  VideoCameraOutlined,
  InfoCircleOutlined,
  UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { 
  Link
} from "react-router-dom";
import { useState } from "react"
const { Header, Content, Sider ,Footer} = Layout;

const items1 = ['Home','Dashboard',3
     ,]
  .map((key, index) => ({
  key,
  label:key ,
  }));
const items2 = [UserOutlined, LaptopOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon,
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Users', '1', <UserOutlined />),
  getItem('Info', '2', <InfoCircleOutlined />),
  // getItem('Option 3', '3', <LaptopOutlined />),
  getItem('Movie', 'sub1', <VideoCameraOutlined />, [
    getItem('Movie List', '4'),
    getItem('Movie Table', '5'),
    // getItem('Option 7', '6'),
    // getItem('Option 8', '7'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]), 
  ]),
  getItem('Games', 'sub2', <LaptopOutlined />, [
   getItem('Games List', '9'),
    getItem('Game Table', '10'),
    
  ]),
];

// const App = () => (
//   <Layout style={{
//     minHeight:'100vh'
//   }}>
//     <Header className="header">
//       <div className="logo" />
//       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
//     </Header>
//     <Layout style={{
//           backgroundColor:'yellow',
//           maxHeight:'100%'
//         }}>
//       <Sider width={200} className="site-layout-background">
//         <Menu
//           mode="inline"
//           theme='dark'
//           defaultSelectedKeys={['1']}
//           defaultOpenKeys={['sub1']}
//           style={{
//             backgroundColor:'red',
//             height: '100%',
//             borderRight: 0,
//           }}
//           items={items2}
//         />
//       </Sider>
//       <Layout
//         style={{
//           height:'100%',
//           backgroundColor:'blue',
//           padding: '0 24px 24px',
//         }}
//       >
//         {/* <Breadcrumb
//           style={{
//             margin: '16px 0',
//           }}
//         >
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb> */}
//         <Content
//           className="site-layout-background"
//           style={{
//             margin: '26px 0',
//             padding: 24,
//             // margin: 0,
//             minHeight: '100%',
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   </Layout>
// );
// const [collapsed, setCollapsed] = useState(false);
const App = () => (
  
    <Layout hasSider>
      <Sider
        style={{
          // overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          // left: 0,
          // top: 0,
          // bottom: 0,
        }}
      >
        <div className="logos-sider">
            <h1><strong>LIFE SUPPORT APPS</strong></h1>
        </div>
        {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items2} /> */}
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        // inlineCollapsed={collapsed}
        items={items}
      />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
          backgroundColor:'red'
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          // backgroundColor
          }}
          
        >
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: 'center',
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              // Array.from(
              //   {
              //     length: 100,
              //   },
              //   (_, index) => (
              //     <React.Fragment key={index}>
              //       {index % 20 === 0 && index ? 'more' : '...'}
              //       <br />
              //     </React.Fragment>
              //   ),
              // )
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );

export default App;