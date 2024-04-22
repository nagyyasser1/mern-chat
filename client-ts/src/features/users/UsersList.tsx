import { useGetUsersQuery } from "../../services/users.service";
import UserItem from "./UserItem";
import styles from "./styles/UsersList.module.css";

const UsersList = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: error occured</div>;

  return (
    <ul className={styles.usersList}>
      {data?.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
