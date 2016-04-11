/**
 * Created by hrajapaksha on 4/11/2016.
 */
var timeSlotSchema = new mongoose.Schema({

    timeSlotId:Number,
    timeSlotName:String,
    startTime: String,
    EndTime:String


});
mongoose.model('timeSlot', timeSlotSchema);