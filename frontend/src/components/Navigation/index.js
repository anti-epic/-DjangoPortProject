import React from "react";
import './Navigation.css'
import {Menu} from 'antd';
import { NavLink } from 'react-router-dom';


// import {  Layout, Menu } from 'antd';
export default function Navigation() {
    const {Item} = Menu;
    return (<>
<Menu
  theme="dark"
  mode="horizontal"
  className="NavBar"
  defaultSelectedKeys={['home']}
>
  <Menu.Item key="home" className="NavItem">
    <NavLink to="/">꧁𓊈𒆜🅶🆁🅸🅽🅳 🅲🅸🆃🆈𒆜𓊉꧂</NavLink>
  </Menu.Item>
  <Menu.Item key="members" className="NavItem">
    <NavLink to="/members">Members</NavLink>
  </Menu.Item>
  <Menu.Item key="polls" className="NavItem">
    <NavLink to="/polls">Polls</NavLink>
  </Menu.Item>
  <Menu.Item key="events" className="NavItem">
    <NavLink to="/events">Events</NavLink>
  </Menu.Item>
  <Menu.Item key="login" className="NavItem">
    <NavLink to="/login">Login</NavLink>
  </Menu.Item>
</Menu>


    </>)

}
