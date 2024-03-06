import styles from "./Message.module.css";

  /* eslint react/prop-types: "warn" */
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
