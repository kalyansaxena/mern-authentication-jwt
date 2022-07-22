import { useState } from "react";
import "../scss/Login.scss";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../redux/authSlice";
import { useEffect } from "react";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isLogoutSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("User Login Successful");
      navigate("/");
    } else if (isLogoutSuccess) {
      toast.success("User Logout Successful");
    }
    dispatch(reset());
  }, [isSuccess, isLogoutSuccess, isError, message, navigate, dispatch]);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errormessage: "It should be a valid email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Password should be atleast 6 characters",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
        <span>
          <Link to="/forgotPassword">Forgot password?</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
