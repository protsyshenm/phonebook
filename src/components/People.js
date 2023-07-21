import Person from './Person'

const People = ({ people }) => {
  return (
    <div>
      {people.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

export default People