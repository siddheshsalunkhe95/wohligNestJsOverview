import * as mongoose from 'mongoose';
export declare const CategorySchema: mongoose.Schema<any>;
export interface Category extends mongoose.Document {
    title: string;
    createdAt: Date;
}
