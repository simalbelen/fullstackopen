import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Feedback = ({ clickGood, clickNeutral, clickBad }) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={clickGood} text="good" />
        <Button handleClick={clickNeutral} text="neutral" />
        <Button handleClick={clickBad} text="bad" />
      </div>
    </div>
  );
};

const StatisticLine = ({ text, number }) => (
  <tr>
    <td>{text}</td>
    <td> {number}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  // Si no hay unas estadisticas definidas pintamos un texto
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <span>No feedback given</span>
      </div>
    );
  }

  // Si hay estadisticas definidas pintamos los valores
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" number={good} />
          <StatisticLine text="neutral" number={neutral} />
          <StatisticLine text="bad" number={bad} />
          <StatisticLine text="all" number={all} />
          <StatisticLine text="average" number={average} />
          <StatisticLine text="positive" number={positive + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // States
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Handlers
  const clickGood = () => setGood(good + 1);
  const clickNeutral = () => setNeutral(neutral + 1);
  const clickBad = () => setBad(bad + 1);

  // Response
  return (
    <div>
      <Feedback
        clickGood={clickGood}
        clickNeutral={clickNeutral}
        clickBad={clickBad}
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
