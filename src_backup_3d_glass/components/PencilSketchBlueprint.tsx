"use client";

import React from 'react';

export default function PencilSketchBlueprint() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1080px',
      margin: '40px auto 0',
      position: 'relative',
      overflow: 'hidden',
      border: '1px dashed var(--border-strong)',
      background: 'linear-gradient(180deg, #FFFFFF 0%, var(--blue-50) 100%)',
      padding: '24px 20px',
      boxShadow: '0 8px 32px rgba(0, 82, 204, 0.04)'
    }}>
      {/* Top Drafting Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        marginBottom: '16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--blue-500)',
        fontWeight: 600,
        letterSpacing: '0.08em'
      }}>
        <span>FIG 1.0 // ENTERPRISE SYSTEM ARCHITECTURE SCHEMATIC</span>
        <span>SCALE: 1:1 • SPEC_2026</span>
        <span>STATUS: VERIFIED</span>
      </div>

      {/* Pure Vector Pencil Sketch Architectural Diagram */}
      <svg
        viewBox="0 0 960 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          {/* Blueprint Grid Pattern */}
          <pattern id="sketchGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0, 82, 204, 0.06)" strokeWidth="0.8" strokeDasharray="2 2" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect width="960" height="320" fill="url(#sketchGrid)" />

        {/* Coordinate Crosshairs */}
        <g stroke="rgba(0, 82, 204, 0.3)" strokeWidth="1">
          <path d="M 40 40 L 50 40 M 45 35 L 45 45" />
          <path d="M 920 40 L 910 40 M 915 35 L 915 45" />
          <path d="M 40 280 L 50 280 M 45 275 L 45 285" />
          <path d="M 920 280 L 910 280 M 915 275 L 915 285" />
        </g>

        {/* ========================================================
            NODE 1: CLIENT ACCESS & CDN EDGE (LEFT)
            ======================================================== */}
        <g>
          {/* Outer Isometric Box Sketch */}
          <rect x="60" y="90" width="160" height="130" stroke="#0052CC" strokeWidth="1.4" strokeDasharray="4 2" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="65" y="95" width="150" height="120" stroke="#0A3570" strokeWidth="0.8" fill="none" />
          
          {/* Node Header */}
          <line x1="60" y1="125" x2="220" y2="125" stroke="#D2E4F7" strokeWidth="1" />
          <circle cx="78" cy="110" r="4" fill="#0070F3" />
          <text x="90" y="114" fill="#0A3570" fontSize="11" fontFamily="var(--font-heading)" fontWeight="700">01. EDGE & WEB</text>
          
          {/* Internal Wireframe Lines */}
          <text x="75" y="150" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Next.js 16 SSR</text>
          <text x="75" y="170" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Global Anycast Edge</text>
          <text x="75" y="190" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Sub-50ms Latency</text>
        </g>

        {/* CONNECTION 1 -> 2 */}
        <g stroke="#0052CC" strokeWidth="1.2" strokeDasharray="3 3">
          <line x1="220" y1="155" x2="280" y2="155" />
          <polyline points="274,151 280,155 274,159" fill="none" stroke="#0052CC" strokeWidth="1.5" />
          <text x="232" y="145" fill="#0052CC" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">HTTPS/gRPC</text>
        </g>

        {/* ========================================================
            NODE 2: API GATEWAY & MICROSERVICES (CENTER LEFT)
            ======================================================== */}
        <g>
          <rect x="280" y="70" width="180" height="170" stroke="#0052CC" strokeWidth="1.5" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="285" y="75" width="170" height="160" stroke="#003E99" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
          
          <line x1="280" y1="108" x2="460" y2="108" stroke="#D2E4F7" strokeWidth="1" />
          <circle cx="298" cy="92" r="4" fill="#0052CC" />
          <text x="310" y="96" fill="#0A3570" fontSize="11" fontFamily="var(--font-heading)" fontWeight="700">02. MICROSERVICES MESH</text>
          
          <text x="295" y="134" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Distributed Go / Node.js</text>
          <text x="295" y="154" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Kubernetes Auto-Scale</text>
          <text x="295" y="174" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Zero-Trust IAM Policy</text>
          <text x="295" y="194" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• 99.99% SLA Baseline</text>
          
          {/* Technical Dimension Arc */}
          <path d="M 445 130 Q 455 155 445 180" fill="none" stroke="#70C0FF" strokeWidth="1" strokeDasharray="2 2" />
        </g>

        {/* CONNECTION 2 -> 3 */}
        <g stroke="#0052CC" strokeWidth="1.2" strokeDasharray="3 3">
          <line x1="460" y1="155" x2="520" y2="155" />
          <polyline points="514,151 520,155 514,159" fill="none" stroke="#0052CC" strokeWidth="1.5" />
          <text x="472" y="145" fill="#0052CC" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">IPC MESH</text>
        </g>

        {/* ========================================================
            NODE 3: ENTERPRISE AI & DATA LAKEHOUSE (CENTER RIGHT)
            ======================================================== */}
        <g>
          <rect x="520" y="70" width="180" height="170" stroke="#0052CC" strokeWidth="1.5" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="525" y="75" width="170" height="160" stroke="#003E99" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
          
          <line x1="520" y1="108" x2="700" y2="108" stroke="#D2E4F7" strokeWidth="1" />
          <circle cx="538" cy="92" r="4" fill="#00A3FF" />
          <text x="550" y="96" fill="#0A3570" fontSize="11" fontFamily="var(--font-heading)" fontWeight="700">03. PRIVATE AI & LAKE</text>
          
          <text x="535" y="134" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Air-Gapped Private LLM</text>
          <text x="535" y="154" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Real-Time Vector RAG</text>
          <text x="535" y="174" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• Snowflake Data Mesh</text>
          <text x="535" y="194" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• HIPAA / SOC2 Guard</text>
        </g>

        {/* CONNECTION 3 -> 4 */}
        <g stroke="#0052CC" strokeWidth="1.2" strokeDasharray="3 3">
          <line x1="700" y1="155" x2="760" y2="155" />
          <polyline points="754,151 760,155 754,159" fill="none" stroke="#0052CC" strokeWidth="1.5" />
          <text x="712" y="145" fill="#0052CC" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">TLS 1.3</text>
        </g>

        {/* ========================================================
            NODE 4: ZERO-TRUST CLOUD & ROBOTICS (RIGHT)
            ======================================================== */}
        <g>
          <rect x="760" y="90" width="150" height="130" stroke="#0052CC" strokeWidth="1.4" strokeDasharray="4 2" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="765" y="95" width="140" height="120" stroke="#0A3570" strokeWidth="0.8" fill="none" />
          
          <line x1="760" y1="125" x2="910" y2="125" stroke="#D2E4F7" strokeWidth="1" />
          <circle cx="778" cy="110" r="4" fill="#003E99" />
          <text x="790" y="114" fill="#0A3570" fontSize="11" fontFamily="var(--font-heading)" fontWeight="700">04. CLOUD & IIOT</text>
          
          <text x="775" y="150" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• AWS / Azure Mesh</text>
          <text x="775" y="170" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• ROS 2 Autonomous</text>
          <text x="775" y="190" fill="#1E467A" fontSize="10" fontFamily="var(--font-mono)">• 24/7 SRE Telemetry</text>
        </g>

        {/* Bottom Schematic Annotation Line */}
        <g stroke="rgba(0, 82, 204, 0.4)" strokeWidth="0.8">
          <line x1="60" y1="260" x2="900" y2="260" strokeDasharray="4 4" />
          <text x="400" y="278" fill="#3B6699" fontSize="10" fontFamily="var(--font-mono)">TOTAL TECH ENTERPRISE DELIVERY SCHEMATIC</text>
        </g>
      </svg>
    </div>
  );
}
