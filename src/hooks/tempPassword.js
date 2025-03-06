import Cookies from "js-cookie";
import parseJWT from "./decodeJWT";
import router from "@/router";

export default function checkTempPassword(){
    const token = Cookies.get('jwt');

    if (token) {
        const decodedToken = parseJWT(token);

        let userId = decodedToken.user_id

        fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
        .then(res => res.json())
        .then(json => {
            if (json && json.is_temp_password){
                router.push('/password');
            }
            else {
                router.push('/');
            }
        })

        
    }
    else {
        router.push('/')
    }
}