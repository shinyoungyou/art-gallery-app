import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MainPostImageList = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerEl = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const onResize = () => {
      const { width } = window.getComputedStyle(containerEl.current);
      setContainerWidth(width.slice(0, -2));
      // console.log(width);
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Container ref={containerEl}>
      <ImageList containerWidth={containerWidth} activeIndex={activeIndex}>
        {data.map((image, id) => (
          <ImageWrapper key={id}>
            <Image src={image} />
          </ImageWrapper>
        ))}
      </ImageList>
      {activeIndex > 0 && (
        <BtnPrev onClick={() => setActiveIndex((prev) => prev - 1)}>
          {"<"}
        </BtnPrev>
      )}
      {activeIndex < data.length - 1 && (
        <BtnNext onClick={() => setActiveIndex((prev) => prev + 1)}>
          {">"}
        </BtnNext>
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;
const ImageList = styled.div`
  display: flex;
  transform: ${({ containerWidth, activeIndex }) =>
    `translateX(${containerWidth * activeIndex * -1}px)`};
  transition: transform 0.5s;
`;
const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
`;

const Btn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: rgba(240, 240, 240, 0.4);
  border: none;
  cursor: pointer;
  font-size: 14px;
  width: 28px;
  height: 28px;
  color: #333;
`;
const BtnPrev = styled(Btn)`
  left: 15px;
`;
const BtnNext = styled(Btn)`
  right: 15px;
`;

export default MainPostImageList;
