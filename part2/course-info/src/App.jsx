const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>;

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

const Course = ({ course, calc }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />

      <Total sum={calc} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const totalCourses = courses.reduce((total, course) => {
    return (
      total +
      course.parts.reduce((partTotal, part) => partTotal + part.exercises, 0)
    );
  }, 0);

  return (
    <>
      {courses.map((course) => {
        const totalCourseExercises = course.parts.reduce(
          (total, part) => total + part.exercises,
          0
        );

        return (
          <div key={course.id}>
            <Course course={course} />
            <Total sum={totalCourseExercises} />
          </div>
        );
      })}
    </>
  );
};

export default App;
