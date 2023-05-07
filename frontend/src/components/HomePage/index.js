import React, { Component } from "react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPollsThunk } from "../../store/polls";
import Polls from "../Polls";
import "./HomePage.css";

import Typewriter from "../Typewriter";
import { Button, Breadcrumb, Layout, Menu } from "antd";
export default function HomePage() {
  const { Header, Content, Footer } = Layout;
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPollsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const sentences = [
    "               Old School Runescape",
    "You Never Quit",
    "You Only Take Breaks",
  ];

  return isLoaded ? (
    <>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content imageHolder HomePageDiv">
          <Typewriter sentences={sentences}>:</Typewriter>
          Content
          <h1> home page - loaded</h1>
          <button>s</button>
          <Button>s</Button>
          <Polls />
        </div>
      </Content>
    </>
  ) : (
    <div>ls sad</div>
  );
}
