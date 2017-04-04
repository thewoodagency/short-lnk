/**
 * Created by jay on 3/29/17.
 */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() {
        console.log('componentDidMount LinksList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('linksPub');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
            console.log('New Links:', links);
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount LinksList');
        this.linksTracker.stop();
    }

    renderLinksList() {
        const links = this.state.links;
        if (links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No link found</p>
                </div>
            )
        }

        return links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />

            //return (<li key={link._id}>{link.url}</li>);
        });
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksList()}
                </FlipMove>
            </div>
        );
    }
}