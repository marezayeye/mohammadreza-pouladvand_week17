import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <h1>Contact App v3.0</h1>
      <p>
        <a href="https://github.com/marezayeye">Github Profile</a> | Botostart
        Bootcamp | Week 17
      </p>
    </div>
  );
}

export default Header;
