import { useContext} from 'react';
import UserContext from '../contexts/UserContext';
const Users = () => {

const users = useContext(UserContext)

  return (
    <div>
      <h1>List of users</h1>
      {users.map((user, index) => (
        <div key={index}>{user.username}</div>
      ))}
    </div>
  );
};

export default Users;
