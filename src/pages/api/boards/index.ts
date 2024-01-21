import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, IBoard } from "src/types/apiBoard";
import { createBoard } from "./createBoard";
import { deleteBoard } from "./deleteBoard";
import { getBoards } from "./getBoard";
import { updateBoard } from "./updateBoard";
import dbConnect from "@/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBoard[] | IBoard | string>>
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      await getBoards(req, res);
      break;
    case "POST":
      await createBoard(req, res);
      break;
    case "PUT":
      await updateBoard(req, res);
      break;
    case "DELETE":
      await deleteBoard(req, res);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
