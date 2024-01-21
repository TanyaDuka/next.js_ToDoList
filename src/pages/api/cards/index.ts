import type { NextApiRequest, NextApiResponse } from "next";
import { addCardToBoard } from "./addCardToBoard";
import { updateCardInBoard } from "./updateCardInBoard";
import { ApiResponse, IBoard, ICard } from "src/types/apiBoard";
import dbConnect from "@/utils/dbConnect";
import { removeCardFromBoard } from "./removeCardFromBoard";
import { reorderCardsInStatus } from "./reorderCardsInStatus";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICard[] | ICard | string>>
) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      await addCardToBoard(req, res);
      break;
    case "DELETE":
      await removeCardFromBoard(req, res);
      break;
    case "PATCH":
      await reorderCardsInStatus(req, res);
      break;
    case "PUT":
      await updateCardInBoard(req, res);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
