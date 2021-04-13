
const sectionsReducer = (state = { sections: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_SECTION':
            return {
                ...state, 
                sections: {...state.sections}, 
                requesting: true
            }
        case 'FETCH_SECTION':
            return {
                ...state, 
                sections: action.sections, 
                requesting: false
            }
        case 'ADD_SECTION':
            return {
                ...state,
                sections: action.sections, 
                requesting: false
            }

        default:
            return state;
    }
}
export default sectionsReducer;