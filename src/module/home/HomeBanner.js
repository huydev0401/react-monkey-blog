import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner {
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-weight: 700;
      font-size: 48px;
      margin-bottom: 28px;
    }
    &-desc {
      line-height: 1.8;
      margin-bottom: 40px;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum,
              praesentium voluptatem unde reiciendis blanditiis dolorem atque,
              soluta quas non veritatis fuga, adipisci sequi asperiores
              voluptatibus tempore. Alias cupiditate saepe veritatis!
            </p>
            <Button
              to="/sign-up"
              kind="secondary"
              style={{
                display: "inline-flex",
                width: "100%",
                maxWidth: "230px",
              }}
            >
              Get Started
            </Button>
          </div>
          <div className="banner-img">
            <img src="/banner-img.png" alt="monkey blogging" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
