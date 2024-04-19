import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/users.api";
import "./users.css";

const UsersList = ({ setReciever }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function findAllUsers() {
      const { data } = await getAllUsers();
      setUsers(data);
    }
    findAllUsers();
  }, []);

  const handleSelect = (user) => {
    setReciever(user);
  };

  return (
    <div className="users-list">
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={(e) => handleSelect(user)}>
            <img src={user?.profilePic} />
            <p>{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
