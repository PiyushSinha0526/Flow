import React from "react";

export default ({ modules, page, setPage }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeType)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const pagination = (i) => {
    if (page + i <= 0 || page + i > 20) return;
    setPage((prev) => prev + i);
  };
  return (
    <>
      <aside className="max-w-[350px] w-2/5 flex flex-col  border-r-2 border-[#4472c4]">
        <div className=" border-b-2 border-[#4472c4] p-4">Modules</div>
        <div className="flex flex-col h-full justify-between items-center">
          <div className="p-4 flex flex-col gap-4 border-2 border-white h-full">
            {modules.map((module) => (
              <div
                key={module.name}
                className="border-2 bg-white border-[#4472c4] rounded-lg flex gap-2 items-center justify-center"
                onDragStart={(event) => onDragStart(event, { module: module })}
                draggable
              >
                <span className="font-bold uppercase bg-white pl-2 w-8  text-center">
                  {module.input_type}
                </span>
                <p className=" p-2 w-full border-x-2 h-full border-[#4472c4]">
                  {module.name}
                </p>
                <span className="font-bold uppercase bg-white pr-2 w-8 text-center">
                  {module.output_type}
                </span>
              </div>
            ))}
          </div>
          <div className="pb-5 flex gap-4">
            <span
              onClick={() => pagination(-1)}
              className="cursor-pointer font-bold active:scale-105"
            >
              &#60;
            </span>
            <span>{page}</span>
            <span
              onClick={() => pagination(1)}
              className="cursor-pointer font-bold active:scale-105"
            >
              &#62;
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
