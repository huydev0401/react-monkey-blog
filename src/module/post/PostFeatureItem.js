import styled from "styled-components";
import slugify from "slugify";
import React from "react";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  if (!data || !data.id) return;
  const { category, user } = data;
  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-Vi");
  return (
    <PostFeatureItemStyles>
      <PostImage url={data?.image} alt="unsplash"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category?.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            date={formatDate}
            to={slugify(user?.fullname || "", { lower: true })}
            authorName={user?.fullname}
          ></PostMeta>
        </div>
        <PostTitle to={data?.slug} size="big">
          {data?.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
