import Person from './Person'

const People = ({ people, handleDelete }) => {
  return (
    <div>
      {people.map(person => <Person key={person.id} handleDelete={id => handleDelete(person.id)} person={person}/>)}
    </div>
  )
}

export default People