import React, { useState } from "react";
import classes from "../../css/NavBar.module.css";
import HomeIcon from "@material-ui/icons/Home";
import logo from "../../assests/ig.png";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { auth } from "../../firebase";
const NavBar = () => {
  const [auth1Status, setAuth1Status] = useState("");
  const [searchuser, setSearchuser] = useState([]);
  const [location, setlocationUser] = useState("");
  auth.onAuthStateChanged((user) => {
    if (user) {
      setAuth1Status(user.email.replace("@gmail.com", ""));
    } else {
      setAuth1Status("");
    }
  });
  const suers = () => {
    db.collection("following")
      .doc(auth.currentUser.email)
      .get()
      .then((doc) => {
        let datas = doc.data().Followings;
        let i;
        let flag = 0;
        for (i = 0; i < datas.length; i++) {
          if (datas[i] === searchuser) {
            flag = 1;
          }
        }
        if (flag === 0) {
          setlocationUser("NotExist");
        } else {
          setlocationUser(searchuser);
        }
      })
      .catch((err) => {
        setlocationUser("NotExist");
        console.log(err);
      });
  };
  return (
    <>
      {location === "NotExist" && <Redirect to="/NotExist" />}
      {location === searchuser && <Redirect to={`${location}`} />}
      <div className={classes.nav}>
        <Link to="/">
          <div className={classes.ig_logo}>
            <img src={logo} alt="lg" />
          </div>
        </Link>

        <div className={classes.search}>
          <input
            required
            type="text"
            value={searchuser}
            onChange={(e) => {
              setSearchuser(e.target.value);
            }}
          />

          <SearchIcon onClick={suers} className={classes.muis} />
        </div>
        <div className={classes.navlinks}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <HomeIcon className={classes.hm} />
          </Link>

          <SendIcon className={classes.hm} />

          <FavoriteBorderIcon className={classes.hm} />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/${auth1Status}`}
          >
            <AccountCircleIcon className={classes.hm} />
          </Link>
          
          <button
            className={classes.logout}
            onClick={(e) => {
              e.preventDefault();
              auth
                .signOut()
                .then(() => {})
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
