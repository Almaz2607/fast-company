import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = ({ userId }) => {
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const history = useHistory();
    const isDataLoaded = data && qualities.length > 0 && professions.length > 0;

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            const convertedUser = {};

            for (const fieldName in data) {
                if (fieldName === "profession") {
                    convertedUser[fieldName] = {
                        label: data[fieldName].name,
                        value: data[fieldName]._id
                    };
                } else if (fieldName === "qualities") {
                    convertedUser[fieldName] = data[fieldName].map(
                        (quality) => ({
                            label: quality.name,
                            value: quality._id,
                            color: quality.color
                        })
                    );
                } else {
                    convertedUser[fieldName] = data[fieldName];
                }
            }
            setData(convertedUser);
        });

        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });

        api.professions.fetchAll().then((data) => {
            const professionList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionList);
        });
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];

        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        name: qualities[quality].label,
                        _id: qualities[quality].value,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;

        const id =
            typeof profession === "object" ? profession.value : profession;
        const updatedUser = {
            ...data,
            profession: getProfessionById(id),
            qualities: getQualities(qualities)
        };

        api.users.update(userId, updatedUser);

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
                            value={data.profession.value}
                            onChange={handleChange}
                            defaultOption="Choose..."
                            options={professions}
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
                            options={qualities}
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
