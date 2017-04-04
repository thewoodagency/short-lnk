/**
 * Created by jay on 4/2/17.
 */
import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class LinksListFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: true
        };
    }

    componentDidMount() {
        this.linksFilterTracker = Tracker.autorun(() => {
            console.log('Autorun LinksListFilters');
            this.setState({showVisible: Session.get('showVisible')});
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnMount LinksListFilters');
        this.linksFilterTracker.stop();
    }

    render() {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                        Session.set({'showVisible': !e.target.checked});
                        //this.setState({showVisible: !e.target.checked});
                    }}/>
                    show hidden links
                </label>
            </div>
        );
    }
}

