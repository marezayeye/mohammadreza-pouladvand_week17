import styles from "./SearchInput.module.css";

function SearchInput({ value, onChange }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search by name or last name..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput; 