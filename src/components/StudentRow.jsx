import { useState } from "react";
import { avatarColor, initials } from "../utils";

export default function StudentRow({ student, index, onUpdate, onDelete }) {
  const [val, setVal] = useState(student.score);
  const pass = student.score >= 40;

  // sync if parent updates
  const [prev, setPrev] = useState(student.score);
  if (student.score !== prev) { setVal(student.score); setPrev(student.score); }

  function save() {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 0 && n <= 100) onUpdate(student.id, n);
  }

  return (
    <tr style={{ animationDelay: `${index * 0.04}s` }}>
      <td>
        <div className="student-cell">
          <div className="student-avatar" style={{ background: avatarColor(student.name) }}>
            {initials(student.name)}
          </div>
          <div>
            <div className="student-name">{student.name}</div>
            <div className="student-meta">
              <span className="meta-pill">{student.rollNo}</span>
              <span className="meta-pill branch">{student.branch}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="center">
        <div className="score-wrap">
          <input className="score-edit" type="number" min="0" max="100"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && save()} />
          <button className="btn-set" onClick={save}>SET</button>
        </div>
      </td>
      <td className="center">
        <span className={`badge ${pass ? "badge-pass" : "badge-fail"}`}>
          <span className="badge-dot" />{pass ? "Pass" : "Fail"}
        </span>
      </td>
      <td className="center">
        <button className="btn-delete" onClick={() => onDelete(student.id)} title="Delete">🗑</button>
      </td>
    </tr>
  );
}
