import React from "react";
import PropTypes from "prop-types";
const FormComponent = ({ children }) => {
    return (<form>
        {children}
    </form>);
};
FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FormComponent;
