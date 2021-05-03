import "./App.css";
import Footer from "./components/molecules/Footer";
import Header from "./components/molecules/Header";
import Home from "./components/pages/Home";
function App() {
  return (
    <div className="App flex flex-col h-full min-h-screen">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
