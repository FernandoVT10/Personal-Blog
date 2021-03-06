import mongoose, { Schema } from "mongoose";

const message = new Schema({
    email: {
        type: String,
        maxlength: 100,
        validate: {
            validator: v => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "The email is not valid."
        },
        required: true
    },
    message: {
        type: String,
        maxlength: 500,
        required: true
    },
    viewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("messages", message);