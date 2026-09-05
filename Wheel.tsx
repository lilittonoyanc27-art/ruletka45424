import React, { useRef, useEffect, useState } from 'react';
import { sounds } from './AudioUtils';
import { RotateCw } from 'lucide-react';

export interface WheelSector {
  id: number;
  label: string;
  value: number;
  color: string;
  textColor: string;
  isMultiplier?: boolean;
}

// Strictly NO BANKRUPT as requested by user ("и барабане пусь без банкрота будет")
export const WHEEL_SECTORS: WheelSector[] = [
  { id: 1, label: "500", value: 500, color: "#F97316", textColor: "#FFFFFF" }, // Vibrant Orange
  { id: 2, label: "250", value: 250, color: "#0EA5E9", textColor: "#FFFFFF" }, // Vibrant Sky Blue
  { id: 3, label: "750", value: 750, color: "#8B5CF6", textColor: "#FFFFFF" }, // Vibrant Violet
  { id: 4, label: "x2", value: 2, color: "#EC4899", textColor: "#FFFFFF", isMultiplier: true }, // Vibrant Pink
  { id: 5, label: "300", value: 300, color: "#10B981", textColor: "#FFFFFF" }, // Vibrant Emerald
  { id: 6, label: "1000", value: 1000, color: "#F59E0B", textColor: "#1E293B" }, // Vibrant Amber
  { id: 7, label: "400", value: 400, color: "#06B6D4", textColor: "#FFFFFF" }, // Vibrant Cyan
  { id: 8, label: "600", value: 600, color: "#6366F1", textColor: "#FFFFFF" }, // Vibrant Indigo
  { id: 9, label: "+500", value: 500, color: "#F97316", textColor: "#FFFFFF" }, // Vibrant Orange
  { id: 10, label: "1500", value: 1500, color: "#D946EF", textColor: "#FFFFFF" }, // Vibrant Fuchsia
  { id: 11, label: "350", value: 350, color: "#14B8A6", textColor: "#FFFFFF" }, // Vibrant Teal
  { id: 12, label: "800", value: 800, color: "#E11D48", textColor: "#FFFFFF" }, // Vibrant Rose
  { id: 13, label: "ПРИЗ", value: 650, color: "#FBBF24", textColor: "#1E293B" }, // Golden Prize
  { id: 14, label: "450", value: 450, color: "#3B82F6", textColor: "#FFFFFF" }, // Vibrant Blue
  { id: 15, label: "2000", value: 2000, color: "#9333EA", textColor: "#FEF08A" }, // Vibrant Purple
  { id: 16, label: "550", value: 550, color: "#059669", textColor: "#FFFFFF" }, // Vibrant Green
];

interface WheelProps {
  onSpinComplete: (sector: WheelSector) => void;
  disabled: boolean;
  spinning: boolean;
  setSpinning: (state: boolean) => void;
  currentSector: WheelSector | null;
}

