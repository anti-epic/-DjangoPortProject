// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const setUser = user => ({
	type: SET_USER,
	payload: user
});

const removeUser = () => ({
	type: REMOVE_USER
});

const initialState = { user: null };

export const authenticate = () => async dispatch => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json"
		}
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (emailOrUsername, password) => async dispatch => {
    console.log(emailOrUsername,password)
	const response = await fetch("/backend/login/", {
		method: "POST",
		credentials: 'include',
		headers: {
			"Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify({
			emailOrUsername,
			password
		})
	});

	if (response.ok) {
        console.log('ok')
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {

		const data = await response.json();
		console.log(data)
		if (data.errors) {
			return data.errors;
		}
	} else {
		let what =  await response.json();
		console.log('no', what)
		return ["An error occurred. Please try again."];
	}
};



export const logout = history => async dispatch => {
	const response = await fetch("/backend/logout/", {
		headers: {
			"Content-Type": "application/json"
		}
	});
	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, confirmPassword) => async dispatch => {
	const response = await fetch("/backend/signup/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
			username,
			email,
			password,
			confirmPassword
		)
	});

	if (response.ok) {
		try {
			const data = await response.json();
			console.log(data);
			dispatch(setUser(data));
		} catch (error) {
			console.error(error);
		}
	} else if (response.status < 500) {
		try {
			const data = await response.json();
			console.log(data);
			if (data.errors) {
				return data.errors;
			}
		} catch (error) {
			console.error(error);
		}
	} else {
		console.error('An error occurred. Please try again.');
		return ["An error occurred. Please try again."];
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
