import styles from './Button.module.css';

interface props {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: string;
}

function Button({ children, onClick, type }: props) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
