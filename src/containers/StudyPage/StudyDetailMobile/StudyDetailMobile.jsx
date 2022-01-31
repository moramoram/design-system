import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { CommentList } from "@/containers";
import {
  Avatar,
  Toc,
  CommentInput,
  ImageBoxResponsive,
  Badge,
  Button,
  BookMark,
  SideBarItem,
} from "@/components";
import { Icon } from "@/foundations";
import { colors, fontSize, lineHeight, fontWeight, loadings } from "@/_shared";

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const StudyDetailMobile = ({
  titleData,
  tocItem,
  contentData,
  commentData,
  isLoading,
  data,
  badges,
  ...props
}) => {
  const [isMarked, setIsMarked] = useState(false);

  return (
    <>
      <Layout>
        <ImageBoxResponsive
          className="thumbnail"
          isLoading={isLoading}
          {...props}
        />

        <TitleBox {...props}>
          <Highlight {...props}>{titleData.highlight}</Highlight>
          <Title {...props}>{titleData.title}</Title>
          <SubTitle {...props}>
            <Avatar size="medium" src={titleData.src} {...props} />
            {titleData.subtitle}
          </SubTitle>
          <SideBarBox>
            {summaryData.map(({ title, icon, id }) => (
              <SideBarItem
                className="contents-item"
                title={title}
                icon={icon}
                isLoading={isLoading}
                description={data[id]}
                key={id}
                {...props}
              />
            ))}
          </SideBarBox>
          <BadgeBox>
            {badges.map((children, idx) => {
              return (
                <Badge
                  className="badge-item"
                  key={idx}
                  isLoading={isLoading}
                  mode="secondary"
                  color="gray100"
                  isBold
                  {...props}
                >
                  {children}
                </Badge>
              );
            })}
          </BadgeBox>
        </TitleBox>
        <Toc items={tocItem} {...props} />
        <Content {...props}>{contentData}</Content>
        <CommentBox>
          <BoxTitle {...props}>댓글</BoxTitle>
          <BoxDescription {...props}>
            총 {commentData.length}개의 댓글이 달렸습니다.
          </BoxDescription>
          <CommentInput {...props} />
          <CommentList data={commentData} {...props} />
        </CommentBox>
      </Layout>
      <FixedBox>
        <ButtonBg {...props} />
        <ButtonBox {...props}>
          <Button
            isLoading={isLoading}
            mode={isMarked ? "active" : "secondary"}
            minWidth="380px"
            onClick={() => setIsMarked(!isMarked)}
            {...props}
          >
            {isMarked ? (
              <>
                <BookMark mode="primary" /> 북마크 완료
              </>
            ) : (
              <>
                <Icon icon="bookmark" /> 북마크 하기
              </>
            )}
          </Button>
        </ButtonBox>
      </FixedBox>
    </>
  );
};

StudyDetailMobile.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
  data: PropTypes.object,
};

StudyDetailMobile.defaultProps = {
  theme: THEME.LIGHT,
};

export default StudyDetailMobile;

const summaryData = [
  {
    title: "종류",
    icon: "target",
    id: "type",
  },
  {
    title: "목표 기업",
    icon: "building",
    id: "target",
  },
  {
    title: "모집 인원",
    icon: "users",
    id: "people",
  },
  {
    title: "스터디 지역",
    icon: "mapPin",
    id: "location",
  },
];

const bgColor = {
  light: colors.white,
  dark: colors.black,
};

const titleColor = {
  light: colors.gray900,
  dark: colors.gray25,
};

const textColor = {
  light: colors.gray700,
  dark: colors.gray300,
};

const subtitleColor = {
  light: colors.gray400,
  dark: colors.gray500,
};

const borderColor = {
  dark: colors.gray700,
  light: colors.gray200,
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 100px 12px 100px 12px;
  padding-top: 100px;

  overflow: hidden;
  margin: auto;
  max-width: 940px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > div {
    border-radius: 4px;
    animation: ${(props) => props.isLoading && loadings[props.theme]};
  }
`;

const SideBarBox = styled.div`
  margin: 10px 0px;
`;

const BadgeBox = styled.div`
  display: flex;
  gap: 5px;
  margin: 20px 10px;
`;

const Highlight = styled.div`
  min-width: 70px;
  min-height: ${lineHeight.h4};

  font-size: ${fontSize.h4};
  font-weight: ${fontWeight.bold};
  color: ${colors.blue100};
`;

const Title = styled.div`
  min-width: 160px;
  min-height: ${lineHeight.h2};

  font-weight: ${fontWeight.bold};
  font-size: calc(${fontSize.h2} - 2px);
  color: ${(props) => titleColor[props.theme]};
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 160px;
  min-height: ${lineHeight.h4};

  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.h4};
  color: ${(props) => subtitleColor[props.theme]};
`;

const Content = styled.div`
  padding: 0 1rem 2rem 1rem;
  color: ${(props) => textColor[props.theme]};

  h3 {
    margin-bottom: 0;
  }

  ul {
    padding-left: 32px;
  }
`;

const BoxTitle = styled.div`
  padding: 4rem 0 0.2rem 0;
  min-height: ${lineHeight.h3};

  border-top: 1px solid ${(props) => borderColor[props.theme]};
  color: ${(props) => titleColor[props.theme]};

  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.h3};
`;

const BoxDescription = styled.div`
  padding-bottom: 2rem;
  color: ${(props) => subtitleColor[props.theme]};
  font-size: ${fontSize.p};
`;

const CommentBox = styled.div``;

const FixedBox = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;

  padding: 0px 12px 20px 12px;
  background: ${(props) => bgColor[props.theme]};

  > button {
    flex-grow: 1;
    padding: 0;
  }
`;

const ButtonBg = styled.div`
  width: 100%;
  height: 2rem;
  background-image: linear-gradient(
    to top,
    ${(props) => bgColor[props.theme]},
    ${colors.transparent}
  );
`;