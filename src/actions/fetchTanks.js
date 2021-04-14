//rename to fetchSectionTanks
export default function fetchTanks(section_id) {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_TANKS' });
        fetch('http://localhost:3000/section/' + section_id + '/tanks', {
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

