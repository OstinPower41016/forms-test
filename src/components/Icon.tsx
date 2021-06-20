import * as React from "react";
import styled, { keyframes } from "styled-components";

import { RiArrowDownSLine } from "react-icons/ri";

interface IIconProps {
  isOpen: boolean;
}

const Icon: React.FunctionComponent<IIconProps> = (props) => {
  return (
    <IconElement isOpen={props.isOpen}>
      <RiArrowDownSLine />
    </IconElement>
  );
};

const IconElement = styled.div`
  animation: ${(props: { isOpen: boolean }) =>
      props.isOpen ? rotateIconVisible : rotateIconHidden}
    0.5s forwards;
`;

const rotateIconVisible = keyframes`
  to {
    transform: rotateX(180deg) rotateY(180deg);
  }
`;
const rotateIconHidden = keyframes`
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
`;

export default Icon;
