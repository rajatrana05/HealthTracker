import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../services/auth";
import { toast } from "react-toastify";
import Loader from "../common/loader";
const SignIn = () => {
  const [email, setemail] = useState("");
  const [Pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (email && Pass) {
      setLoading(true);
      let header = {
        email: email,
        password: Pass,
      };
      await verifyUser(header)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.result.userId);
          setLoading(false);
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          toast.error("incorrect credentials");
          console.log(err);
        });
    } else {
      if (!email) {
        toast.warning("Email field is required");
      }
      if (!Pass) {
        toast.warning("Password field is required");
      }
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="signin">
        <div className="signin-app-container">
          <h1 className="app-header">Sign In</h1>
          <div className="info-box">
            <div>
              <div className="label">Email</div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="label">Password</div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <div>
            <button className="sign-btn" onClick={() => handleSignIn()}>
                Sign In
              </button>
            </div>
          </div>
          <div className="create-acc" onClick={() => navigate("/signup")}>
            Don't have an account?
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;