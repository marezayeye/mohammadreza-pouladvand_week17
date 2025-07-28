import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <h1>Contact App (Flux Architecture)</h1>
      <p>
        <a href="https://github.com/marezayeye">Github Profile</a> | Botostart
        Bootcamp | Week 16
      </p>
    </div>
  );
}

export default Header;
