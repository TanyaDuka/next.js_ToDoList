import type { NextApiRequest, NextApiResponse } from "next";
import Board from "@/models/Board";
import mongoose from "mongoose";
import { ApiResponse, IBoard, ICard } from "@/types/apiBoard";

export async function updateCardInBoard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICard[]>>
) {
  const { id } = req.query;
  const { cardId, title, description, newStatus } = req.body;
  let statusForCards = ["ToDo", "InProgress", "Done"];

  try {
    let updatedBoard = null;
    let updatedCard = null;
    let oldStatus = null;

    for (const status of statusForCards) {
      const board = await Board.findOne({
        hashedId: id,
        [`cards.${status}._id`]: new mongoose.Types.ObjectId(cardId),
      });
      if (board) {
        oldStatus = status;
        break;
      }
    }

    if (
      newStatus &&
      newStatus !== oldStatus &&
      statusForCards.includes(newStatus)
    ) {
      await Board.findOneAndUpdate(
        { hashedId: id },
        {
          $pull: {
            [`cards.${oldStatus}`]: {
              _id: new mongoose.Types.ObjectId(cardId),
            },
          },
        }
      );

      updatedBoard = await Board.findOneAndUpdate(
        { hashedId: id },
        {
          $push: {
            [`cards.${newStatus}`]: {
              _id: new mongoose.Types.ObjectId(cardId),
              title,
              description,
            },
          },
        },
        { new: true }
      );

      updatedCard = { _id: cardId, title, description };
    } else {
      for (const status of statusForCards) {
        updatedBoard = await Board.findOneAndUpdate(
          {
            hashedId: id,
            [`cards.${status}._id`]: new mongoose.Types.ObjectId(cardId),
          },
          {
            $set: {
              [`cards.${status}.$.title`]: title,
              [`cards.${status}.$.description`]: description,
            },
          },
          { new: true }
        );

        if (updatedBoard) {
          updatedCard = updatedBoard.cards[status].find((card: ICard) =>
            card._id.equals(new mongoose.Types.ObjectId(cardId))
          );
          if (updatedCard) break;
        }
      }
    }

    if (!updatedCard) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ data: updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
