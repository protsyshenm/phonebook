import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
      personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setError(error.message)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }, [])

  const filteredPersons = persons.filter(person => {
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
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Deleted ${person.name}`)
          setTimeout(() => setNotification(null), 3000)
        })
        .catch(error => {
          if (error.response.status === 404) {
            setError(`Information of ${person.name} has already been removed from server`)
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => {
              setError(null)
            }, 3000)
          }
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personsNames = persons.map(person => person.name)
    if (personsNames.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const foundPerson = persons.find(person => person.name === newName)
        const updatedPerson = {
          ...foundPerson,
          number: newNumber
        }
        personsService
          .update(foundPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
            setNotification(`Updated ${returnedPerson.name}`)
            setTimeout(() => setNotification(null), 3000)
          })
          .catch(error => {
            if (error.response.status === 404) {
              setError(`Information of ${foundPerson.name} has already been removed from server`)
              setPersons(persons.filter(person => person.id !== foundPerson.id))
              setTimeout(() => {
                setError(null)
              }, 3000)
            }
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => setNotification(null), 3000)
        })
        .catch(error => {
          setError(error.message)
          setTimeout(() => {
            setError(null)
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
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
      <Persons
        handleDelete={handleDelete}
        persons={filteredPersons}  
      />
    </div>
  )
}

export default App