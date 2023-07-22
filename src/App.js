import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import peopleService from './services/people'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
      peopleService.getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const filteredPeople = people.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleDelete = id => {
    const person = people.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService.remove(id)
      setPeople(people.filter(person => person.id !== id))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const peopleNames = people.map(person => person.name)
    if (peopleNames.includes(newName)) {
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to phonebook`)
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    peopleService
      .create(personObject)
      .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
      <People
        handleDelete={handleDelete}
        people={filteredPeople}  
      />
    </div>
  )
}

export default App