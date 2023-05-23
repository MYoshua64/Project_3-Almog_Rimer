import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import { formValidator } from "../../../Utils/FormValidator";
import { ChangeEvent, useEffect } from "react";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Page";
    localStorage.removeItem("rememberUser");
  });

  async function send(credentials: CredentialsModel) {
    try {
      formValidator.validateLoginForm(credentials);
      await authService.login(credentials);
      notifyService.success("Welcome back!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  function setRememberUser(event: ChangeEvent<HTMLInputElement>) {
    const remember = event.target.checked;
    if (remember) {
      localStorage.setItem("rememberUser", "true");
    } else {
      localStorage.removeItem("rememberUser");
    }
  }

  return (
    <div className="Login Box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(send)}>
        <label>Email: </label>
        <input type="email" {...register("mailAddress")} />
        <br />

        <label>Password: </label>
        <input type="password" {...register("password")} />
        <br />

        <div>
          <label>Remember Me? </label>
          <input type="checkbox" onChange={setRememberUser} />
        </div>

        <button>Login</button>
      </form>
      <hr />
      <div>
        New user? <NavLink to={"/register"}>Register</NavLink>
      </div>
    </div>
  );
}

export default Login;
