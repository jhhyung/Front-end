import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../../elements/Button";
import useInputs from "../../hooks/useInput";
import icon_addvideo from "../../svg/icon_addvideo.svg";
import icon_add from "../../svg/icon_add.svg";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  postCollection,
} from "../../redux/modules/collectionSlice";

const AddCollectionForm = () => {
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.myCollectionSlice.category.data
  );
  const videoList = useSelector((state) => state.myCollectionSlice.videoList);

  const [{ collectionTitle, description, category_id }, onChange, reset] =
    useInputs({
      collectionTitle: localStorage.getItem("title")
        ? localStorage.getItem("title")
        : "",
      description: localStorage.getItem("description")
        ? localStorage.getItem("description")
        : "",
      category_id: localStorage.getItem("category")
        ? localStorage.getItem("category")
        : "",
    });
  const videos = videoList.map((x) => x.videoId);
  const addData = { category_id, collectionTitle, description, videos };

  const onClickHandler = (e) => {
    if (
      collectionTitle === "" ||
      description === "" ||
      videoList.length === 0 ||
      category_id === "0"
    ) {
      alert("모두 입력해주세요");
      return;
    } else {
      dispatch(postCollection(addData));
      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("category");
    }
  };
  //todo required 효과넣기
  //todo 버튼 disabled효과 주기

  return (
    <>
      <TitleBox>
        <Title
          onClick={() => {
            nav(-1);
            localStorage.removeItem("title");
            localStorage.removeItem("description");
            localStorage.removeItem("description");
            localStorage.removeItem("category");
          }}
        >
          &lt;
        </Title>
        <Title>컬렉션 만들기</Title>

        <Btn onClick={onClickHandler}>확인</Btn>
      </TitleBox>

      <Form>
        <Wrap>
          <Label>
            제목 <Required>*</Required>
          </Label>
          <Input
            placeholder="컬랙션 제목을 입력하세요"
            name="collectionTitle"
            onChange={onChange}
            value={collectionTitle}
          />
        </Wrap>
        <Wrap>
          <Label>
            카테고리<Required>*</Required>
          </Label>
          <Select name="category_id" onChange={onChange} value={category_id}>
            <Option value="0">카테고리를 선택해주세요</Option>
            {categories?.map((option, idx) => {
              return (
                <Option value={option._id} key={idx}>
                  {option.categoryName}
                </Option>
              );
            })}
          </Select>
        </Wrap>
        <Wrap>
          {" "}
          <Label>
            설명<Required>*</Required>
          </Label>
          <TextArea
            placeholder="컬랙션 설명을 넣어주세요"
            name="description"
            onChange={onChange}
            value={description}
          />
        </Wrap>
        <Wrap>
          <Label>
            영상추가<Required>*</Required>
          </Label>
          <AddVideoBox>
            <StVideo
              onClick={() => {
                localStorage.setItem("title", collectionTitle);
                localStorage.setItem("description", description);
                localStorage.setItem("category", category_id);
                nav("/mypage/add/search");
              }}
            >
              <Icon src={icon_add} />
            </StVideo>
            {videoList?.map((x, idx) => {
              return <div key={idx}>{x.title}</div>;
            })}
          </AddVideoBox>
        </Wrap>
      </Form>
    </>
  );
};
export default AddCollectionForm;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 123.8%;
  padding: 5px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Btn = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 123.8%;
  padding: 5px;
`;
const Required = styled.p`
  color: #b295e9;
  margin-left: 5px;
`;
const Label = styled.label`
  display: flex;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 123.8%;
  margin-bottom: 12px;
`;
const Input = styled.input`
  margin-bottom: 12px;
  border: #b295e9 solid;
  width: 343px;
  height: 40px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  margin-bottom: 12px;
  border: #b295e9 solid;
  width: 343px;
  height: 78px;
`;
const Select = styled.select`
  margin-bottom: 12px;
  border: #b295e9 solid;
  width: 343px;
  height: 40px;
`;
const Option = styled.option``;
const AddVideoBox = styled.div`
  border-style: solid;
  width: 343px;
  height: 40px;
`;
const StVideo = styled.div`
  width: 164px;
  height: 90px;
  border: #b295e9 solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
