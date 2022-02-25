import styled from "styled-components";

import { Typography } from "@/foundations";
import { colors, fontWeight, shadows } from "@/_shared";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
`;

export const ModalBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  position: relative;
  top: 50%;

  width: 500px;
  height: 600px;
  margin: auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: ${shadows.base};

  background-color: ${colors.white};
  transform: translateY(-50%);

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const CloseIconBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;

  svg {
    width: 18px;
    stroke: ${colors.gray500};
    cursor: pointer;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 3rem;
`;

export const Title = styled(Typography)`
  color: ${colors.gray900};
  text-align: center;
  white-space: pre-line;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;

  .google {
    background-color: ${colors.gray25};
    color: ${colors.gray600};
    transition: 0.3s;

    :hover {
      background-color: ${colors.gray50};
    }
  }

  .github {
    background-color: black;
    color: ${colors.white};
    transition: 0.3s;

    :hover {
      background-color: ${colors.black};
    }

    path {
      fill: white;
    }
  }
`;

export const Button = styled.button`
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

export const AskingForHelp = styled.div`
  text-align: center;
  color: ${colors.blue100};
  font-weight: ${fontWeight.bold};

  cursor: pointer;
`;