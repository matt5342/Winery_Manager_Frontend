import { sectionContstants } from '../_constants'
import { sectionService } from '../_services'
import { alertActions } from './alert'
// import { history } from '../_helpers';

export const sectionActions = {
	submit,
	getAll, 
	delete: _delete
}

function submit(section) {
	return dispatch => {
		dispatch(request(section))
		
		sectionService.submit(section)
			.then(
				section => {
					dispatch(success());
					// history.push("/admin");
					dispatch(alertActions.success("Section successfully added"));
				},
				error => {
                    const message =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(message))
				}
			)
	}
	function request(section) { return { type: sectionContstants.SUBMIT_REQUEST, section } }
	function success(section) { return { type: sectionContstants.SUBMIT_SUCCESS, section } }
	function failure(error) { return { type: sectionContstants.SUBMIT_FAILURE, error } }
}
function getAll(){
    return dispatch => {
		dispatch(request())

		sectionService.getAll()
			.then(
				sections => dispatch(success(sections)),
				error => dispatch(failure(error.toString()))
			)
    }

	function request() { return {type: sectionContstants.GETALL_REQUEST } }
	function success(sections) { return {type: sectionContstants.GETALL_SUCCESS, sections } }
	function failure(error) { return {type: sectionContstants.GETALL_FAILURE, error } }
}

function _delete(id){
    return dispatch => {
        dispatch(request(id));

        sectionService.delete(id)
            .then(
                section => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: sectionContstants.DELETE_REQUEST, id } }
    function success(id) { return { type: sectionContstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: sectionContstants.DELETE_FAILURE, id, error } }
}