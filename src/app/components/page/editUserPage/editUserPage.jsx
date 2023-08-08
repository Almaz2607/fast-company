import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backButton";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const { currentUser, updateUserData } = useAuth();

    const professionsList = professions.map((p) => ({
        value: p._id,
        label: p.name
    }));
    const qualitiesList = qualities.map((q) => ({
        value: q._id,
        label: q.name
    }));

    const isDataLoaded = data && qualities.length > 0 && professions.length > 0;

    function getQualitiesListByIds(qualitiesIds) {
        const arrayQualities = [];
        for (const qualIds of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualIds) {
                    arrayQualities.push(quality);
                    break;
                }
            }
        }
        return arrayQualities;
    }

    function transformData(data) {
        return getQualitiesListByIds(data).map((qual) => ({
            value: qual._id,
            label: qual.name
        }));
    }

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        await updateUserData({
            ...data,
            qualities: data.qualities.map((qual) => qual.value)
        });
        history.push(`/users/${currentUser._id}`);
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
