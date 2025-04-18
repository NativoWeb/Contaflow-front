import LoginUser from "@/views/auth/LoginView.vue";
import ChangePasswordView from "@/views/auth/ChangePasswordView.vue";
import Cookies from 'js-cookie';
import getIdByToken from "@/hooks/getId";
import ForgetPasswordView from "@/views/auth/forgetPasswordView.vue";

const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: LoginUser
  },
  {
    path: "/olvido_acceso/",
    name: "ForgotPassword",
    component: ForgetPasswordView
  },
  {
    path: "/password",
    component: ChangePasswordView,
    // En caso de que no haya un token
    beforeEnter: async (to, from, next) => {
      const token = Cookies.get('jwt')
      if (!token) {
        next('/login')
      }
      else {
        try {
          const userId = getIdByToken(token);
          const response = await fetch(`${process.env.VUE_APP_URL}/users/${userId}/`);
          const user = await response.json();

          if (user.is_temp_password) {
            return next();
          }
          else {
            return next('/home');
          }
        }
        catch (error){
          Cookies.remove('jwt');
          return next('/login')
        }
      }        
    }
  }
]

export default authRoutes;