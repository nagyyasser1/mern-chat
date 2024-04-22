import { ChangeEvent } from "react";
import styles from "./styles/SearchUser.module.css";

const SearchUser = ({ setIsSearch }: any) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value != "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search ..."
        autoFocus
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchUser;
