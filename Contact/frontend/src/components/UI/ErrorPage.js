import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        // centered is in index.css
        <div className='centered'>
            <h1>Something went wrong! Please try again later.</h1>
            <p><Link to={`/`}>Home</Link></p>
        </div>
    )
};

export default ErrorPage;