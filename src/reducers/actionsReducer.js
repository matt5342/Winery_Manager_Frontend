
const actionsReducer = (state = { actions: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'POST_ACTIONS': 
            return {
                ...state, 
                actions: action.actions, 
                requesting: false
            }
        default:
            return state;
    }
}
export default actionsReducer;