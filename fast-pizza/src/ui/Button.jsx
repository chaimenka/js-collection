import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-orange-400 font-semibold uppercase tracking-wide text-zinc-800 transition-colors duration-300 hover:bg-orange-300 focus:bg-orange-300 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block text-sm rounded-full border-2 border-zinc-300 font-semibold uppercase tracking-wide text-zinc-400 transition-colors duration-300 hover:bg-zinc-300 hover:text-zinc-800 focus:bg-zinc-300 focus:text-zinc-800 focus:outline-none focus:ring focus:ring-zinc-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  
  if(onClick)
   return (
     <button onClick={onClick}  disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
