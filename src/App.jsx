import Anima from "./components/Anima";
import Nav from "./components/Navbar/Nav";
import Statue from "./components/Statue/Statue";
import "./global.css"

const App = () => {
  return <div className="scenario">
  <Nav/>
  {/* <Statue /> */}
<Anima />

  </div>;
};

export default App;