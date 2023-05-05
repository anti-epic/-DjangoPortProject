import React, { Component } from "react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getMovie } from "../../store/forms";

export default function HomePage()  {

  const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMovie()) .then(() => {
      setIsLoaded(true);
    })
	}, [dispatch]);


    return isLoaded? (

      <>
      <h1> home page - loaded</h1>
      </>
    ): (<div>ls
      sad</div>)

}
