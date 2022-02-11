import React, { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { useSetRecoilState } from "recoil";
import { navTypeState } from "@/recoil/theme";
import {
  StudyIntro,
  StudyMain,
  StudyMainMobile,
  ErrorBoundary,
} from "@/containers";

const StudyPage = () => {
  const setNavType = useSetRecoilState(navTypeState);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    !!offset ? setNavType("default") : setNavType("transparent");
    return () => {
      setNavType("default");
    };
  }, [offset, setNavType]);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const isPc = useMediaQuery({ query: "(min-width:980px)" });
  const isMobile = useMediaQuery({ query: "(max-width:980px)" });

  return (
    <ErrorBoundary fallback={<div />}>
      <StudyIntro />
      {isPc && <StudyMain categoryData={categoryData} />}
      {isMobile && <StudyMainMobile categoryData={categoryData} />}
    </ErrorBoundary>
  );
};

const categoryData = [
  {
    id: 1,
    title: "전체",
  },
  {
    id: 2,
    title: "나의 스터디",
  },
];
export default StudyPage;
