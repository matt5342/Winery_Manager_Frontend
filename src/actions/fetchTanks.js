
export default function fetchTanks(winery_id) {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_TANKS' });
        fetch('http://localhost:3000/winery/' + winery_id + '/tanks', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(tanks => {
            // debugger
            if (Object.keys(tanks).includes("error")) {
                dispatch({ type: 'FETCH_TANKS', tanks })
            }
            else{
                dispatch({ type: 'FETCH_TANKS', tanks })
            }
        })
    }
}

