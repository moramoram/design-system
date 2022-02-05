import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

import { CardResponsive } from "@/components";
import { Icon } from "@/foundations";
import { colors } from "@/_shared";

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const CardSlider = ({ data, isLoading, theme, ...props }) => {
  const items = isLoading ? cardData : data;
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const swiperParams = {
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    },
    spaceBetween: 20,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },

    modules: [Navigation],
  };

  return (
    <Layout>
      <Button ref={prevRef} theme={theme}>
        <Icon icon="chevronLeft" />
      </Button>
      <Button ref={nextRef} theme={theme}>
        <Icon icon="chevronRight" />
      </Button>
      <Swiper {...swiperParams}>
        {items.map(({ id, ...props }) => (
          <SwiperSlide key={id}>
            <CardItemLink to={id}>
              <CardResponsive
                {...cardData}
                isLoading={isLoading}
                theme={theme}
                {...props}
              />
            </CardItemLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
};

CardSlider.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
};

CardSlider.defaultProps = {
  theme: THEME.LIGHT,
};

export default CardSlider;

const cardData = new Array(6).fill({
  contents: {
    title: "",
    subtitle: "",
    highlight: "",
    src: "",
  },
  badges: ["", "", ""],
  id: "",
});

const buttonHoverColor = {
  light: colors.gray25,
  dark: colors.gray900,
};

const buttonIconColor = {
  light: colors.gray900,
  dark: colors.gray25,
};

const Layout = styled.div`
  display: flex;
  justify-content: center;

  .swiper {
    max-width: 960px;
    margin: 0 2rem;

    @media screen and (max-width: 960px) {
      margin: 0;
    }
  }

  .swiper-slide {
    width: 300px;
  }
`;

const CardItemLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  height: 36px;
  margin-top: 57px;
  border: none;
  border-radius: 4px;

  background: none;
  cursor: pointer;

  :hover {
    background-color: ${(props) => buttonHoverColor[props.theme]};
  }

  :nth-child(2) {
    order: 1;
  }

  svg {
    stroke: ${(props) => buttonIconColor[props.theme]};
  }

  @media screen and (max-width: 960px) {
    display: none;
  }
`;
