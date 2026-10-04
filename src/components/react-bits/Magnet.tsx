"use client";

import React, { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

type MagnetEntry = {
  el: HTMLElement;
  padding: number;
  strength: number;
  set: (active: boolean, x: number, y: number) => void;
};

const magnets = new Set<MagnetEntry>();
let listening = false;
let frame = 0;
let pointerX = 0;
let pointerY = 0;

function flush() {
  frame = 0;
  for (const magnet of magnets) {
    const { left, top, width, height } = magnet.el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const near =
      Math.abs(centerX - pointerX) < width / 2 + magnet.padding &&
      Math.abs(centerY - pointerY) < height / 2 + magnet.padding;

    if (!near) {
      magnet.set(false, 0, 0);
      continue;
    }

    magnet.set(true, (pointerX - centerX) / magnet.strength, (pointerY - centerY) / magnet.strength);
  }
}

function onPointerMove(event: MouseEvent) {
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (!frame) frame = window.requestAnimationFrame(flush);
}

function subscribe(entry: MagnetEntry) {
  magnets.add(entry);
  if (!listening) {
    listening = true;
    window.addEventListener("mousemove", onPointerMove, { passive: true });
  }
  return () => {
    magnets.delete(entry);
    entry.set(false, 0, 0);
    if (magnets.size === 0 && listening) {
      listening = false;
      window.removeEventListener("mousemove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ active: false, x: 0, y: 0 });

  useEffect(() => {
    const el = magnetRef.current;
    if (disabled || !el) {
      stateRef.current = { active: false, x: 0, y: 0 };
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
      return;
    }

    return subscribe({
      el,
      padding,
      strength: magnetStrength,
      set(active, x, y) {
        const current = stateRef.current;
        const same =
          current.active === active &&
          Math.abs(current.x - x) < 0.5 &&
          Math.abs(current.y - y) < 0.5;
        if (same) return;
        stateRef.current = { active, x, y };
        setIsActive(active);
        setPosition({ x, y });
      },
    });
  }, [padding, disabled, magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: isActive ? "transform" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
