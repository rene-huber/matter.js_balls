import React, { useRef, useEffect } from "react";

import Matter from "matter-js";
import ballImage from "../img/marmol.png";
// import Corona from "../img/corona.png";
import v_1 from "../img/v-1.png";
import v_2 from "../img/v-2.png";
import v_3 from "../img/v-3.png";

import v_5 from "../img/v-5.png";
import v_6 from "../img/v-6.png";
import v_7 from "../img/v-7.png";
import v_8 from "../img/v-8.png";
import v_9 from "../img/v-9.png";


const Anima = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;
      window.addEventListener("resize", function() {
  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;
});
    const engine = Engine.create({});

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
    height: window.innerHeight,
        wireframes: false,
        hasBounds: true,
        background: "transparent",
        
        
      },
    });
  


    const ballA = Bodies.rectangle(window.innerWidth/2, 0, 611, 666, {
      restitution: 0.3,
      label: "ballA",
      render: {
        sprite: {
          texture: ballImage,
        },
      },
    });
    // const corona = Bodies.rectangle(10, 1, 532, 351, {
    //   restitution: 0.9,
    //   label: "corona",
    //   render: {
    //     sprite: {
    //       texture: Corona,
    //     },
    //   },
    // });

    const v1 = Bodies.circle(19, 1, 98,  {
      restitution: 0.5,
      label: "blCffffd",render: {sprite: {texture: v_1, },},});

    const v2 = Bodies.circle(59, 1, 11,  {
      restitution: 0.5,
      label: "baldsalCd",render: {sprite: {texture: v_2, },},});

    const v3 = Bodies.circle(109, 1, 176,  {
      restitution: 0.5,
      label: "baldfslCd",render: {sprite: {texture: v_3, },},});    

    const v5 = Bodies.circle(129, 1, 164,  {
      restitution: 0.5,
      label: "ballfsdCd",render: {sprite: {texture: v_5, },},});

    const v6 = Bodies.circle(209, 1, 89,  {
      restitution: 0.5,
      label: "ba9llCd",render: {sprite: {texture: v_6, },},});

    const v7 = Bodies.circle(1009, 1, 64,  {
      restitution: 0.5,
      label: "bauzrrrrrd",render: {sprite: {texture: v_7, },},});

    const v8 = Bodies.circle(1209, 1, 123, {
      restitution: 0.5,
      label: "blCd",render: {sprite: {texture: v_8, },},});

    const v9 = Bodies.circle(909, 1, 123, {
      restitution: 0.5,
      label: "balCd",render: {sprite: {texture: v_9, },},});

   
  
   

    World.add(engine.world, [
      // walls
      Bodies.rectangle(0,0, 3522, 1, { isStatic: true , render: {fillStyle: "transparent"}}),

      Bodies.rectangle(window.innerWidth, 0,91, 900, { isStatic: true , render: {fillStyle: "transparent"}}),
      Bodies.rectangle(window.innerWidth, 800,5, 900, { isStatic: true , render: {fillStyle: "transparent"}}),


      Bodies.rectangle(0, window.innerHeight, 1899, 25, { isStatic: true , render: {fillStyle: "transparent"}}),
      Bodies.rectangle(1880, window.innerHeight, 1899, 25, { isStatic: true , render: {fillStyle: "transparent"}}),

      Bodies.rectangle(0, window.innerHeight, 5, 1100, { isStatic: true , render: {fillStyle: "transparent"}}),
      Bodies.rectangle(0, 222, 35, 1100, { isStatic: true , render: {fillStyle: "transparent"}}),
    ]);


 

    World.add(engine.world, [ballA, v1, v2,v3,v5,v6,v7,v8 ]);

    // add mouse control
  
    document.addEventListener("mousewheel", function(event) {
      window.scrollBy(0, event.deltaY);
    });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    World.add(engine.world, mouseConstraint);

    Events.on(engine, "collisionStart", function (event) {
      var pairs = event.pairs;

      for (var i = 0, j = pairs.length; i !== j; ++i) {
        var pair = pairs[i];

       
      }
    });

    Engine.run(engine);

    Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <div ref={sceneRef} style={{ backgroundColor: "transparent", overflow:"hidden"}} />;

};

export default Anima;
