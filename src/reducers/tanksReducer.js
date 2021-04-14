
const tanksReducer = (state = { tanks: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_TANKS':
            return {
                ...state, 
                tanks: {...state.tanks}, 
                requesting: true
            }
        case 'FETCH_TANKS':
            return {
                ...state, 
                tanks: action.tanks, 
                requesting: false
            }
        case 'START_FETCHING_ALL_TANKS':
            return {
                ...state, 
                tanks: {...state.tanks}, 
                requesting: true
            }
        case 'FETCH_ALL_TANKS':
            return {
                ...state, 
                tanks: action.tanks, 
                requesting: false
            }
        case 'PATCH_TANKS': //updates tank map layout
            return {
                ...state, 
                tanks: action.tanks, 
                requesting: false
            }
        case 'ADD_TANK':
            return {
                ...state,
                tanks: action.tanks, 
                requesting: false
            }

        default:
            return state;
    }
}
export default tanksReducer;