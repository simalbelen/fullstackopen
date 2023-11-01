const Contact = ({ id, name, number, handleDelete }) => {
  const handleClick = () => {
    handleDelete(id, name)
  }

  return (
  <span>
    {name} {number} <button onClick={handleClick}> delete </button>
  </span>);
}

export default Contact;
