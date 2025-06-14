import React, { useEffect, useState } from 'react';

interface Phase {
  name: string;
  color: string;
  gradientId: string;
  angle: number;
  description: string;
}

const phases: Phase[] = [
  { name: 'Plan', color: '#3B82F6', gradientId: 'planGradient', angle: 0, description: 'Strategy & Requirements' },
  { name: 'Code', color: '#10B981', gradientId: 'codeGradient', angle: 51.4, description: 'Development & Version Control' },
  { name: 'Build', color: '#F59E0B', gradientId: 'buildGradient', angle: 102.8, description: 'Compilation & Testing' },
  { name: 'Test', color: '#EF4444', gradientId: 'testGradient', angle: 154.2, description: 'Quality Assurance' },
  { name: 'Release', color: '#8B5CF6', gradientId: 'releaseGradient', angle: 205.6, description: 'Package & Prepare' },
  { name: 'Deploy', color: '#06B6D4', gradientId: 'deployGradient', angle: 257, description: 'Production Deployment' },
  { name: 'Operate', color: '#EC4899', gradientId: 'operateGradient', angle: 308.4, description: 'Infrastructure Management' },
  { name: 'Monitor', color: '#F97316', gradientId: 'monitorGradient', angle: 360, description: 'Performance & Analytics' }
];

