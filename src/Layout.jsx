import React, { useEffect } from "react";
import styled from "styled-components";

import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeState, navTypeState } from "@/recoil/theme";

import { isLoginState } from "@/recoil/auth";
import {
  modalState,
  loginModalState,
  createModalState,
  updateModalState,
} from "@/recoil/modal";
import { navMenuData, navUserData } from "@/recoil/menu";

import { Modal, ScrollTopButton } from "@/components";
import {
  Navbar,
  SignUpModal,
  CommunityCreate,
  CommunityUpdate,
  Footer,
} from "@/containers";
import { colors } from "@/_shared";

const Layout = () => {
  const theme = useRecoilValue(themeState);
  const navType = useRecoilValue(navTypeState);
  const navData = useRecoilValue(navMenuData);
  const userMenuData = useRecoilValue(navUserData);

  const isLogined = useRecoilValue(isLoginState);
  const isloginModal = useRecoilValue(loginModalState);
  const isCreateModal = useRecoilValue(createModalState);
  const isUpdateModal = useRecoilValue(updateModalState);
  const isModal = useRecoilValue(modalState);

  useEffect(() => {
    (isModal || isloginModal || isCreateModal || isUpdateModal) &&
      (document.body.style.overflow = "hidden");
    return () => (document.body.style.overflow = "unset");
  }, [isModal, isloginModal, isCreateModal, isUpdateModal]);

  return (
    <LayoutBox theme={theme}>
      {isModal && <Modal theme={theme} />}
      {isloginModal && <SignUpModal theme={theme} />}
      {isCreateModal && <CommunityCreate theme={theme} />}
      {isUpdateModal && <CommunityUpdate theme={theme} />}
      <Nav
        theme={theme}
        type={navType}
        navData={navData}
        userMenuData={userMenuData}
        isLogin={isLogined}
      />
      <Outlet />
      <ScrollTopBox>
        <ScrollTopButton
          theme={theme}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </ScrollTopBox>
      <Footer theme={theme} />
    </LayoutBox>
  );
};

export default Layout;

const bgColor = {
  light: colors.white,
  dark: colors.black,
};

const LayoutBox = styled.div`
  width: 100%;
  background: ${(props) => bgColor[props.theme]};
`;

const Nav = styled(Navbar)`
  z-index: 999;
`;

const ScrollTopBox = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
`;
