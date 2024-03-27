import React, { useEffect, useState } from 'react';
import { IError, IUser } from '../types/types';
const Registration = () => {
  const initialState: IUser = {
    username: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<IError>({});
  const [usernameTouched, setUsernameTouched] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);

  useEffect(() => {
    setEmailTouched(false);
    setUsernameTouched(false);
    setErrors({});
  }, []);
  const handleValidation = () => {
    var validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    let formIsValid = true;
    const formErrors: IError = {};

    //Name
    if (!formData['username'] && usernameTouched) {
      formIsValid = false;
      formErrors['username'] = 'Username field cannot be empty';
    }

    if (typeof formData['name'] !== 'undefined') {
      if (!formData['name'].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        formErrors['username'] = 'User name can only contain letters';
      }
    }

    //Email
    if (!formData['email'] && emailTouched) {
      formIsValid = false;
      formErrors['email'] = 'Email field cannot be empty';
    }

    if (typeof formData['email'] !== 'undefined' && emailTouched) {
      console.log('validate email format');
      if (!formData['email'].match(validRegex)) {
        formIsValid = false;

        formErrors['email'] = 'Email is not valid';
      }
    }

    setErrors(formErrors);

    return formIsValid;
  };
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation();
    !Object.values(errors).length && handleClearForm();
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => alert('User saved successfully'));
  };

  const handleTextInput = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearForm = () => {
    setFormData(initialState);
    setEmailTouched(false);
    setUsernameTouched(false);
  };

  const handleUsernameBlur = () => {
    setUsernameTouched(true);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  return (
    <div className="App">
      <h1>User Registration</h1>
      <form onSubmit={handleSave}>
        <label htmlFor="username">User name:</label>
        <input
          name="username"
          type="text"
          value={formData.username || ''}
          onChange={handleTextInput}
          onBlur={handleUsernameBlur}></input>
        <span className="error-message">{errors['username']}</span>

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          value={formData.email || ''}
          onChange={handleTextInput}
          onBlur={handleEmailBlur}></input>
        <span className="error-message">{errors['email']}</span>

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password || ''}
          onChange={handleTextInput}></input>
        <span>{errors['password']}</span>

        <button
          type="submit"
          disabled={
            (formData.email && formData.email.trim() === '') ||
            (formData.username && formData.username.trim() === '') ||
            ((formData.password && formData.password.trim() === '') as boolean)
          }>
          Go
        </button>
        <button onClick={handleClearForm}>Clear</button>
      </form>
    </div>
  );
};
export default Registration;
