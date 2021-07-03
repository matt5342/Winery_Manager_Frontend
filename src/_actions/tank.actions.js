import { tankConstants } from '../_constants'
import { tankService } from '../_services'
import { alertActions } from './alert'
// import { history } from '../_helpers';

export const tankActions = {
	submit,
	getAll, 
    getSection,
	delete: _delete
}

function submit(tank) {
	return dispatch => {
		dispatch(request(tank))
		
		tankService.submit(tank)
			.then(
				tank => {
					dispatch(success());
					// history.push("/admin");
					dispatch(alertActions.success("Tank successfully added"));
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
	function request(tank) { return { type: tankConstants.SUBMIT_REQUEST, tank } }
	function success(tank) { return { type: tankConstants.SUBMIT_SUCCESS, tank } }
	function failure(error) { return { type: tankConstants.SUBMIT_FAILURE, error } }
}
function getAll(){
    return dispatch => {
		dispatch(request())

		tankService.getAll()
			.then(
				tanks => dispatch(success(tanks)),
				error => dispatch(failure(error.toString()))
			)
    }

	function request() { return {type: tankConstants.GETALL_REQUEST } }
	function success(tanks) { return {type: tankConstants.GETALL_SUCCESS, tanks } }
	function failure(error) { return {type: tankConstants.GETALL_FAILURE, error } }
}

function getSection(){
    return dispatch => {
		dispatch(request())

		tankService.getSection()
			.then(
				tanks => dispatch(success(tanks)),
				error => dispatch(failure(error.toString()))
			)
    }

	function request() { return {type: tankConstants.GETSECTION_REQUEST } }
	function success(tanks) { return {type: tankConstants.GETSECTION_SUCCESS, tanks } }
	function failure(error) { return {type: tankConstants.GETSECTION_FAILURE, error } }
}

function _delete(id){
    return dispatch => {
        dispatch(request(id));

        tankService.delete(id)
            .then(
                tank => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: tankConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: tankConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: tankConstants.DELETE_FAILURE, id, error } }
}