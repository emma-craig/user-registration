import {useEffect, useState} from 'react'

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch('http://localhost:8000/users')
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);
    return users
}

export default useFetchUsers