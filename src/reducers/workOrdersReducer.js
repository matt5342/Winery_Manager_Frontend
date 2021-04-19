
const workOrdersReducer = (state = { workOrders: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'START_FETCHING_WORK_ORDERS':
            return {
                ...state, 
                workOrders: {...state.workOrders}, 
                requesting: true
            }
        case 'FETCH_WORK_ORDERS':
            return {
                ...state, 
                workOrders: action.workOrders, 
                requesting: false
            }
        case 'POST_WORK_ORDERS': 
            return {
                ...state, 
                workOrders: action.workOrders, 
                requesting: false
            }
        case 'PATCH_WORK_ORDERS': 
            return {
                ...state, 
                workOrders: action.workOrder, 
                requesting: false
            }
        default:
            return state;
    }
}
export default workOrdersReducer;