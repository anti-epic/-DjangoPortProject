import React from "react";
import './Navigation.css'
import {Menu} from 'antd';
import {Image} from 'antd';


// import {  Layout, Menu } from 'antd';
export default function Navigation() {
    const {Item} = Menu;
    return (<>

        <Menu theme="dark" mode="horizontal"
            defaultSelectedKeys={
                ['home']
        }>
            <Image className="NavbarLogo" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
            <Item key="home">
                Home
            </Item>
            <Item key="polls">
                Polls
            </Item>
            <Item key="login">
                Login
            </Item>
        </Menu>


    </>)

}
