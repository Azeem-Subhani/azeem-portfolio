"use client";

import { useId, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

type Segment = {
  id: string;
  label: string;
};

function moveSelection<T extends { id: string }>(
  options: T[],
  from: string,
  delta: number,
) {
  const index = options.findIndex((option) => option.id === from);
  return options[(index + delta + options.length) % options.length];
}

export function SegmentedControl({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Segment[];
  value: string;
  onChange: (id: string) => void;
}) {
  const listId = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = moveSelection(options, value, 1);
      if (next) onChange(next.id);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = moveSelection(options, value, -1);
      if (next) onChange(next.id);
    } else if (event.key === "Home") {
      event.preventDefault();
      onChange(options[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      onChange(options[options.length - 1].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      id={listId}
      className="service-segment"
      onKeyDown={onKeyDown}
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={cn("service-segment-tab", selected && "is-selected")}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function FocusList({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: string; title: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const next = moveSelection(items, value, 1);
      if (next) onChange(next.id);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next = moveSelection(items, value, -1);
      if (next) onChange(next.id);
    } else if (event.key === "Home") {
      event.preventDefault();
      onChange(items[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      onChange(items[items.length - 1].id);
    }
  };

  return (
    <ul
      role="listbox"
      aria-label={label}
      tabIndex={0}
      className="service-focus-list"
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <li key={item.id} role="none">
            <button
              type="button"
              role="option"
              aria-selected={selected}
              tabIndex={-1}
              className={cn("service-focus-item", selected && "is-selected")}
              onClick={() => onChange(item.id)}
            >
              {item.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function HopPath({
  hops,
  active,
  onChange,
}: {
  hops: { name: string; copy: string }[];
  active: string;
  onChange: (name: string) => void;
}) {
  const options = hops.map((hop) => ({ id: hop.name, title: hop.name }));

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = moveSelection(options, active, 1);
      if (next) onChange(next.id);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = moveSelection(options, active, -1);
      if (next) onChange(next.id);
    } else if (event.key === "Home") {
      event.preventDefault();
      onChange(options[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      onChange(options[options.length - 1].id);
    }
  };

  return (
    <ol
      className="service-hops"
      aria-label="Architecture path"
      onKeyDown={onKeyDown}
    >
      {hops.map((hop, index) => {
        const selected = hop.name === active;
        return (
          <li key={hop.name} className={cn("service-hop", selected && "is-active")}>
            <button
              type="button"
              aria-pressed={selected}
              tabIndex={selected ? 0 : -1}
              className="service-hop-btn"
              onClick={() => onChange(hop.name)}
            >
              <span className="service-hop-mark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="service-hop-name">{hop.name}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
