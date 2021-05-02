import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
function App() {
  return (
    <div className="App flex flex-col">
      <Header />
      <main className="py-2">
        <Home />
      </main>
    </div>
  );
}

export default App;
