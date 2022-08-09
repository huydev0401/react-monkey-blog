import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
      );
      const results = [];
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) =>
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setPosts(results);
      });
    }
    fetchData();
  }, [slug]);
  if (posts.length < 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="mt-10">
          <Heading>Các bài viết trong danh mục {slug.toUpperCase()}</Heading>
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

export default CategoryPage;
