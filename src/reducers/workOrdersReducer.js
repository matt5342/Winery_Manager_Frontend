
const workOrdersReducer = (state = { workOrders: [], requesting: false }, action) => {
    // debugger
    switch (action.type) {
        case 'POST_WORK_ORDERS': 
            return {
                ...state, 
                workOrders: action.workOrders, 
                requesting: false
            }
        default:
            return state;
    }
}
export default workOrdersReducer;