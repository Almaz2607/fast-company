import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { getAuthErrors, login } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    //  const validateSchema = yup.object().shape({
    //      password: yup
    //          .string()
    //          .required("Пароль обязателен для заполнения")
    //          .matches(
    //              /(?=.*[A-Z])/,
    //              "Пароль должен содержать хотя бы одну заглавную букву"
    //          )
    //          .matches(
    //              /(?=.*[0-9])/,
    //              "Пароль должен содержать хотя бы одну цифру"
    //          )
    //          .matches(
    //              /(?=.*[!@#$%^&*])/,
    //              "Пароль должен содержать один из специальных символов !@#$%^&*"
    //          )
    //          .matches(
    //              /(?=.{8,})/,
    //              "Длина пароля должна состоять минимум из 8 символов"
    //          ),
    //      email: yup
    //          .string()
    //          .required("Электронная почта обязательна для заполнения")
    //          .email("Email введен некорректно")
    //  });

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        //   validateSchema
        //       .validate(data)
        //       .then(() => setErrors({}))
        //       .catch((err) => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";

        dispatch(login({ payload: data, redirect }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
