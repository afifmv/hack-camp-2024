// // "use client";
// // import React, { useEffect, useRef, useState } from 'react';
// // import './dino.css';
// // import { getEventListeners } from 'events';

// // function Dino() {
// //   const dinoRef = useRef();
// //   const cactusRef = useRef();
// //   const birdRef = useRef();

// //   const [score, setScore] = useState(0);
// //   const [gameOver, setGameOver] = useState(false);

// //   const jump = () => {
// //     console.log('jump');
// //     console.log("cur score: ", score);
// //     setScore(score + 1);
// //     if (!!dinoRef.current && !dinoRef.current.classList.contains('jump')) {
  
// //       dinoRef.current.classList.add('jump');

      
// //       setTimeout(function () {
// //         dinoRef.current.classList.remove('jump');
// //       }, 200);
// //     }
// //   };
// //   const crouch = () => {
// //     console.log('crouch');
// //     setScore(score + 1);
// //     if (!!dinoRef.current && !dinoRef.current.classList.contains('crouch')) {
// //       dinoRef.current.classList.add('crouch');

// //       setTimeout(function () {
// //         dinoRef.current.classList.remove('crouch');
// //       }, 200);
// //     }
// //   };
 

// //   useEffect(() => {
// //     const handleKeyPress = (event: KeyboardEvent) => {
// //         if (event.key === 'ArrowUp') {
// //           jump();
// //         }
// //         else if (event.key === 'ArrowDown') {
// //           crouch();
// //         }
// //       };

// //       window.addEventListener('keyup', handleKeyPress);

// //       const isAlive = setInterval(function () {
// //       const dinoTop = parseInt(
// //         getComputedStyle(dinoRef.current!).getPropertyValue('top')
// //       );
// //       let cactusLeft = parseInt(
// //         getComputedStyle(cactusRef.current!).getPropertyValue('left')
// //       );
// //       let birdLeft = parseInt(
// //         getComputedStyle(birdRef.current!).getPropertyValue('left')
// //       );
// //       let birdTop = parseInt(
// //         getComputedStyle(birdRef.current!).getPropertyValue('top')
// //       );

// //       if (
// //         (cactusLeft < 20 && cactusLeft > 0 && dinoTop >= 140) ||
// //         (birdLeft < 40 && birdLeft > 0 && dinoTop <= birdTop + 50 && dinoTop >= birdTop - 50)
// //       ) {
// //         console.log('Game Over! Your Score : ' + score);
// //         clearInterval(isAlive);
// //         setGameOver(true);
// //         // setScore(0);
// //       }
// //     }, 10);
// //       return () => {
// //         window.removeEventListener('keydown', handleKeyPress);
// //         clearInterval(isAlive);
// //         // clearInterval(cactusInterval);
// //       };
// //     }, []);

// //   return (
// //     <div className='frame'>
// //       <div className="game">
// //         <div ref={dinoRef} className="dino"></div>
// //         <div ref={cactusRef} className="cactus" id="cactus"></div>
// //         <div ref={birdRef} className="bird" id="bird"></div>
// //         {/* <div className='track'></div> */}
// //         <div className='score'>Score: {score}</div>
// //         {gameOver && <div className="game-over">Game Over! Your Score: {score}</div>}
// //       </div>
// //     </div>
    
// //   );
// // }

// // export default Dino;


// // "use client";
// // import React, { useEffect, useRef, useState } from 'react';
// // import './dino.css';

// // function Dino() {
// //   const dinoRef = useRef<HTMLDivElement>(null);
// //   const cactusRef = useRef<HTMLDivElement>(null);
// //   const birdRef = useRef<HTMLDivElement>(null);

// //   const [score, setScore] = useState(0);
// //   const [gameOver, setGameOver] = useState(false);

// //   const jump = () => {
// //     if (!!dinoRef.current && !dinoRef.current.classList.contains('jump')) {
// //       dinoRef.current.classList.add('jump');
// //       setScore(score + 1);

// //       setTimeout(function () {
// //         dinoRef.current.classList.remove('jump');
// //       }, 200);
// //     }
// //   };

// //   const crouch = () => {
// //     if (!!dinoRef.current && !dinoRef.current.classList.contains('crouch')) {
// //       dinoRef.current.classList.add('crouch');
// //       setScore(score + 1);

// //       setTimeout(function () {
// //         dinoRef.current.classList.remove('crouch');
// //       }, 200);
// //     }
// //   };

// //   useEffect(() => {
// //     const handleKeyPress = (event: KeyboardEvent) => {
// //       if (event.key === 'ArrowUp') {
// //         jump();
// //       } else if (event.key === 'ArrowDown') {
// //         crouch();
// //       }
// //     };

// //     window.addEventListener('keyup', handleKeyPress);

// //     const isAlive = setInterval(function () {
// //       if (gameOver) {
// //         clearInterval(isAlive);
// //         return;
// //       }

