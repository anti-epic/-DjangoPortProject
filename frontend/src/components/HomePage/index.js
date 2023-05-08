import React from "react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Polls from "../Polls";
import "./HomePage.css";

import Typewriter from "../Typewriter";
import { Button, Layout} from "antd";
export default function HomePage() {
  const {  Content } = Layout;
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {

      setIsLoaded(true);

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
          <Button>s</Button>
        </div>
      </Content>
    </>
  ) : (
    <div>ls sad</div>
  );
}
