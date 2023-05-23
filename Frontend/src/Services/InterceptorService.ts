import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {
  //Create interceptor
  public create() {
    //Register to any request
    axios.interceptors.request.use(
      (requestObj) => {
        //Get token from Redux
        const token = authStore.getState().token;

        //If we're loggin in (aka token exists in Redux, set authorization header)
        if (token) {
          //Add authorization header containing the token
          requestObj.headers["authorization"] = "Bearer " + token; //Don't forget the space!!!!
        }

        //Return the updated request object
        return requestObj;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;
