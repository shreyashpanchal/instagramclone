import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { ChatBubbleOutline } from "@material-ui/icons";
import Send from "@material-ui/icons/Send";
import classes from "../../css/Main.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import a from "../../assests/postsample/a.jpg";
import b from "../../assests/postsample/b.jpg";
import c from "../../assests/postsample/c.jpg";
import d from "../../assests/postsample/d.jpg";
import e from "../../assests/postsample/e.jpg";
import f from "../../assests/postsample/f.jpg";
import g from "../../assests/postsample/g.jpg";
import h from "../../assests/postsample/h.jpg";
import i from "../../assests/postsample/i.jpg";
import j from "../../assests/postsample/j.jpg";
import k from "../../assests/postsample/k.jpg";
import l from "../../assests/postsample/l.jpg";
import m from "../../assests/postsample/m.jpg";
import n from "../../assests/postsample/n.jpg";
import o from "../../assests/postsample/o.jpg";
import p from "../../assests/postsample/p.jpg";
import q from "../../assests/postsample/q.jpg";
import s from "../../assests/postsample/s.jpg";
import r from "../../assests/postsample/r.jpg";

import "../../css/op.css";
function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
}
const intial_images = [
  { dcid: makeid(), image: a },
  { dcid: makeid(), image: b },
  { dcid: makeid(), image: c },
  { dcid: makeid(), image: d },
  { dcid: makeid(), image: e },
  { dcid: makeid(), image: f },
  { dcid: makeid(), image: g },
  { dcid: makeid(), image: h },
  { dcid: makeid(), image: i },
  { dcid: makeid(), image: j },
  { dcid: makeid(), image: k },
  { dcid: makeid(), image: l },
  { dcid: makeid(), image: m },
  { dcid: makeid(), image: n },
  { dcid: makeid(), image: o },
  { dcid: makeid(), image: p },
  { dcid: makeid(), image: q },
  { dcid: makeid(), image: r },
  { dcid: makeid(), image: s },
];
const randomize = (array) => {
  array.sort(() => Math.random() - 0.5);
};
const Main = (props) => {
  const [comment, setComment] = useState([]);
  const [colr, setColr] = useState("fbi");
  const [data, setData] = useState(intial_images);

  const [inpcmnt, sinpcmnt] = useState("");

  const changerColorHeart = () => {
    if (colr === "fbi") {
      setColr("fbi1");
    } else {
      setColr("fbi");
    }
  };
  const cmnthandler = (e) => {
    e.preventDefault();
    if (inpcmnt === "") {
      return;
    }
    setComment((prev) => {
      sinpcmnt("");
      return [inpcmnt, ...prev];
    });
  };
  //
  useEffect(() => {
    props.onModalState(true);
    db.collection("following")
      .doc(auth.currentUser.email)
      .get()
      .then((doc) => {
        const users = doc.data().Followings;

        db.collection("postimgurl")
          .get()
          .then((doc) => {
            let yup = [];

            doc.forEach((docs) => {
              const dcid = docs.id.replace("@gmail.com", "");
              let i;
              for (i = 0; i < users.length; i++) {
                if (dcid === users[i]) {
                  let j;
                  for (j = 0; j < docs.data().postimageurls.length; j++) {
                    yup.push({
                      dcid,
                      image: docs.data().postimageurls[j],
                    });
                  }
                }
              }
            });

            setData((prev) => {
              const arr = prev.concat(yup);
              randomize(arr);

              return arr;
            });

            props.onModalState(false);
          });
      })
      .catch((err) => {
        props.onModalState(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavBar />

      <div className={classes.userpost}>
        {data.map((doc, index) => {
          return (
            <>
              <Link
              key={index}
                style={{ textDecoration: "none", color: "black" }}
                to={`/${doc.dcid}`}
              >
                <div  className={classes.postname}>
                  {doc.dcid}
                </div>
              </Link>

              <div className={classes.postimg}>
                <img  src={doc.image} alt="images" />
              </div>

              <div className={classes.postbtn}>
                <FavoriteBorder onClick={changerColorHeart} className={colr} />
                <ChatBubbleOutline className={classes.fbi} />
                <Send className={classes.fbi} />
              </div>
              <div className={classes.postcmnt}>
                {comment.length === 0 && <h3>No Comments There</h3>}
                {comment.map((data, index) => {
                  return (
                    <div id="ok" key={index}>
                      <span className={classes.spn1}>
                        {auth.currentUser.email.replace("@gmail.com", "")}{" "}
                        <span> </span>
                      </span>
                      <span className={classes.spn2}>{data}</span>
                    </div>
                  );
                })}
              </div>
              <div className={classes.postinput}>
                <input
                  placeholder="Add a Comment"
                  value={inpcmnt}
                  type="text"
                  onChange={(e) => {
                    sinpcmnt(e.target.value);
                  }}
                />
                <button className={classes.cmntbtn} onClick={cmnthandler}>
                  ADD
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Main;
