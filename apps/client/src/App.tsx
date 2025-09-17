import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { healthCheck } from "./api/healthCheck";

function App() {
  const alertHealthCheck = async () => {
    try {
      const response = await healthCheck();
      alert(
        `health check response: ${response.status} - ${response.data ?? "body is empty!"}`,
      );
    } catch (e) {
      console.error("health check failed", e);
    }
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => alertHealthCheck}>health check</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
