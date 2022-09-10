import React from "react";
import PropTypes from "prop-types";
const SelectField = ({ label, value, onChange, defaultOption, options, name, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.values(options)
        : options;
    return (<div className="mb-4">
        <label htmlFor={name} className="form-label">{label}</label>
        <select
            value={value}
            className={getInputClasses()}
            id={name}
            onChange={handleChange}
            name={name}>
            <option disabled value="">{defaultOption}</option>
            {optionsArray.length > 0 &&
                optionsArray.map(option =>
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>)
            }
        </select>
        {error && <div className="invalid-feedback">
            {error}
        </div>}
    </div>);
};
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
