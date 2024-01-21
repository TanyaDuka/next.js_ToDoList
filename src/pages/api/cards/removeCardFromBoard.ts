import type { NextApiRequest, NextApiResponse } from "next";
import Board from "@/models/Board";
import mongoose from "mongoose";
import { ApiResponse, ICard } from "@/types/apiBoard";

export async function removeCardFromBoard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICard[]>>
) {
  const { id } = req.query;
  const { cardId } = req.body;

  let statusForCards = ["ToDo", "InProgress", "Done"];
  let cardFound = false;
  let updatedBoard = null;

  try {
    for (const status of statusForCards) {
      updatedBoard = await Board.findOneAndUpdate(
        {
          hashedId: id,
          [`cards.${status}._id`]: new mongoose.Types.ObjectId(cardId),
        },
        {
          $pull: {
            [`cards.${status}`]: { _id: new mongoose.Types.ObjectId(cardId) },
          },
        },
        { new: true }
      );

      if (updatedBoard) {
        cardFound = true;
        break;
      }
    }

    if (!cardFound) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ data: updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
