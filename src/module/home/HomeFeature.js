import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostFeatureItem from "module/post/PostFeatureItem";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
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
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.length > 0 &&
            posts.map((item) => (
              <PostFeatureItem key={item.id} data={item}></PostFeatureItem>
            ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
