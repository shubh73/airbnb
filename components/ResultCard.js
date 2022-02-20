import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Star, Heart } from "react-feather";

const ResultCard = ({
  imgSrc,
  location,
  title,
  description,
  star,
  total,
  price,
  lat,
  onClick,
}) => {
  const [liked, setLiked] = useState(false);
  const imagesRef = useRef(null);
  const [currSlide, setCurrSlide] = useState(0);

  const scrollToImage = (index) => {
    imagesRef.current.scrollLeft = imagesRef.current.offsetWidth * index;
  };

  useEffect(() => {
    const handleScroll = (e) => {
      setCurrSlide(Math.round(e.target.scrollLeft / e.target.offsetWidth));
    };
    const imagesRefCurr = imagesRef.current;
    imagesRefCurr.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <CardDiv onClick={onClick}>
      <div ref={imagesRef} className="carousel">
        {imgSrc.map((url, index) => (
          <ImageComponent key={index} url={url} location={location} />
        ))}
      </div>
      {imgSrc?.length > 1 && (
        <div className="scroller">
          {imgSrc.map((img, index) => (
            <span
              key={index}
              className={currSlide === index ? "active" : null}
              onClick={(e) => {
                e.stopPropagation();
                scrollToImage(index);
              }}
            ></span>
          ))}
        </div>
      )}
      <Heart
        className={`heart ${liked ? "liked" : null}`}
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
      />

      <div className="details">
        <div className="rating">
          <Star className="star" /> {star}{" "}
          <small>({String(lat).split(".")[1].substring(0, 3)})</small>
        </div>
        <p className="subtitle">{location}</p>
        <h2>{title}</h2>
        <p className="description">{description}</p>
        <p className="price">
          <span>
            {price.split(" ")[0]} <small>/night</small>
          </span>
          <span className="total">{total}</span>
        </p>
      </div>
    </CardDiv>
  );
};

const ImageComponent = ({ index, url, location }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`img ${loading ? "loading" : null}`}>
      <Image
        layout="fill"
        alt={location}
        objectFit="cover"
        src={`/images/results/${url}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default ResultCard;

const CardDiv = styled.div`
  border-radius: 1rem;
  position: relative;

  .carousel {
    position: relative;
    width: 100%;
    display: fix;
    border-radius: 1rem;
    overflow: scroll;
    transition: all 0.2s;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
    .img {
      flex: 0 0 100%;
      padding-bottom: 66.67%;
      position: relative;
      scroll-snap-align: start;

      &.loading {
        animation: shimmer 2s infinite;
        background: linear-gradient(
          to right,
          #eff1f3 4%,
          #e2e2e2 25%,
          #eff1f3 36%
        );
        background-size: 1000px 100%;
      }
    }

    img {
      transition: transform 0.2s;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .scroller {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    width: fit-content;
    left: 50%;
    transform: translate(-50%, -2rem);

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }

    span {
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      background: #fff;
      opacity: 0.5;
      transition: all 0.2s;
      margin: 1rem 0.25rem;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0.1rem 0.2rem #002;
    }

    span.active {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .details {
    padding: 1rem 0.25rem;
    transition: transform 0.2s;
    width: 100%;
  }

  svg.heart {
    height: 1.5rem;
    position: absolute;
    z-index: 2;
    right: 1rem;
    top: 1rem;
    transition: all 0.2s;
    color: #fff;
    &.liked {
      stroke: var(--pink);
      fill: var(--pink);
      filter: drop-shadow(0 0.15rem 0.25rem #0008);
    }
  }

  .rating {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 0.25rem;
    small {
      color: #889;
      font-size: 100%;
      margin-left: 0.25rem;
    }
    svg {
      stroke: none;
      fill: var(--pink);
      height: 1rem;
      margin-right: 0.25rem;
    }
  }

  .subtitle {
    font-size: 1rem;
  }

  h2 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0.25rem 0 0.5rem;
    line-height: 1.2;
  }

  .price {
    font-weight: 700;
    font-size: 1.15rem;
    small {
      font-weight: 400;
    }
  }

  .description,
  .total {
    display: none;
    color: #889;
  }

  &:hover {
    background: var(--white);
    box-shadow: 0 0.5rem 1rem #48484810;

    .img img {
      transform: scale(1.05);
    }

    .details {
      transform: scale(0.95);
    }
  }

  @media (min-width: 48rem) {
    display: flex;
    gap: 1.5rem;

    .carousel {
      flex: 0 0 300px;
    }

    .details {
      padding-right: 1rem;
    }

    .description {
      display: block;
      margin-bottom: 1rem;
    }

    .subtitle,
    .description {
      display: flex;
    }

    .price {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-end;

      & .total {
        font-weight: 400;
        font-size: 0.85rem;
        color: #889;
        display: inline-block;
      }
    }

    .rating {
      position: absolute;
      bottom: 0.75rem;
      margin-left: -0.5rem;
    }

    svg.heart {
      color: var(--dark);

      &.liked {
        filter: none;
      }
    }
    .scroller {
      left: 150px;
      bottom: -1.5rem;
      span {
        box-shadow: 0 1px 2px #000;
      }
    }

    &:hover {
      background: var(--white);
      box-shadow: 0 0.5rem 1rem #48484810;

      .carousel {
        transform: scale(0.93);
      }

      .img img {
        transform: scale(1);
      }

      .details {
        transform: scale(1);
      }
    }
  }
`;
