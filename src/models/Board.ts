import mongoose from "mongoose";

interface ICard {
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
}

interface IBoard {
  hashedId: string;
  name: string;
  cards: {
    ToDo: ICard[];
    InProgress: ICard[];
    Done: ICard[];
  };
}

const cardSchema = new mongoose.Schema<ICard>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["ToDo", "InProgress", "Done"],
  },
});

const boardSchema = new mongoose.Schema<IBoard>({
  hashedId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cards: {
    ToDo: [cardSchema],
    InProgress: [cardSchema],
    Done: [cardSchema],
  },
});

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", boardSchema);
