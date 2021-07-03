import { workOrderConstants } from '../_constants'
import { workOrderService } from '../_services'
import { alertActions } from './alert'
// import { history } from '../_helpers';

export const workOrderActions = {
	submit,
	getAll, 
	delete: _delete
}

function submit(workOrder) {
	return dispatch => {
		dispatch(request(workOrder))
		
		workOrderService.submit(workOrder)
			.then(
				workOrder => {
					dispatch(success());
					// history.push("/admin");
					dispatch(alertActions.success("Work Order successfully added"));
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
	function request(workOrder) { return { type: workOrderConstants.SUBMIT_REQUEST, workOrder } }
	function success(workOrder) { return { type: workOrderConstants.SUBMIT_SUCCESS, workOrder } }
	function failure(error) { return { type: workOrderConstants.SUBMIT_FAILURE, error } }
}
function getAll(){
    return dispatch => {
		dispatch(request())

		workOrderService.getAll()
			.then(
				wordOrders => dispatch(success(wordOrders)),
				error => dispatch(failure(error.toString()))
			)
    }

	function request() { return {type: workOrderConstants.GETALL_REQUEST } }
	function success(wordOrders) { return {type: workOrderConstants.GETALL_SUCCESS, wordOrders } }
	function failure(error) { return {type: workOrderConstants.GETALL_FAILURE, error } }
}

function _delete(id){
    return dispatch => {
        dispatch(request(id));

        workOrderService.delete(id)
            .then(
                workOrder => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: workOrderConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: workOrderConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: workOrderConstants.DELETE_FAILURE, id, error } }
}