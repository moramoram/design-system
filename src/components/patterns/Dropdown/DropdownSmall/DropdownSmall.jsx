import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { DropdownItem } from "../DropdownItem";
import { colors, shadows } from "@/_shared";

const THEME = {
  DARK: "dark",
  LIGHT: "light",
};

const Dropdown = ({ items, ...props }) => {
  return (
    <Layout {...props}>
      <MenuBox {...props}>
        {items.map(({ name, title, onClick }) => (
          <DropdownItem
            children={title}
            key={name}
            onClick={onClick}
            {...props}
          />
        ))}
      </MenuBox>
    </Layout>
  );
};

Dropdown.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
  items: PropTypes.array.isRequired,
};

Dropdown.defaultProps = {
  theme: THEME.LIGHT,
  items: [
    {
      name: "edit",
      title: "수정",
      onClick: () => console.log("수정"),
    },
    {
      name: "delete",
      title: "삭제",
      onClick: () => console.log("삭제"),
    },
  ],
};

export default Dropdown;

const borderColor = {
  dark: colors.gray800,
  light: colors.gray100,
};

const bgColor = {
  dark: colors.gray900,
  light: colors.white,
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;

  width: 100px;
  border-radius: 8px;
  border: 1px solid ${(props) => borderColor[props.theme]};

  background-color: ${(props) => bgColor[props.theme]};
  box-shadow: ${shadows.base};
`;

const MenuBox = styled.div`
  padding: 4px 0;

  > div {
    justify-content: center;
  }
`;
