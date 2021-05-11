import "./App.css";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App flex flex-col h-full min-h-screen">
      <Header />
      <main className="flex-grow pb-8">
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoute />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
