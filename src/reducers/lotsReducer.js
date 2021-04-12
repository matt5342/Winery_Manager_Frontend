
const lotsReducer = (state = { lots: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        // case 'START_FETCHING_LOTS':
        //     return {
        //         ...state, 
        //         lots: {...state.lots}, 
        //         requesting: true
        //     }
        // case 'FETCH_LOTS':
        //     return {
        //         ...state, 
        //         tanks: action.tanks, 
        //         requesting: false
        //     }
        case 'POST_LOTS': 
            return {
                ...state, 
                lots: action.lots, 
                requesting: false
            }
        default:
            return state;
    }
}
export default lotsReducer;