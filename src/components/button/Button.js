import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";

const ButtonStyles = styled.button`
  padding: 0 25px;
  cursor: pointer;
  line-height: 1;
  height: ${(props) => props.height || "66px"};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner /> : children;
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

/**
 * @param {boolean} isLoading Loading status
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
