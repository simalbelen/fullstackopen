import Contact from "./Contact";

const Persons = ({filteredPersons, handleDelete}) => (
  <>
    {filteredPersons.map((person) => {
      return (
        <div key={person.name}>
          <Contact id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>
        </div>
      );
    })}
  </>
)

export default Persons