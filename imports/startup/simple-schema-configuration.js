/**
 * Created by jay on 3/30/17.
 */
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

//this function called whenever SimpleSchema throw errors.
SimpleSchema.defineValidationErrorTransform((error) => {
    return new Meteor.Error(400, error.message);
});