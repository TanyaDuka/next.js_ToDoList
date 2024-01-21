import Board from "@/models/Board";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, IBoard } from "@/types/apiBoard";

export async function updateBoard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBoard[]>>
) {
  try {
    const { id } = req.query;
    const { newName } = req.body;

    if (!id || typeof newName !== "string") {
      res.status(400).json({ error: "Invalid request parameters" });
      return;
    }

    const updatedBoard = await Board.findOneAndUpdate(
      { hashedId: id },
      { name: newName },
      { new: true }
    );

    if (!updatedBoard) {
      res.status(404).json({ error: "Board not found" });
      return;
    }


    res.status(200).json({ data: updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
