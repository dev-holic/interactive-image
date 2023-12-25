import React, { useState } from "react";
import { InteractiveImage } from "./InteractiveImage";
import { useAnimationCssInitializer } from "./useAnimationCssInitializer";
import './InteractiveImages.css';

type Props = {
    imgList: string[];
}

export const InteractiveImages = ({imgList}: Props) => {
  const [page, setPage] = useState(0);

  const onClickContainer = () => {
    setPage(prevPage => (prevPage + 1) % imgList.length);
  };

  useAnimationCssInitializer();

  return (
    <>
      <div onClick={onClickContainer} className="interactive-image-container">
        <InteractiveImage imgSrc={imgList[page]} />
      </div>
    </>
  );
};
