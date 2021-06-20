import * as React from "react";
import styled from "styled-components";

interface IErrorMessageProps {}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = (props) => {
  return <Message className="mt-1.5 pl-2">{props.children}</Message>;
};

const Message = styled.p`
  color: var(--error-color);
`;

export default ErrorMessage;
