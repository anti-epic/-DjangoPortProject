const LOAD_POLLS = '/LOAD/POLLS';
const CREATE_POLL = '/CREATE/POLL'



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export const createPollThunk = (payload) => async dispatch => {
    console.log('yoyoyo')
    const response = await fetch(`/backend/polls/add/`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json",

            'X-CSRFToken': getCookie('csrftoken')

     },
		body: JSON.stringify({ payload })
    })
    if(response.ok){
        console.log('create poll response good')
        const data = await response.json();
		dispatch(createPoll(data));
		return data;
    }
    else{ console.log(response)}
}

export const getPollsThunk = () => async dispatch => {
    const response = await fetch(`/backend/polls`);
    if (response.ok) {
        let polls = await response.json();
        dispatch(getPolls(polls))
    }
}

const createPoll = data => {
    return {type:CREATE_POLL,
    data}
}
const getPolls = (polls) => {
    return {type: LOAD_POLLS, polls}
}

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case(LOAD_POLLS):
            console.log(action.polls)
            const loadPolls = {...action.polls}
            return loadPolls;
        case(CREATE_POLL):
            const createPoll = {...state}
        console.log(' in create poll reducer')
            return createPoll
        default:
            console.log('in default reducer for polls');
            return state;
    }
}
