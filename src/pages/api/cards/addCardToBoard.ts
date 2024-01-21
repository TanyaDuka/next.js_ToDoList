import type { NextApiRequest, NextApiResponse } from "next";
import Board from "@/models/Board";
import { ApiResponse, ICard } from "@/types/apiBoard";

export async function addCardToBoard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICard>>
) {
  const { id } = req.query;
  const cardData = req.body;

  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { hashedId: id },
      {
        $push: {
          "cards.ToDo": {
            title: cardData.title,
            description: cardData.description,
          },
        },
      },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.status(200).json({ data: updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
