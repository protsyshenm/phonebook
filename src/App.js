import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPeople = people.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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
      <Filter 
        handleFilterChange={handleFilterChange} 
        filter={filter}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <People people={filteredPeople}/>
    </div>
  )
}

export default App