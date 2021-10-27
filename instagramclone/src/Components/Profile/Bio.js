import React, { useState, useEffect } from "react";
import classes from "../../css/prof.module.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { str } from "../../firebase";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import img from "../../assests/img.png";
import { useParams } from "react-router";

const Bio = (props) => {
  const uppername = useParams();
  const [uname, setuname] = useState("");
  const [NumberOfPost, setNumberOfPost] = useState(0);
  const [NumberofFollowing, setNumberofFollwing] = useState(0);
  const [biodetail, setbiodetail] = useState("");
  const [biofburl, setbiofburl] = useState("");
  const trueModal = () => {
    props.onModalToggler(true);
  };
  useEffect(() => {
    if (
      uppername.username === auth.currentUser.email.replace("@gmail.com", "")
    ) {
      db.collection("users")
        .doc(auth.currentUser.email)
        .onSnapshot((doc) => {
          setuname(doc.data().username);
          setbiodetail(doc.data().bio);
        });
      db.collection("bioimgurl")
        .doc(auth.currentUser.email)
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setbiofburl(img);
          } else setbiofburl(doc.data().bioimageurl);
        });
    } else {
      db.collection("users")
        .doc(uppername.username + "@gmail.com")
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setuname("");
            setbiodetail("");
          } else {
            setuname(doc.data().username);
            setbiodetail(doc.data().bio);
          }
        });
      db.collection("bioimgurl")
        .doc(uppername.username + "@gmail.com")
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setbiofburl(img);
          } else setbiofburl(doc.data().bioimageurl);
        });
    }
    db.collection("postimgurl")
      .doc(auth.currentUser.email)
      .get()
      .then((data) => {
        if (data.data() === undefined) {
          setNumberOfPost(0);
        } else {
          setNumberOfPost(data.data().postimageurls.length);
        }
      });
    db.collection("following")
      .doc(auth.currentUser.email)
      .get()
      .then((data) => {
        if (data.data() === undefined) {
          setNumberofFollwing(0);
        } else {
          setNumberofFollwing(data.data().Followings.length);
        }
      });
  }, [uppername.username]);

  const urlparam = useParams();

  const [flpost, setFlpost] = useState(null);
  useEffect(() => {
    if (
      urlparam.username === auth.currentUser.email.replace("@gmail.com", "")
    ) {
      db.collection("postimgurl")
        .doc(auth.currentUser.email)
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setNumberOfPost(0);
          } else {
            setNumberOfPost(doc.data().postimageurls.length);
          }
        });
    } else {
      db.collection("postimgurl")
        .doc(uppername.username + "@gmail.com")
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setNumberOfPost(0);
          } else {
            setNumberOfPost(doc.data().postimageurls.length);
          }
        });
    }
  }, [props.posts, uppername.username, urlparam.username]);
  const AddFollowing = () => {
    props.onModalState(true);
    db.collection("following")
      .doc(auth.currentUser.email)
      .get()
      .then((doc) => {
        let FollowingUsers = [];

        if (doc.data() === undefined) {
          FollowingUsers = [];
        } else {
          FollowingUsers = doc.data().Followings;
        }
        FollowingUsers.push(uppername.username);
        db.collection("following")
          .doc(auth.currentUser.email)
          .set({
            Followings: FollowingUsers,
          })
          .then(() => {
            props.onFollwing(FollowingUsers.length);
            props.onModalState(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filePostHandler = (e) => {
    setFlpost(e.target.files[0]);
  };
  const AddBioDataToFB = (e) => {
    e.preventDefault();
    if (flpost !== null) {
      props.onModalState(true);
      const postimg = str.ref(`postimages/${flpost.name}`);
      const uploadTask = postimg.put(flpost);
      uploadTask.on(
        "state_changed",
        () => {},
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              db.collection("postimgurl")
                .doc(auth.currentUser.email)
                .get()
                .then((doc) => {
                  let postfb = [];
                  if (doc.data() === undefined) {
                    postfb = [];
                  } else {
                    postfb = doc.data().postimageurls;
                  }
                  postfb.push(downloadURL);
                  db.collection("postimgurl")
                    .doc(auth.currentUser.email)
                    .set({
                      postimageurls: postfb,
                    })
                    .then(() => {
                      props.setPost((prev) => {
                        return [URL.createObjectURL(flpost), ...prev];
                      });
                      props.onModalState(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })

            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  };
  return (
    <>
      <div className={classes.bio}>
        <div className={classes.profpic}>
          <div
            onClick={
              auth.currentUser.email.replace("@gmail.com", "") ===
                uppername.username && trueModal
            }
            className={classes.imgcover}
          >
            <img
              alt=""
              className={
                auth.currentUser.email.replace("@gmail.com", "") ===
                uppername.username
                  ? classes.hovering
                  : classes.nothovering
              }
              src={biofburl}
            />

            {props.rmv === false && <img style={{objectFit:'contain'}} src={img} alt="" />}
          </div>
        </div>
        <div className={classes.biodata}>
          <div className={classes.wrapcss}>
            <span className={classes.biocssname}>{uname}</span>
            <span>
              {urlparam.username ===
                auth.currentUser.email.replace("@gmail.com", "") && (
                <button className={classes.spanb}>Edit Profile</button>
              )}

              {urlparam.username !==
                auth.currentUser.email.replace("@gmail.com", "") && (
                <>
                  <button className={classes.fun} onClick={AddFollowing}>
                    Follow
                  </button>
                  <button className={classes.fun}>Unfollow</button>
                </>
              )}
            </span>
            <span className={classes.sic}>
              <SettingsIcon className={classes.sc} />
            </span>
          </div>
          <div className={classes.det}>
            <span>{NumberOfPost} Posts</span>
            <span>0 followers</span>
            <span>{NumberofFollowing} following</span>
          </div>
          <div className={classes.bd}>{biodetail}</div>
          {urlparam.username ===
            auth.currentUser.email.replace("@gmail.com", "") && (
            <div className={classes.addin}>
              <form onSubmit={AddBioDataToFB}>
              <input type="file" required onChange={filePostHandler} />
              <br />
              <button >Add Post</button>
            </form></div>
          )}
        </div>
      </div>

      <hr></hr>
    </>
  );
};

export default Bio;
