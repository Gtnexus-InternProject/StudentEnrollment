'use strict';

var React = require('react');
// var Fork = require('react-ghfork');

var FullTable = require('./full_table.jsx');
// var EditorsTable = require('./editors_table.jsx');
// var NestedTable = require('./nested_table.jsx');

// var readme = require('../README.md');


module.exports = React.createClass({
    displayName: 'App',
    render() {
        return (
            // <div className='pure-g'>
            //
                // <article className='pure-u-1'>
                    <section className='demonstration'>
                        <FullTable />
                    </section>
            //
                // </article>
            // </div>
        );
    },
});
