import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);
todoSchema.plugin(mongoosePaginate);
export default mongoose.model("Todo", todoSchema);
