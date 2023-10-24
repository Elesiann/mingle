import React from "react";
import { styled } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
}

const Input = (props: InputProps) => {
  return (
    <InputContainer>
      <input
        {...props.register}
        type={props.type}
        placeholder={props.placeholder}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  input {
    padding: 0.5rem 1rem;
    border: 1px solid var(--gray);
    border-radius: 8px;
    margin-block: 0.5rem;
    width: 100%;
  }
`;

export default Input;
