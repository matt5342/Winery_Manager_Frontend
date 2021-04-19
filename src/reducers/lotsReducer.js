
const lotsReducer = (state = { lots: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_LOTS':
            return {
                ...state, 
                lots: {...state.lots}, 
                requesting: true
            }
        case 'FETCH_LOTS':
            return {
                ...state, 
                lots: action.lots, 
                requesting: false
            }
        case 'POST_LOT': 
            // debugger
            return {
                ...state, 
                lots: action.lot,
                requesting: false
            }
        default:
            return state;
    }
}
export default lotsReducer;