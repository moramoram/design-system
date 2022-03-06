import styled from "styled-components";
import { Typography } from "@/foundations";
import { animations, colors, shadows } from "@/_shared";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);

  animation: ${animations.appear} 0.3s cubic-bezier(0.3, 0, 0, 1);
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
  animation: ${animations.modal} 0.4s cubic-bezier(0.3, 0, 0, 1);

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
  gap: 3rem;
  padding-top: 3rem;
`;

export const Title = styled(Typography)`
  color: ${colors.gray900};
  text-align: center;
  white-space: pre-line;
`;

export const DescriptionBorder = styled.div`
  background-color: #4a83ef22;
  border-radius: 10px;
  height: 90px;
  padding: 20px;
`;

export const Description = styled(Typography)`
  color: ${colors.gray900};
  text-align: left;
  white-space: pre-line;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;
