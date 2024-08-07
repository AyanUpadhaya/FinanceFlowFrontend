const SelecLimit = (props) => {
  return (
    <select
      onChange={(e) => props.onChangeLimit(e.target.value)}
      className="form-select"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  );
};

export default SelecLimit
