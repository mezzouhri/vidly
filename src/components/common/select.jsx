import React from "react";

const Select = ({ name, label, value, onChange, error, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className="form-control"
      >
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
