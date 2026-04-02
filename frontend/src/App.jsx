import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    // App shell: keep it clean, providers are already in main.jsx
    <div className="min-h-screen bg-white text-gray-900">
      <AppRoutes />
    </div>
  );
};

export default App;
