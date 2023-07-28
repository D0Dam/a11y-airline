import React, { useState, MouseEvent, useEffect } from "react";
import "./SpinButton.css";

interface Props {
  people: string;
}

function SpinButton({ people }: Props) {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const increment = () => {
    setCount((prevCount) => (prevCount >= 3 ? prevCount : prevCount + 1));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount <= 0 ? prevCount : prevCount - 1));
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  useEffect(() => {
    if (announcement) {
      const liveRegion = document.getElementById("live-region");
      if (liveRegion) {
        liveRegion.textContent = announcement;
      }
    }
  }, [announcement]);

  useEffect(() => {
    setAnnouncement(`현재 인원 ${count}`);
  }, [count]);

  const handleDecrementClick = () => {
    decrement();
  };

  const handleIncrementClick = () => {
    increment();
  };

  return (
    <section
      className="spinButtonContainer"
      aria-label={`${people} 선택 영역입니다.`}
    >
      <div>
        <div className="spinButtonLabel">
          <label htmlFor="input-old">{people}</label>
          <div
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className="tooltip" role="tooltip">
                최대 인원수는 3명까지 가능합니다
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleDecrementClick}
          className="spinButton"
          aria-label={`${people} 탑승자 한명 줄이기`}
        >
          -
        </button>
        <input
          id="input-old"
          type="text"
          role="spinbutton"
          readOnly
          className="spinButtonInput"
          value={count}
          aria-live="polite"
          aria-atomic="true"
        />
        <button
          onClick={handleIncrementClick}
          className="spinButton"
          aria-label={`${people} 탑승자 한명 늘리기`}
        >
          +
        </button>
      </div>

      <div
        id="live-region"
        className="announce"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </section>
  );
}

export default SpinButton;
