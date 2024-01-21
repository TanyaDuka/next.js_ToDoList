import Board from "@/models/Board";
import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes, createHash } from "crypto";
import { ApiResponse, IBoard, IBoardCreateRequest } from "@/types/apiBoard";

export async function createBoard(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBoard[]>>
) {
  try {
    const boardData: IBoardCreateRequest = req.body;

    const existingBoard = await Board.findOne({ name: boardData.name });
    if (existingBoard) {
      return res
        .status(400)
        .json({ error: "Board with this name already exists" });
    }

    const randomId = randomBytes(16).toString("hex");
    const hashedId = createHash("sha256").update(randomId).digest("hex");

    const newBoardData = {
      ...boardData,
      hashedId,
      cards: {
        ToDo: [],
        InProgress: [],
        Done: [],
      },
    };

    const board =await Board.create(newBoardData);

    res.status(201).json({ data: board });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
