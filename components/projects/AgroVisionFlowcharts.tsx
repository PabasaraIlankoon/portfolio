export default function AgroVisionFlowcharts() {
  return (
    <div className="space-y-8 mt-8">
      {/* System Pipeline */}
      <div>
        <div className="text-xs font-mono text-subtle uppercase tracking-widest mb-4">
          System Pipeline
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 overflow-x-auto">
          <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto">
            {/* Nodes top-down */}
            {[
              { y: 10,  label: "Upload tomato leaf image",       color: "#6c63ff" },
              { y: 60,  label: "Preprocess image",               color: "#4a4a80" },
              { y: 110, label: "Leaf-aware crop / normalization", color: "#4a4a80" },
              { y: 160, label: "Deep learning model",            color: "#6c63ff" },
              { y: 210, label: "Prediction label + confidence",  color: "#34d399" },
              { y: 260, label: "Professional result card",       color: "#34d399" },
              { y: 310, label: "Cause / treatment / prevention", color: "#34d399" },
            ].map((n, i) => (
              <g key={i}>
                <rect x="110" y={n.y} width="300" height="34" rx="8"
                  fill={n.color + "22"} stroke={n.color} strokeWidth="1.5" />
                <text x="260" y={n.y + 22} textAnchor="middle"
                  fill="#f0f0f8" fontSize="11" fontFamily="JetBrains Mono, monospace">
                  {n.label}
                </text>
                {i < 6 && (
                  <line x1="260" y1={n.y + 34} x2="260" y2={n.y + 50}
                    stroke="#4a4a6a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                )}
              </g>
            ))}
            {/* Side branch: metrics */}
            <line x1="260" y1="194" x2="460" y2="194" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
            <rect x="380" y="180" width="130" height="30" rx="6"
              fill="#6c63ff22" stroke="#a78bfa" strokeWidth="1.5" />
            <text x="445" y="200" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="JetBrains Mono, monospace">Validation metrics</text>
            <line x1="445" y1="210" x2="445" y2="240" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
            <rect x="370" y="240" width="150" height="30" rx="6"
              fill="#6c63ff22" stroke="#a78bfa" strokeWidth="1.5" />
            <text x="445" y="260" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="JetBrains Mono, monospace">Confusion matrix</text>
            {/* Arrow marker */}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M1,1 L7,4 L1,7 Z" fill="#4a4a6a" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* Training Pipeline */}
      <div>
        <div className="text-xs font-mono text-subtle uppercase tracking-widest mb-4">
          Training Pipeline
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 overflow-x-auto">
          <svg viewBox="0 0 700 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
            {[
              { x: 10,  label: "Dataset folders", color: "#4a4a80" },
              { x: 120, label: "ImageDataGenerator", color: "#4a4a80" },
              { x: 250, label: "EfficientNetB0 base", color: "#6c63ff" },
              { x: 380, label: "Classification head", color: "#6c63ff" },
              { x: 500, label: "Training + fine-tuning", color: "#6c63ff" },
            ].map((n, i, arr) => (
              <g key={i}>
                <rect x={n.x} y="20" width="105" height="34" rx="7"
                  fill={n.color + "22"} stroke={n.color} strokeWidth="1.5" />
                <text x={n.x + 52} y="42" textAnchor="middle"
                  fill="#f0f0f8" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                  {n.label}
                </text>
                {i < arr.length - 1 && (
                  <line x1={n.x + 105} y1="37" x2={arr[i+1].x} y2="37"
                    stroke="#4a4a6a" strokeWidth="1.5" markerEnd="url(#arrow2)" />
                )}
              </g>
            ))}
            {/* Outputs */}
            {[
              { x: 580, y: 5,  label: "metrics.json", color: "#34d399" },
              { x: 580, y: 33, label: "model.h5",     color: "#34d399" },
              { x: 580, y: 61, label: "model.tflite", color: "#34d399" },
            ].map((o, i) => (
              <g key={i}>
                <line x1="605" y1="37" x2={o.x} y2={o.y + 12}
                  stroke="#34d39966" strokeWidth="1" strokeDasharray="3 2" />
                <rect x={o.x} y={o.y} width="108" height="22" rx="5"
                  fill="#34d39915" stroke="#34d39966" strokeWidth="1.5" />
                <text x={o.x + 54} y={o.y + 15} textAnchor="middle"
                  fill="#34d399" fontSize="9" fontFamily="JetBrains Mono, monospace">
                  {o.label}
                </text>
              </g>
            ))}
            <defs>
              <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M1,1 L7,4 L1,7 Z" fill="#4a4a6a" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
