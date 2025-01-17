import mongoose, { Document, Schema } from "mongoose";

export interface IOperators extends Document {
  operatorsName: string;
}

// export interface IOperatorsModel extends IOperators, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const OperatorsSchema: Schema = new Schema(
  {
    operatorsName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Operators =
  mongoose.models.Operators ||
  mongoose.model<IOperators>("Operators", OperatorsSchema);
export default Operators;
