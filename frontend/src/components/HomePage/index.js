import React, { Component } from "react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPollsThunk } from "../../store/polls";
import Polls from "../Polls";

export default function HomePage()  {

  const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPollsThunk()) .then(() => {
      setIsLoaded(true);
    })
	}, [dispatch]);


    return isLoaded? (

      <>
      <h1> home page - loaded</h1>
      <Polls />
      </>
    ): (<div>ls
      sad</div>)

}
