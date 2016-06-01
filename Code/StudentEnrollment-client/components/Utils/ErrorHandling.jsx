import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

module.exports.tokenErrorHandling = function(error) {
    if (error.body && error.body.message && error.body.message === 'Failed to authenticate token.') {
        console.log("Error Check: " + error.body.message);
        browserHistory.push('/invalid/tokenexpire');
    }
}
