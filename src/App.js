import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'
import peopleService from './services/people'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      setNotification(`Deleted ${person.name}`)
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const peopleNames = people.map(person => person.name)
    if (peopleNames.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const foundPerson = people.find(person => person.name === newName)
        const updatedPerson = {
          ...foundPerson,
          number: newNumber
        }
        peopleService
          .update(foundPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id !== foundPerson.id ? person : returnedPerson))
            setNotification(`Updated ${returnedPerson.name}`)
            setTimeout(() => setNotification(null), 3000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => setNotification(null), 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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