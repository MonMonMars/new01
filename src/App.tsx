import { useMemo, useState } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  done: boolean
}

const STARTER_TASKS: Task[] = [
  { id: 1, title: 'Set up the Cloud Agent environment', done: true },
  { id: 2, title: 'Design the landing screen', done: false },
  { id: 3, title: 'Wire up the first interaction', done: false },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(STARTER_TASKS)
  const [draft, setDraft] = useState('')

  const completed = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks],
  )
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100)

  function addTask(event: React.FormEvent) {
    event.preventDefault()
    const title = draft.trim()
    if (!title) return
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title, done: false },
    ])
    setDraft('')
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="page">
      <div className="aurora" aria-hidden />
      <header className="hero">
        <span className="badge">
          <img src="/vite.svg" width={18} height={18} alt="" />
          new01 · starter workspace
        </span>
        <h1>
          Build something <span className="accent">delightful</span> today.
        </h1>
        <p className="subtitle">
          A modern React&nbsp;+&nbsp;TypeScript starter, wired up and running in
          your Cloud Agent environment. Add a task below to see it work end to end.
        </p>
      </header>

      <main className="board">
        <section className="card focus-card">
          <div className="card-head">
            <h2>Today&rsquo;s focus</h2>
            <span className="pill">{completed}/{tasks.length} done</span>
          </div>

          <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <form className="composer" onSubmit={addTask}>
            <input
              aria-label="New task"
              placeholder="Add a task…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit">Add</button>
          </form>

          <ul className="tasks">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'task done' : 'task'}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>
                <button
                  className="ghost"
                  aria-label={`Remove ${task.title}`}
                  onClick={() => removeTask(task.id)}
                >
                  ✕
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="empty">All clear. Add your first task ✨</li>
            )}
          </ul>
        </section>

        <aside className="card stats-card">
          <h2>Environment</h2>
          <ul className="stats">
            <li>
              <span className="stat-label">Framework</span>
              <span className="stat-value">React 18</span>
            </li>
            <li>
              <span className="stat-label">Bundler</span>
              <span className="stat-value">Vite 5</span>
            </li>
            <li>
              <span className="stat-label">Language</span>
              <span className="stat-value">TypeScript</span>
            </li>
            <li>
              <span className="stat-label">Status</span>
              <span className="stat-value ok">● running</span>
            </li>
          </ul>
          <p className="hint">
            Edit <code>src/App.tsx</code> and save — hot reload keeps this page in
            sync.
          </p>
        </aside>
      </main>

      <footer className="footer">
        Crafted for the new01 workspace.
      </footer>
    </div>
  )
}

export default App
