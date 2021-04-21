import fetchTanks from "./fetchTanks"
import fetchLots from "./fetchLots"
import TriggerModalMessage from "../components/TriggerModalMessage"
import { render } from "react-dom"
import fetchAllTanks from "./fetchAllTanks"


export default function postLot(attributes) {
    return (dispatch) => {
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                lot: {
                    name: attributes.name, 
                    volume: attributes.volume, 
                    vintage: attributes.vintage, 
                    color: attributes.color, 
                    status: 'finished'
                }
            })
        }
        fetch('https://winery-manager.herokuapp.com/lots/' + attributes.tank_id, reqObj)
        .then(r => r.json())
        .then(lot => {
            // debugger
            if (Object.keys(lot).includes("message")){
                render(<TriggerModalMessage message={lot.message} />, 
                    document.getElementById("tank-map")) 
            }
            else {
                dispatch({ type: 'POST_LOT', lot })
            }
        })
        .then(dispatch(fetchTanks(attributes.section_id))) 
    }

}