import { useState } from "react";
import "../scss/registration.scss";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../redux/authSlice";
import { useEffect } from "react";

const Registration = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("User Registered Successfully");
      navigate("/");
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      pattern: "^[\\w\\s]{3,}$",
      errormessage: "Username should be atleast 3 characters",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errormessage: "It should be a valid email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Password should be atleast 6 characters",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      pattern: values.password,
      errormessage: "Passwords do not match",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };

    dispatch(register(userData));
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Register</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Registration;
