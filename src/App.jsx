import React, { useRef, useEffect } from "react";

import Matter from "matter-js";
import ballImage from "./1.gif";
import ballImage2 from "./err.png";
import ballImage3 from "./tapa.jpg";

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

    const engine = Engine.create({});

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "none"
        
      },
    });

    const ballA = Bodies.circle(210, 100, 30, {
      restitution: 0.5,
      label: "ballA",
      render: {
        sprite: {
          texture: ballImage,
        },
      },
    });
    const ballB = Bodies.circle(110, 50, 30, {
      restitution: 0.5,
      label: "ballB",
      render: {
        sprite: {
          texture: ballImage2,
        },
      },
    });
    const ballC = Bodies.circle(610, 50, 30, {
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
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true , render: {fillStyle: "transparent"}}),
      Bodies.rectangle(20, 600, 2222, 5, { isStatic: true , render: {fillStyle: "transparent"}}),
      Bodies.rectangle(960, 300, 50, 600, { isStatic: true , render: {fillStyle: "transparent"}}),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true , render: {fillStyle: "transparent"}}),
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

        console.log(pair.bodyA.label, pair.bodyB.label);
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
