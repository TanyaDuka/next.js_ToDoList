import mongoose from "mongoose";

export interface ICard {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

export interface IBoard {
  hashedId: string;
  name: string;
  cards: ICard[];
}

export interface IBoardCreateRequest {
  name: string;
  cards?: ICard[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
