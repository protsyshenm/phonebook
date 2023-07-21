import { useState } from 'react'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', id: 1, number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personNames = people.map(person => person.name)
    if (personNames.includes(newName)) {
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to phonebook`)
    }
    const personObject = {
      name: newName,
      id: people.length + 1,
      number: newNumber
    }
    setPeople(people.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={people}/>
    </div>
  )
}

const People = ({ people }) => {
  return (
    <div>
      {people.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

const Person = ({ person }) => {
  return <p>{person.name} {person.number}</p>
}

export default App