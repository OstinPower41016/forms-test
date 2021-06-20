import * as React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import cn from "classnames";
import styled, { keyframes } from "styled-components";

import Icon from "./Icon";

interface ISpoilerProps {
  className?: string;
}

const Spoiler: React.FunctionComponent<ISpoilerProps> = (props) => {
  const [isOpen, setStatus] = React.useState(false);

  const spoilerTitleText = `${isOpen ? "Скрыть" : "Показать"} дополнительные поля`;

  return (
    <>
      <div
        className={cn("flex items-center cursor-pointer", { [props.className!]: props.className })}
        onClick={() => setStatus(!isOpen)}
      >
        <SpoilerTitle className="mr-2">{spoilerTitleText}</SpoilerTitle>
        <Icon isOpen={isOpen} />
      </div>
      <SpoilerContent className="mt-2" open={isOpen}>
        {props.children}
      </SpoilerContent>
    </>
  );
};

const SpoilerTitle = styled.p`
  color: var(--text-color);
`;

interface IProps {
  open: boolean;
}
const contentVisible = keyframes`
  from {
    display: block;
    opacity: 0;
  }
  to {
    display: block;
    opacity: 1;
  }
`;
const SpoilerContent = styled.div`
  display: ${(props: IProps) => (props.open ? "block" : "none")};
  animation: ${contentVisible} 1s forwards;
`;

export default Spoiler;
