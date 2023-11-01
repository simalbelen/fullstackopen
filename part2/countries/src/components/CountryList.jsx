import CountryName from "./CountryName";
import CountryInfo from "./CountryInfo";

const CountryList = ({ countries }) => {
  //Si no hay elementos no devuelve nada
  if (countries.length === 0) {
    return null;
  } 
  
  //Si hay demasiados elementos devuelve un texto
  if (countries.length > 10) {
    return <span>Too many matches, specify another filter</span>;
  }
  
  //Si solamente hay un elemento devuelve la información de ese pais
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  // Si hay varios elementos, menos de 10, pinta una lista de nombres
  return (
    <>
      {countries.map((country) => {
        return (
          <div key={country.flag}>
            <CountryName country={country} />
          </div>
        );
      })}
    </>
  );
  
};

export default CountryList;
