/**
 * Created by jay on 3/31/17.
 */
import React, { Component } from 'react';
//import { Accounts } from 'meteor/accounts-base';

/*export default class PrivateHeader extends Component{

    onLogout() {
        Accounts.logout();
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        );
    }
}*/

const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header_title">{props.title}</h1>
                <button onClick={onLogout} className="button button--link-text">Logout</button>
            </div>
        </div>
    );
};

function onLogout() {
    console.log('logout');
    Accounts.logout();
}

PrivateHeader.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default PrivateHeader;