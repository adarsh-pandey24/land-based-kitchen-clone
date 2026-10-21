"use client";

import { useState, useTransition } from "react";
import { deleteUser, setRole } from "./actions";

type User = { id: string; email: string; role: "ADMIN" | "EDITOR"; createdAt: string };

export default function UserRows({ users, meId }: { users: User[]; meId: string }) {
  const [pending, startTransition] = useTransition();
  const [notice, setNotice] = useState<{ ok: boolean; message: string } | null>(null);
  const run = (fn: () => Promise<{ ok: boolean; message: string }>) => startTransition(async () => setNotice(await fn()));

  return (
    <div>
      {notice && (
        <p
          role="status"
          className={`mb-4 border px-4 py-3 text-sm ${
            notice.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.message}
        </p>
      )}
      <ul className="divide-y divide-line border border-line bg-white">
        {users.map((u) => (
          <li key={u.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {u.email} {u.id === meId && <span className="text-xs text-muted">(you)</span>}
              </p>
              <p className="text-xs text-muted">Added {u.createdAt}</p>
            </div>
            {u.id === meId ? (
              <span className="text-xs uppercase tracking-widest text-gold-dark">{u.role}</span>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <select
                  value={u.role}
                  disabled={pending}
                  onChange={(e) => run(() => setRole(u.id, e.target.value))}
                  className="border border-line bg-white px-2 py-1"
                  aria-label={`Role for ${u.email}`}
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <button
                  disabled={pending}
                  onClick={() => {
                    if (window.confirm(`Delete the account ${u.email}? This cannot be undone.`)) run(() => deleteUser(u.id));
                  }}
                  className="border border-red-200 px-3 py-1 text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
