import React from "react";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    font-size: 40px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 60px;
    font-weight: 600;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .question {
    margin-bottom: 20px;
    a {
      color: ${(props) => props.theme.primary};
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="monkey blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
