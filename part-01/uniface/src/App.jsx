import { useState } from "react";

// #########

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  countAll,
  countAverage,
  countPositivePercentage,
}) => {
  if (countAll() === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={countAll()} />
          <StatisticLine text="average" value={countAverage()} />
          <StatisticLine text="positive" value={countPositivePercentage()} />
        </tbody>
      </table>
    </>
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
