import Person from "./Person";

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
