import type { NextApiRequest, NextApiResponse } from "next";
import Board from "@/models/Board";
import mongoose from "mongoose";
import { ApiResponse, IBoard, ICard } from "@/types/apiBoard";

export async function reorderCardsInStatus(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICard>>
) {
  const { id } = req.query;
  const { cardId, direction } = req.body;
  let statusForCards = ["ToDo", "InProgress", "Done"];

  try {
    const board = await Board.findOne({ hashedId: id });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    let updatedBoard = null;
    for (const status of statusForCards) {
      const cardIndex = board.cards[status].findIndex((card: ICard) =>
        card._id.equals(new mongoose.Types.ObjectId(cardId))
      );

      if (cardIndex >= 0) {
        const [removedCard] = board.cards[status].splice(cardIndex, 1);

        const newPosition = direction === "up" ? cardIndex - 1 : cardIndex + 1;

        if (newPosition >= 0 && newPosition <= board.cards[status].length) {
          board.cards[status].splice(newPosition, 0, removedCard);

          updatedBoard = await Board.findOneAndUpdate(
            { hashedId: id },
            { $set: { [`cards.${status}`]: board.cards[status] } },
            { new: true }
          );
        }
        break;
      }
    }

    if (!updatedBoard) {
      return res
        .status(404)
        .json({ error: "Card not found or move not possible" });
    }

    res.status(200).json({ data: updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
