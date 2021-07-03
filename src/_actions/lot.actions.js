import { lotConstants } from '../_constants'
import { lotService } from '../_services'
import { alertActions } from './alert'
// import { history } from '../_helpers';

export const lotActions = {
	submit,
	getAll, 
	delete: _delete
}

function submit(lot) {
	return dispatch => {
		dispatch(request(lot))
		
		lotService.submit(lot)
			.then(
				lot => {
					dispatch(success());
					// history.push("/admin");
					dispatch(alertActions.success("Lot successfully added"));
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
	function request(lot) { return { type: lotConstants.SUBMIT_REQUEST, lot } }
	function success(lot) { return { type: lotConstants.SUBMIT_SUCCESS, lot } }
	function failure(error) { return { type: lotConstants.SUBMIT_FAILURE, error } }
}
function getAll(){
    return dispatch => {
		dispatch(request())

		lotService.getAll()
			.then(
				lots => dispatch(success(lots)),
				error => dispatch(failure(error.toString()))
			)
    }

	function request() { return {type: lotConstants.GETALL_REQUEST } }
	function success(lots) { return {type: lotConstants.GETALL_SUCCESS, lots } }
	function failure(error) { return {type: lotConstants.GETALL_FAILURE, error } }
}

function _delete(id){
    return dispatch => {
        dispatch(request(id));

        lotService.delete(id)
            .then(
                lot => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: lotConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: lotConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: lotConstants.DELETE_FAILURE, id, error } }
}