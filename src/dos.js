import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const App = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      // positionIterations: 20
    });

    var render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false
      }
    });

    var ballA = Bodies.rectangle(210, 100, 30, 30, { restitution: 0.5, render: { sprite: { texture: 'https://w1.rene-huber.eu/wp-content/uploads/2020/12/logo-huber-1.png' } } });
    var ballB = Bodies.rectangle(110, 50, 30, 30, { restitution: 0.5, render: { sprite: { texture: 'https://w1.rene-huber.eu/wp-content/uploads/2020/12/logo-huber-1.png' } } });
    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    World.add(engine.world, [ballA, ballB]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
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
      World.add(engine.world, Bodies.rectangle(150, 50, 30, 30, { restitution: 0.7, render: { sprite: { texture: 'https://w1.rene-huber.eu/wp-content/uploads/2020/12/logo-huber-1.png' } } }));
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

export default App;
