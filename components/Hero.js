import styled from "styled-components";

const Hero = () => {
  return (
    <HeroSection className="light hero">
      <div className="heroInner">
        <span>
          <h1>Olympian &amp; Paralympian Online Experiences</h1>
          <a href="#" className="btn btn-light">
            Explore Now
          </a>
        </span>
      </div>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  background: linear-gradient(to bottom, #0a0c2c80 3rem, transparent 10rem),
    url(/images/hero.jpg);
  background-position: center, bottom left;
  background-size: cover, cover;
  height: fit-content;
  color: var(--light);
  padding: 15rem var(--sidePadding) 6rem;
  .heroInner {
    display: flex;
    max-width: var(--containerWidth);
    margin: 0 auto;
  }
  span {
    max-width: var(--maxWidth);
  }
  h1 {
    font-weight: 900;
    font-size: clamp(2rem, 5.5vw, 3.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 576px) {
    background: linear-gradient(to bottom, #0a0c2c80 3rem, transparent),
      url(images/hero-sm.jpg);
    background-position: center, bottom left;
    background-size: cover, cover;
    align-items: flex-start;
    padding-top: 7.5rem;
    height: 75vh;
    max-height: 720px;
  }
`;