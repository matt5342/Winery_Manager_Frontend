
const wineriesReducer = (state = { wineries: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_WINERY':
            return {
                ...state, 
                wineries: {...state.wineries}, 
                requesting: true
            }
        case 'FETCH_WINERY':
            return {
                ...state, 
                wineries: action.wineries, 
                requesting: false
            }
        case 'ADD_WINERY':
            return {
                ...state,
                wineries: action.wineries, 
                requesting: false
            }

        default:
            return state;
    }
}
export default wineriesReducer;