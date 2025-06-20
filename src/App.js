import AuthProvider from "./provider/authProvider";
import Routes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
