export default function patchWorkOrder(attributes) {
    return (dispatch) => {
        dispatch({ type: "PATCH_WORK_ORDER"})
            let reqObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    work_order: {
                        final_volume: attributes.final_volume,
                        in_tank: attributes.in_tank
                    }
                })
            }
            fetch('http://localhost:3000/work_orders/' + attributes.work_order_id, reqObj)
            // .then(r => r.json())
            // .then(tank => {
            //     debugger
            // })
    }

}