const DevOpsLoop: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Enhanced infinity loop path with better proportions
  const createInfinityPath = (centerX: number, centerY: number, size: number) => {
    const a = size * 0.7;
    const b = size * 0.35;
    
    return `M ${centerX - a} ${centerY}
            C ${centerX - a} ${centerY - b}, ${centerX - a/2.5} ${centerY - b}, ${centerX} ${centerY}
            C ${centerX + a/2.5} ${centerY + b}, ${centerX + a} ${centerY + b}, ${centerX + a} ${centerY}
            C ${centerX + a} ${centerY - b}, ${centerX + a/2.5} ${centerY - b}, ${centerX} ${centerY}
            C ${centerX - a/2.5} ${centerY + b}, ${centerX - a} ${centerY + b}, ${centerX - a} ${centerY} Z`;
  };

  const infinityPath = createInfinityPath(400, 300, 160);

  // Calculate position for phase labels with better distribution
  const getPhasePosition = (angle: number, radius: number = 240) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: 400 + Math.cos(radian) * radius,
      y: 300 + Math.sin(radian) * radius
    };
  };

  // Generate fire particles with realistic movement
  const generateFireParticles = (count: number, baseRadius: number) => {
    return [...Array(count)].map((_, i) => {
      const angle = (i * (360 / count)) * Math.PI / 180;
      const radiusVariation = baseRadius + Math.sin(time + i) * 15;
      const x = 400 + Math.cos(angle + time * 0.5) * radiusVariation;
      const y = 300 + Math.sin(angle + time * 0.5) * radiusVariation;
      
      return { x, y, size: 2 + Math.sin(time * 2 + i) * 1.5, opacity: 0.4 + Math.sin(time * 3 + i) * 0.3 };
    });
  };

  const fireParticles = generateFireParticles(36, 290);
  const innerFireParticles = generateFireParticles(24, 270);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Enhanced background with animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative">
        <svg width="800" height="600" className="drop-shadow-2xl">
          <defs>
            {/* Enhanced gradients for each phase */}
            {phases.map(phase => (
              <linearGradient key={phase.gradientId} id={phase.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={phase.color} stopOpacity="1" />
                <stop offset="50%" stopColor={phase.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={phase.color} stopOpacity="0.3" />
              </linearGradient>
            ))}
            
            {/* Multi-layered fire gradients */}
            <radialGradient id="fireGradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4500" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#FF6347" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#FF8C00" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
            </radialGradient>

            <radialGradient id="fireGradient2" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#DC143C" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#FF4500" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#FFA500" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFF00" stopOpacity="0.1" />
            </radialGradient>

            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#0080FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4169E1" stopOpacity="0.1" />
            </radialGradient>

            {/* Enhanced arrow marker */}
            <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
              <polygon points="0 0, 12 4, 0 8" fill="#00FFFF" opacity="0.9">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </polygon>
            </marker>

            {/* Animated dotted pattern */}
            <pattern id="flowDots" patternUnits="userSpaceOnUse" width="15" height="15">
              <circle cx="7.5" cy="7.5" r="1.5" fill="#00FFFF" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </pattern>

            {/* Glow filters */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer fire rings with multiple layers */}
          <circle
            cx="400"
            cy="300"
            r="300"
            fill="none"
            stroke="url(#fireGradient1)"
            strokeWidth="6"
            opacity={mounted ? 0.6 : 0}
            filter="url(#glow)"
          >
            <animate attributeName="stroke-width" values="4;8;4" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="30s" repeatCount="indefinite" />
          </circle>

          <circle
            cx="400"
            cy="300"
            r="285"
            fill="none"
            stroke="url(#fireGradient2)"
            strokeWidth="4"
            opacity={mounted ? 0.8 : 0}
            filter="url(#glow)"
          >
            <animate attributeName="stroke-width" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" values="360 400 300;0 400 300" dur="25s" repeatCount="indefinite" />
          </circle>

          {/* Dynamic fire particles */}
          {fireParticles.map((particle, i) => (
            <g key={`fire-${i}`}>
              <circle
                cx={particle.x}
                cy={particle.y}
                r={particle.size}
                fill="#FF4500"
                opacity={particle.opacity}
                filter="url(#glow)"
              >
                <animate
                  attributeName="r"
                  values={`${particle.size * 0.5};${particle.size * 1.5};${particle.size * 0.5}`}
                  dur={`${1.5 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={particle.x + Math.sin(time + i) * 3}
                cy={particle.y + Math.cos(time + i) * 3}
                r={particle.size * 0.6}
                fill="#FFD700"
                opacity={particle.opacity * 0.7}
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.8;0.2"
                  dur={`${1 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* Inner fire layer */}
          {innerFireParticles.map((particle, i) => (
            <circle
              key={`inner-fire-${i}`}
              cx={particle.x}
              cy={particle.y}
              r={particle.size * 0.8}
              fill="#DC143C"
              opacity={particle.opacity * 0.6}
              filter="url(#glow)"
            >
              <animate
                attributeName="r"
                values={`${particle.size * 0.3};${particle.size};${particle.size * 0.3}`}
                dur={`${1.2 + Math.random() * 0.8}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Enhanced infinity loop segments */}
          {phases.map((phase, index) => {
            const segmentLength = 100 / phases.length;
            const offset = index * segmentLength;
            
            return (
              <g key={phase.name}>
                <path
                  d={infinityPath}
                  fill="none"
                  stroke={`url(#${phase.gradientId})`}
                  strokeWidth={hoveredPhase === phase.name ? "16" : "12"}
                  strokeDasharray={`${segmentLength} ${100 - segmentLength}`}
                  strokeDashoffset={-offset}
                  opacity={mounted ? (hoveredPhase === phase.name ? 1 : 0.85) : 0}
                  className="transition-all duration-500 cursor-pointer"
                  filter={hoveredPhase === phase.name ? "url(#strongGlow)" : "url(#glow)"}
                  onMouseEnter={() => setHoveredPhase(phase.name)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="2s"
                    begin={`${index * 0.2}s`}
                    fill="freeze"
                  />
                </path>
                
                {/* Segment highlight on hover */}
                {hoveredPhase === phase.name && (
                  <path
                    d={infinityPath}
                    fill="none"
                    stroke={phase.color}
                    strokeWidth="20"
                    strokeDasharray={`${segmentLength} ${100 - segmentLength}`}
                    strokeDashoffset={-offset}
                    opacity="0.3"
                    filter="url(#strongGlow)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0;0.5;0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                )}
              </g>
            );
          })}

          {/* Enhanced flow animation */}
          <path
            d={infinityPath}
            fill="none"
            stroke="url(#flowDots)"
            strokeWidth="3"
            opacity={mounted ? 0.8 : 0}
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,2000;2000,0"
              dur="12s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1"
              dur="1s"
              begin="3s"
              fill="freeze"
            />
          </path>

          {/* Multiple flow layers for depth */}
          <path
            d={infinityPath}
            fill="none"
            stroke="#00FFFF"
            strokeWidth="1"
            opacity="0.4"
            strokeDasharray="5,10"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-15"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Enhanced center glow */}
          <circle
            cx="400"
            cy="300"
            r="50"
            fill="url(#coreGlow)"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values="40;60;40"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="400"
            cy="300"
            r="30"
            fill="none"
            stroke="#00FFFF"
            strokeWidth="2"
            opacity="0.6"
            filter="url(#glow)"
          >
            <animate
              attributeName="r"
              values="25;35;25"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Enhanced phase labels */}
          {phases.map((phase, index) => {
            const position = getPhasePosition(phase.angle);
            const isHovered = hoveredPhase === phase.name;
            
            return (
              <g
                key={`label-${phase.name}`}
                opacity={mounted ? 1 : 0}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPhase(phase.name)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="1s"
                  begin={`${3 + index * 0.15}s`}
                  fill="freeze"
                />
                
                {/* Enhanced label background */}
                <rect
                  x={position.x - 50}
                  y={position.y - 20}
                  width="100"
                  height="40"
                  rx="20"
                  fill="rgba(0,0,0,0.8)"
                  stroke={phase.color}
                  strokeWidth={isHovered ? "2" : "1"}
                  opacity={isHovered ? 0.95 : 0.8}
                  filter={isHovered ? "url(#glow)" : "none"}
                  className="transition-all duration-300"
                />
                
                {/* Phase name */}
                <text
                  x={position.x}
                  y={position.y - 2}
                  textAnchor="middle"
                  className="text-sm font-bold fill-white"
                  style={{
                    fontSize: isHovered ? '14px' : '12px',
                    filter: isHovered ? 'url(#glow)' : 'none'
                  }}
                >
                  {phase.name}
                </text>

                {/* Phase description */}
                <text
                  x={position.x}
                  y={position.y + 12}
                  textAnchor="middle"
                  className="text-xs fill-gray-300"
                  style={{
                    fontSize: isHovered ? '11px' : '9px',
                    opacity: isHovered ? 1 : 0.7
                  }}
                >
                  {phase.description}
                </text>

                {/* Hover pulse effect */}
                {isHovered && (
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="60"
                    fill="none"
                    stroke={phase.color}
                    strokeWidth="1"
                    opacity="0.4"
                    filter="url(#glow)"
                  >
                    <animate
                      attributeName="r"
                      values="40;80;40"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0.1;0.4"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Enhanced central text */}
          <text
            x="400"
            y="285"
            textAnchor="middle"
            className="text-3xl font-bold fill-white"
            opacity={mounted ? 1 : 0}
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="1s"
              begin="4s"
              fill="freeze"
            />
            DevOps
          </text>
          <text
            x="400"
            y="305"
            textAnchor="middle"
            className="text-sm fill-cyan-300"
            opacity={mounted ? 1 : 0}
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="1s"
              begin="4.5s"
              fill="freeze"
            />
            Continuous Integration
          </text>
          <text
            x="400"
            y="320"
            textAnchor="middle"
            className="text-sm fill-cyan-300"
            opacity={mounted ? 1 : 0}
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="1s"
              begin="5s"
              fill="freeze"
            />
            Continuous Deployment
          </text>
        </svg>

        {/* Enhanced title */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            DevOps Infinity Loop
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-300">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400"></span>
            <p className="text-lg opacity-80">Continuous Integration • Continuous Deployment</p>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400"></span>
          </div>
        </div>

        {/* Enhanced interactive legend */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 rounded-2xl p-6 backdrop-blur-lg border border-gray-700">
          <div className="grid grid-cols-4 gap-6 text-sm">
            {phases.map(phase => (
              <div
                key={`legend-${phase.name}`}
                className="flex items-center space-x-3 cursor-pointer transition-all duration-300 hover:scale-105 p-2 rounded-lg hover:bg-gray-800"
                onMouseEnter={() => setHoveredPhase(phase.name)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <div
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ 
                    backgroundColor: phase.color,
                    boxShadow: hoveredPhase === phase.name ? `0 0 10px ${phase.color}` : 'none'
                  }}
                />
                <div>
                  <span className={`text-gray-300 transition-colors duration-300 block ${
                    hoveredPhase === phase.name ? 'text-white font-semibold' : ''
                  }`}>
                    {phase.name}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    {phase.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default DevOpsLoop;