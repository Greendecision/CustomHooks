import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type StringType<T> = { [key in keyof T]: string };
type BooleanType<T> = { [key in keyof T]: boolean };

// TODO document
export const useForm =  <T extends Object>(
  initialState: StringType<T>,
  handleValidate: (values: StringType<T>) => StringType<T>,
  handleSubmit: (values: StringType<T>) => void,
) => {
  const [values, setValues] = useState<StringType<T>>(initialState);

  const initialErrorValues = Object.keys(values).reduce((clone, k) => {
    return { ...clone, [k]: '' };
  }, {} as StringType<T>);

  const [errors, setErrors] = useState<StringType<T>>(initialErrorValues);

  const initialPristineValues = Object.keys(values).reduce((clone, k) => {
    return { ...clone, [k]: !values[k] }; // TODO this is not correct, it gives a Typescript error, no idea of how to fix it
  }, {} as BooleanType<T>);

  const [arePristine, setArePristine] = useState<BooleanType<T>>(initialPristineValues);

  useEffect(() => {
    setErrors(handleValidate(values));
  }, [values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (arePristine[event.target.name] && event.target.value) {
      setArePristine({
        ...arePristine,
        [event.target.name]: false,
      });
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const newErrors = handleValidate(values);

    const areErrorsPresent = Object.values(newErrors).filter((error) => error).length;

    if (areErrorsPresent) {
      setErrors(newErrors);
    } else {
      handleSubmit(values);
    }

    Object.keys(arePristine).forEach((k) => {
      arePristine[k] = false;
    });

    setArePristine(arePristine);
  };

  const actualErrors = Object.keys(values).reduce((clone, k) => {
    return { ...clone, [k]: arePristine[k] ? '' : errors[k] };
  }, {} as BooleanType<T>);

  return { handleChange, handleBlur, submit, values, errors: actualErrors };
};

export default useForm;