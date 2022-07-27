import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NotFoundPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  .logo {
    margin-bottom: 40px;
  }
  .heading {
    font-size: 40px;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    background-color: ${(props) => props.theme.primary};
    color: white;
    font-weight: 500;
    border-radius: 8px;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className={"logo"}>
        <img srcSet="/logo.png 2x" alt="monkey blogging" />
      </NavLink>
      <h1 className="heading">Oops! Can't found this page</h1>
      <NavLink to="/" className={"back"}>
        Back to Home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
