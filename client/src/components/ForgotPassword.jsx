import { useState } from "react";
import "../scss/forgotPassword.scss";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, reset } from "../redux/authSlice";
import { useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success(message);
      navigate("/");
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <p>
          Please enter the email address you registered your account with. We
          will send you the reset password link to this email.
        </p>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ))}
        <button type="submit">Send Email</button>
        <span>
          Want to login? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
