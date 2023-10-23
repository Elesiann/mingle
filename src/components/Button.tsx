import { styled } from "styled-components";

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
  textColor?: string;
  outline?: {
    border?: string;
    color?: string;
  };
  style?: "filled" | "outlined";
  linkable?: boolean;
  fontWeight?: string;
  uppercase?: boolean;
  hover?: {
    color?: string;
    textColor?: string;
  };
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonComponent styles={props} onClick={props.onClick}>
      {props.text}
    </ButtonComponent>
  );
};

const ButtonComponent = styled.button<{ styles: ButtonProps }>`
  padding: 0.75rem 2rem;
  background-color: ${(props) =>
    props.styles.style === "outlined"
      ? "none"
      : props.styles.color || "var(--firefly)"};
  border: ${(props) => props.styles.outline?.border || "none"};
  border-radius: 0.25rem;
  color: ${(props) => props.styles.textColor || "var(--bgWhite)"};
  font-weight: ${(props) => props.styles.fontWeight || "bold"};
  text-transform: ${(props) => (props.styles.uppercase ? "uppercase" : "none")};

  :hover {
    background-color: ${(props) =>
      props.styles.style === "outlined"
        ? props.styles.color || "var(--firefly)"
        : "none"};
    color: ${(props) =>
      props.styles.style === "outlined"
        ? "var(--bgWhite)"
        : props.styles.textColor || "var(--bgWhite)"};
    border: ${(props) =>
      props.styles.style === "outlined" ? "none" : "2px solid var(--firefly)"};
  }
`;

export default Button;
