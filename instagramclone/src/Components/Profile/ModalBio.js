import React, { useState } from "react";
import classes from "../../css/prof.module.css";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { str } from "../../firebase";
const ModalBio = (props) => {
  const [fl, setFl] = useState(null);
  return (
    <div className={classes.modalbio}>
      <div className={classes.modalbio__content}>
        <h1 className={classes.head}>Change Profile Photo</h1>
        <button
          className={classes.btnbio}
          onClick={() => {
            if (fl !== null) {
              props.onModalState(true);

              const bioimg = str.ref(`bioimage/${fl.name}`);
              const uploadTask = bioimg.put(fl);
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
                      db.collection("bioimgurl")
                        .doc(auth.currentUser.email)
                        .set({
                          bioimageurl: downloadURL,
                        })
                        .then(() => {
                          props.onModalState(false);
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
            props.onCk(true);
            props.onrmv(true);
            props.onBio(fl);
            props.onModalToggler(false);
          }}
          disabled={fl === null}
        >
          Upload Photo
        </button>
        <br />
        <input
          type="file"
          onChange={(e) => {
            setFl(e.target.files[0]);
          }}
        />
        <button
          className={classes.btnbio}
          onClick={() => {
            props.onModalToggler(false);
            props.onrmv(false);
          }}
        >
          Remove Current Photo
        </button>
        <button
          className={classes.btnbio}
          onClick={() => {
            props.onModalToggler(false);
            props.onCk(false);
            props.onrmv(true);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalBio;
