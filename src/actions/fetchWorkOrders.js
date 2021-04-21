
export default function fetchWorkOrders() {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'START_FETCHING_WORK_ORDERS' });
        fetch('https://winery-manager.herokuapp.com/work_orders', {
            headers: {"Authorization": localStorage.token}
        })
        .then(r => r.json())
        .then(workOrders => {
            // debugger
            if (Object.keys(workOrders).includes("error")) {
                dispatch({ type: 'FETCH_WORK_ORDERS', workOrders })
            }
            else{
                dispatch({ type: 'FETCH_WORK_ORDERS', workOrders })
            }
        })
    }
}
