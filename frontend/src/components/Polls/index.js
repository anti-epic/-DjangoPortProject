import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPollsThunk } from "../../store/polls";
import CreatePoll from '../CreatePoll'

import {Collapse} from 'antd';
import './Polls.css'
const {Panel} = Collapse;

export default function Polls() {
    const onChange = (key) => {
        console.log(key);
      };
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const pollsObj = useSelector(state => {
        return state.polls
    })
    let polls = []
    if(pollsObj){
        polls = Object.values(pollsObj)
    }
    useEffect(() => {
        dispatch(getPollsThunk()).then(() => setIsLoaded(true))
    }, [dispatch, polls.length ])


    return isLoaded ? (
    <div className="pollsContainer">
       <h1 className="pollsHeader">
         Most Recent Polls:
        </h1>
        {/* <CreatePoll /> */}
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
    {polls.map((poll, index) => (
              <Panel header={poll.question_text} key={index}>
              {poll.choices.map((choice, index) => (
                <li>Option{index+1}: {choice.choice_text}</li>
              ))}
            </Panel>
        ))}

        </Collapse>
    </div>) : (<>not loaded</>)

}
