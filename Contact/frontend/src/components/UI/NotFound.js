import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        // centered is in index.css
        <div className='centered'>
            <h1>Page not found!</h1>
            <p><Link to={`/`}>Home</Link></p>
        </div>
    )
};

export default NotFound;