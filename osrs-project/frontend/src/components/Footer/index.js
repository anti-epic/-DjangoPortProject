import React, { Component } from "react";
import { Button, Breadcrumb, Layout, Menu } from 'antd';
import './Footer.css';
export default function Footer()  {


  const { Header, Content, Footer } = Layout;




    return  (

      <>

      <Footer className="footer"
        style={{
          textAlign: 'center',
          backgroundColor: '#0015290'
        }}
      >
        Footer Ant Design ©2023 Created by Ant UED
      </Footer>




      </>
    )
}
