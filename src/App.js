
import Popup from 'reactjs-popup';
import $ from 'jquery';
import { useEffect } from 'react';
import './assets/css/app.css';
import 'react-transitions/dist/animations.css';
import ReactTooltip from 'react-tooltip';

import cubeIcon from './assets/icons/cube2.png';
// import itemsRef from './assets/ref/items.png';
import swordItemPic from './assets/ref/item_pic/item_9.png';
import emptyItemPic from './assets/ref/item_pic/empty.png';

function App() {

  let rowCount = [];
  for(let r=0; r<80; r++) { rowCount.push(r) };

  // configuration of map
  const dotPosList = [
    { x: 14, y: 9, z: "circle-1-color"},
    { x: 22, y: 3, z: "circle-2-color"}
  ]

  const boxClicker = (x,y) => {
    alert(x+"-"+y)
  }

  const drawBox = (x,y) => {

    if((x === 14 && y === 9)) {

      return(
        <div className="box target-pos circle-1-color pulse" key={x+"-"+y} id={x+"-"+y}>
          <div className="dotted-box" onClick={() => $("#game-box-open").click()} >

          </div>
        </div>
      )
    }
    if((x === 22 && y === 3)) {
      return(
        <div className="box target-pos circle-2-color" key={x+"-"+y} onClick={() => {boxClicker(x,y)}} id={x+"-"+y}>

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
  // draw line
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
  
  // items imgs
  let items = [
    {"pic": swordItemPic},
    1,2,3,4,5,6,7,8
  ];
  let gameItems = [
    {"pic": swordItemPic},
    1,2,3,4,5,6,7,8
  ];

  const displayToolTip = () => {
    return(
      <ReactTooltip type='light' place="right" effect="float">
        <div className="item-description-box">
          <div className="item-title">[ Sword of Fighting ]</div>
          <div className="item-world">Game build 37415 Retail Version 9.0.2</div>
          <div className="item-divider" />
          <span className="item-address">game_token_addr = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d</span>
          <div className="item-divider" />
          <span className="item-address">acc_address = 0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C</span>
          <div className="item-divider" />
          <span className="item-detail">game_asset_Id: 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d</span>
          <div className="item-divider" />
          <span className="item-detail-text">Are you a fighter? Then this is the weapon for you. Note that this sword is usable by Priests as it is not a slashing or piercing weapon.</span>
        </div>
      </ReactTooltip>
    )
  }

  // popup box modal 
  const mobiusBox = (items) => (
    <Popup trigger={<div id="mobius-open"></div>} modal nested>
      {close => (
        <div className="modal">
          <div className="header"> mobius pack</div>
          <div className="mobius-pack-box">

            <div className="pack-grid">
              {items.map((i) => {
                if(i.pic) {

                  return(
                    <div className="item-slot" key={"item-slot-"+i} data-tip={"item-slot-"+i}>
                      <img src={i.pic} alt="" className="item-img" />
                    </div>
                  )

                }else{
                  return(
                    <div className="item-slot" key={"item-slot-"+i}>
                      <img src={emptyItemPic} alt="" className="item-img" />
                    </div>
                  )
                }
              })}
            </div>

          </div>
          <div className="actions">
            <div className="close-btn" onClick={() => close()}>close</div>
          </div>

          {displayToolTip()}
          
        </div>
      )}
    </Popup>
  );

  // trade box modal 
  const gameBox = (gameItems, packItems) => {
    return(
      <Popup trigger={<div id="game-box-open"></div>} modal nested>
        {close => (
          <div className="modal">
            <div className="header"> MOVE ITEMS FROM GAME TO WALLET</div>

            <div className="trade-box-wrap">

              <div className="game-pack-box">
              <div className="pack-grid">
                  {gameItems.map((i) => {
                    return(
                      <div className="item-slot" key={"game-slot-"+i}>
                      </div>
                    )
                  })}
                  </div>
              </div>
              
              <div className="move-item-wrap">
                <div className="move-item-btn" onClick={() => close()}>SAVE TRANSFER</div>
              </div>
                
              <div className="mobius-pack-box">
                <div className="pack-grid">

                  {items.map((i) => {
                    if(i.pic) {

                      return(
                        <div className="item-slot" key={"item-slot-"+i} data-tip={"item-slot-"+i}>
                          <img src={i.pic} alt="" className="item-img" />
                        </div>
                      )

                    }else{
                      return(
                        <div className="item-slot" key={"item-slot-"+i}>
                          <img src={emptyItemPic} alt="" className="item-img" />
                        </div>
                      )
                    }
                  })}

                  </div>
              </div>
            
            </div>
            {displayToolTip()}
          </div>
        )}
      </Popup>

    )
  }

  // page init line drawing and cube drawing 
  useEffect(() => {
    
    adjustLine(document.getElementById('14-9'), document.getElementById('22-3'),document.getElementById('line'));

  })

  return (
    <div className="app-bg">
      <div className="cube-icon-wrap" onClick={() =>  $("#mobius-open").click()}>
        <img src={cubeIcon} alt="" className="cube-icon" />
      </div>
      <div className="grid" id="content">
        {rowCount.map((r) => {
          return drawRow(r);
        })}
        <div id="line"></div>
      </div>
      
      {mobiusBox(items)}
      
      {gameBox(gameItems, items)}

    </div>
  );
}

export default App;