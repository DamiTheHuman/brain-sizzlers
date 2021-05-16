import "./App.css";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <div className="App flex flex-col h-full min-h-screen">
      <Header />
      <main className="flex-grow pb-8">
        <Switch>
          <PublicRoute />
        </Switch>
        <Switch>
          <PrivateRoute />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
