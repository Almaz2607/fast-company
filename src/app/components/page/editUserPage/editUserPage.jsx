import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backButton";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const { professions } = useProfession();
    const { qualities } = useQualities();
    const { getUserById } = useUser();
    const { updateUser } = useAuth();
    const user = getUserById(userId);

    const professionsList = professions.map((p) => ({
        value: p._id,
        label: p.name
    }));
    const qualitiesList = qualities.map((q) => ({
        value: q._id,
        label: q.name,
        color: q.color
    }));

    const isDataLoaded = data && qualities.length > 0 && professions.length > 0;

    function transformData(data) {
        const filteredData = [];
        data.forEach((q) => {
            for (const qual of qualities) {
                if (qual._id === q) {
                    filteredData.push(qual);
                }
            }
        });
        const convertedData = filteredData.map((q) => ({
            value: q._id,
            label: q.name,
            color: q.color
        }));
        return convertedData;
    }

    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            ...user,
            qualities: transformData(user.qualities)
        }));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const getQualities = (elements) => {
        return elements.map((q) => q.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;

        const updatedData = {
            ...data,
            qualities: getQualities(qualities)
        };

        updateUser(updatedData);
        history.push(`/users/${userId}`);
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="col-md-6 offset-md-3 shadow p-4">
                {isDataLoaded ? (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            name="profession"
                            value={data.profession}
                            onChange={handleChange}
                            defaultOption="Choose..."
                            options={professionsList}
                        />
                        <RadioField
                            label="Выберите ваш пол"
                            name="sex"
                            value={data.sex}
                            onChange={handleChange}
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                        />
                        <MultiSelectField
                            label="Выберите ваши качества"
                            name="qualities"
                            defaultValue={data.qualities}
                            onChange={handleChange}
                            options={qualitiesList}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={!isValid}
                        >
                            Обновить
                        </button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
