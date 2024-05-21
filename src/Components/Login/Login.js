import { compareSync } from "bcryptjs";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onLoginSubmit(newUser) {
    fetch(`http://localhost:4000/users?facultyid=${newUser.facultyid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((userobjarray) => {
        if (userobjarray.length === 0) {
          alert("Invalid Faculty ID");
        } else {
          let result = compareSync(newUser.password, userobjarray[0].password);
          if (result === true) {
            navigate("/userdashboard", { state: userobjarray[0] });
          } else {
            alert("Invalid password");
          }
        }
      })
      .catch((err) => console.log("Err in registration form", err));
  }
  return (
    <div className="body">
      <h1 className=" text-center display-5">Form</h1>
      <form className="mt-5" onSubmit={handleSubmit(onLoginSubmit)}>
        <h2 className="login">Login</h2>
        <div className="container gap-5">
          <div className="input">
            <div className="mb-3">
              <input
                type="text"
                id="facultyid"
                placeholder="Faculty ID"
                className="form-control"
                {...register("facultyid", {
                  required: true
                })}
              />
            </div>
            {errors.facultyid?.type === "required" && (
              <p className="form-error">Faculty ID  is mandatory</p>
            )}
          
            <div className="mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="form-error">Password is mandatory</p>
            )}
          </div>
          <div className="flex">
            <input className="checkbox" type="checkbox" name=" " id=" "></input>
            <p className="text">I accept the terms of Use & Privacy Policy</p>
          </div>
          <button htmlFor="submit" className="btn mx-3 submit">
            {" "}
            Login
          </button>
          <p className="text">
            Didn't signup?<Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;