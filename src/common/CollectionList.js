import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionSlide from "../elements/CollectionSlide";
import { useEffect, useState } from "react";
import VideoList from "../components/mainList/VideoList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import throttle from "lodash/throttle";

// import useHandleScroll from "../hooks/useHandscroll";

const CollectionList = ({ state, setCount }) => {
  const nav = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    adaptiveHeight: false,
    arrows: false,
  };

  const useHandleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    // console.log("스크롤 이벤트 발생");
    if (scrollTop + clientHeight >= scrollHeight) {
      // console.log("페이지 끝에 스크롤이 닫았음. ");
      setCount((prev) => prev + 5);
    }
  };
  const infiniteScroll = throttle(useHandleScroll, 2000);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []);

  return (
    <>
      <ListWrap>
        {state?.map((data, idx) => {
          return (
            <Collection key={idx}>
              <SlideWrap>
                <StyleSlider {...settings}>
                  {data.thumbnails?.map((src, i) => {
                    return <VideoList key={data._id} img={src}></VideoList>;
                  })}

                  <a>더보기...</a>
                </StyleSlider>
              </SlideWrap>
              <div onClick={() => nav(`/collection/${data._id}`)}>
                {" "}
                <CollectionTitle>{data.collectionTitle}</CollectionTitle>
                <div>
                  <span>좋아요 {data.likes} /</span>
                  <span>댓글 {data.commentNum}</span>
                </div>
              </div>
            </Collection>
          );
        })}
      </ListWrap>
    </>
  );
};
export default CollectionList;

const Collection = styled.section`
  background-color: white;
`;
const SlideWrap = styled.div`
  // overflow: hidden;
  // flex-direction: row;
  // background-color: white;
  position: relative;
  border: 1px solid black;
  margin: 0 auto;
  overflow-x: hidden;
`;

const ListWrap = styled.div`
  background-color: yellow;
`;
const CollectionTitle = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 123.8%;
`;
const StyleSlider = styled(Slider)`
  /* 아이템 사이의 간격 조절 */
  & .slick-slide > div {
    margin: 0 0.3rem;
  }
  & .slick-list {
    margin: 0 -0.3rem;
  }
`;
