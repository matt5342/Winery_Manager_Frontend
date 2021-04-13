
export default function fetchSections() {
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_SECTION' });
        fetch('http://localhost:3000/section', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(sections => {
            // debugger
            if (Object.keys(sections).includes("error")) {
                dispatch({ type: 'FETCH_SECTION', sections})
            }
            else{
                dispatch({ type: 'FETCH_SECTION', sections})
            }
        })
    }
}
