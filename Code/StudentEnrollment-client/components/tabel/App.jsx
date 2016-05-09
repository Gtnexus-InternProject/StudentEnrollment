'use strict';

var React = require('react');
// var Fork = require('react-ghfork');

var FullTable = require('./full_table.jsx');
// var EditorsTable = require('./editors_table.jsx');
// var NestedTable = require('./nested_table.jsx');

// var readme = require('../README.md');

import 'purecss/build/pure.css';
import 'highlight.js/styles/github.css';
// import 'react-ghfork/gh-fork-ribbon.ie.css';
// import 'react-ghfork/gh-fork-ribbon.css';
import 'react-pagify/style.css';
import './main.css';
import './skylight.css';


module.exports = React.createClass({
    displayName: 'App',
    render() {
        return (
            <div className='pure-g'>

                <article className='pure-u-1'>
                    <section className='demonstration'>
                        <FullTable />
                    </section>
            
                </article>
            </div>
        );
    },
});
