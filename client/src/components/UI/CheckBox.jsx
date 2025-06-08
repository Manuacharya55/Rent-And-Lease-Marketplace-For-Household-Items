const CheckBox = ({ name, id, event }) => {
  return (
    <div id="checkbox">
      <input type="checkbox" name="" id={id} onChange={event} />
      <label htmlFor={id}>{name}</label>
    </div>
  );
};

export default CheckBox;
