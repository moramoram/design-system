import React, { useState, useEffect } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticatedState, navTypeState } from "@/recoil";

import { useMediaQuery } from "react-responsive";

import { JobIntro, JobMain, JobMainMobile, ErrorBoundary } from "@/containers";
import { throttle } from "@/utils";
const JobsPage = () => {
  const setNavType = useSetRecoilState(navTypeState);
  const [offset, setOffset] = useState(0);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const category = isAuthenticated ? categoryData : categoryData.slice(0, 3);

  useEffect(() => {
    !!offset ? setNavType("default") : setNavType("transparent");
    return () => {
      setNavType("default");
    };
  }, [offset, setNavType]);

  useEffect(() => {
    const onScroll = throttle(() => setOffset(window.pageYOffset));
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const isPc = useMediaQuery({ query: "(min-width:980px)" });
  const isMobile = useMediaQuery({ query: "(max-width:980px)" });

  return (
    <ErrorBoundary fallback={<div />}>
      <JobIntro />
      {isPc && <JobMain categoryData={category} />}
      {isMobile && <JobMainMobile categoryData={category} />}
    </ErrorBoundary>
  );
};

export default JobsPage;

const categoryData = [
  {
    id: 1,
    title: "전체",
  },
  {
    id: 2,
    title: "마감 임박",
  },
  {
    id: 3,
    title: "싸피 채용관",
  },
  {
    id: 4,
    title: "내 관심 공고",
  },
];
