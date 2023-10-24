import React from "react";
import { styled } from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const InputButton = (props: Props) => {
  return <Input type="submit" value={props.text} />;
};

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--firefly);
  margin-block: 1rem 2rem;
  color: var(--babyPowder);
  font-weight: bold;
  font-family: var(--secondary-font);
  cursor: pointer;
  border: unset;
  border-radius: 4px;

  &:hover {
    background-color: var(--gunmetal);
  }
`;

export default InputButton;
