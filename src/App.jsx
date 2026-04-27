import { useState } from "react";
import Header from "./components/Header";
import AddStudentForm from "./components/AddStudentForm";
import StudentTable from "./components/StudentTable";
import { ToastContainer, useToast } from "./components/Toast";
import { loadStudents, saveStudents, uid } from "./utils";

export default function App() {
  const [students, setStudents] = useState(() => loadStudents());
  const { toasts, addToast } = useToast();

  function persist(arr) {
    setStudents(arr);
    saveStudents(arr);
  }

  function handleAdd(name, rollNo, branch, score) {
    const student = { id: uid(), name, rollNo, branch, score, createdAt: Date.now() };
    persist([student, ...students]);
    addToast(`${name} added!`, "success");
  }

  function handleUpdate(id, score) {
    persist(students.map(s => s.id === id ? { ...s, score } : s));
    addToast("Score updated!", "info");
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    const s = students.find(x => x.id === id);
    persist(students.filter(x =>   x.id !== id));
    addToast(`${s?.name || "Student"} deleted`, "error");
  }

  function handleClearAll() {
    if (!window.confirm(`Delete all ${students.length} students? This cannot be undone.`)) return;
    persist([]);
    addToast("All records cleared", "error");
  }

  const pass = students.filter(s => s.score >= 40).length;
  const fail = students.length - pass;

  return (
    <div className="app">
      <Header />
      <main className="main">

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-label">Total</div>
              <div className="stat-num blue">{students.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <div className="stat-label">Passed</div>
              <div className="stat-num green">{pass}</div>
            </div>
          </div>
          <div className="stat-card">
            <div>
              <div className="stat-label">Failed</div>
              <div className="stat-num red">{fail}</div>
            </div>
          </div>
        </div>

        <AddStudentForm onAdd={handleAdd} />

        <StudentTable
          students={students}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />

      </main>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
