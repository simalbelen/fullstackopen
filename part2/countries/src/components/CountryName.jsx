import { useEffect } from "react";
import { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountryName = ({ country }) => {
  const [buttonText, setbuttonText] = useState("show");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      setbuttonText("hide");
    } else {
      setbuttonText("show");
    }
  }, [show]);

  const showInfo = () => {
    setShow(!show);
  };
  
  let contenido = null;
  if (show) {
    contenido = <CountryInfo country={country} />;
  }

  return (
    <div>
      <span> {country.name.common} </span>
      <button onClick={showInfo}> {buttonText} </button>
      {contenido}
    </div>
  );
};

export default CountryName;
