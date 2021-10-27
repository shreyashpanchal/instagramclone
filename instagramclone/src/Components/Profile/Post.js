import React, { useState, useEffect } from "react";
import classes from "../../css/prof.module.css";
import { db } from "../../firebase";
import { useParams } from "react-router";
import { auth } from "../../firebase";

const Post = () => {
  const upperurl = useParams();
  const [posts, setPost] = useState([]);
  useEffect(() => {
    if (
      upperurl.username === auth.currentUser.email.replace("@gmail.com", "")
    ) {
      db.collection("postimgurl")
        .doc(auth.currentUser.email)
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setPost([]);
          } else {
            setPost(doc.data().postimageurls);
          }
        });
    } else {
      db.collection("postimgurl")

        .doc(upperurl.username + "@gmail.com")
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            setPost([]);
          } else {
            const posts1=doc.data().postimageurls;
            
            setPost(posts1);
          }
        });
    }
  }, [upperurl]);
  return (
    <div className={classes.photos}>
      
      {posts.map((data, index) => {
        return <img key={index} src={data} alt="postimg" />;
      })}
    </div>
  );
};

export default Post;
