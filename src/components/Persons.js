import Person from './Person'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} handleDelete={id => handleDelete(person.id)} person={person}/>)}
    </div>
  )
}

export default Persons