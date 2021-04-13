export default function postLot(attributes) {
    // debugger
    return (dispatch) => {
        dispatch({ type: "POST_LOT" })
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
    }

}