import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/user';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // code to run on server at startup

    //request comes in
    //run our middleware one at a time
    //send them that page

    // creating and registering new middleware function
    WebApp.connectHandlers.use((req, res, next) => {

        const _id = req.url.slice(1);
        const link = Links.findOne({ _id });

        if (link) {
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id);

        } else {
            console.log('URL don\'t have _id');
            next();
        }

    });

    WebApp.connectHandlers.use((req, res, next) => {
        console.log('this is from my custom middleware');
        console.log(req.url, req.method, req.headers, req.query);
        // Set Http status code
        //res.statusCode = 404;
        // Set Http headers
        //res.setHeader('my-custom-header', 'my value here');
        // Set Http body
        //res.write('<h1>Wow from middleware</h1>');
        // End Http request
        //res.end(); //terminating request
        next();
    });

    //test a genetic error vs. meteor error
    /*try {
        throw new Meteor.Error(400, 'Please enter valid email');
    } catch (e) {
        console.log(e);
    }*/
    /*const petSchema = new SimpleSchema({
        name: {
            type: String,
            min: 1,
            max: 100
        },
        age: {
            type: Number,
            min: 0
        },
        contact: {
            type: String,
            optional: true,
            regEx: SimpleSchema.RegEx.Phone
        }

    });

    petSchema.validate({
        name: 'Wowya',
        age: 21,
        contact: '2103334932'
    });

    const EmployeeSchema = new SimpleSchema({
        name: {
            type: String,
            min: 1,
            max: 200,
        },

        hourlyWage: {
            type: Number,
            min: 0,
        },

        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    });

    EmployeeSchema.validate({
        name: 'Jay',
        hourlyWage: 39,
        email: 'tes@test.com'
    });*/
});
