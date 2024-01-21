import Board from "@/models/Board";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, IBoard } from "@/types/apiBoard";

export async function getBoards(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBoard[]>>
) {
  try {
    let query = {};

    if (req.query.search) {
      const search = req.query.search as string;
      query = { name: { $regex: search, $options: "i" } };
    }

    if (req.query.id) {
      const id = req.query.id as string;
      query = { ...query, hashedId: id };
    }

    const boards = await Board.find(query);
    res.status(200).json({ data: boards });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
