import { TFieldNames } from "../../types";

const validator = (type: TFieldNames, value: string, defaultValue?: string) => {
  switch (type) {
    case "name":
      if (value.trim() && value.trim().length >= 2) {
        return { isInvalid: false, msg: "" };
      } else {
        return { isInvalid: true, msg: "Обязательное поле" };
      }
    case "tel":
      if (!value.includes("_")) {
        return { isInvalid: false, msg: "" };
      } else {
        return { isInvalid: true, msg: "Обязательное поле" };
      }
    case "email":
      if (value.trim() && value.match(/^\S+@\S+$/)) {
        return { isInvalid: false, msg: "" };
      } else {
        return { isInvalid: true, msg: "Обязательное поле" };
      }
    case "linkToProfile":
      if (
        value.trim() &&
        value.trim().length >= 3 &&
        value.match(/^(ftp|http|https):\/\/[^ "]+$/)
      ) {
        return { isInvalid: false, msg: "" };
      } else {
        return { isInvalid: true, msg: "Обязательное поле" };
      }
    case "city":
      if (value !== defaultValue) {
        return { isInvalid: false, msg: "" };
      } else {
        return { isInvalid: true, msg: "Обязательное поле" };
      }
  }
};

export default validator;
