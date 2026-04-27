import { useState } from "react";
import StudentRow from "./StudentRow";
import { avatarColor, initials } from "../utils";

function MobileCard({ student, index, onUpdate, onDelete }) {
  const [val, setVal] = useState(student.score);
  const pass = student.score >= 40;

  const [prev, setPrev] = useState(student.score);
  if (student.score !== prev) { setVal(student.score); setPrev(student.score); }

  function save() {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 0 && n <= 100) onUpdate(student.id, n);
  }

  return (
    <div className="m-card" style={{ animationDelay: `${index * 0.04}s` }}>
      <div className="m-top">
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span className={`badge ${pass ? "badge-pass" : "badge-fail"}`}>
            <span className="badge-dot" />{pass ? "Pass" : "Fail"}
          </span>
          <button className="btn-delete" onClick={() => onDelete(student.id)}>🗑</button>
        </div>
      </div>
      <div className="m-bottom">
        <span className="m-label">Score</span>
        <div className="m-score-row">
          <input className="score-edit" type="number" min="0" max="100"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && save()} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text3)" }}>/100</span>
          <button className="btn-set" onClick={save} style={{ marginLeft: 4 }}>SET</button>
        </div>
      </div>
    </div>
  );
}

export default function StudentTable({ students, onUpdate, onDelete, onClearAll }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-head-icon"></div>
        <span className="card-title">Student Records</span>
        <span className="card-count">{students.length} student{students.length !== 1 ? "s" : ""}</span>
        {students.length > 0 && (
          <button className="btn-danger" onClick={onClearAll}>🗑 Clear All</button>
        )}
      </div>

      {students.length === 0 ? (
        <div className="empty">
          <div className="empty-icon"></div>
          <div className="empty-text">No students enrolled yet</div>
          <div className="empty-sub">Use the form above to add your first student</div>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="desktop-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th className="center">Score / 100</th>
                  <th className="center">Status</th>
                  <th className="center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <StudentRow key={s.id} student={s} index={i} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="mobile-rows">
            {students.map((s, i) => (
              <MobileCard key={s.id} student={s} index={i} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
