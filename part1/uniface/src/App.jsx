import { useState } from 'react'

// #########

// const Button = ( {handleClick, text} ) => {
//   <button onClick={handleClick} >{text} juu</button>
// }

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

// #########


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
    console.log(good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  const countAll = () => {
    return good + neutral + bad;
  }

  const countAverage = () => {
    const totalFeedback = countAll(); // 9
    if (totalFeedback == 0) {
      return 0;
    }
    const sum = good - bad;
    return sum / totalFeedback;
  }

  const countPositivePercentage = () => {
    const totalFeedback = countAll();
    if (totalFeedback === 0) {
      return 0;
    }
    return (good / totalFeedback) * 100;
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all { countAll() }</p>
      <p>average { countAverage() }</p>
      <p>positive { countPositivePercentage() } %</p>
    </div>
  )
}

export default App