export const Wheel: React.FC<WheelProps> = ({
  onSpinComplete,
  disabled,
  spinning,
  setSpinning,
  currentSector,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTickAngleRef = useRef<number>(0);
  const [selectedSector, setSelectedSector] = useState<WheelSector | null>(currentSector);

  const numSectors = WHEEL_SECTORS.length;
  const sectorAngle = (2 * Math.PI) / numSectors;

  // Draw the wheel onto canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 14;

    ctx.clearRect(0, 0, width, height);

    // Outer sleek slate / vibrant border
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
    const rimGrad = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 10);
    rimGrad.addColorStop(0, '#334155');
    rimGrad.addColorStop(0.5, '#1E293B');
    rimGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = rimGrad;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F97316';
    ctx.stroke();
    ctx.restore();

    // Outer rivets / lights
    const rivetCount = numSectors * 2;
    for (let i = 0; i < rivetCount; i++) {
      const rivetAngle = (i * (2 * Math.PI)) / rivetCount + angle;
      const rx = centerX + (radius + 5) * Math.cos(rivetAngle);
      const ry = centerY + (radius + 5) * Math.sin(rivetAngle);
      ctx.beginPath();
      ctx.arc(rx, ry, 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#FEF08A' : '#FFFFFF';
      ctx.fill();
    }

    // Sectors
    for (let i = 0; i < numSectors; i++) {
      const sAngle = angle + i * sectorAngle;
      const eAngle = sAngle + sectorAngle;
      const sector = WHEEL_SECTORS[i];

      // Sector slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sAngle, eAngle);
      ctx.closePath();
      ctx.fillStyle = sector.color;
      ctx.fill();

      // Inner divider line
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#FEF08A';
      ctx.stroke();

      // Peg at the boundary edge
      const pegX = centerX + radius * Math.cos(sAngle);
      const pegY = centerY + radius * Math.sin(sAngle);
      ctx.beginPath();
      ctx.arc(pegX, pegY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Sector Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sAngle + sectorAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = sector.textColor;
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(sector.label, radius - 20, 0);
      ctx.restore();
    }

    // Central hub
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, 2 * Math.PI);
    const hubGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 38);
    hubGrad.addColorStop(0, '#334155');
    hubGrad.addColorStop(0.7, '#1E293B');
    hubGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = hubGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Hub center star/symbol
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '800 13px "Cinzel", "Plus Jakarta Sans", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText('ПОЛЕ', centerX, centerY - 6);
    ctx.fillText('ЧУДЕС', centerX, centerY + 8);
    ctx.restore();
  };

  useEffect(() => {
    drawWheel(currentAngleRef.current);
  }, []);

  const spin = () => {
    if (disabled || spinning) return;

    setSpinning(true);
    setSelectedSector(null);

    // Pick random target sector
    const targetSectorIndex = Math.floor(Math.random() * numSectors);
    const fullSpins = 4 + Math.floor(Math.random() * 4); // 4 to 7 full rotations

    // The pointer is located at 12 o'clock (top, angle = -Math.PI / 2 or 3*Math.PI/2).
    // In our canvas coordinate system:
    // angle 0 is 3 o'clock. Top (pointer) is 270 degrees or -Math.PI / 2.
    // When sector i is at the pointer:
    // (angle + i * sectorAngle + sectorAngle / 2) % 2PI == 3*Math.PI / 2
    // angle = 3*Math.PI/2 - (i + 0.5)*sectorAngle.
    const targetBaseAngle = (3 * Math.PI) / 2 - (targetSectorIndex + 0.5) * sectorAngle;
    const currentNorm = currentAngleRef.current % (2 * Math.PI);
    let delta = targetBaseAngle - currentNorm;
    while (delta < 0) {
      delta += 2 * Math.PI;
    }
    const totalRotation = fullSpins * 2 * Math.PI + delta;
    const startAngle = currentAngleRef.current;
    const finalAngle = startAngle + totalRotation;
    const duration = 3800 + Math.random() * 600; // ~4 seconds
    const startTime = performance.now();

    lastTickAngleRef.current = startAngle;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom smooth deceleration cubic-bezier-like curve
      const easeOut = 1 - Math.pow(1 - progress, 3.5);
      const angle = startAngle + totalRotation * easeOut;
      currentAngleRef.current = angle;

      // Tick sound check
      const currentTickStep = Math.floor(angle / (sectorAngle / 2));
      const lastTickStep = Math.floor(lastTickAngleRef.current / (sectorAngle / 2));
      if (currentTickStep !== lastTickStep) {
        sounds.playTick();
        lastTickAngleRef.current = angle;
      }

      drawWheel(angle);

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        currentAngleRef.current = finalAngle % (2 * Math.PI);
        const winningSector = WHEEL_SECTORS[targetSectorIndex];
        setSelectedSector(winningSector);
        setSpinning(false);
        sounds.playSectorStop();
        onSpinComplete(winningSector);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center select-none" id="wheel-container">
      {/* Top pointer indicator matching Vibrant Palette */}
      <div className="relative flex flex-col items-center">
        {/* Pointer needle */}
        <div
          className="z-20 -mb-4 w-7 h-9 bg-slate-800 shadow-xl border-t-2 border-l-2 border-r-2 border-orange-500 transition-transform"
          style={{
            clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
            transform: spinning ? 'scale(1.1)' : 'scale(1)',
          }}
        />

        {/* Canvas Wheel with slate-800 border */}
        <div className="relative p-1 rounded-full border-8 border-slate-800 shadow-2xl bg-slate-900">
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px] rounded-full"
          />
        </div>
      </div>

      {/* Action / Result section */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          id="spin-button"
          onClick={spin}
          disabled={disabled || spinning}
          className={`px-10 sm:px-12 py-3.5 sm:py-4 rounded-full font-black text-lg sm:text-xl flex items-center gap-3 transition-all shadow-xl active:scale-95 ${
            disabled || spinning
              ? 'bg-slate-300 text-slate-500 border border-slate-300 cursor-not-allowed opacity-60'
              : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white shadow-orange-500/30 cursor-pointer font-black tracking-wide hover:shadow-2xl'
          }`}
        >
          <RotateCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
          {spinning ? 'БАРАБАН КРУТИТСЯ...' : 'КРУТИТЬ БАРАБАН'}
        </button>

        {selectedSector && !spinning && (
          <div className="text-center animate-fade-in py-1.5 px-5 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-sm font-bold shadow-sm">
            Сектор на барабане:{' '}
            <span className="font-extrabold text-orange-600 text-base">
              {selectedSector.label}{' '}
              {selectedSector.isMultiplier ? 'множитель' : 'баллов'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
