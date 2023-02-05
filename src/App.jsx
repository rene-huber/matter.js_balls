import Anima from "./components/Anima";
import BarraNegra from "./components/barraNegra/BarraNegra";
import Corona from "./components/corona/Corona";

import Navbar from "./components/Navbar/Navbar";
import Statue from "./components/Statue/Statue";
import "./global.css"

const App = () => {
  return <>
  <Navbar/> <Corona />
  <div className="scenario">
<Anima />
  </div>
<BarraNegra />
  <Statue />
  </>
};

export default App;