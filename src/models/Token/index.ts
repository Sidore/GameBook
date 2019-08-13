import { Schema, Model, model, Document } from "mongoose";


export interface IToken {
    token: string;
    _userId: string;
}

export interface TokenType extends Document, IToken { };

const tokenSchema = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

export let Token = model<TokenType>("token", tokenSchema);