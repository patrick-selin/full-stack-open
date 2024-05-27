import Person from "./Person";
// muista import

const Persons = ({ filteredPersons, handleDelete }) => (
  <>
    <ul>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person.id, person.name)}
        />
      ))}
    </ul>
  </>
);

export default Persons;
