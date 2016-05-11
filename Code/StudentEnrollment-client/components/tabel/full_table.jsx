'use strict';

var React = require('react');
var Form = require('plexus-form');
var validate = require('plexus-validate');
var SkyLight = require('react-skylight').default;
// var generators = require('annogenerate');
// var math = require('annomath');
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

// var ColumnFilters = require('./column_filters.jsx');
var FieldWrapper = require('./field_wrapper.jsx');
var SectionWrapper = require('./section_wrapper.jsx');
// var countries = require('./countries');
// var generateData = require('./generate_data');

var highlight = require('./src/formatters/highlight');

var request = require('superagent');
var nocache = require('superagent-no-cache');

module.exports = React.createClass({
    displayName: 'FullTable',

    // fetchData: function(callback) {
    //
    //     // var me = this;
    //
    //     request.get('http://localhost:3000/subjects/asa')
    //     .set('Accept', 'application/json')
    //     .accept('application/json')
    //     .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNDYyOTY3MzAzLCJleHAiOjE0NjMwNTM3MDN9.doQCPHkb74UxyVVE1xQ44RMgR_7jdRdm1SXtaEy22As')
    //     .use(nocache). // Prevents caching of *only* this request
    //     end(function(err, res) {
    //         if (!err) {
    //
    //             var jsonObj = JSON.parse(res.text).subjects;
    //             // console.log("data: " + JSON.stringify(jsonObj));
    //             var data = [];
    //             for (var i = 0; i < jsonObj.length; i++) {
    //               // console.log("data: " + jsonObj[i] );
    //                 var row = {
    //                     moduleCode: jsonObj[i].moduleCode,
    //                     moduleName: jsonObj[i].moduleName,
    //                     count: jsonObj[i].count,
    //                     id: i
    //                 };
    //
    //                 data.push(row);
    //             }
    //
    //             console.log("data: " + data);
    //             // console.log(res.body);
    //
    //             callback(data);
    //
    //         }else{
    //           console.log(err);
    //         }
    //
    //         // console.log(JSON.parse(res.text));
    //     });
    // },
    // componentWillMount: function() {
    //
    //     this.fetchData(function(dataSe) {
    //         this.setState({data: dataSe});
    //         console.log(dataSe );
    //     }.bind(this));
    //     //var data = this.getData();
    //
    // },

    // componentWillMount: function() {
    //
    //     this.setState({data: this.props.data});
    //     console.log("Check 3");
    //     //var data = this.getData();
    //
    // },
    //
    // componentDidMount: function() {
    //     this.setState({data: this.props.data});
    //     console.log("Check 1");
    //     // this.loadCommentsFromServer();
    //     // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    // },

    componentWillReceiveProps: function(newProps) {
        // you don't have to do this check first, but some times it helps prevent against an unneeded render.
        if (newProps.data != this.state.data) {
            this.setState({data: newProps.data});
        }
    },
    getInitialState() {
        // var data = [];
        // this.state.data = data;

        // var countryValues = countries.map((c) => c.value);
        var properties = augmentWithTitles({
            moduleCode: {
                type: 'string'
            },
            moduleName: {
                type: 'string'
            }
        });
        // var data = this.props.data;
        // var data = generateData({
        //     amount: 100,
        //     fieldGenerators: getFieldGenerators(countryValues),
        //     properties: properties,
        // });
        // data = attachIds(data);
        // console.log("Test" + data);
        // var editable = cells.edit.bind(this, 'editedCell', (value, celldata, rowIndex, property) => {
        //     var idx = findIndex(this.state.data, {
        //         id: celldata[rowIndex].id,
        //     });
        //
        //     this.state.data[idx][property] = value;
        //
        //     this.setState({
        //         data: data,
        //     });
        // });
        // var formatters = {
        //     country: (country) => find(countries, 'value', country).name,
        //     //salary: (salary) => parseFloat(salary).toFixed(2),
        // };

        var highlighter = (column) => highlight((value) => {
            return Search.matches(column, value, this.state.search.query);
        });

        return {

            editedCell: null,
            data: null,
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
            columns: [
                {
                    property: 'moduleCode',
                    header: "Module Code",
                    cell: [highlighter('Module Code')]
                }, {
                    property: 'moduleName',
                    header: 'Module Name',
                    cell: [highlighter('Module Name')]
                }, {
                    property: 'count',
                    header: 'Student Count',
                    cell: [highlighter('Student Count')]
                }, {
                    cell: function(value, celldata, rowIndex) {
                        var idx = findIndex(this.state.data, {id: celldata[rowIndex].id});
                        // console.log("IDX" + idx);
                        var edit = () => {
                            var schema = {
                                type: 'object',
                                properties: properties
                            };

                            var onSubmit = (editData, editValue) => {
                                this.refs.modal.hide();

                                if (editValue === 'Cancel') {
                                    return;
                                }

                                this.state.data[idx] = editData;

                                this.setState({data: this.state.data});
                            };

                            var getButtons = (submit) => {
                                return (
                                    <span>
                                        <input type='button' className='pure-button pure-button-primary ok-button' key='ok' value='OK' onClick={submit}/>
                                        <input type='button' className='pure-button cancel-button' key='cancel' value='Cancel' onClick={submit}/>
                                    </span>
                                );
                            };

                            this.setState({
                                modal: {
                                    title: 'Edit',
                                    content: <Form className='pure-form pure-form-aligned' fieldWrapper={FieldWrapper} sectionWrapper={SectionWrapper} buttons={getButtons} schema={schema} validate={validate} values={this.state.data[idx]} onSubmit={onSubmit}/>
                                }
                            });

                            this.refs.modal.show();
                        };

                        var remove = () => {
                            // this could go through flux etc.
                            this.state.data.splice(idx, 1);

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
                                    }}>
                                        &#10007;
                                    </span>
                                </span>
                            )};
                    }.bind(this)
                }
            ],
            modal: {
                title: 'title',
                content: 'content'
            },
            pagination: {
                page: 1,
                perPage: 10
            }
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
        // if(  this.props.data.length < 0 ) {
        //   // this.setState({ data: this.props.data });
        // }
        // == []
        //     ? this.state.data
        //     : this.props.data
        var data = this.state.data ;

        if (this.state.search.query) {
            data = Search.search(data, columns, this.state.search.column, this.state.search.query);
        }

        data = sortColumn.sort(data, this.state.sortingColumn, orderBy);

        var paginated = paginate(data, pagination);
        var pages = Math.ceil(data.length / Math.max(isNaN(pagination.perPage)
            ? 1
            : pagination.perPage, 1));

        // <tfoot>
        //     <tr>
        //         <td>
        //             You could show sums etc. here in the customizable footer.
        //         </td>
        //         <td></td>
        //         <td></td>
        //         <td></td>
        //         <td></td>
        //         <td></td>
        //     </tr>
        // </tfoot>

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
                <SkyLight ref='modal' title={this.state.modal.title}>{this.state.modal.content}</SkyLight>
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

// function getFieldGenerators(countryValues) {
//     return {
//         name: function() {
//             var forenames = [
//                 'Jack',
//                 'Bo',
//                 'John',
//                 'Jill',
//                 'Angus',
//                 'Janet',
//                 'Cecilia',
//                 'Daniel',
//                 'Marge',
//                 'Homer',
//                 'Trevor',
//                 'Fiona',
//                 'Margaret',
//                 'Ofelia'
//             ];
//             var surnames = [
//                 'MacGyver',
//                 'Johnson',
//                 'Jackson',
//                 'Robertson',
//                 'Hull',
//                 'Hill'
//             ];
//
//             return math.pick(forenames) + ' ' + math.pick(surnames);
//         },
//         position: function() {
//             var positions = ['Boss', 'Contractor', 'Client', ''];
//
//             return math.pick(positions);
//         },
//         salary: generators.number.bind(null, 0, 2),
//         country: function() {
//             return math.pick(countryValues);
//         }
//     };
// }
//
// function attachIds(arr) {
//     return arr.map((o, i) => {
//         o.id = i;
//
//         return o;
//     });
// }

function find(arr, key, value) {
    return arr.reduce((a, b) => a[key] === value
        ? a
        : b[key] === value && b);
}
