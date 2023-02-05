import code from "../../img/code-bar.gif"
import ps5 from "../../img/4ICONS.gif"


function BarraNegra() {
  return (
    <div className="barraNegra">
      <div className="codeBar box"><img src={code} alt={""}/></div>
      <div className="box"><p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.</p></div>
      <div className="ps5 box"><img src={ps5} alt={""}/></div>
    </div>
  )
}

export default BarraNegra