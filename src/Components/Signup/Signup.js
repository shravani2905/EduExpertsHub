import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { hashSync } from "bcryptjs";
function Signup() {
  let navigate = useNavigate();
  function onRegistrationSubmit(newUser) {
    let hashedPassword = hashSync(newUser.password, 5);
    newUser.password = hashedPassword;
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => console.log("Err in registration form", err));
  }
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="body">
      <h1 className=" text-center display-5">Form</h1>
      <form className="mt-5" onSubmit={handleSubmit(onRegistrationSubmit)}>
        <h2 className="signup">Sign up</h2>
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
              <p className="form-error">Faculty ID is mandatory</p>
            )}
           
            <div className="mb-3">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-control"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="form-error">Email is mandatory</p>
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
          <button className="btn submit" type="submit" disabled={false}>
            Sign up
          </button>
          <p className="text">
            Already have an account?<Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;