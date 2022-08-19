import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const AuthorBoxStyles = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  display: flex;
  border-radius: 20px;
  background-color: ${(props) => props.theme.grayF3};
  align-items: center;
  padding: 0 10px;
  .author {
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
`;

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const snapshotData = await getDoc(docRef);
      if (snapshotData.data()) {
        setUser(snapshotData.data());
      }
    }
    fetchData();
  }, [userId]);
  if (!userId) return null;
  return (
    <AuthorBoxStyles className="author">
      <div className="author-image">
        <img src={user?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname || user?.username}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </AuthorBoxStyles>
  );
};

export default AuthorBox;
