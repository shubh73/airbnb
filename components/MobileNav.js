import { useState } from "react";
import styled from "styled-components";
import { Home, Search, Heart, User } from "react-feather";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";

const MobileNav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileNavDiv className={isOpen ? "open" : null}>
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
      </div>
      <div className="items">
        <div
          onClick={() => router.push("/")}
          className={`item ${router.pathname === "/" ? "active" : null}`}
        >
          <Home /> Home
        </div>
        <div
          className={`item ${router.pathname === "/explore" ? "active" : null}`}
        >
          <Search /> Explore
        </div>
        <div className="item">
          <Heart /> Wishlist
        </div>
        <div className="item">
          <User /> Profile
        </div>
        <ThemeToggle icon text className="item" />
      </div>
    </MobileNavDiv>
  );
};

export default MobileNav;

const MobileNavDiv = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    color: var(--dark);
    z-index: 99;

    .items {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background: var(--dark);
      color: var(--light);
      padding: 1rem 0.5rem 1rem 0.75rem;
      border-radius: 1rem 0 0 1rem;
      box-shadow: 0.5rem 0.5rem 1rem #0005;
      position: fixed;
      right: 0;
      bottom: 5.5rem;
      transform: translateX(3rem);
      transition: all 0.2s;
      pointer-events: none;
      opacity: 0;

      .item {
        display: flex;
        align-items: center;
        padding: 0.25rem 2rem 0.25rem 0.5rem;
        border-radius: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: #88a2;
        }
        &.active {
          color: var(--pink);
        }
        svg {
          margin-right: 1rem;
          width: 1.25rem;
        }
      }
    }

    .toggle {
      width: 3rem;
      height: 3rem;
      border-radius: 99px;
      background: var(--dark);
      box-shadow: 0 0.5rem 1rem #0002;
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      display: grid;
      place-items: center;
      transition: all 0.2s;
      cursor: pointer;
      z-index: 99;

      span {
        display: block;
        position: relative;
        height: 2.4px;
        width: 1.5rem;
        background: var(--light);
        border-radius: 3px;
        transition: all 0.2s;
        
        &::before,
        &::after {
          content: "";
          position: absolute;
          height: 2.4px;
          width: 1.5rem;
          background: var(--light);
          border-radius: 3px;
          transition: all 0.2s;
        }
        &::before {
          transform: translateY(-6px);
        }
        &::after {
          transform: translateY(6px);
        }
      }
    }

    &.open {
      .items {
        pointer-events: auto;
        opacity: 1;
        transform: translateX(0);
      }

      .toggle {
        background: var(--pink);

        span {
          background: var(--pink);

          &::before {
            background: #fff;
            transform: translate(0) rotate(45deg);
          }

          &::after {
            background: #fff;
            transform: translate(0) rotate(-45deg);
          }
        }
      }
    }
  }
`;
