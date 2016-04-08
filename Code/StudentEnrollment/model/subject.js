var mongoose = require('mongoose');
var subjectSchema = new mongoose.Schema({
    moduleCode:String,
    moduleName:String,
    department:String,
    coordinator:String,
    credits:String,
    semester:String,
    day:String,
    description:String,
    preRequestSubjects:Array,
    status:String,

});
mongoose.model('subject', subjectSchema);
