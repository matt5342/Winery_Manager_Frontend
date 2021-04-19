import fetchAllTanks from "./fetchAllTanks"
import TriggerModalMessage from "../components/TriggerModalMessage"
import { render } from "react-dom"


export default function patchWorkOrder(attributes) {
    return (dispatch) => {
        // debugger
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
            .then(r => r.json())
            .then(workOrder => {
                // debugger
                if (Object.keys(workOrder).includes("message")){

                    render(<TriggerModalMessage message={workOrder.message} />, 
                        document.getElementById("single-tank")) 
                }
                else {
                    dispatch({ type: "PATCH_WORK_ORDER", workOrder })
                }
            })
            .then(dispatch(fetchAllTanks())) 
    }
}
