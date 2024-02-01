import Person from "./Person";
// muista import

const Persons = ({ filteredPersons }) => (
  <>
    <ul>
      {filteredPersons.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </ul>
  </>
);

export default Persons;
