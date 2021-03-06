
export default function fetchAllTanks() {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_ALL_TANKS' });
        fetch('https://winery-manager.herokuapp.com/tanks', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(tanks => {
            // debugger
            if (Object.keys(tanks).includes("error")) {
                dispatch({ type: 'FETCH_ALL_TANKS', tanks })
            }
            else{
                dispatch({ type: 'FETCH_ALL_TANKS', tanks })
            }
        })
    }
}

