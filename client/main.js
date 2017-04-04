/**
 * Created by jay on 3/28/17.
 */
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    //Meteor.call('links.insert', 'aaa3.com');
    Session.set({'showVisible':true});
    ReactDOM.render(routes, document.getElementById('app'));
});


