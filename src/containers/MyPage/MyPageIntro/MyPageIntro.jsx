import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Avatar } from "@/components";
import { colors, fontSize, lineHeight, fontWeight } from "@/_shared";

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

// TODO : 프로필 정보 상태관리
const MyPageIntro = ({ authState, ...props }) => {
  return (
    <>
      <Layout {...props}>
        <ContentBox>
          <Avatar size="extraLarge" src={authState.src ?? null} />
          <TitleBox>
            <Title {...props}>{authState.nickname ?? "Anonymous"}</Title>
            <SubTitle {...props}>
              {authState.name ?? "아직 인증이 완료되지 않았어요"}
            </SubTitle>
          </TitleBox>
        </ContentBox>
      </Layout>
    </>
  );
};

MyPageIntro.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
  data: PropTypes.arrayOf(Object),
};

MyPageIntro.defaultProps = {
  theme: THEME.LIGHT,
};

export default MyPageIntro;

const titleColor = {
  light: colors.gray800,
  dark: colors.gray25,
};

const subtitleColor = {
  light: colors.gray400,
  dark: colors.gray500,
};

const borderColor = {
  light: colors.gray100,
  dark: colors.gray900,
};

const Layout = styled.div`
  width: 100vw;
  height: 400px;
  padding: 0 0 0 300px;
  border-bottom: 1px solid ${(props) => borderColor[props.theme]};
`;

const ContentBox = styled.div`
  display: flex;
  /* justify-content: center; */
  max-width: 1280px;
  padding: 200px 0 0 0;
  margin: auto;
  gap: 3rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  height: 150px;
`;

const Title = styled.div`
  line-height: ${lineHeight.h2};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.h2};
  color: ${(props) => titleColor[props.theme]};
`;

const SubTitle = styled.div`
  height: ${lineHeight.h4};

  font-size: ${fontSize.p};
  color: ${(props) => subtitleColor[props.theme]};
`;