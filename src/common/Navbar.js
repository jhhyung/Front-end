import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModal from "./CategoryModal";
import styled from "styled-components";

import { ReactComponent as Icon_category } from "../svg/Icon_category.svg";
import { ReactComponent as Icon_home } from "../svg/Icon_home.svg";
import { ReactComponent as Icon_collection } from "../svg/Icon_collection.svg";
import { ReactComponent as Icon_search } from "../svg/Icon_search.svg";

const Navbar = () => {
  const nav = useNavigate();

  const [isCategoryShown, setIsCategoryShown] = useState(false);
  const [chooseNav, setNav] = ["1", "1", "black", "black"];
  return (
    <>
      {isCategoryShown && (
        <CategoryModal
          setIsCategoryShown={setIsCategoryShown}
          isCategoryShown={isCategoryShown}
        />
      )}
      <Nav>
        <Wrap onClick={() => setIsCategoryShown(!isCategoryShown)}>
          <Icon_category fill="black" />
          <Name>카테고리</Name>
        </Wrap>
        <Wrap onClick={() => nav("/search")}>
          <Icon_search fill="black" />
          <Name>검색</Name>
        </Wrap>
        <Wrap onClick={() => nav("/")}>
          <Icon_home fill="#efefef" />
          <Name>메인</Name>
        </Wrap>
        <Wrap onClick={() => nav("/mypage")}>
          <Icon_collection fill="#efefef" />
          <Name>내튜닝</Name>
        </Wrap>
      </Nav>
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  /* 화면 하단에 navbar위치 고정 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 100;

  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  // border: 1px solid black;

  height: 5.625rem;

  background-color: #efefef;

  // /* 나중에 지울 코드 */
  // & div {
  //   border: 1px solid red;
  //   display: block;
  //   width: 100%;
  //   text-align: center;
  //   cursor: pointer;
  // }
`;
const Name = styled.span`
  margin-top: 3px;
`;
const Wrap = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  cursor: pointer;
  align-items: center;
`;
