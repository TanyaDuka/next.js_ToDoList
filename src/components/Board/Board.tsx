"use client";

import { useEffect, useState } from "react";
import Column from "@/components/Column/Column";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSearchForIdQuery } from "@/redux/slice/boardSlice";

const Board = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const {
    data: boardData,
    isFetching,
    refetch,
  } = useSearchForIdQuery({ id: String(id) }, { skip: !id });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  if (!boardData || !boardData.data || boardData.data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 text-center">
        <Link
          href="/"
          className="float-left mr-2.5 text-2xl font-semibold p-2 underline text-blue-500 decoration-blue-500 thin-underline  cursor-pointer "
        >
          {"<- Go Home"}
        </Link>
        <Header />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div>
        <Link
          href="/"
          className="float-left mr-2.5 text-2xl font-semibold p-2 underline text-blue-500 decoration-blue-500 thin-underline cursor-pointer hover:text-blue-700 "
        >
          {"<- Go Home"}
        </Link>
        <Header />
      </div>
      <h1 className="text-3xl font-semibold text-center mb-4">
        {boardData.name}
      </h1>
      <div className="flex space-x-4">
        {Object.entries(boardData?.data[0].cards).map(([key, column]) => (
          <Column
            key={key}
            mainTitle={key}
            tasks={column}
            boardId={String(id)}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
