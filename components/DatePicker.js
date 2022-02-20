import { useMediaQuery } from "@react-hook/media-query";
import { useState, useEffect, useRef } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styled from "styled-components";
import NumberInput from "./NumberInput";

const DatePicker = ({
  close,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
}) => {
  const [visible, setVisible] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 576px)");

  const selectionRange = {
    startDate: checkInDate.value,
    endDate: checkOutDate.value,
    key: "selection",
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    return () => setVisible(false);
  }, []);

  const handleSelect = (ranges) => {
    checkInDate.setValue(ranges.selection.startDate);
    checkOutDate.setValue(ranges.selection.endDate);
  };

  const options = {
    rangeColors: ["#e0565b"],
    ranges: [selectionRange],
    minDate: new Date(),
    onChange: handleSelect,
  };

  return (
    <Container className={visible ? "visible" : null}>
      <div className="inner">
        <h4 style={{ marginBottom: "1.5rem" }}>
          Pick Check-in & Check-out dates
          <span className="scroll"></span>
        </h4>
        {isSmallScreen ? (
          <DateRange {...options} />
        ) : (
          <DateRangePicker {...options} />
        )}

        <div className="guests">
          <h4>Add guests</h4>
          <div className="inputs">
            <NumberInput
              name="Adults"
              value={numberOfAdults.value}
              setValue={numberOfAdults.setValue}
            />
            <NumberInput
              name="Children"
              value={numberOfChildren.value}
              setValue={numberOfChildren.setValue}
            />
          </div>
        </div>

        <button className="close button" onClick={close}>
          Close
        </button>
      </div>
    </Container>
  );
};

export default DatePicker;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  padding: 13.5rem var(--sidePadding) 3rem;
  transform: translate(-50%, -100%);
  overflow: hidden;
  max-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--white);
  border-bottom: 2px solid var(--gray);
  box-shadow: 0 3rem 3rem -5rem var(--dark);
  z-index: -1;
  transition: all 0.2s;

  .button {
    transition: transform 0.2s;
    cursor: pointer;

    &:hover,
    &:focus {
      transform: scale(0.95);
      box-shadow: 0 0 0 1px currentColor;
    }

    &:disabled {
      opacity: 0.5;
      box-shadow: none;
    }
  }

  .scroll {
    margin: 0 1rem;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    border-radius: 50%;
    position: relative;
    background: #ff585d20;
    animation: down 1.5s infinite;
    -webkit-animation: down 1.5s infinite;

    &::before {
      content: "";
      position: absolute;
      top: 7px;
      left: 8.2px;
      width: 0.5rem;
      height: 0.5rem;
      border-left: 2px solid var(--pink);
      border-bottom: 2px solid var(--pink);
      transform: rotate(-45deg);
    }
  }

  .guests {
    width: 100%;
    padding-top: 3rem;
  }

  .inputs {
    display: flex;
    padding-top: 1rem;
  }

  .inner {
    padding: 1.5rem;
    width: 100%;
    max-width: 720px;
    height: fit-content;
    max-height: calc(100vh - 18rem);
    overflow: scroll;
    opacity: 0;
    transition: opacity 0.5s 0.2s;
    position: relative;
    box-shadow: 0 0.25rem 0.5rem #48484810;
    border-radius: 1rem;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
  }

  .close {
    position: absolute;
    top: 1.5rem;
    right: 2.5rem;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    background: #ff585d20;
    color: var(--pink);
    border-radius: 99px;
  }

  &.visible {
    transform: translate(-50%, 0);

    .inner {
      opacity: 1;
    }
  }

  .rdrDateRangePickerWrapper {
    display: flex;
    justify-content: space-between;
  }

  .rdrDateDisplayWrapper {
    background: none;
  }

  .rdrDayDisabled {
    background-color: var(--light);
  }

  .rdrDateDisplayItem {
    border-radius: 99px;
    background-color: var(--light);

    input {
      color: var(--dark);
    }
  }

  .rdrDefinedRangesWrapper {
    border: none;
    border-radius: 1rem;
  }

  .rdrCalendarWrapper {
    background: none;
    color: var(--dark);
  }

  .rdrStaticRange {
    border: none;
    background: none;

    &:hover,
    &:focus {
      .rdrStaticRangeLabel {
        background: var(--gray);
      }
    }
  }

  .rdrDefinedRangesWrapper {
    margin-right: 1.5rem;
    padding-top: 0.75rem;
    background: var(--light);
  }

  .rdrDayNumber span {
    color: var(--dark);
  }

  .rdrDayPassive .rdrDayNumber span {
    color: var(--dark);
    opacity: 0.33;
  }

  .rdrDayToday .rdrDayNumber span:after {
    background: var(--pink);
  }

  @media (max-width: 576px) {
    padding-top: 7.5rem;
    overflow: scroll;
    height: 100vh;

    .rdrCalendarWrapper {
      font-size: 11px;
    }

    .inner {
      height: 100%;
      max-height: unset;
      overflow: scroll;
      padding-bottom: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
    }

    h4 {
      width: 100%;
    }

    .close {
      top: auto;
      bottom: -3.5rem;
      right: 0;
      margin: 0 auto;
      display: block;
      position: relative;
    }

    .inputs {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (min-width: 768px) {
    .rdrDefinedRangesWrapper {
      font-size: 16px;
    }

    .rdrCalendarWrapper {
      font-size: 16px;
    }
  }

  @keyframes down {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }

  @media (min-width: 576px) and (max-width: 768px) {
    .rdrCalendarWrapper {
      margin: 0 auto;
    }
  }
`;
