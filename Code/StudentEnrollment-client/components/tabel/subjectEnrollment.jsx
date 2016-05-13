'use strict';

var React = require('react');
var Form = require('plexus-form');
var validate = require('plexus-validate');
var SkyLight = require('react-skylight').default;
var Paginator = require('react-pagify').default;
var titleCase = require('title-case');
var findIndex = require('lodash/findIndex');
var orderBy = require('lodash/orderBy');
var cx = require('classnames');
var segmentize = require('segmentize');
var Table = require('./src/table');
var ColumnNames = require('./src/column_names');
var Search = require('./src/search');
var editors = require('./src/editors');
var sortColumn = require('./src/sort_column');
var cells = require('./src/cells');
var FieldWrapper = require('./field_wrapper.jsx');
var SectionWrapper = require('./section_wrapper.jsx');
var highlight = require('./src/formatters/highlight');

var request = require('superagent');
var nocache = require('superagent-no-cache');

import token from  '../../config';

module.exports = React.createClass({
    displayName: 'FullTable',

    fetchData: function(callback) {

        // var me = this;

        request.get('http://localhost:3000/subjects' ).
        set('Accept', 'application/json').
        accept('application/json').
        set('x-access-token', token).
        use(nocache). // Prevents caching of *only* this request
        end(function(err, res) {
            if (!err) {

                var jsonObj = res.body;
                console.log("data: " + JSON.stringify(jsonObj));
                var data = [];
                for (var i = 0; i < jsonObj.length; i++) {
                  // console.log("data: " + jsonObj[i] );
                    var row = {
                      moduleCode: jsonObj[i].moduleCode,
                      moduleName: jsonObj[i].moduleName,
                      semester: jsonObj[i].semester,
                      day: jsonObj[i].day,
                      description: jsonObj[i].description,
                        id: i
                    };

                    data.push(row);
                }

                // console.log("data: " + data);
                // console.log(res.body);


                request.get('http://localhost:3000/student/' + this.props.userName + "/subjects" ).
                        set('Accept', 'application/json').
                        accept('application/json').
                        set('x-access-token', token).
                        use(nocache). // Prevents caching of *only* this request
                        end(function(err, res) {
                            if (!err) {

                                var jsonObj = res.body;
                                // console.log("data: " + JSON.stringify(jsonObj));
                                var subjectCodeArray = [];
                                for (var i = 0; i < jsonObj.length; i++) {
                                  // console.log("data: " + jsonObj[i] );
                                    var row = {
                                        moduleCode: jsonObj[i].moduleCode,
                                        id: i
                                    };

                                    subjectCodeArray.push(row);
                                }

                                console.log("data: " + subjectCodeArray);
                                // console.log(res.body);

                                callback(data, subjectCodeArray);

                            }else{
                              console.log(err);
                            }

                            // console.log(JSON.parse(res.text));
                        });

            }else{
              console.log(err);
            }

            // console.log(JSON.parse(res.text));
        });
    },
    componentWillMount: function() {

        this.fetchData(function(dataSe, subjectCodeArray) {
            this.setState({data: dataSe,
            subjectCode:subjectCodeArray });
            // console.log(dataSe );
        }.bind(this));
        //var data = this.getData();

    },

    getInitialState() {


        // var properties = augmentWithTitles( this.props.properties );


        var highlighter = (column) => highlight((value) => {
            return Search.matches(column, value, this.state.search.query);
        });

        var rightCorner = [ {
            cell: function(value, celldata, rowIndex) {
                var idx = findIndex(this.state.data, {id: celldata[rowIndex].id});
                // console.log("IDX" + idx);
                var edit = () => {

                };

                var remove = () => {
                    // this could go through flux etc.
                    var remove = this.state.data.splice(idx, 1);
                    console.log("Removed Data" + JSON.stringify(remove[0])  );
                    this.props.remove(remove[0]);
                    this.setState({data: this.state.data});
                };

                return {value: (
                        <span>
                            <span className='edit' onClick={edit.bind(this)} style={{
                                cursor: 'pointer'
                            }}>
                                &#8665;
                            </span>
                            <span className='remove' onClick={remove.bind(this)} style={{
                                cursor: 'pointer'
                            }} >
                                &#10007;
                            </span>
                        </span>
                    )};
            }.bind(this)
        } ];

        var columns = [

          {
              property: 'userName',
              header: "User Name"
          }, {
              property: 'firstName',
              header: 'First Name'
          }, {
              property: 'lastName',
              header: 'Last Name'
          }, {
              property: 'email',
              header: 'Email'
          }, {
              property: 'adddress',
              header: 'Adddress'
          }, {
              property: 'contactNumber',
              header: 'Contact Number'
          }, {
              property: 'subjects',
              header: 'Subjects'
          }


        ];

        columns = columns.map(function(col, index){
            col.cell = [highlighter(col.header)];
            return col;
        });

        columns = columns.concat(rightCorner);

        return {

            editedCell: null,
            data: [],
            search: {
                column: '',
                query: ''
            },
            header: {
                onClick: (column) => {
                    // reset edits
                    this.setState({editedCell: null});

                    sortColumn(this.state.columns, column, this.setState.bind(this));
                },
                className: cx(['header'])
            },
            sortingColumn: null, // reference to sorting column
            columns: columns,

            pagination: {
                page: 1,
                perPage:5
            },
            subjectCode: []
        };
    },

    onSearch(search) {
        this.setState({
            editedCell: null, // reset edits
            search: search
        });
    },
    // <ColumnFilters columns={columns}/>
    columnFilters() {
        var headerConfig = this.state.header;
        var columns = this.state.columns;
        // if you don't want an header, just return;
        return (
            <thead>
                <ColumnNames config={headerConfig} columns={columns}/>

            </thead>
        );
    },

    render() {

        // console.log("Test");
        // console.log(this.state.data);
        var columns = this.state.columns;

        var pagination = this.state.pagination;

        var data = this.state.data ;

        if (this.state.search.query) {
            data = Search.search(data, columns, this.state.search.column, this.state.search.query);
        }

        data = sortColumn.sort(data, this.state.sortingColumn, orderBy);

        var paginated = paginate(data, pagination);
        var pages = Math.ceil(data.length / Math.max(isNaN(pagination.perPage)
            ? 1
            : pagination.perPage, 1));





        return (
            <div>
                <div className='controls'>
                    <div className='per-page-container'>
                        Per page
                        <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
                    </div>
                    <div className='search-container'>
                        Search
                        <Search columns={columns} data={this.state.data} onChange={this.onSearch}/>
                    </div>
                </div>
                <Table className='pure-table pure-table-striped' columnNames={this.columnFilters} columns={columns} data={paginated.data} row={(d, rowIndex) => {
                    return {
                        className: rowIndex % 2
                            ? 'odd-row'
                            : 'even-row',
                        onClick: () => console.log('clicked row', d)
                    };
                }}></Table>
                <div className='controls'>
                    <div className='pagination'>
                        <Paginator.Context className="pagify-pagination" segments={segmentize({page: pagination.page, pages: pages, beginPages: 3, endPages: 3, sidePages: 2})} onSelect={this.onSelect}>
                            <Paginator.Button page={pagination.page - 1}>Previous</Paginator.Button>

                            <Paginator.Segment field="beginPages"/>

                            <Paginator.Ellipsis className="ellipsis" previousField="beginPages" nextField="previousPages"/>

                            <Paginator.Segment field="previousPages"/>
                            <Paginator.Segment field="centerPage" className="selected"/>
                            <Paginator.Segment field="nextPages"/>

                            <Paginator.Ellipsis className="ellipsis" previousField="nextPages" nextField="endPages"/>

                            <Paginator.Segment field="endPages"/>

                            <Paginator.Button page={pagination.page + 1}>Next</Paginator.Button>

                        </Paginator.Context>
                    </div>
                </div>

            </div>
        );
    },

    onSelect(page) {
        var pagination = this.state.pagination || {};
        var pages = Math.ceil(this.state.data.length / pagination.perPage);

        pagination.page = Math.min(Math.max(page, 1), pages);

        this.setState({pagination: pagination});
    },

    onPerPage(e) {
        var pagination = this.state.pagination || {};

        pagination.perPage = parseInt(e.target.value, 10);

        this.setState({pagination: pagination});
    }
});

function paginate(data, o) {
    data = data || [];

    // adapt to zero indexed logic
    var page = o.page - 1 || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages
        ? page
        : 0;

    return {
        amount: amountOfPages,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage
    };
}

function augmentWithTitles(o) {
    for (var property in o) {
        o[property].title = titleCase(property);
    }

    return o;
}



function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value
        ? a
        : b[key] === value && b);
}
