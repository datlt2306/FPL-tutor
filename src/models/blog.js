import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        // createAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    { versionKey: false, timestamps: true }
);
blogSchema.plugin(mongoosePaginate);
export default mongoose.model("Blog", blogSchema);
