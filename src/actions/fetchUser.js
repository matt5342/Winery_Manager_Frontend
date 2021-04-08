
export default function fetchUser() {
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_CURRENT_USER' });
        fetch('http://localhost:3000/login', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(user => {
            // debugger
            dispatch({ type: 'FETCH_CURRENT_USER', user})
        })
    }
}

