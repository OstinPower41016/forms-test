import * as React from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";
import { useDispatch } from "react-redux";

import logo from "./assets/images/logo.png";
import Input from "../Input";
import Select from "../Select";
import cities from "../../cities.json";
import Spoiler from "../Spoiler";
import Button from "../Button";
import sources from "../../sources.json";
import { submitData } from "../../store/form/formSlice";
interface IMainScreenProps {}

const MainScreen: React.FunctionComponent<IMainScreenProps> = (props) => {
  const prefferSourcesData = sources.map((source) => ({
    id: uniqueId(),
    name: source,
  }));
  const dispatch = useDispatch();

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(submitData());
  };

  return (
    <div className="container mx-auto mt-8 h-screen flex flex-col ">
      <div className="flex justify-between items-center">
        <TextContent>
          <img src={logo} alt="Логотип" />
          <p className="mt-8 font-semibold font-sf-ui text-xl">
            Оставьте заявку и станьте частью нашей команды
          </p>
          <p className="mt-8">
            Компания SK Design приглашает к взаимовыгодному сотрудничеству креативных дизайнеров,
            архитекторов и декораторов, дизайн-бюро и интерьерные студии — все, кто дизайн интерьера
            сделали своим призванием.
          </p>
          <p className="mt-4">
            Партнерство мы видим как доверительные отношения, основанные на честности реализации
            бизнес идей в сфере создания и продаж современной, качественной, удобной, функциональной
            и эксклюзивной мебели.
          </p>
          <p className="mt-4">
            Ознакомиться с проектами можете в нашем <a href="#">портфолио</a>. Если Вы оформляете
            интерьеры жилых или коммерческих помещений — мы с радостью поможем Вам: составим
            уникальные условия сотрудничества, предоставим 3D модели (уточняйте у менеджеров) и
            разработаем коммерческое предложение к Вашему проекту или изображениям.
          </p>
        </TextContent>
        <FormContent className="">
          <Form className="p-8" onSubmit={(e) => onSubmitHandler(e)}>
            <div className="flex justify-between flex-wrap">
              <Input legend="Ваше имя *" placeholder="Иван" nameField="name" required />
              <Input
                legend="Номер телефона *"
                placeholder="+7 (000) 000-00-00"
                type="tel"
                nameField="tel"
                required
              />
              <Input
                legend="E-mail *"
                placeholder="example@skdesign.ru"
                type="email"
                nameField="email"
                required
              />
              <Input
                legend="Ссылка на профиль *"
                placeholder="instagram.com/skde…"
                type="url"
                nameField="linkToProfile"
                required
              />
            </div>
            <Select defaultValue="Выберите город *" options={cities} nameField="city" required />
            <Input
              legend="Название организации/студии"
              placeholder="SK Design"
              className="mt-2"
              nameField="org"
            />
            <Spoiler className="mt-2">
              <Input
                legend="Получатель"
                placeholder="ФИО"
                className="w-full"
                nameField="recipient"
              />
              <Select
                defaultValue="От куда узнали про нас?"
                options={prefferSourcesData}
                nameField="source"
              />
            </Spoiler>
            <Button className="mt-4" />
          </Form>
        </FormContent>
      </div>
    </div>
  );
};

const Form = styled.form`
  & > div > div > fieldset:nth-of-type(even) {
    margin-right: 0.5rem;
  }
  & > div > div > fieldset:not(:first-of-type, :nth-of-type(2)) {
    margin-top: 1rem;
  }
`;

const TextContent = styled.div`
  flex: 0 0 60%;
  & > p > a {
    color: var(--legend-color-active);
  }
`;
const FormContent = styled.div`
  background: white;
  box-shadow: 0px 5px 20px 0px #35323824;
  flex: 0 0 35%;
`;

export default MainScreen;
