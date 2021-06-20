import * as React from "react";
import styled from "styled-components";
import cn from "classnames";
import { useDispatch } from "react-redux";
import InputMask from "react-input-mask";

import { setData, checkRequiredField } from "../store/form/formSlice";
import { TFieldNames } from "../types";
import { useAppSelector } from "../hooks/redux";
import ErrorMessage from "./ErrorMessage";

interface IInputProps {
  legend: string;
  placeholder: string;
  nameField: TFieldNames;
  type?: string;
  className?: string;
  required?: boolean;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const [isFocused, setFocused] = React.useState(false);
  const inputField = useAppSelector((state) => state.form.data[props.nameField].value);
  const errorArr = useAppSelector((state) => state.form.listRequiredFields);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = React.useState("");

  const onInputChandeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setData({ fieldName: props.nameField, value: e.target.value }));
    if (props.required) {
      dispatch(checkRequiredField({ fieldName: props.nameField }));
    }
  };

  const onBlurInputHandler = () => {
    setFocused(false);
    if (props.required) {
      dispatch(checkRequiredField({ fieldName: props.nameField }));
      const errorMsg = errorArr.find((item) => item.fieldName === props.nameField);
      if (errorMsg?.isInvalid) {
        setErrorMsg(errorMsg.msg);
      } else {
        setErrorMsg("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Fieldset
        className={cn("py-2 px-4 rounded", { [props.className!]: props.className })}
        style={{
          borderColor: isFocused
            ? "var(--border-color-active)"
            : errorMsg
            ? "var(--error-color)"
            : "var(--border-color)",
        }}
      >
        <Legend
          style={{
            color: isFocused
              ? "var(--legend-color-active)"
              : errorMsg
              ? "var(--error-color)"
              : "var(--legend-color)",
          }}
        >
          {props.legend}
        </Legend>
        {props.type === "tel" ? (
          <InputMask
            mask="+7 (999) 999-99-99"
            onChange={(e) => onInputChandeHandler(e)}
            onFocus={() => setFocused(true)}
            onBlur={onBlurInputHandler}
            value={inputField}
          >
            {(inputProps: any) => (
              <input
                {...inputProps}
                type="tel"
                placeholder={props.placeholder}
                className="outline-none w-full"
              />
            )}
          </InputMask>
        ) : (
          <input
            type={props.type ? props.type : "text"}
            placeholder={props.placeholder}
            className="outline-none w-full"
            onFocus={() => setFocused(true)}
            onBlur={onBlurInputHandler}
            onChange={(e) => onInputChandeHandler(e)}
            value={inputField}
          />
        )}
      </Fieldset>
      {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : null}
    </div>
  );
};

const Fieldset = styled.fieldset`
  border: 1px solid var(--border-color);
  transition: 1s;
`;
const Legend = styled.legend`
  color: var(--legend-color);
  transition: 1s;
`;

export default Input;
