import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon, IconSocial, Typography } from "@/foundations";
import { colors, fontWeight, shadows } from "@/_shared";

const SignUpModal = ({ children, ...props }) => {
  return (
    <>
      <Overlay />
      <ModalBox>
        <Layout {...props}>
          <CloseIconBox>
            <Icon icon="x" />
          </CloseIconBox>
          <ContentBox>
            <Title type="h2" {...props}>
              {children}
            </Title>
            <ButtonBox>
              <Button className="google">
                <IconSocial icon="google" />
                <Typography type="button">Google 계정으로 로그인</Typography>
              </Button>
              <Button className="github">
                <IconSocial icon="github" />
                <Typography type="button">Github 계정으로 로그인</Typography>
              </Button>
            </ButtonBox>
            <AskingForHelp>도움이 필요하신가요?</AskingForHelp>
          </ContentBox>
        </Layout>
      </ModalBox>
    </>
  );
};

export default SignUpModal;

const bgColor = {
  dark: colors.black,
  light: colors.white,
};

const textColor = {
  dark: colors.gray25,
  light: colors.gray900,
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
`;

const ModalBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  top: 50%;

  width: 500px;
  height: 600px;
  margin: auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: ${shadows.base};

  background-color: ${(props) => bgColor[props.theme]};
  transform: translateY(-50%);
`;

const CloseIconBox = styled.div`
  display: flex;
  justify-content: flex-end;

  svg {
    width: 18px;
    stroke: ${colors.gray400};
    cursor: pointer;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 3rem;
`;

const Title = styled(Typography)`
  color: ${(props) => textColor[props.theme]};
  text-align: center;
  white-space: pre-line;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;

  .google {
    background-color: ${colors.gray25};
    color: ${colors.gray600};
  }

  .github {
    background-color: black;
    color: ${colors.white};

    svg {
      fill: white;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  height: 54px;
  width: 255px;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 0px solid;

  box-shadow: ${shadows.base};
  cursor: pointer;
`;

const AskingForHelp = styled.div`
  text-align: center;
  color: ${colors.blue100};
  font-weight: ${fontWeight.bold};

  cursor: pointer;
`;