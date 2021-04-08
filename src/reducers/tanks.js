
const userReducer = (state = { tanks: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_TANKS':
            return {
                ...state, 
                tanks: {...state.tanks}, 
                requesting: true
            }
        case 'FETCH_CURRENT_TANKS':
            return {
                ...state, 
                tanks: action.tanks, 
                requesting: false
            }
        case 'SIGN_UP_NEW_TANKS':
            return {
                ...state,
                tanks: action.tanks, 
                requesting: false
            }

        default:
            return state;
    }
}
export default userReducer;