export default function postWorkOrder(attributes) {
    return (dispatch) => {
        // debugger
        dispatch({ type: "POST_WORK_ORDER" })
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                work_order: {
                    name: attributes.name, 
                    lot_id: attributes.lot_id, 
                    out_tank: attributes.out_tank, 
                    in_tank: attributes.in_tank, 
                    notes: attributes.notes,
                    status: 'Initialized'
                }
            })
        }
        fetch('http://localhost:3000/work_order/', reqObj)
    }

}