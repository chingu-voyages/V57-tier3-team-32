import "./App.css";
import { healthCheck } from "./api/healthCheck";
import PRReviewHeader from "./Header";
import Button from "./components/ui/Button";

const alertHealthCheck = async () => {
  try {
    const response = await healthCheck();
    alert(
      `health check response: ${response.status} - ${JSON.stringify(response.data)}`,
    );
  } catch (error) {
    console.error("health check failed", error);
  }
};

function HealthCheckButton() {
  return (
    <div className="block">
      <Button
        variant="outline"
        onClick={() => {
          void (async () => {
            await alertHealthCheck();
          })();
        }}
      >
        Health Check
      </Button>
    </div>
  );
}
function App() {
  return (
    <div className="">
      <div>
        <PRReviewHeader></PRReviewHeader>
      </div>

      <HealthCheckButton></HealthCheckButton>
    </div>
  );
}

export default App;
