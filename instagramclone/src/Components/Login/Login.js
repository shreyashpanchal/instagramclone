import React, { useState} from "react";
import classes from "../../css/login.module.css";
import { auth } from "../../firebase";
import rt from '../../assests/rotateig.png'
import ig_logo from "../../assests/ig_logo.png";
import igbg from '../../assests/igbg.png'
import { db } from "../../firebase";
const Login = () => {
  const [logToggler, setlogToggler] = useState(true);
  const [status, setStatus] = useState("Log In");
  
  
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  
  const loginTogglerHandler = () => {
    setlogToggler((prev) => !prev);
    setStatus((prev) => {
      if (prev === "Log In") {
        setStatus("Sign up");
      } else {
        setStatus("Log In");
      }
    });
  };
  const Signin = (e) => {
    e.preventDefault();
    if(email.includes("@gmail.com")===true){
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
      setEmail("");
      return;
    }
  };
  const Signup = (e) => {
    e.preventDefault();
if(email.includes("@gmail.com")===true)
{
  auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        

        db.collection("users").doc(email).set({
          bio,
          username,
          email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
}
  else {
    setEmail("");
    return;
  }
  };

  
  return (
    <>
    <img className={classes.igimg} alt="img_logo" src={igbg}/>
      <div className={classes.auth}>
        <div className={classes.logo}>
          <img src={ig_logo} alt="logo" />
        </div>
        {logToggler && (
          <div className={classes.para}>
            <p>Sign up to see photos and videos from your friends</p>
          </div>
        )}
        <div className={classes.form}>
          {logToggler && (
            <form onSubmit={Signup}>
              <input
                value={username}
                required
                placeholder="Enter Your Username"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <input
              placeholder="Enter your Bio"
              required
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                type="text"
              />
              <br />
              <input
              required
              placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              />
              <br />
              <input
              placeholder="Enter Your Password"
                value={pass}
                required
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type="password"
              />
              <br />
              <button>Sign up</button>
            </form>
          )}
          {logToggler === false && (<>
            <form className={classes.lgf} onSubmit={Signin}>
              <input
                value={email}
                required
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              />
              <br />
              <input
                value={pass}
                required
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type="password"
              />
              <br />
              <button>Sign in</button>
            </form>
            <img className={classes.rotate} alt="rotate_img" src={rt}/>
            </>
          )}
        </div>
        {logToggler && (
          <p className={classes.idp}>
            By signing up,you agree to our terms.Data Policy and Cookies Policy
          </p>
        )}
      </div>
      <div className={classes.minibox}>
        <h2>
          Have an account?<span>  </span>
          <span className={classes.toggle} onClick={loginTogglerHandler}>
            {status}
          </span>
        </h2>
      </div>
    </>
  );
};

export default Login;
