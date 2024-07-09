import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    try {
      const endpoint = userObj.userType === "admin" ? 'admin-api/user' : 'user-api/user';
      const res = await axios.post(`http://localhost:4000/${endpoint}`, userObj);

      if (res.data.message === "User created") {
        // Navigate to login
        navigate('/signin');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("There was an error creating the account:", error);
      setErr("User with the given ID already exists");
    }
  }

  return (
    <div className="body">
      <h1 className="text-center display-5">Form</h1>
      {err && <p className="text-danger text-center mt-3 fs-3">{err}</p>}
      <form className=" signupform" onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <h2 className="signup">Sign up</h2>
        <div>
          <label>
            Register as
          </label>
          <div className="form-check form-check-inline m-2">
            <input
              type="radio"
              className="form-check-input radio-input"
              id="admin"
              value="admin"
              {...register("userType", { required: true })}
            />
            <label htmlFor="admin">Admin</label>
          </div>
          <div className="form-check form-check-inline m-2">
            <input
              type="radio"
              className="form-check-input radio-input"
              id="user"
              value="user"
              {...register("userType", { required: true })}
            />
            <label htmlFor="user">Faculty</label>
          </div>
          {errors.userType && <p className="form-error">User type is required</p>}
        </div>
        <div className="container gap-5">
          <div className="input">
            <div className="mb-3">
              <input
                type="text"
                id="facultyId"
                placeholder="Faculty ID"
                className="form-control"
                {...register("facultyId", {
                  required: true,
                  minLength: 6,
                  maxLength: 25,
                })}
              />
              {errors.facultyId?.type === "required" && <p className="form-error">Faculty ID  is mandatory</p>}
              {errors.facultyId?.type === "minLength" && <p className="form-error">Faculty ID should be at least 6 characters</p>}
              {errors.facultyId?.type === "maxLength" && <p className="form-error">Faculty ID should be at most 25 characters</p>}
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && <p className="form-error">Password is mandatory</p>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && <p className="form-error">Email is mandatory</p>}
            </div>
          </div>
          
          <button className="btn submit" type="submit">Sign up</button>
          <p className="text">Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
