import { render } from "react-dom"
import TriggerModalMessage from "../components/TriggerModalMessage"
import fetchTanks from "./fetchTanks"


export default function postWorkOrder(attributes) {
    return (dispatch) => {
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
        .then(r => r.json())
        .then(workOrder => {
            let messageElement;
            if (document.getElementById('tank-map')){
                messageElement = document.getElementById('tank-map')
            }
            else if (document.getElementById('single-tank')){
                messageElement = document.getElementById('single-tank')
            } 
            else {messageElement = document.getElementById('work-order-list')}

            if (Object.keys(workOrder).includes("message")){
                render(<TriggerModalMessage message={workOrder.message} />, 
                    messageElement) 
            }
            else {
                dispatch({ type: "POST_WORK_ORDER", workOrder })
            }
        })
        .then(dispatch(fetchTanks(attributes.section_id))) 
    }

}
