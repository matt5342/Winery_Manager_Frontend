
const userReducer = (state = { user: {}, requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_CURRENT_USER':
            return {
                ...state, 
                user: {...state.user}, 
                requesting: true
            }
        case 'FETCH_CURRENT_USER':
            return {
                ...state, 
                user: action.user, 
                requesting: false
            }
        case 'SIGN_UP_NEW_USER':
            return {
                ...state,
                user: action.user, 
                requesting: false
            }

        default:
            return state;
    }
}
export default userReducer;