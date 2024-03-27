import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './Users.css';
const Users = () => {
  const users = useContext(UserContext);

  return (
    <div className='users-container'>
      <h1>List of users</h1>
      {users.map((user, index) => (
        <div
          className="user-box"
          key={index}>
          <div>{user.username} :  </div>
          <div>{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default Users;
