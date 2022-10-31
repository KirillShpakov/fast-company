import React, { useState, useEffect } from "react";
import API from "../../../api";
import TextAreaFIeld from "../form/textAreaField";
import SelectField from "../form/selectField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выерите отчьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
    return (<div>
        <h2>NewComment</h2>
        <form onSubmit={handleSubmit}>
            <SelectField
                onChange={handleChange}
                name="userId"
                value={data.userId}
                options={arrayOfUsers}
                defaultOption="Выберите пользователя"
                error={errors.userId}
            />
            <TextAreaFIeld
                value={data.content}
                onChange={handleChange}
                name="content"
                label="Сообщение"
                error={errors.content}
            />
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary">
                    Опубликовать
                </button>
            </div>
        </form>
    </div>);
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;