// //       const dinoTop = parseInt(
// //         getComputedStyle(dinoRef.current!).getPropertyValue('top')
// //       );
// //       let cactusLeft = parseInt(
// //         getComputedStyle(cactusRef.current!).getPropertyValue('left')
// //       );
// //       let birdLeft = parseInt(
// //         getComputedStyle(birdRef.current!).getPropertyValue('left')
// //       );
// //       let birdTop = parseInt(
// //         getComputedStyle(birdRef.current!).getPropertyValue('top')
// //       );

// //       console.log('dinoTop', dinoTop);
// //       console.log('cactusLeft', cactusLeft);
// //       console.log('birdLeft', birdLeft);
// //       console.log('birdTop', birdTop);
// //       if (
// //         (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) ||
// //         (birdLeft < 40 && birdLeft > 0 && dinoTop <= birdTop + 50 && dinoTop >= birdTop - 50)
// //       ) {
// //         console.log('Game Over! Your Score : ' + score);
// //         clearInterval(isAlive);
// //         setGameOver(true);
// //       }
// //     }, 10);

// //     return () => {
// //       window.removeEventListener('keyup', handleKeyPress);
// //       clearInterval(isAlive);
// //     };
// //   }, [score, gameOver]);

// //   return (
// //     <div className="frame">
// //       <div className="game">
// //         <div ref={dinoRef} className="dino"></div>
// //         <div ref={cactusRef} className="cactus" id="cactus"></div>
// //         <div ref={birdRef} className="bird" id="bird"></div>
// //         <div className='track'></div>
// //         <div className='score'>Score: {score}</div>
// //         {gameOver && <div className="game-over">Game Over! Your Score: {score}</div>}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dino;

"use client";
import React, { useEffect, useRef, useState } from 'react';
import './dino.css';

function Dino() {
  const dinoRef = useRef<HTMLDivElement>(null);
  const cactusRef = useRef<HTMLDivElement>(null);
  
  const birdRef = useRef<HTMLDivElement>(null);


  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [randomeDelay, setRandomDelay] = useState(0);

  const jump = () => {
    if (!!dinoRef.current && !dinoRef.current.classList.contains('jump')) {
      dinoRef.current.classList.add('jump');
      setScore(score + 1);

      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 200);
    }
  };

  const crouch = () => {
    if (!!dinoRef.current && !dinoRef.current.classList.contains('crouch')) {
      dinoRef.current.classList.add('crouch');
      setScore(score + 1);

      setTimeout(function () {
        dinoRef.current.classList.remove("crouch");
      }, 200);
    }
  };
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    // Optionally, reset positions of cactus and bird
    if (cactusRef.current) {
      move();
    }
    if (birdRef.current) {
      birdRef.current.style.left = '500px';
    }
  };

  function move() {
    console.log("Move");
      setTimeout(() => {
        if (cactusRef.current) {
          cactusRef.current.style.animation = 'block 2s linear';
          cactusRef.current.style.left = '800px';
          cactusRef.current.style.display = 'block';
        }
        setRandomDelay(Math.floor(Math.random() * 1000) + 1000);
      }, randomeDelay);

  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        jump();
      } else if (event.key === 'ArrowDown') {
        crouch();
      }
    };
    window.addEventListener('keyup', handleKeyPress);

    const isAlive = setInterval(function () {
      if (gameOver) {
        clearInterval(isAlive);
        return;
      }

      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current!).getPropertyValue("top")
      );
      const dinoRight = parseInt(
        getComputedStyle(dinoRef.current!).getPropertyValue('right')
      );
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current!).getPropertyValue("left")
      );
      let birdLeft = parseInt(
        getComputedStyle(birdRef.current!).getPropertyValue("left")
      );
      let birdTop = parseInt(
        getComputedStyle(birdRef.current!).getPropertyValue('bottom')
      );
      if ((cactusLeft - dinoRight) < 40 && cactusLeft > 0 && dinoTop >= 180) {
        clearInterval(isAlive);
        cactusRef.current!.style.animation = 'none';
        setGameOver(true);
        cactusRef.current.style.display = 'none';
      } else if (cactusLeft <40 && !gameOver) {
          cactusRef.current.style.animation = 'none';
          cactusRef.current.style.display = 'none';
          move();
      }
      // if (
      //   (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) ||
      //   (birdLeft < 40 && birdLeft > 0 && dinoTop <= birdTop + 50 && dinoTop >= birdTop - 50)
      // ) {
      //   console.log('Game Over! Your Score : ' + score);
      //   clearInterval(isAlive);
      //   setGameOver(true);
      // }
    }, 10);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
      clearInterval(isAlive);
    };
  }, [score, gameOver]);

  return (
    <div className="frame">
      <div className="game">
        <div ref={dinoRef} className="dino"></div>
        <div ref={cactusRef} className="cactus" id="cactus"></div>
        <div ref={birdRef} className="bird" id="bird"></div>
        <div className='track'></div>
        <div className='score'>Score: {score}</div>
        {gameOver && (
          <div className="game-over">
            Game Over! Your Score: {score}
            <button onClick={resetGame}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dino;
