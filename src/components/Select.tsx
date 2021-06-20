import * as React from "react";
import styled, { keyframes } from "styled-components";
import cn from "classnames";
import { useDispatch } from "react-redux";

import Icon from "./Icon";
import { checkRequiredField, setData } from "../store/form/formSlice";
import { TFieldNames } from "../types";
import { useAppSelector } from "../hooks/redux";
import ErrorMessage from "./ErrorMessage";

interface ISelectProps {
  defaultValue: string;
  options: { id: string; name: string }[];
  nameField: TFieldNames;
  className?: string;
  required?: boolean;
}

const Select: React.FunctionComponent<ISelectProps> = (props) => {
  const [isOpen, setSelect] = React.useState(false);
  const currentSelect = useAppSelector((state) => state.form.data[props.nameField].value);
  const dispatch = useDispatch();
  const wrapper = React.useRef<HTMLDivElement>(null);
  const errorArr = useAppSelector((state) => state.form.listRequiredFields);
  const [errorMsg, setError] = React.useState("");

  const getErrorMessage = () => {
    const error = errorArr.find((item) => item.fieldName === props.nameField);
    if (error?.isInvalid) {
      setError(error.msg);
    } else {
      setError("");
    }
  };

  const handlerSelect = (e: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    if (e.target.nodeName === "LI") {
      // @ts-ignore
      setSelect(false);
      // @ts-ignore
      dispatch(setData({ fieldName: props.nameField, value: e.target.outerText }));
      if (props.required) {
        setError("");
        dispatch(
          checkRequiredField({ fieldName: props.nameField, defaultValue: props.defaultValue }),
        );
      }
    } else {
      setSelect(!isOpen);
      if (isOpen && props.required) {
        dispatch(
          checkRequiredField({ fieldName: props.nameField, defaultValue: props.defaultValue }),
        );
        getErrorMessage();
      }
    }
  };

  const onBlurHandler = () => {
    setSelect(false);
    if (props.required) {
      dispatch(
        checkRequiredField({ fieldName: props.nameField, defaultValue: props.defaultValue }),
      );
      getErrorMessage();
    }
  };

  return (
    <div className="flex flex-col">
      <Wrapper
        tabIndex={1}
        className="relative cursor-pointer"
        onClick={(e) => handlerSelect(e)}
        onBlur={onBlurHandler}
        ref={wrapper}
      >
        <SelectElement
          className={cn(
            "flex justify-between mx-auto mt-4 rounded py-2 px-5 items-center relative z-10",
            {
              [props.className!]: props.className,
            },
          )}
          isOpen={isOpen}
          errorMsg={!!errorMsg}
        >
          <SelectValue isOpen={isOpen} currentValue={currentSelect} errorMsg={!!errorMsg}>
            <p className="default_value absolute">{props.defaultValue}</p>
            {currentSelect}
          </SelectValue>
          <Icon isOpen={isOpen} />
        </SelectElement>
        <SelectItems className="absolute invisible" isOpen={isOpen}>
          {props.options.map((opt) => {
            return (
              <SelectItem className="p-2" key={opt.id}>
                {opt.name}
              </SelectItem>
            );
          })}
        </SelectItems>
      </Wrapper>
      {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : null}
    </div>
  );
};

interface IProps {
  isOpen: boolean;
  errorMsg: boolean;
}
interface IPropsWithCurrentValue extends IProps {
  currentValue: string;
}

const Wrapper = styled.div``;

const SelectElement = styled.div`
  min-height: 37px;

  background: white;
  transition: 1s;
  border: 1px solid
    ${(props: IProps) =>
      props.isOpen
        ? "var(--border-color-active)"
        : props.errorMsg
        ? "var(--error-color)"
        : "var(--border-color)"};
`;

const SelectValue = styled.p`
  color: var(--text-color);
  & > p.default_value {
    transition: 1s;
    top: 6px;
    color: ${(props: IPropsWithCurrentValue) =>
      props.isOpen
        ? "var(--legend-color-active)"
        : props.errorMsg
        ? "var(--error-color)"
        : "var(--legend-color)"};

    transform: ${(props: IPropsWithCurrentValue) =>
      props.isOpen
        ? "scale(0.8) translate(-18px, -22px);"
        : !!props.currentValue
        ? "scale(0.8) translate(-18px, -22px)"
        : "scale(1) translate(0, 0);"};
    background: white;
  }
`;

const SelectItems = styled.ul`
  display: inline-flex;
  flex-direction: column;
  right: 0;
  z-index: 1;
  animation: ${(props: { isOpen: boolean }) => (props.isOpen ? itemsVisible : itemsHidden)} 0.5s
    forwards;
`;

const SelectItem = styled.li`
  border: 1px solid var(--border-color);
  background: white;
`;

const itemsVisible = keyframes`
  from {
    visibility: visible;
    opacity: 0;
    transform: translateY(-100%);
  }
  to { 
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

const itemsHidden = keyframes`
  from {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
  99.9% { 
    opacity: 0;
    transform: translateY(-100%);
  }
  to { 
    opacity: 0;
    transform: translateY(-100%);
    visibility: hidden
  }
`;

export default Select;
