/**
 * Created by hrajapaksha on 4/11/2016.
 */
var mongoose = require('mongoose');
var semesterSchema = new mongoose.Schema({

    semesterId:Number,
    semesterName:String,
   // startDate:Date,
   // EndDate:Date


});
mongoose.model('semester', semesterSchema);
var document = mongoose.model('document', semesterSchema);

var data = new document({

    semesterId:'1',
    semesterName:'Semester 1',
  //  startDate:'01.01.2012',
  //  EndDate:'31.05.2012'

});

data.save(function(err, thor) {
    if (err) return console.error(err);
    console.dir(thor);
});