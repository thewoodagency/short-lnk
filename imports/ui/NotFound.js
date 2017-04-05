/**
 * Created by jay on 3/22/17.
 */
import React from 'react';
import { Link } from 'react-router';

/*class NotFound extends Component {
    render() {
        console.log('not found');
        return (
            <div>
                <p>Not Found</p>
            </div>
        );
    }
}*/

export default () => {
    return (
        <div className="boxed-view ">
            <div className="boxed-view__box">
                <h1>404 - Page Not Found</h1>
                <p>Hmmm, we're unable to find that page</p>
                <Link to="/" className="button button--link">Head Home</Link>
            </div>
        </div>
    );
}