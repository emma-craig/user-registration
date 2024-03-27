import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './Users.css';
const Users = () => {
  const users = useContext(UserContext);
  const handleDelete = async (id: string | undefined) => {
    await fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    }).then(() => alert('User deleted successfully'));
  };

//TO DO - refresh page after delete
  return (
    <div className="users-container">
      <h1>List of users</h1>
      {users.map((user, index) => (
        <div
          className="user-box"
          key={index}>
          <div>{user.username} : </div>
          <div>{user.email}</div>
          <button onClick={() => handleDelete(user.id)}>DELETE</button>
        </div>
      ))}
    </div>
  );
};

export default Users;
