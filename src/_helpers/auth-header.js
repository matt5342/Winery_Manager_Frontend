export function authHeader(){
    let user = JSON.parse(localStorage.getItem('user'))

    if (user && user.accessToken) {
        return {
            // 'Authorization': 'Bearer ' + user.accessToken
            'Content-Type': 'application/json', 
            "Authorization": localStorage.getItem("token")
        }
    } else {
        return {}
    }
}