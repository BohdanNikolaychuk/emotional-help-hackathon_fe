import './RoundedLink.css';
import {Link} from "react-router-dom";

function RoundedLink({ content, style, to }) {
    return (
        <Link
            style={style}
            className='rounded-link'
            to={to}
        >
            {content}
        </Link>
    );
}

export default RoundedLink;
