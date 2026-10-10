import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  PenTool,
  Eraser,
  RotateCcw,
  Trash2,
  Grid,
  Maximize2,
  Minimize2,
  Highlighter,
  Download
} from 'lucide-react';

interface ScratchpadCanvasProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

type ToolMode = 'pen' | 'highlighter' | 'eraser';
type PaperType = 'grid' | 'lined' | 'blank';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  tool: ToolMode;
  color: string;
  size: number;
  points: Point[];
}

export const ScratchpadCanvas: React.FC<ScratchpadCanvasProps> = ({
  isOpen,
  onClose,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [tool, setTool] = useState<ToolMode>('pen');
  const [color, setColor] = useState<string>('#1e293b');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [paperType, setPaperType] = useState<PaperType>('grid');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Resize canvas to match display container with DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redrawAll(strokes);
  }, [strokes]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        resizeCanvas();
      }, 50);
      window.addEventListener('resize', resizeCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isOpen, resizeCanvas, isExpanded]);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (paperType === 'grid') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      const gridSize = 24;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (paperType === 'lined') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      const lineSpacing = 28;

      for (let y = lineSpacing; y < height; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }, [paperType]);

  const renderStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = stroke.size * 5;
    } else if (stroke.tool === 'highlighter') {
      ctx.globalCompositeOperation = 'multiply';
      ctx.strokeStyle = stroke.color;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = stroke.size * 3;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = stroke.color;
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = stroke.size;
    }

    ctx.beginPath();
    const [first, ...rest] = stroke.points;
    ctx.moveTo(first.x, first.y);

    if (rest.length === 0) {
      ctx.arc(first.x, first.y, stroke.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      for (const p of rest) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    ctx.restore();
  }, []);

  const redrawAll = useCallback((strokeList: Stroke[]) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    drawBackground(ctx, rect.width, rect.height);

    for (const s of strokeList) {
      renderStroke(ctx, s);
    }
  }, [drawBackground, renderStroke]);

  useEffect(() => {
    redrawAll(strokes);
  }, [paperType, strokes, redrawAll]);

  // Coordinate normalizer
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pt = getCoordinates(e);
    if (!pt) return;
    setIsDrawing(true);

    const newStroke: Stroke = {
      tool,
      color: tool === 'highlighter' ? '#f59e0b' : color,
      size: brushSize,
      points: [pt]
    };
    setCurrentStroke(newStroke);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        renderStroke(ctx, newStroke);
      }
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStroke) return;
    const pt = getCoordinates(e);
    if (!pt) return;

    const updatedStroke: Stroke = {
      ...currentStroke,
      points: [...currentStroke.points, pt]
    };
    setCurrentStroke(updatedStroke);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const points = updatedStroke.points;
        const len = points.length;
        if (len >= 2) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          if (updatedStroke.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = updatedStroke.size * 5;
          } else if (updatedStroke.tool === 'highlighter') {
            ctx.globalCompositeOperation = 'multiply';
            ctx.strokeStyle = updatedStroke.color;
            ctx.globalAlpha = 0.35;
            ctx.lineWidth = updatedStroke.size * 3;
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = updatedStroke.color;
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = updatedStroke.size;
          }

          ctx.beginPath();
          ctx.moveTo(points[len - 2].x, points[len - 2].y);
          ctx.lineTo(points[len - 1].x, points[len - 1].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke && currentStroke.points.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
  };

  const handleUndo = () => {
    setStrokes((prev) => {
      const next = prev.slice(0, prev.length - 1);
      redrawAll(next);
      return next;
    });
  };

  const handleClear = () => {
    setStrokes([]);
    redrawAll([]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `saad-sats-working-out-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  const colorPalette = [
    { label: 'Slate', value: '#1e293b' },
    { label: 'Indigo', value: '#4f46e5' },
    { label: 'Emerald', value: '#059669' },
    { label: 'Ruby', value: '#e11d48' },
    { label: 'Amber', value: '#d97706' },
  ];

  return (
    <div
      className={`flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-indigo-100 dark:border-slate-800 overflow-hidden transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 shadow-2xl' : 'relative h-96'
      } ${className}`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-850 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-750 text-sm transition-colors">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Working Scratchpad
          </span>

          <span className="text-slate-300 dark:text-slate-600">|</span>

          {/* Tool Modes */}
          <button
            type="button"
            onClick={() => setTool('pen')}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
              tool === 'pen'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
            title="Pen (Ballpoint)"
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden sm:inline">Pen</span>
          </button>

          <button
            type="button"
            onClick={() => setTool('highlighter')}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
              tool === 'highlighter'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
            title="Highlighter"
          >
            <Highlighter className="w-4 h-4" />
            <span className="hidden sm:inline">Highlight</span>
          </button>

          <button
            type="button"
            onClick={() => setTool('eraser')}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
              tool === 'eraser'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden sm:inline">Eraser</span>
          </button>
        </div>

        {/* Colors & Size */}
        <div className="flex items-center gap-2">
          {tool !== 'eraser' && (
            <div className="flex items-center gap-1">
              {colorPalette.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    color === c.value ? 'scale-125 border-indigo-400 shadow' : 'border-white dark:border-slate-700 hover:scale-110'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          )}

          {/* Stroke Width */}
          <select
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md px-1.5 py-1 text-slate-700 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value={2}>Fine</option>
            <option value={3}>Medium</option>
            <option value={5}>Bold</option>
          </select>

          {/* Paper Type */}
          <button
            type="button"
            onClick={() =>
              setPaperType((prev) =>
                prev === 'grid' ? 'lined' : prev === 'lined' ? 'blank' : 'grid'
              )
            }
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 text-xs flex items-center gap-1"
            title="Toggle Paper Style (Grid / Lined / Blank)"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline capitalize">{paperType}</span>
          </button>

          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-40 text-xs"
            title="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs"
            title="Clear All Working Out"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Expand */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 text-xs"
            title={isExpanded ? 'Minimize Scratchpad' : 'Expand Fullscreen'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Save image */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 text-xs"
            title="Save Working Out as Image"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Drawing Canvas Body */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full relative cursor-crosshair touch-none select-none overflow-hidden bg-white"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full block"
        />
        {strokes.length === 0 && !isDrawing && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-400 text-xs sm:text-sm font-medium tracking-wide">
            ✏️ Scratchpad: write column methods, bus-stop divisions, or notes here!
          </div>
        )}
      </div>
    </div>
  );
};
