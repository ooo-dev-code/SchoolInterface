import mongoose from "mongoose";

const HomeworkSchema = new mongoose.Schema({
    description: {
    type: String,
    required: true, 
    },
    classes: {
    type: String,
    required: true,
    },
    subject: {
    type: String,
    required: true,
    },
    day: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
},
);

const Homework = mongoose.model("Homework", HomeworkSchema);

export default Homework;