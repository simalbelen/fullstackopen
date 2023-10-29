import Contact from "./Contact";

const Persons = ({filteredPersons}) => (
  <>
    {filteredPersons.map((person) => {
      return (
        <div key={person.name}>
          <Contact name={person.name} number={person.number} />
        </div>
      );
    })}
  </>
)

export default Persons