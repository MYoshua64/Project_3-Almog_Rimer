import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import Joi from "joi";
import { formValidator } from "../../../Utils/FormValidator";
import { useEffect } from "react";

function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register Page";
  });

  async function send(user: UserModel) {
    try {
      formValidator.validateRegisterForm(user);
      await authService.register(user);
      notifyService.success("Welcome!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Register Box">
      <h2>Register</h2>

      <form onSubmit={handleSubmit(send)}>
        <label>First Name: </label>
        <input type="text" {...register("firstName")} />
        <br />
        <label>Last Name: </label>
        <input type="text" {...register("lastName")} /> <br />
        <label>Email: </label>
        <input type="email" {...register("mailAddress")} /> <br />
        <label>Password: </label>
        <input type="password" {...register("password")} /> <br />
        <button>Register</button>
      </form>
      <hr />
      <span>
        Existing user? <NavLink to={"/login"}>Login</NavLink>
      </span>
    </div>
  );
}

export default Register;
