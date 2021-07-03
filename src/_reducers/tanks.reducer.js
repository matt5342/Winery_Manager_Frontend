import { tankConstants } from '../_constants';

export function tanks(state = {}, action) {
    switch (action.type) {
		case tankConstants.SUBMIT_REQUEST:
            return { submitting: true };
        case tankConstants.SUBMIT_SUCCESS:
            return {};
        case tankConstants.SUBMIT_FAILURE:
            return {};
        case tankConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case tankConstants.GETALL_SUCCESS:
            return {
                items: action.tanks
            };
        case tankConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case tankConstants.GETSECTION_REQUEST:
            return {
                loading: true
            };
        case tankConstants.GETSECTION_SUCCESS:
            return {
                items: action.tanks
            };
        case tankConstants.GETSECTION_FAILURE:
            return {
                error: action.error
            };
        case tankConstants.DELETE_REQUEST:
            // add 'deleting:true' property to tank being deleted
            return {
                ...state,
                items: state.items.map(tank =>
                    tank.id === action.id
                        ? { ...tank, deleting: true }
                        : tank
                )
            };
        case tankConstants.DELETE_SUCCESS:
            // remove deleted tank from state
            return {
                items: state.items.filter(tank => tank.id !== action.id)
            };
        case tankConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to tank
            return {
                ...state,
                items: state.items.map(tank => {
                    if (tank.id === action.id) {
                        // make copy of tank without 'deleting:true' property
                        const { deleting, ...tankCopy } = tank;
                        // return copy of tank with 'deleteError:[error]' property
                        return { ...tankCopy, deleteError: action.error };
                    }

                    return tank;
                })
            };
        default:
            return state
    }
}