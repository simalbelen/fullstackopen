const Notification = ({ message, type }) => {
  console.log(message, type)
  if (message === null) {
    return null;
  }
  console.log(type)
  if (type === "error") {
    return <div className="error">{message}</div>;
  } else {
    return <div className="info">{message}</div>;
  }
};

export default Notification;
