import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div
        className={` w-[300px] text-center rounded-md outline outline-2 ${
          data.label == "input"
            ? "outline-[#4472c4]"
            : data.color
            ? "outline-[#4472c4]"
            : "outline-red-400"
        }`}
      >
        <div className="flex justify-center items-center">
          <span className="font-bold uppercase bg-white pl-2 w-8  text-center">
            {data.input_type}
          </span>
          <p className=" p-2 w-full border-x-2 h-full bg-blue-50 border-[#4472c4]">
            {data.label}
          </p>
          <span className="font-bold uppercase bg-white pr-2 w-8 text-center">
            {data.output_type}
          </span>
        </div>
        {data.input_type && (
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
        )}
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
