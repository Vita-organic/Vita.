"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Node,
  Edge,
  Connection,
  BackgroundVariant,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { VITAMINS_DATA } from "@/data/vitamins";

// ============================================================================
// CUSTOM NODE COMPONENTS FOR MIND MAP
// ============================================================================

// 1. Root Node (Center)
function MindMapRootNode({ data, selected }: { data: { label: string; description?: string }; selected?: boolean }) {
  return (
    <div
      className={`px-6 py-4 rounded-2xl bg-[#0c0a09]/90 border backdrop-blur-md transition-all duration-300 shadow-2xl text-center min-w-[240px] ${selected ? "border-[#e8a830] ring-2 ring-[#e8a830]/30 shadow-[#e8a830]/20" : "border-[#e8a830]/40 shadow-black/80"
        }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-[#e8a830] !w-3 !h-3 !border-2 !border-[#060504]" />
      <Handle type="source" position={Position.Right} className="!bg-[#e8a830] !w-3 !h-3 !border-2 !border-[#060504]" />
      <Handle type="target" position={Position.Top} className="!bg-[#e8a830] !w-3 !h-3 !border-2 !border-[#060504]" />
      <Handle type="source" position={Position.Bottom} className="!bg-[#e8a830] !w-3 !h-3 !border-2 !border-[#060504]" />

      <span className="inline-block px-2.5 py-0.5 mb-1.5 rounded-full text-xs font-mono tracking-wider bg-[#e8a830]/15 text-[#e8a830] border border-[#e8a830]/30 uppercase">
        Nó Principal
      </span>
      <h3 className="font-editorial text-2xl font-light text-white tracking-wide">{data.label}</h3>
      {data.description && <p className="text-xs sm:text-sm text-white/60 font-sans mt-0.5 leading-relaxed">{data.description}</p>}
    </div>
  );
}

// 2. Category Branch Node (Lipossolúveis / Hidrossolúveis)
function MindMapCategoryNode({
  data,
  selected,
}: {
  data: { label: string; category: "lipo" | "hidro"; description?: string; count: string };
  selected?: boolean;
}) {
  const isLipo = data.category === "lipo";
  const accentColor = isLipo ? "#e8a830" : "#38bdf8";

  return (
    <div
      className={`px-5 py-3.5 rounded-xl bg-[#0f0d0a]/90 border backdrop-blur-md transition-all duration-300 shadow-xl min-w-[210px] ${selected ? "ring-2" : ""
        }`}
      style={{
        borderColor: `${accentColor}50`,
        boxShadow: selected ? `0 0 20px ${accentColor}40` : `0 10px 25px rgba(0,0,0,0.5)`,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ backgroundColor: accentColor, width: 10, height: 10 }} />
      <Handle type="source" position={Position.Right} style={{ backgroundColor: accentColor, width: 10, height: 10 }} />
      <Handle type="target" position={Position.Top} style={{ backgroundColor: accentColor, width: 10, height: 10 }} />
      <Handle type="source" position={Position.Bottom} style={{ backgroundColor: accentColor, width: 10, height: 10 }} />

      <div className="flex items-center justify-between gap-2 mb-1">
        <span
          className="text-xs font-mono tracking-wider px-2 py-0.5 rounded-md uppercase font-semibold"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          {data.count}
        </span>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
      </div>

      <h4 className="font-editorial text-xl font-light text-white">{data.label}</h4>
      {data.description && <p className="text-xs text-white/60 font-sans mt-0.5 leading-tight">{data.description}</p>}
    </div>
  );
}

// 3. Vitamin Node (Individual Vitamin)
function MindMapVitaminNode({
  data,
  selected,
}: {
  data: {
    label: string;
    chemicalName: string;
    formula: string;
    letter: string;
    accentColor: string;
    category: "lipossolúvel" | "hidrossolúvel";
    description?: string;
    functionSummary?: string;
  };
  selected?: boolean;
}) {
  const isLipo = data.category === "lipossolúvel";
  const glowColor = data.accentColor || (isLipo ? "#e8a830" : "#38bdf8");
  const summaryText = data.description || data.functionSummary || "";

  return (
    <div
      className={`px-4 py-3 rounded-xl bg-[#0c0b0a]/90 border backdrop-blur-md transition-all duration-200 min-w-[190px] max-w-[220px] ${selected ? "ring-2" : ""
        }`}
      style={{
        borderColor: selected ? glowColor : `${glowColor}35`,
        boxShadow: selected ? `0 0 16px ${glowColor}35` : "0 4px 15px rgba(0,0,0,0.4)",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ backgroundColor: glowColor, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ backgroundColor: glowColor, width: 8, height: 8 }} />
      <Handle type="target" position={Position.Top} style={{ backgroundColor: glowColor, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ backgroundColor: glowColor, width: 8, height: 8 }} />

      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-mono"
          style={{ backgroundColor: `${glowColor}25`, color: glowColor, border: `1px solid ${glowColor}50` }}
        >
          {data.letter}
        </span>
        <span className="font-mono text-xs text-white/65 truncate">{data.formula}</span>
      </div>

      <div className="font-editorial text-lg text-white font-medium leading-tight">{data.label}</div>
      <div className="text-xs text-[#e8a830]/90 font-mono tracking-wide">{data.chemicalName}</div>

      {summaryText && (
        <p className="text-xs text-white/60 font-sans mt-1.5 line-clamp-3 border-t border-white/5 pt-1 leading-tight">
          {summaryText}
        </p>
      )}
    </div>
  );
}

// 4. Detail Sub-Node (Functions, Sources, Symptoms, Custom Notes)
function MindMapDetailNode({
  data,
  selected,
}: {
  data: { label: string; description?: string; type: "func" | "source" | "symp" | "custom" };
  selected?: boolean;
}) {
  const typeStyles = {
    func: { border: "border-emerald-500/30", text: "text-emerald-300", bg: "bg-emerald-950/20", tag: "Função" },
    source: { border: "border-amber-500/30", text: "text-amber-300", bg: "bg-amber-950/20", tag: "Fonte" },
    symp: { border: "border-rose-500/30", text: "text-rose-300", bg: "bg-rose-950/20", tag: "Deficiência" },
    custom: { border: "border-purple-500/30", text: "text-purple-300", bg: "bg-purple-950/20", tag: "Nota" },
  };

  const style = typeStyles[data.type] || typeStyles.custom;

  return (
    <div
      className={`px-3 py-2 rounded-lg bg-[#080706]/95 border ${style.border} backdrop-blur-sm max-w-[200px] text-left transition-all ${selected ? "ring-1 ring-white/40 scale-105" : ""
        }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-white/40 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-white/40 !w-2 !h-2" />
      <Handle type="target" position={Position.Top} className="!bg-white/40 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-white/40 !w-2 !h-2" />

      <span className={`text-xs font-mono uppercase px-2 py-0.5 rounded ${style.bg} ${style.text} tracking-wider`}>
        {style.tag}
      </span>
      <p className="text-xs sm:text-sm text-white/90 font-sans mt-1 leading-snug font-medium">{data.label}</p>
      {data.description && (
        <p className="text-xs text-white/60 font-sans mt-1 border-t border-white/5 pt-0.5 leading-tight">
          {data.description}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// INITIAL MAP BUILDER (DEFAULT SCIENTIFIC STRUCTURE)
// ============================================================================
function createInitialElements() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Root
  nodes.push({
    id: "root",
    type: "rootNode",
    position: { x: 0, y: 0 },
    data: { label: "VITAMINAS", description: "Micronutrientes Essenciais sem Valor Calórico" },
  });

  // Branch 1: Lipossolúveis (Left)
  nodes.push({
    id: "cat-lipo",
    type: "categoryNode",
    position: { x: -380, y: -80 },
    data: {
      label: "Lipossolúveis",
      category: "lipo",
      description: "Solúveis em lipídios · Armazenadas no fígado e tecido adiposo",
      count: "4 Vitaminas",
    },
  });

  edges.push({
    id: "e-root-lipo",
    source: "root",
    target: "cat-lipo",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#e8a830", strokeWidth: 2 },
  });

  // Branch 2: Hidrossolúveis (Right)
  nodes.push({
    id: "cat-hidro",
    type: "categoryNode",
    position: { x: 380, y: -80 },
    data: {
      label: "Hidrossolúveis",
      category: "hidro",
      description: "Solúveis em água · Excretadas na urina (Sem estoques)",
      count: "5 Vitaminas",
    },
  });

  edges.push({
    id: "e-root-hidro",
    source: "root",
    target: "cat-hidro",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#38bdf8", strokeWidth: 2 },
  });

  // Lipossolúveis Nodes (A, D, E, K)
  const lipoVits = VITAMINS_DATA.filter((v) => v.classification === "lipossolúvel");
  lipoVits.forEach((vit, idx) => {
    const nodeId = `vit-${vit.id}`;
    const yPos = -320 + idx * 160;
    const xPos = -720;

    nodes.push({
      id: nodeId,
      type: "vitaminNode",
      position: { x: xPos, y: yPos },
      data: {
        label: vit.name,
        chemicalName: vit.chemicalName,
        formula: vit.formula,
        letter: vit.letter,
        accentColor: vit.accentColor,
        category: vit.classification,
        functionSummary: vit.functions[0] || "",
        description: vit.functions[0] || "",
      },
    });

    edges.push({
      id: `e-lipo-${vit.id}`,
      source: "cat-lipo",
      target: nodeId,
      type: "smoothstep",
      style: { stroke: `${vit.accentColor}90`, strokeWidth: 1.5 },
    });

    // Add first key function as detail sub-node
    if (vit.functions[0]) {
      const detailId = `detail-func-${vit.id}`;
      nodes.push({
        id: detailId,
        type: "detailNode",
        position: { x: xPos - 210, y: yPos - 10 },
        data: { label: vit.functions[0], type: "func" },
      });

      edges.push({
        id: `e-${vit.id}-func`,
        source: nodeId,
        target: detailId,
        type: "default",
        style: { stroke: "#10b981", strokeDasharray: "4 4", strokeWidth: 1 },
      });
    }

    // Add avitaminosis symptom as detail sub-node
    if (vit.avitaminosis.symptoms[0]) {
      const detailSympId = `detail-symp-${vit.id}`;
      nodes.push({
        id: detailSympId,
        type: "detailNode",
        position: { x: xPos - 210, y: yPos + 60 },
        data: { label: vit.avitaminosis.symptoms[0], type: "symp" },
      });

      edges.push({
        id: `e-${vit.id}-symp`,
        source: nodeId,
        target: detailSympId,
        type: "default",
        style: { stroke: "#f43f5e", strokeDasharray: "4 4", strokeWidth: 1 },
      });
    }
  });

  // Hidrossolúveis Nodes (B1, B2, B6, B12, C)
  const hidroVits = VITAMINS_DATA.filter((v) => v.classification === "hidrossolúvel");
  hidroVits.forEach((vit, idx) => {
    const nodeId = `vit-${vit.id}`;
    const yPos = -380 + idx * 150;
    const xPos = 720;

    nodes.push({
      id: nodeId,
      type: "vitaminNode",
      position: { x: xPos, y: yPos },
      data: {
        label: vit.name,
        chemicalName: vit.chemicalName,
        formula: vit.formula,
        letter: vit.letter,
        accentColor: vit.accentColor,
        category: vit.classification,
        functionSummary: vit.functions[0] || "",
        description: vit.functions[0] || "",
      },
    });

    edges.push({
      id: `e-hidro-${vit.id}`,
      source: "cat-hidro",
      target: nodeId,
      type: "smoothstep",
      style: { stroke: `${vit.accentColor}90`, strokeWidth: 1.5 },
    });

    // Add first key function as detail sub-node
    if (vit.functions[0]) {
      const detailId = `detail-func-${vit.id}`;
      nodes.push({
        id: detailId,
        type: "detailNode",
        position: { x: xPos + 220, y: yPos - 10 },
        data: { label: vit.functions[0], type: "func" },
      });

      edges.push({
        id: `e-${vit.id}-func`,
        source: nodeId,
        target: detailId,
        type: "default",
        style: { stroke: "#10b981", strokeDasharray: "4 4", strokeWidth: 1 },
      });
    }

    // Add main source as detail sub-node
    if (vit.sources[0]) {
      const detailSourceId = `detail-src-${vit.id}`;
      nodes.push({
        id: detailSourceId,
        type: "detailNode",
        position: { x: xPos + 220, y: yPos + 60 },
        data: { label: `Fontes: ${vit.sources[0]}`, type: "source" },
      });

      edges.push({
        id: `e-${vit.id}-src`,
        source: nodeId,
        target: detailSourceId,
        type: "default",
        style: { stroke: "#f59e0b", strokeDasharray: "4 4", strokeWidth: 1 },
      });
    }
  });

  return { initialNodes: nodes, initialEdges: edges };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function MindMapStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { initialNodes, initialEdges } = useMemo(() => createInitialElements(), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Memoize nodeTypes to prevent React Flow warning #002
  const nodeTypes = useMemo(
    () => ({
      rootNode: MindMapRootNode,
      categoryNode: MindMapCategoryNode,
      vitaminNode: MindMapVitaminNode,
      detailNode: MindMapDetailNode,
    }),
    []
  );

  // Inspector & Edit State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [newNodeType, setNewNodeType] = useState<"func" | "source" | "symp" | "custom">("custom");
  const [newNodeText, setNewNodeText] = useState("");

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId), [nodes, selectedNodeId]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch((err) => {
        console.error("Erro ao abrir tela cheia:", err);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch((err) => {
        console.error("Erro ao sair da tela cheia:", err);
      });
    }
  }, []);

  // Sync fullscreen change event (e.g., ESC key pressed)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Connect edges dynamically
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#e8a830", strokeWidth: 1.5 } }, eds)
      ),
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    const label = node.data?.label || "";
    const desc = node.data?.description || node.data?.functionSummary || "";
    setEditLabel(typeof label === "string" ? label : "");
    setEditDescription(typeof desc === "string" ? desc : "");
  }, []);

  // Update selected node label & description
  const handleSaveNodeDetails = useCallback(() => {
    if (!selectedNodeId) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editLabel,
              description: editDescription,
              functionSummary: editDescription,
            },
          };
        }
        return node;
      })
    );
  }, [selectedNodeId, editLabel, editDescription, setNodes]);

  // Add child node to selected node
  const handleAddChildNode = useCallback(() => {
    if (!selectedNodeId || !newNodeText.trim()) return;

    const parentNode = nodes.find((n) => n.id === selectedNodeId);
    if (!parentNode) return;

    const newId = `custom-${Date.now()}`;
    const newPosition = {
      x: parentNode.position.x + (parentNode.position.x < 0 ? -220 : 220),
      y: parentNode.position.y + Math.floor(Math.random() * 80 - 40),
    };

    const newNode: Node = {
      id: newId,
      type: "detailNode",
      position: newPosition,
      data: {
        label: newNodeText,
        type: newNodeType,
      },
    };

    const newEdge: Edge = {
      id: `e-${selectedNodeId}-${newId}`,
      source: selectedNodeId,
      target: newId,
      type: "smoothstep",
      style: { stroke: "#a855f7", strokeDasharray: "4 4", strokeWidth: 1.5 },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setNewNodeText("");
  }, [selectedNodeId, newNodeText, newNodeType, nodes, setNodes, setEdges]);

  // Delete selected node
  const handleDeleteSelected = useCallback(() => {
    if (!selectedNodeId || selectedNodeId === "root") return;

    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
    setSelectedNodeId(null);
  }, [selectedNodeId, setNodes, setEdges]);

  // Reset to original structure
  const handleResetMap = useCallback(() => {
    const fresh = createInitialElements();
    setNodes(fresh.initialNodes);
    setEdges(fresh.initialEdges);
    setSelectedNodeId(null);
  }, [setNodes, setEdges]);

  // Check that container has non-zero dimensions before mounting React Flow (prevents React Flow Error #004)
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      if (el.clientWidth > 0 && el.clientHeight > 0) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    let rafId: number;
    let observer: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            setIsReady(true);
            observer?.disconnect();
            break;
          }
        }
      });
      observer.observe(el);
    }

    const poll = () => {
      if (!check()) {
        rafId = requestAnimationFrame(poll);
      }
    };
    rafId = requestAnimationFrame(poll);

    return () => {
      observer?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Suppress transient 004 error if viewport/container is measured during layout calculation
  const handleFlowError = useCallback((id: string, message: string) => {
    if (id === "004") return;
    console.warn(`[React Flow]: (${id}) ${message}`);
  }, []);

  return (
    <section id="mapa-mental" className="relative w-full bg-[#060504] border-t border-white/[0.06] py-20 px-4 sm:px-8 md:px-16 overflow-hidden">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#e8a830]/5 via-transparent to-[#38bdf8]/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-10 relative z-10">
        <span className="eyebrow-scientific text-white/50 mb-2 sm:mb-3 inline-block">
          06 · NAVEGAÇÃO CONCEITUAL & MAPA INTERATIVO
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
          Mapa Mental de Vitaminas
        </h2>

        {/* Quick Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-6 text-xs sm:text-xs font-mono">
          <button
            onClick={handleResetMap}
            className="px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[#e8a830]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restaurar Estrutura Original
          </button>
        </div>
      </div>

      {/* Canvas Container (with Fullscreen Ref & Explicit Dimensions) */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: isFullscreen ? "100vh" : undefined,
          minHeight: "460px",
        }}
        className={`w-full relative overflow-hidden bg-[#070605] ${isFullscreen
          ? "fixed inset-0 z-50 rounded-none border-none h-screen"
          : "max-w-7xl mx-auto rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl h-[520px] sm:h-[600px] lg:h-[680px]"
          }`}
      >
        {!isReady && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/40">
            <div className="w-7 h-7 rounded-full border-2 border-[#e8a830]/30 border-t-[#e8a830] animate-spin" />
            <span className="font-mono text-xs tracking-wider uppercase">Carregando Mapa Conceitual...</span>
          </div>
        )}

        {isReady && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onError={handleFlowError}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={1.8}
            className="bg-[#070605]"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Subtle Grid Dots */}
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#ffffff15" />

            {/* Minimal Controls Bar */}
            <Controls showInteractive={false} />

            {/* Dark MiniMap */}
            <MiniMap
              nodeColor={(node) => {
                if (node.type === "rootNode") return "#e8a830";
                if (node.type === "categoryNode") return node.data?.category === "lipo" ? "#e8a830" : "#38bdf8";
                if (node.type === "vitaminNode") return (node.data?.accentColor as string) || "#38bdf8";
                return "#a855f7";
              }}
              maskColor="rgba(6, 5, 4, 0.85)"
              className="!bg-[#090807] !border !border-white/10 !rounded-xl overflow-hidden shadow-2xl"
            />

            {/* Top-Left Floating Controls: Fullscreen Toggle */}
            <Panel position="top-left" className="m-4">
              <button
                onClick={toggleFullscreen}
                className="px-3.5 py-2 rounded-xl border border-white/15 bg-[#0c0a09]/90 hover:bg-[#e8a830]/20 hover:border-[#e8a830]/50 text-white text-xs font-mono backdrop-blur-md shadow-2xl flex items-center gap-2 transition-all"
                title={isFullscreen ? "Sair da Tela Cheia (ESC)" : "Expandir em Tela Cheia"}
              >
                <svg className="w-4 h-4 text-[#e8a830]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isFullscreen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0M4 4v5m6 6l5 5m0 0h-5m5 0v-5" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  )}
                </svg>
                <span>{isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}</span>
              </button>
            </Panel>

            {/* Floating Edit & Inspector Panel */}
            {selectedNode && (
              <Panel position="top-right" className="m-2 sm:m-4 max-w-[calc(100vw-2rem)]">
                <div className="w-72 sm:w-80 bg-[#0e0c0a]/95 border border-[#e8a830]/40 rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl font-sans text-white text-xs space-y-3 animate-in fade-in slide-in-from-right-4 duration-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#e8a830] animate-pulse" />
                      <span className="font-mono text-xs text-[#e8a830] uppercase tracking-wider">
                        Painel de Edição do Nó
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedNodeId(null)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Edit Title */}
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase">
                      Título / Nome do Nó:
                    </label>
                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      className="w-full bg-[#060504] border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e8a830]"
                      placeholder="Nome do nó..."
                    />
                  </div>

                  {/* Edit Description */}
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase">
                      Descrição / Detalhes:
                    </label>
                    <textarea
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full bg-[#060504] border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e8a830] resize-none leading-relaxed"
                      placeholder="Escreva uma breve descrição..."
                    />
                  </div>

                  <div className="flex justify-end pt-0.5">
                    <button
                      onClick={handleSaveNodeDetails}
                      className="w-full py-1.5 bg-[#e8a830] text-[#060504] font-medium font-mono text-xs rounded-lg hover:bg-[#f0b542] transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Salvar Alterações
                    </button>
                  </div>

                  {/* Add Child Node */}
                  <div className="border-t border-white/10 pt-3">
                    <label className="block text-xs font-mono text-white/60 mb-1 uppercase">
                      Adicionar Sub-Nó Conectado:
                    </label>
                    <div className="space-y-2">
                      <select
                        value={newNodeType}
                        onChange={(e) => setNewNodeType(e.target.value as any)}
                        className="w-full bg-[#060504] border border-white/20 rounded-lg px-2 py-1 text-xs text-white/80 focus:outline-none focus:border-[#e8a830]"
                      >
                        <option value="func">Função Biológica (Verde)</option>
                        <option value="source">Fonte Alimentar (Laranja)</option>
                        <option value="symp">Sintoma / Avitaminose (Vermelho)</option>
                        <option value="custom">Nota Personalizada (Roxo)</option>
                      </select>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ex: Fortalece esmalte dentário"
                          value={newNodeText}
                          onChange={(e) => setNewNodeText(e.target.value)}
                          className="flex-1 bg-[#060504] border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e8a830]"
                        />
                        <button
                          onClick={handleAddChildNode}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono rounded-lg transition-colors"
                        >
                          + Criar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Node */}
                  {selectedNodeId !== "root" && (
                    <div className="border-t border-white/10 pt-2 flex justify-end">
                      <button
                        onClick={handleDeleteSelected}
                        className="text-rose-400 hover:text-rose-300 font-mono text-[11px] flex items-center gap-1 hover:underline"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remover este Nó
                      </button>
                    </div>
                  )}
                </div>
              </Panel>
            )}
          </ReactFlow>
        )}
      </div>
    </section>
  );
}
