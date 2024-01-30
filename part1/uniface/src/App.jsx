import { useState } from "react";

// #########

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({
  good,
  neutral,
  bad,
  countAll,
  countAverage,
  countPositivePercentage,
}) => {
  console.log(countAll());
  if (countAll() === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <div>
      <h2>statistics</h2>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {countAll()}</p>
        <p>average {countAverage()}</p>
        <p>positive {countPositivePercentage()} %</p>
      </div>
    </div>
  );
};

// #########

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    console.log(good);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const countAll = () => {
    return good + neutral + bad;
  };

  const countAverage = () => {
    const totalFeedback = countAll(); // 9
    if (totalFeedback == 0) {
      return 0;
    }
    const sum = good - bad;
    return sum / totalFeedback;
  };

  const countPositivePercentage = () => {
    const totalFeedback = countAll();
    if (totalFeedback === 0) {
      return 0;
    }
    return (good / totalFeedback) * 100;
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        countAll={countAll}
        countAverage={countAverage}
        countPositivePercentage={countPositivePercentage}
      />
    </div>
  );
};

export default App;
