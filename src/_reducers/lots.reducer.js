import { lotConstants } from '../_constants';

export function lots(state = {}, action) {
    switch (action.type) {
		case lotConstants.SUBMIT_REQUEST:
            return { submitting: true };
        case lotConstants.SUBMIT_SUCCESS:
            return {};
        case lotConstants.SUBMIT_FAILURE:
            return {};
        case lotConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case lotConstants.GETALL_SUCCESS:
            return {
                items: action.lots
            };
        case lotConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case lotConstants.DELETE_REQUEST:
            // add 'deleting:true' property to lot being deleted
            return {
                ...state,
                items: state.items.map(lot =>
                    lot.id === action.id
                        ? { ...lot, deleting: true }
                        : lot
                )
            };
        case lotConstants.DELETE_SUCCESS:
            // remove deleted lot from state
            return {
                items: state.items.filter(lot => lot.id !== action.id)
            };
        case lotConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to lot
            return {
                ...state,
                items: state.items.map(lot => {
                    if (lot.id === action.id) {
                        // make copy of lot without 'deleting:true' property
                        const { deleting, ...lotCopy } = lot;
                        // return copy of lot with 'deleteError:[error]' property
                        return { ...lotCopy, deleteError: action.error };
                    }

                    return lot;
                })
            };
        default:
            return state
    }
}