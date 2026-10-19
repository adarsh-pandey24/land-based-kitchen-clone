"use client";

import { useState } from "react";
import { inputClass, useFormErrors } from "@/components/admin/Fields";
import type { Dish } from "@/lib/validation";

type Row = Dish & { key: number };

// Ordered dish list for a menu. Serialised into a hidden "dishes" field and
// validated again on the server.
export default function DishesEditor({ initial }: { initial: Dish[] }) {
  const [rows, setRows] = useState<Row[]>(() => initial.map((d, i) => ({ ...d, key: i })));
  const [nextKey, setNextKey] = useState(initial.length);
  const errors = useFormErrors();

  const update = (key: number, patch: Partial<Dish>) =>
    setRows((r) => r.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  const move = (i: number, by: number) =>
    setRows((r) => {
      const next = [...r];
      [next[i], next[i + by]] = [next[i + by], next[i]];
      return next;
    });

  const serialised = JSON.stringify(rows.map(({ name, description, dietary }) => ({ name, description, dietary })));

  return (
    <fieldset>
      <legend className="text-sm font-medium">Dishes</legend>
      <input type="hidden" name="dishes" value={serialised} />
      {rows.length === 0 && <p className="mt-2 text-sm text-muted">No dishes yet.</p>}
      <ol className="mt-2 space-y-3">
        {rows.map((row, i) => (
          <li key={row.key} className="border border-line bg-mist/50 p-3">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Dish {i + 1}</span>
              <span className="flex gap-1">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="border border-line bg-white px-2 py-0.5 disabled:opacity-30" aria-label="Move dish up">
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === rows.length - 1}
                  onClick={() => move(i, 1)}
                  className="border border-line bg-white px-2 py-0.5 disabled:opacity-30"
                  aria-label="Move dish down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setRows((r) => r.filter((x) => x.key !== row.key))}
                  className="border border-red-200 bg-white px-2 py-0.5 text-red-700"
                >
                  Remove
                </button>
              </span>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-[2fr_1fr]">
              <input
                value={row.name}
                onChange={(e) => update(row.key, { name: e.target.value })}
                placeholder="Dish name"
                aria-label={`Dish ${i + 1} name`}
                className={inputClass}
              />
              <input
                value={row.dietary}
                onChange={(e) => update(row.key, { dietary: e.target.value })}
                placeholder="Dietary (e.g. GF, V)"
                aria-label={`Dish ${i + 1} dietary`}
                className={inputClass}
              />
              <textarea
                value={row.description}
                onChange={(e) => update(row.key, { description: e.target.value })}
                placeholder="Description (optional)"
                aria-label={`Dish ${i + 1} description`}
                rows={2}
                className={`${inputClass} sm:col-span-2`}
              />
            </div>
            {errors[`dishes.${i}.name`] && <p className="mt-1 text-xs text-red-600">{errors[`dishes.${i}.name`]?.[0]}</p>}
          </li>
        ))}
      </ol>
      {errors.dishes && <p className="mt-1 text-xs text-red-600">{errors.dishes[0]}</p>}
      <button
        type="button"
        onClick={() => {
          setRows((r) => [...r, { key: nextKey, name: "", description: "", dietary: "" }]);
          setNextKey((k) => k + 1);
        }}
        className="mt-3 border border-gold px-4 py-2 text-sm text-gold-dark hover:bg-gold hover:text-white"
      >
        + Add dish
      </button>
    </fieldset>
  );
}
