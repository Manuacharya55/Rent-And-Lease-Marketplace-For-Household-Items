import "./style.css";

const Input = ({ type, event=()=>{}, value, placeholder,name }) => {
  return (
    <input
      type={type}
      onChange={event}
      value={value}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
