import { Link } from 'react-router-dom';

function Button({ children, disabled, to }) {

  const className = "inline-block px-2 py-4text-sm rounded-full bg-orange-400 font-semibold uppercase tracking-widetext-zinc-800 transition-colors duration-300 hover:bg-orange-300 focus:bg-orange-300 focus:outline-none focus:ring focus:ring-orange-300  focus: ring - offset - 2 disabled: cursor - not - allowed sm: px - 6 sm: py - 4";   
  
  if (to)
    return <Link to={to} className={className}>{children}</Link>; 

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  )
}

export default Button;
