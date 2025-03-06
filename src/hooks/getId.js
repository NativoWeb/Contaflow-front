// Decodificar el JWT
export default function getIdByToken(token){
    try {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        // Parsear el json para tomar el id del usuario
        let json = JSON.parse(jsonPayload)
        return json.user_id;
    }
    catch (e) {
        return null
    }
}