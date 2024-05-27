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

const Course = ({ course }) => {
  const totalCourseExercises = course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalCourseExercises} />
    </>
  );
};

export default Course;
