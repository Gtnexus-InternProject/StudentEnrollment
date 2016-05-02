var mongoose = require('mongoose');
var subjectSchema = new mongoose.Schema({



    moduleCode:{
        type: String,
        unique: true,
        required: true
    },
    moduleName:String,
    department:String,
    credits:Number,
    semester:String,    //dropdown list
    day:String,         //dropdown list
    timeSlot:String,    //dropdown list
    description:String,
    preRequestSubjects:Array,
    status:String

});
mongoose.model('subject_model', subjectSchema);

