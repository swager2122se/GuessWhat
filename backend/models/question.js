import mongoose from "mongoose";

const questionSchema = mongoose.Schema({

    answer : {
        type : [String],
        required : true
    },
    hardQuestions : {
        type : [String],
        required: true
    },
    easyQuestions : {
        type : [String],
        required : true  
    },
});

const Question = mongoose.model('Question',questionSchema);

export default Question;