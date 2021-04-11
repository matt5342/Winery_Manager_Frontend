export default function patchTanks(layout_array, winery_id) {
    return (dispatch) => {
        dispatch({ type: "PATCH_TANK"})
        layout_array.map(layout => {
            let reqObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    tank: {
                        xaxis: layout.x, 
                        yaxis: layout.y, 
                        width: layout.w, 
                        height: layout.h
                    }
                })
            }
            fetch('http://localhost:3000/winery/' + winery_id + '/tanks/' + layout.i, reqObj)
            // .then(r => r.json())
            // .then(tank => {
            //     debugger
            // })
        })
        // fetchTanks(winery_id)
    }

}