import React, { useRef, useEffect } from "react";

import Matter from "matter-js";
import ballImage from "./err.png";
import ballImage2 from "./err.png";
import ballImage3 from "./err.png";

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
        wireframes: true,
        hasBounds: true,
        background: "transparent",
        
        
      },
    });
  


    const ballA = Bodies.rectangle(210, 100, 255, 114, {
      restitution: 0.7,
      label: "ballA",
      render: {
        sprite: {
          texture: ballImage,
        },
      },
    });
    const ballB = Bodies.rectangle(110, 199, 255, 114, {
      restitution: 0.5,
      label: "ballB",
      render: {
        sprite: {
          texture: ballImage2,
        },
      },
    });
    const ballC = Bodies.rectangle(610, 199, 255, 114, {
      restitution: 0.5,
      label: "ballC",
      render: {
        sprite: {
          texture: ballImage3,
        },
      },
    });

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


 

    World.add(engine.world, [ballA, ballB, ballC]);

    // add mouse control
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

  return <div ref={sceneRef} style={{ backgroundColor: "transparent", overflow:"hidden" }} />;

};

export default Anima;
