const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ title, exercise }) => <p> {title} {exercise} </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} title={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {

  const getTotal = () => {
    let total = 0
    for (const p of parts){
      total += p.exercises
    }
    return total
  }

  /*
    1. We have an array called parts, where each element is an object with a name and exercises property.
    2. We use the reduce method to iterate through the parts array. The reduce method takes a callback function as an argument, which is executed for each element in the array.
    3. The callback function takes two parameters: accumulator and part. accumulator is the accumulated value, and part is the current element in the array.
    4. In the callback function, we add the value of part.exercises to the accumulator, which accumulates the total sum of exercises.
    5. We initialize the accumulator with 0 as the second argument to reduce, which serves as the initial value for the accumulator.
  */
  const total = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0);

  return <p> <strong>Total of {total} exercises</strong></p>
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course["parts"]}/>
      <Total parts={course["parts"]} />
    </div>
  );
};

export default Course