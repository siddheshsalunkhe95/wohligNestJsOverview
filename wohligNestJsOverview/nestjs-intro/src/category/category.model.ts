import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

export interface Category extends mongoose.Document {
    title: string;
    createdAt: Date;
}
