import React, { useState } from 'react';
import { createPollThunk } from '../../store/polls';
import { useDispatch, useSelector } from "react-redux";
const CreatePoll = () => {
    const [questionText, setQuestionText] = useState("");
    const [choices, setChoices] = useState(['']);

  const dispatch = useDispatch();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { question_text: questionText, choices };

    console.log('yo')
    dispatch(createPollThunk(payload));

};



const handleChoiceChange = (event, index) => {
    const newChoices = [...choices];
    newChoices[index] = event.target.value;
    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  };

  const handleRemoveChoice = (index) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="questionText">Question:</label>
      <input
        type="text"
        name="questionText"
        value={questionText}
        onChange={(event) => setQuestionText(event.target.value)}
      />
      <br />
      <label htmlFor="choiceText">Choices:</label>
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="text"
            name="choiceText"
            value={choice}
            onChange={(event) => handleChoiceChange(event, index)}
          />
          <button type="button" onClick={handleRemoveChoice.bind(null, index)}>
            -
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddChoice}>
        Add choice
      </button>
      <br />
      <button type="submit">Add Poll</button>
    </form>
  );
};

export default CreatePoll;
