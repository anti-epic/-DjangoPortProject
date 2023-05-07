const LOAD_POLLS = '/LOAD/POLLS';

export const getPollsThunk = () => async dispatch => {
    const response = await fetch(`/backend/polls`);
    if (response.ok) {
        let polls = await response.json();
        dispatch(getPolls(polls))
    }
}

const getPolls = (polls) => {
    return {type: LOAD_POLLS, polls}
}

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case(LOAD_POLLS):
            console.log(action.polls)
            const loadPoals = {...action.polls}
            return loadPoals;
        default:
            console.log('in default reducer for polls');
            return state;
    }
}
