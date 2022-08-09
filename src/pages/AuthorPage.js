import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("user.username", "==", slug));
    onSnapshot(queries, (snapshot) => {
      const result = [];
      snapshot.forEach((item) => {
        result.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPosts(result);
    });
  }, [slug]);
  console.log(posts);
  console.log(slug);
  if (!posts.length < 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="mt-10">
          <Heading>Các bài viết của tác giả: {slug.toUpperCase()}</Heading>
          <div className="grid-layout grid-layout--primary">
            {posts.length > 0 &&
              posts.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
