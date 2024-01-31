const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  const totalCourses = course.parts.reduce((total, part) => {
    return (total += part.exercises);
  }, 0);

  return (
    <>
      <Course course={course} />
      <Total sum={totalCourses} />
    </>
  );
};

export default App;
