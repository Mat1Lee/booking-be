import mongoose, { Schema, Document } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import { MONGO_DB_NAME, MONGO_URL } from '../config';

// Interface for the options passed to the auto-increment plugin
interface Options {
  id: string;
  inc_field: string;
  reference_fields?: string[];
  disable_hooks?: boolean;
  collection_name?: string;
  parallel_hooks?: boolean;
  inc_amount?: number;
  start_seq?: number;
}

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db: any = mongoose.connection;

// Initialize AutoIncrement with mongoose-sequence
const initAutoIncrement: any = AutoIncrementFactory(db);

// Function to apply auto-increment to a Mongoose schema
const AutoIncrement = (schema: Schema<Document>, options: Options): void => {
  schema.plugin(initAutoIncrement, options);
};

export default AutoIncrement;