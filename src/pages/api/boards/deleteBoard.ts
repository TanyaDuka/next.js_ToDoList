import Board from "@/models/Board";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, IBoard } from "@/types/apiBoard";

export async function deleteBoard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBoard[]>>
) {
  console.log('dsf')

  try {
    const { id } = req.query;
    console.log(id)
    const deletedBoard = await Board.findOneAndDelete({ hashedId: id });

    if (!deletedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }

    const boards = await Board.find();

    res.status(200).json({ data: deletedBoard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
