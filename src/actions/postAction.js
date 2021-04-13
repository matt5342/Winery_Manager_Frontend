export default function postAction(attributes) {
    return (dispatch) => {
        debugger
        dispatch({ type: "POST_ACTION" })
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                action: {
                    name: attributes.name, 
                    lot_id: attributes.lot_id, 
                    tank_id: attributes.tank_id, 
                    notes: attributes.notes,
                    status: 'Initialized'
                }
            })
        }
        fetch('http://localhost:3000/actions/', reqObj)
        if (attributes.name === 'Rack'){

        }
    }

}