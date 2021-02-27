import $ from 'jquery';
import { useEffect } from 'react';
import './assets/css/app.css';

function App() {

  let rowCount = [];
  for(let r=0; r<80; r++) { rowCount.push(r) };

  const dotPosList = [
    { x: 14, y: 9, z: "cross"},
    { x: 27, y: 25, z: "cross"}
  ]

  const boxClicker = (x,y) => {
    alert(x+"-"+y)
  }
  const drawBox = (x,y) => {

    if((x === 14 && y === 9)) {

      return(
        <div className="box target-pos" key={x+"-"+y} onClick={() => {boxClicker(x,y)}} id={x+"-"+y}>

        </div>
      )
    }
    if((x === 27 && y === 25)) {
      return(
        <div className="box target-pos" key={x+"-"+y} onClick={() => {boxClicker(x,y)}} id={x+"-"+y}>

        </div>
      )
    }

    return (
      <div className="box" key={x+"-"+y} onClick={() => {boxClicker(x,y)}} id={x+"-"+y}>

      </div>
    )

  }
  const drawRow = (r) => {
    let colCount = [];
    for(let c=0; c<40; c++) { colCount.push(c) }
    return colCount.map((o) => {
      return drawBox(r,o)
    })

  }

  const adjustLine = (from, to, line) => {

    var fT = from.offsetTop  + from.offsetHeight/2;
    var tT = to.offsetTop    + to.offsetHeight/2;
    var fL = from.offsetLeft + from.offsetWidth/2;
    var tL = to.offsetLeft   + to.offsetWidth/2;
    
    var CA   = Math.abs(tT - fT);
    var CO   = Math.abs(tL - fL);
    var H    = Math.sqrt(CA*CA + CO*CO);
    var ANG  = 180 / Math.PI * Math.acos( CA/H );
  
    if(tT > fT){
        var top  = (tT-fT)/2 + fT;
    }else{
        var top  = (fT-tT)/2 + tT;
    }
    if(tL > fL){
        var left = (tL-fL)/2 + fL;
    }else{
        var left = (fL-tL)/2 + tL;
    }
  
    if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
      ANG *= -1;
    }
    top-= H/2;
  
    line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-transform"] = 'rotate('+ ANG +'deg)';
    line.style.top    = top+'px';
    line.style.left   = left+'px';
    line.style.height = H + 'px';
  }
  
  useEffect(() => {
    
    adjustLine(document.getElementById('14-9'), document.getElementById('27-25'),document.getElementById('line'));

  })

  return (
    <div className="app-bg">

      <div className="grid" id="content">
        {rowCount.map((r) => {
          return drawRow(r);
        })}
        <div id="line"></div>
      </div>

    </div>
  );
}

export default App;