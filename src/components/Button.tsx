import * as React from "react";
import cn from "classnames";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useAppSelector } from "../hooks/redux";

interface IButtonProps {
  className?: string;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const listErrorLength = useAppSelector((state) => state.form.listRequiredFields).length;
  const isAnyErrors = listErrorLength === 0;
  const isLoading = useAppSelector((state) => state.form.isLoading);

  return (
    <ButtonElement
      disabled={!isAnyErrors || isLoading}
      className={cn("w-full rounded py-4 px-6 flex justify-center", {
        [props.className!]: props.className,
      })}
    >
      {isLoading ? (
        <Loader type="Circles" color="#00BFFF" height={20} width={20} />
      ) : (
        "Отправить заявку"
      )}
    </ButtonElement>
  );
};

interface IProps {
  disabled: boolean;
}

const ButtonElement = styled.button`
  background: ${(props: IProps) =>
    props.disabled ? "var(--button-disabled);" : "var(--button-color)"};
  color: ${(props: IProps) => (props.disabled ? "var(--legend-color)" : "#fff")};
`;

export default Button;
