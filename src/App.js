
import Popup from 'reactjs-popup';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import './assets/css/app.css';
import 'react-transitions/dist/animations.css';
import ReactTooltip from 'react-tooltip';

import cubeIcon from './assets/icons/cube2.png';
// import itemsRef from './assets/ref/items.png';
import emptyItemPic from './assets/ref/item_pic/empty.png';
import swordItemPic from './assets/ref/item_pic/item_9.png';
import appleItemPic from './assets/ref/item_pic/item_1.png';
import eyeItemPic from './assets/ref/item_pic/item_2.png';
import helmItemPic from './assets/ref/item_pic/item_3.png';
import gobItemPic from './assets/ref/item_pic/item_4.png';
import shieldItemPic from './assets/ref/item_pic/item_5.png';
import potionItemPic from './assets/ref/item_pic/item_6.png';
import bagItemPic from './assets/ref/item_pic/item_7.png';
import bombItemPic from './assets/ref/item_pic/item_8.png';

function App() {

  let rowCount = [];
  for(let r=0; r<80; r++) { rowCount.push(r) };
  
  const [ itemSlot, setItemSlot ] = useState(0);
  const [ myItemSlot, setMyItemSlot ] = useState(emptyItemPic);

  // configuration of map
  const dotPosListOne = [
    { x: 14, y: 9, c: "box target-pos circle-1-color pulse", },
    { x: 22, y: 3, c: "box target-pos circle-2-color", },
    { x: 46, y: 3, c: "box target-pos circle-4-color", },
    { x: 58, y: 12, c: "box target-pos circle-4-color", },
    { x: 59, y: 12, c: "box target-pos circle-5-color", },
    { x: 51, y: 12, c: "box target-pos circle-5-color", },
    { x: 23, y: 1, c: "box target-pos circle-2-color", },
    { x: 9, y: 28, c: "box target-pos circle-3-color", },
    { x: 21, y: 24, c: "box target-pos circle-3-color", },
    { x: 37, y: 32, c: "box target-pos circle-3-color",  },
  ];
  const linePosListOne = [
    { s: "14-9", e: "22-3", l: "line-1" }, 
    { s: "46-3", e: "22-3", l: "line-2" },
    { s: "46-3", e: "58-12", l: "line-3" },
    { s: "58-12", e: "59-12", l: "line-4" },
    { s: "59-12", e: "51-12", l: "line-5" },
    { s: "51-12", e: "23-1", l: "line-6" },
    { s: "23-1", e: "9-28", l: "line-7" },
    { s: "23-1", e: "21-24", l: "line-8" },
    { s: "23-1", e: "37-32", l: "line-9" },
  ]

  const drawBox = (x,y) => {
    
    const boxClicker = (x,y) => {
      // alert(x+"-"+y)
    }

    let drawSpecial = false;
    let drawObj = {};
    let itemImgInd = 0;

    dotPosListOne.map((dot, ind) => {
      if(dot.x === x && dot.y === y) {
        console.log(x+"-"+y);
        drawSpecial = true;
        drawObj = dot;
        itemImgInd = ind;
      }
      return null;
    })

    if(drawSpecial) {
      
      return (
        <div className={drawObj.c} key={x+"-"+y} onClick={() => {boxClicker(x,y)}} id={x+"-"+y} key={x+"-"+y}>
          <div className="dotted-box" onClick={() => { 
              $("#game-box-open").click();
              setItemSlot(itemImgInd);
            }}>
          </div>
        </div>
      )
    
    }else{

      return (
        <div className="box" key={x+"-"+y} onClick={() => {boxClicker(x,y)}} id={x+"-"+y}>
        </div>
      )

    }

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
  let myItems = [ swordItemPic, emptyItemPic, emptyItemPic, emptyItemPic, emptyItemPic, emptyItemPic, emptyItemPic, emptyItemPic, emptyItemPic ];
  let gameItems = [ appleItemPic, eyeItemPic, helmItemPic, gobItemPic, shieldItemPic, potionItemPic, bagItemPic, bombItemPic, emptyItemPic ];

  const displayToolTip = () => {
    return (
      <ReactTooltip type='light' place="right" effect="float" id="happyFace">
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
          <span className="item-detail-text">Famous_owner: HolyPriests Pro-Gamer-1337. The person who controls this sword controls the ppower of fighting.</span>
        </div>
      </ReactTooltip>
    )
  }

  // popup box modal 
  const mobiusBox = (items) => (
    <Popup trigger={<div id="mobius-open"></div>} modal nested>
      {close => (
        <div className="modal">
          <div className="header">mobius pack</div>
          <div className="mobius-pack-box">

            <div className="pack-grid">
              {items.map((i) => {
                if(i) {

                  return(
                    <div className="item-slot" key={"item-slot-"+i} data-tip data-for='happyFace'>
                      <img src={i} alt="" className="item-img" />
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
  const gameBox = (gameItems, myItems) => {
    return(
      <Popup trigger={<div id="game-box-open"></div>} modal nested>
        {close => (
          <div className="modal">
            <div className="header"> MOVE ITEMS [ GAME - WALLET ]</div>

            <div className="trade-box-wrap">

              <div className="game-pack-box">
              <div className="pack-grid">
                  {gameItems.map((i ,ind) => {
                    if(ind === 0) {
                      return(
                        <div className="item-slot" key={"item-slot-"+ind} onClick={() => {
                          setItemSlot(8);
                          setMyItemSlot(i)
                        }}>
                          <img src={gameItems[itemSlot]} alt="" className="item-img" />
                        </div>
                      )
                    }else{
                      return(
                        <div className="item-slot" key={"game-slot-"+ind}>
                          <img src={emptyItemPic} alt="" className="item-img" />
                        </div>
                      )
                    }
                  })}
                  </div>
              </div>
              
              <div className="move-item-wrap">
                <div className="move-item-btn" onClick={() => close()}>SAVE TRANSFER</div>
              </div>
                
              <div className="mobius-pack-box">
                <div className="pack-grid">

                  {myItems.map((i, ind) => {
                    if(ind === 0) {
                      
                      return(
                        <div className="item-slot" key={"item-slot-"+i} data-tip={"item-slot-"+ind}>
                          <img src={i} alt="" className="item-img" />
                        </div>
                      )

                    }else if(ind === 1) {

                      return(
                        <div className="item-slot" key={"item-slot-"+i} data-tip={"item-slot-"+ind}>
                          <img src={myItemSlot} alt="" className="item-img" />
                        </div>
                      )
                      
                    }else{

                      return(
                        <div className="item-slot" key={"item-slot-"+ind}>
                          <img src={emptyItemPic} alt="" className="item-img" />
                        </div>
                      )

                    }
                  })}

                  </div>
              </div>
            
            </div>
          </div>
        )}
      </Popup>

    )
  }

  // page init line drawing and cube drawing 
  useEffect(() => {
    
    // draw line 1
    linePosListOne.map((line) => {
      adjustLine(document.getElementById(line.s), document.getElementById(line.e), document.getElementById(line.l));
      return null;
    })

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
        {linePosListOne.map((l) => {
          return <div id={l.l} key={l.l+"key"} className="line-style-one" />
        })}

      </div>
      
      {mobiusBox(myItems)}
      
      {gameBox(gameItems, myItems)}

    </div>
  );
}

export default App;