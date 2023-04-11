import React, { useEffect, useState, useRef, useCallback } from "react";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import { useParams } from "react-router-dom";
const initialNodes = [
  {
    id: "input",
    type: "selectorNode",
    data: { label: "input", input_type: "", output_type: "x", color: true },
    position: { x: 250, y: 5 },
  },
];
const nodeTypes = {
  selectorNode: CustomNode,
};

export default function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        edges.map((edge) => {
          if (node.id == edge.target) {
            node.data = {
              ...node.data,
              color: true,
            };
          }
        });
        return node;
      })
    );
  }, [edges, setEdges, setNodes]);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let type = event.dataTransfer.getData("application/reactflow");
      type = JSON.parse(type).module;
      if (typeof type.name === "undefined" || !type.name) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeTemp = [
        {
          id: type.id,
          type: "selectorNode",
          position,
          data: {
            label: `${type.name}`,
            input_type: `${type.input_type}`,
            output_type: `${type.output_type}`,
            color: false,
          },
        },
      ];

      setNodes((nds) => nds.concat(nodeTemp));
    },
    [reactFlowInstance]
  );

  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  let { name } = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${name}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [name]);

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(true);
    fetch(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setModules(data);
        setIsLoading(false);
      });
  }, [page, setPage]);

  return (
    <div className="h-full">
      <h2 className="font-bold w-full fixed px-8 py-3 border-2 border-[#4472c4]">
        Workflows name: {user.name}
      </h2>
      <div className="pt-[52px] flex w-full h-full">
        <ReactFlowProvider>
          {!isLoading && (
            <Sidebar modules={modules} page={page} setPage={setPage} />
          )}
          <div className=" h-full bg-white w-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              nodeTypes={nodeTypes}
              onDragOver={onDragOver}
              fitView
            >
              <Background />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
