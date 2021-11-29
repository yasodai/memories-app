import React from "react";

export function Skeleton() {
  return (
    <div className="flex flex-col gap-3 pb-3 rounded-md bg-white overflow-hidden animate-pulse">
      <div className="h-44 w-full bg-gray-200 "></div>
      <div className="px-3 space-y-3 flex-1">
        <div className="h-5 flex gap-2">
          <div className="bg-gray-200 rounded w-9"></div>
          <div className="bg-gray-200 rounded w-10"></div>
        </div>
        <div className="h-7 bg-gray-200 rounded w-4/6"></div>
        <div className="space-y-1">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex justify-between px-3">
        <div className="w-20 h-5 bg-gray-200 rounded"></div>
        <div className="w-10 h-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
