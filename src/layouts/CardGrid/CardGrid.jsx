import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { CardResponsive } from "@/components";

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const CardGrid = ({ data, theme, isLoading, ...props }) => {
  const items = isLoading ? cardData : data;
  return (
    <Layout {...props}>
      {items.map(({ id, ...props }, idx) => (
        <CardItemLink to={id} key={idx}>
          <CardResponsive theme={theme} isLoading={isLoading} {...props} />
        </CardItemLink>
      ))}
    </Layout>
  );
};

CardGrid.defaultProps = {
  theme: THEME.LIGHT,
};

CardGrid.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
};

export default CardGrid;

const Layout = styled.div`
  display: grid;
  width: 100%;
  max-width: 940px;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  gap: 20px;
`;

const CardItemLink = styled(Link)`
  text-decoration: none;
`;

const cardData = new Array(3).fill({
  contents: {
    title: "",
    subtitle: "",
    highlight: "",
    src: "",
  },
  badges: ["", "", ""],
  id: "",
});
