import fetchTanks from "./fetchTanks"
import fetchLots from "./fetchLots"

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
        fetch('http://localhost:3000/lots/' + attributes.tank_id, reqObj)
        .then(r => r.json())
        .then(lot => {
            dispatch({ type: 'POST_LOT', lot })
        }).then(dispatch(fetchTanks(attributes.section_id))) 
    }

}