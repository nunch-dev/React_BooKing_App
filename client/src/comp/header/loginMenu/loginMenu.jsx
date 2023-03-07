import styled from "@emotion/styled";
import React from "react";
import { SlMenu } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { loginMenuToggles } from "../../store/global";
import { useAtom } from "jotai";
import LoginMenuBox from "./loginMenuBox/loginMenuBox";

function LoginMenu() {
  const [loginMenuToggle, setLoginMenuToggle] = useAtom(loginMenuToggles);
  const toggleLoginMenu = () => {
    if (loginMenuToggle === false) {
      setLoginMenuToggle(true);
    } else setLoginMenuToggle(false);
  };
  return (
    <LoginMenus>
      <LoginMenuIcon onClick={toggleLoginMenu}>
        <SlMenus />
        <FiUsers />
      </LoginMenuIcon>
      {loginMenuToggle === true ? <LoginMenuBox /> : ""}
    </LoginMenus>
  );
}

export default LoginMenu;
const LoginMenus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const LoginMenuIcon = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  width: 40px;
  height: 20px;
  justify-content: space-around;
  box-shadow: 0.5px 0.5px 00 #c0c0c0;
`;

const SlMenus = styled(SlMenu)`
  font-size: 7px;
`;

const FiUsers = styled(FiUser)`
  font-size: 7px;
  border-radius: 10px;
  color: white;
  width: 13px;
  height: 13px;
  background-color: gray;
`;
