
export default function fetchLots() {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_LOTS' });
        fetch('https://winery-manager.herokuapp.com/lots', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(lots => {
            // debugger
            if (Object.keys(lots).includes("error")) {
                dispatch({ type: 'FETCH_LOTS', lots })
            }
            else{
                dispatch({ type: 'FETCH_LOTS', lots })
            }
        })
    }
}
