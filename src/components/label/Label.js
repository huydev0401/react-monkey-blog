import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.grayDark};
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
