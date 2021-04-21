
export default function fetchUser() {

    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_CURRENT_USER' });
        fetch('https://winery-manager.herokuapp.com/login', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(user => {
            // debugger
            dispatch({ type: 'FETCH_CURRENT_USER', user})
        })
    }
}

