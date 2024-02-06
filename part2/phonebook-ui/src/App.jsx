import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialNotes) => {
      console.log(initialNotes);
      setPersons(initialNotes);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personsService
          .updateItem(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );

            setInfoMessage({
              text: `Updated ${newPerson.name}`,
              type: "success",
            });

            setTimeout(() => {
              setInfoMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setInfoMessage({
              text: `Information of ${newPerson.name} has already been removed from server`,
              type: "error",
            });

            setTimeout(() => {
              setInfoMessage(null);
            }, 3000);
          });
      }
    } else {
      personsService.createItem(newPerson).then((returnedNote) => {
        setPersons([...persons, returnedNote]);

        setInfoMessage({
          text: `Added '${newPerson.name}'`,
          type: "success",
        });

        setTimeout(() => {
          setInfoMessage(null);
        }, 3000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}`);
    if (confirmDelete)
      personsService.deleteItem(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    setPersons;
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  const filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} />
      <Filter search={search} handleSearch={handleSearch} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberInputChange={handleNumberInputChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
