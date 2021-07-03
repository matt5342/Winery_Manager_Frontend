import { workOrderConstants } from '../_constants';

export function workOrders(state = {}, action) {
    switch (action.type) {
		case workOrderConstants.SUBMIT_REQUEST:
            return { submitting: true };
        case workOrderConstants.SUBMIT_SUCCESS:
            return {};
        case workOrderConstants.SUBMIT_FAILURE:
            return {};
        case workOrderConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case workOrderConstants.GETALL_SUCCESS:
            return {
                items: action.workOrders
            };
        case workOrderConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case workOrderConstants.DELETE_REQUEST:
            // add 'deleting:true' property to workOrder being deleted
            return {
                ...state,
                items: state.items.map(workOrder =>
                    workOrder.id === action.id
                        ? { ...workOrder, deleting: true }
                        : workOrder
                )
            };
        case workOrderConstants.DELETE_SUCCESS:
            // remove deleted workOrder from state
            return {
                items: state.items.filter(workOrder => workOrder.id !== action.id)
            };
        case workOrderConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to workOrder
            return {
                ...state,
                items: state.items.map(workOrder => {
                    if (workOrder.id === action.id) {
                        // make copy of workOrder without 'deleting:true' property
                        const { deleting, ...workOrderCopy } = workOrder;
                        // return copy of workOrder with 'deleteError:[error]' property
                        return { ...workOrderCopy, deleteError: action.error };
                    }

                    return workOrder;
                })
            };
        default:
            return state
    }
}