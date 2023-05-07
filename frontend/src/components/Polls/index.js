import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { getPollsThunk } from "../../store/polls";
export default function Polls() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getPollsThunk()).then(() => setIsLoaded(true))
    }, [dispatch])


    return isLoaded ? (<></>) : (<>not loaded</>)

}
