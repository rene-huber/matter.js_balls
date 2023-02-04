import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import ballImage from "../1.gif";

const Anima = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create({});

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 900,
        height: 600,
        wireframes: false
      }
    });

    const ballA = Bodies.circle(210, 100, 30, {
      restitution: 0.5,
      render: {
        sprite: {
          texture: ballImage
        }
      }
    });
    const ballB = Bodies.circle(110, 50, 30, {
      restitution: 0.5,
      render: {
        sprite: {
          texture: ballImage
        }
      }
    });

    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    World.add(engine.world, [ballA, ballB]);

    // add mouse control
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      World.add(engine.world,
        Bodies.circle(event.mouse.position.x, event.mouse.position.y, 30, {
          restitution: 0.7,
          render: {
            sprite: {
              texture: ballImage
            }
          }
        })
      );
    });

    Engine.run(engine);

    Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default Anima;
