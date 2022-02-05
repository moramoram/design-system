import React, { useState } from "react";
import styled from "styled-components";

import { CommentList } from "@/containers";
import { Button, CommentInput, FeedDetail } from "@/components";
import { Icon } from "@/foundations";
import { colors, fontSize, fontWeight } from "@/_shared";

import { daysFromToday, numToMillion } from "@/utils";

const CommunityDetail = ({ ...props }) => {
  const [isLike, setIsLiked] = useState(0);

  return (
    <Layout>
      <FeedDetail {...feedData} {...props} />
      <Footer>
        <Button
          mode={isLike ? "primary" : "secondary"}
          onClick={() => setIsLiked(!isLike)}
          {...props}
        >
          <Icon icon="thumbsUp" />
          좋아요
        </Button>
        <CountBox>
          <IconBox>
            <Icon icon="thumbsUp" width="18" />
            <CountNums>{feedData.likecount}</CountNums>
          </IconBox>
          <IconBox>
            <Icon icon="messageCircle" width="18" />
            <CountNums>{feedData.commentcount}</CountNums>
          </IconBox>
          <IconBox>
            <Icon icon="eye" width="18" />
            <CountNums>{feedData.viewcount}</CountNums>
          </IconBox>
        </CountBox>
      </Footer>
      <CommentBox {...props}>
        <Title {...props}>댓글</Title>
        <CommentInput {...props} />
        <CommentList data={commentData} {...props} />
      </CommentBox>
    </Layout>
  );
};

const feedData = {
  username: "파워블로거",
  avatar: "",
  campus: "서울",
  ordinal: "6기",
  created: daysFromToday("2022-01-24"),
  title: "커뮤니티 상세 페이지 제목",
  content: (
    <>
      <p>
        <img
          src="https://file.mk.co.kr/meet/neds/2015/09/image_readtop_2015_891935_14423221542127136.jpg"
          alt="img"
        />
      </p>
      <h1>안녕하세요~~</h1>
      <p>오늘도 어김없이 여러분에게 꿀팁과 알뜰정보를 알려주러 왔어요!!</p>
      <p>
        <br />
      </p>
      <p>
        <img
          src="http://123emoji.com/wp-content/uploads/2017/08/sticker-8-45.png"
          alt="img"
        />
      </p>
      <p>
        <br />
      </p>
      <p>요즘은 바람도 쌀쌀하게 불고~~</p>
      <p>횐님들 모두 감기 조심하세요~~^^</p>
      <p>
        <br />
      </p>
      <p>
        <img
          src="http://123emoji.com/wp-content/uploads/2017/08/sticker-2-45.png"
          alt="img"
        />
      </p>
      <p>그럼 다음에 만나요!</p>
    </>
  ),
  thumbnail: "",
  likecount: numToMillion(12),
  commentcount: numToMillion(212),
  viewcount: numToMillion(2128),
};

const commentData = [
  {
    username: "Lorem",
    src: null,
    created: daysFromToday("2022-01-31"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in lorem ut sapien placerat vulputate.",
  },
  {
    username: "홍길동",
    src: null,
    created: daysFromToday("2022-01-30"),
    content:
      "Nam tempus, est id rutrum suscipit, metus mi tincidunt nulla, ut rutrum magna tortor non velit. Suspendisse gravida pretium porta. Praesent eget vestibulum mauris. Nullam aliquet enim felis, in iaculis purus tempus pharetra.",
  },
  {
    username: null,
    src: null,
    created: daysFromToday("2022-01-24"),
    content:
      "Aliquam et lectus ultricies, fringilla ipsum ac, vulputate sapien.",
  },
  {
    username: "김싸페",
    src: null,
    created: daysFromToday("2022-01-12"),
    content:
      "Integer nulla sem, eleifend non ex id, aliquam tempor tellus. Sed vehicula justo ut diam semper mollis.",
  },
  {
    username: null,
    src: null,
    created: daysFromToday("2021-12-10"),
    content:
      "Donec nec tristique arcu. Curabitur at facilisis nibh. Mauris vel nisi ipsum. Morbi vitae sapien metus. Ut et quam a erat rutrum maximus. Vestibulum non elementum enim. ",
  },
  {
    username: "아이유",
    src: null,
    created: daysFromToday("2021-07-10"),
    content:
      "Ut in bibendum metus. Duis sed egestas ante. Etiam ex tortor, vehicula ac mollis sit amet, dapibus eget urna.",
  },
  {
    username: "수지",
    src: null,
    created: daysFromToday("2020-07-10"),
    content:
      "Nam tempus, est id rutrum suscipit, metus mi tincidunt nulla, ut rutrum magna tortor non velit. Suspendisse gravida pretium porta. Praesent eget vestibulum mauris. Nullam aliquet enim felis, in iaculis purus tempus pharetra.",
  },
];

export default CommunityDetail;

const titleColor = {
  light: colors.gray900,
  dark: colors.gray25,
};

const borderColor = {
  light: colors.gray300,
  dark: colors.gray800,
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 0;

  > button {
    padding: 0 28px;
    white-space: nowrap;
  }

  @media screen and (max-width: 530px) {
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  color: ${colors.gray500};
`;

const CountNums = styled.div`
  font-size: ${fontSize.sm};
`;

const CommentBox = styled.div`
  border-top: 1px solid ${(props) => borderColor[props.theme]};
`;

const Title = styled.div`
  margin: 2rem 0;

  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.h3};
  color: ${(props) => titleColor[props.theme]};
`;