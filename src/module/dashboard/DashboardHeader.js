import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userRole } from "utils/constants";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (userInfo?.email) {
      const colRef = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const results = [];
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) =>
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setData(results);
      });
    }
  }, [userInfo.email]);
  return (
    <DashboardHeaderStyles>
      {userInfo.role === userRole.ADMIN && (
        <Button to="/manage/add-post" className="header-button" height="52px">
          Write new post
        </Button>
      )}
      <Link to={`/profile?id=${data[0]?.id}`} className="header-avatar">
        <img src={userInfo?.avatar || ""} alt="" />
      </Link>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
