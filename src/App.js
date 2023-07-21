import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personNames = persons.map(person => person.name)
    if (personNames.includes(newName)) {
      setNewName('')
      return alert(`${newName} is already added to phonebook`)
    }
    const personObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Entries persons={persons}/>
    </div>
  )
}

const Entries = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Entry key={person.id} person={person}/>)}
    </div>
  )
}

const Entry = ({ person }) => {
  return <p>{person.name}</p>
}

export default App