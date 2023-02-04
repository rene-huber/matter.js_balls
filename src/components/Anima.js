import React, { useRef, useEffect } from 'react';
import { Engine, Render, World, Bodies, Events } from 'matter-js';

const Anima = () => {
  const ballRef = useRef();
  const engineRef = useRef();

  useEffect(() => {
    // Initialize the engine
    engineRef.current = Engine.create();
    World.add(engineRef.current.world, [
      // Create a ball body
      Bodies.circle(100, 100, 20, {
        render: {
          fillStyle: 'red',
        },
      }),
      // Create a static floor body
      Bodies.rectangle(200, 400, 400, 20, { isStatic: true }),
    ]);

    // Start the engine
    Engine.run(engineRef.current);

    // Listen for collision events
    Events.on(engineRef.current, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        // Check if the ball hit the floor
        if (pair.bodyA.label === 'ball' && pair.bodyB.label === 'floor') {
          // Apply a force to the ball in the opposite direction
          Bodies.applyForce(pair.bodyA, { x: pair.bodyA.position.x, y: pair.bodyA.position.y }, {
            x: (pair.bodyA.position.x - pair.bodyB.position.x) * 0.05,
            y: -0.05,
          });
        }
      });
    });

    return () => {
      // Clean up the engine when the component unmounts
      Engine.clear(engineRef.current);
    };
  }, []);

  return (
    <div>
      <div
        ref={ballRef}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'red',
          position: 'absolute',
          left: 100 - 20,
          top: 100 - 20,
        }}
      />
      <Render engine={engineRef.current}>
        {({ engine }) => {
          const ball = engine.world.bodies.find((body) => body.label === 'ball');
          if (!ball) {
            return null;
          }

          // Update the ball's position and rotation
          ballRef.current.style.left = ball.position.x - 20;
          ballRef.current.style.top = ball.position.y - 20;
          ballRef.current.style.transform = `rotate(${ball.angle}rad)`;

          return null;
        }}
      </Render>
    </div>
  );
};

export default Anima;
