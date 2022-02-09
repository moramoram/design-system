import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { DropdownSmall } from "@/components";
import { Icon } from "@/foundations";
import { colors, fontSize, fontWeight, animations } from "@/_shared";

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const Sort = ({ items, ...props }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [current, setCurrent] = useState(items[0]);

  const dropdownItems = items.map((item, idx) => ({
    onClick: () => {
      setCurrent(items[idx]);
      setDropdownOpen(!dropdownOpen);
    },
    ...item,
  }));

  return (
    <>
      <Layout>
        <Button onClick={() => setDropdownOpen(!dropdownOpen)} {...props}>
          <Text {...props}>{current.title}</Text>
          <Icon icon="chevronDown" />
        </Button>
        {dropdownOpen && (
          <DropdownSmall
            className="dropdown"
            items={dropdownItems}
            {...props}
          />
        )}
      </Layout>
    </>
  );
};

Sort.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
  items: PropTypes.array,
};

Sort.defaultProps = {
  theme: THEME.LIGHT,
};

export default Sort;

const Layout = styled.div`
  display: flex;
  position: relative;

  .dropdown {
    top: 2rem;
    left: -1.4rem;
    z-index: 9999;
    animation: ${animations.dropdown} 0.3s cubic-bezier(0.3, 0, 0, 1);
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray500};

  cursor: pointer;
`;

const Text = styled.div`
  width: 100%;
  margin-left: 8px;

  font-size: ${fontSize.sm};
  color: ${colors.gray500};

  user-select: none;
`;