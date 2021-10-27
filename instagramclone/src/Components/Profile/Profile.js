import React, { useState } from "react";

import NavBar from "../NavBar/NavBar";
import Bio from "./Bio";
import { useParams } from "react-router";
import Post from "./Post";
import ModalBio from "./ModalBio.js";
import classes from "../../css/Profile.module.css";

const Profile = (props) => {
  const [posts, setPost] = useState([]);

  const [rmv, setrmv] = useState(true);
  const [biourl, setBioUrl] = useState("");
  const [ck, setck] = useState(false);
  const urlupper = useParams();

  const checkbutton = () => {
    setck(true);
  };
  const imgurl = (data) => {
    setBioUrl(URL.createObjectURL(data));
  };
  const [modalToggler, setModalToggler] = useState(false);

  return (
    <>
      {modalToggler === true && (
        <ModalBio
          onModalState={props.onModalState}
          onrmv={setrmv}
          onCk={checkbutton}
          onBio={imgurl}
          onModalToggler={setModalToggler}
        />
      )}
      <NavBar />
      <div className={classes.content}>
        <Bio
          onModalState={props.onModalState}
          onFollwing={props.onFollwing}
          setPost={setPost}
          ck={ck}
          rmv={rmv}
          bioimgurl={biourl}
          onModalToggler={setModalToggler}
        />
        <Post />
      </div>
    </>
  );
};

export default Profile;
