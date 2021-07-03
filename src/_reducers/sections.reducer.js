import { sectionConstants } from '../_constants';

export function sections(state = {}, action) {
    switch (action.type) {
		case sectionConstants.SUBMIT_REQUEST:
            return { submitting: true };
        case sectionConstants.SUBMIT_SUCCESS:
            return {};
        case sectionConstants.SUBMIT_FAILURE:
            return {};
        case sectionConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case sectionConstants.GETALL_SUCCESS:
            return {
                items: action.sections
            };
        case sectionConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case sectionConstants.DELETE_REQUEST:
            // add 'deleting:true' property to section being deleted
            return {
                ...state,
                items: state.items.map(section =>
                    section.id === action.id
                        ? { ...section, deleting: true }
                        : section
                )
            };
        case sectionConstants.DELETE_SUCCESS:
            // remove deleted section from state
            return {
                items: state.items.filter(section => section.id !== action.id)
            };
        case sectionConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to section
            return {
                ...state,
                items: state.items.map(section => {
                    if (section.id === action.id) {
                        // make copy of section without 'deleting:true' property
                        const { deleting, ...sectionCopy } = section;
                        // return copy of section with 'deleteError:[error]' property
                        return { ...sectionCopy, deleteError: action.error };
                    }

                    return section;
                })
            };
        default:
            return state
    }
}