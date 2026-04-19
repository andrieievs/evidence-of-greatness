import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <section>
      <h1>Home</h1>
      <p>This is a client-rendered single-page app powered by Vite and React.</p>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About</h1>
      <p>Routes are handled in the browser; navigation does not reload the page.</p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <header className="header">
          <strong className="brand">Evidence of Greatness</strong>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
