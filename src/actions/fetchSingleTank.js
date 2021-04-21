export default function fetchSingleTank(tank_id) {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_TANKS' });
        fetch('https://winery-manager.herokuapp.com/tank/' + tank_id, {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(tanks => {
            // debugger
            if (Object.keys(tanks).includes("error")) {
                dispatch({ type: 'FETCH_TANK', tanks })
            }
            else{
                dispatch({ type: 'FETCH_TANK', tanks })
            }
        })
    }
}

