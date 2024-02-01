import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0034242" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(newName + " is already added to phonebook");
    } else {
      setPersons([...persons, newPerson]);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
