import styled from "styled-components";
import Image from "next/image";

const LargeCards = ({ title, items, urlPrefix }) => {
  return (
    <CardsSection length={items.length}>
      <h2>{title}</h2>

      <div className="cards">
        {items.map((item, index) => (
          <div key={index} className="card">
            <div className="img">
              <Image
                width={500}
                height={500}
                alt={item.title}
                src={urlPrefix + item.img}
              />
            </div>
            <span>
              <h3>{item.title}</h3>
              {item.p && <p>{item.p}</p>}
            </span>
          </div>
        ))}
      </div>
    </CardsSection>
  );
};

export default LargeCards;

const CardsSection = styled.section`
  .cards {
    display: grid;
    grid-template-columns: repeat(${(props) => props.length}, 1fr);
    gap: 1.5rem;
    margin-bottom: -1.5rem;
    padding: 1.5rem 0;

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      display: none;
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    span {
      margin-top: 0.75rem;

      h3 {
        font-size: 1.25rem;
      }
    }

    img {
      border-radius: 1rem;
      width: 100%;
      transition: all 0.2s;
    }

    &:hover img {
      transform: scale(0.95);
    }

    .img {
      position: relative;
      & > div:first-child {
        position: absolute !important;
        overflow: visible !important;
        width: 100%;
      }

      & > div {
        width: 100%;
      }
    }
  }

  @media (max-width: 576px) {
    .cards {
      grid-template-columns: repeat(${(props) => props.length}, 80%);
      grid-template-rows: 1fr;
      overflow: scroll;
      margin: 0 -1.5rem -1.5rem -1.5rem;
      padding: 1.5rem;
      scroll-snap-type: x mandatory;
      scroll-padding-left: 1.5rem;
    }

    .card {
      scroll-snap-align: start;

      span {
        margin-top: 0.5rem;
        h3 {
          line-height: 1.3;
        }
        p {
          margin-top: 0.25rem;
        }
      }
    }

    .card:last-of-type {
      margin-right: 10rem;
    }

    .card:last-of-type {
      border-right: 1.5rem solid transparent;
      width: calc(100% + 1.5rem);
    }
  }
`;
