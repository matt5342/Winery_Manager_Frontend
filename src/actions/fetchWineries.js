
export default function fetchWineries() {
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_WINERY' });
        fetch('http://localhost:3000/winery', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(wineries => {
            // debugger
            if (Object.keys(wineries).includes("error")) {
                dispatch({ type: 'FETCH_WINERY', wineries})
            }
            else{
                dispatch({ type: 'FETCH_WINERY', wineries})
            }
        })
    }
}
