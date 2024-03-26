import { useEffect, useState } from "react";

const Registration = () => {

    const initialState = {
        username: '',
        email: '',
        password: '',
      };
      const [formData, setFormData] = useState(initialState);
      const [errors, setErrors] = useState({});
      const [usernameTouched, setUsernameTouched] = useState(false);
      const [emailTouched, setEmailTouched] = useState(false);
    
      useEffect(() => {
        setEmailTouched(false);
        setUsernameTouched(false);
        setErrors({});
      }, []);
      const handleValidation = () => {
        var validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
        let formIsValid = true;
        const formErrors = {};
    
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
          // }
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
      const handleSave = (e) => {
        e.preventDefault();
        setFormData({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        });
        handleValidation();
        !Object.values(errors).length && handleClearForm();
        fetch('http://localhost:8000/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        }).then(() => alert('User saved successfully'))

      };
    
      const handleTextInput = (e) => {
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
              onBlur={setUsernameTouched}></input>
            <span className="error-message">{errors['username']}</span>
    
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              value={formData.email || ''}
              onChange={handleTextInput}
              onBlur={setEmailTouched}></input>
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
                formData.email.trim() === '' ||
                formData.username.trim() === '' ||
                formData.password.trim() === ''
              }>
              Go
            </button>
            <button onClick={handleClearForm}>Clear</button>
          </form>
        </div>
      );
            }
      export default Registration
