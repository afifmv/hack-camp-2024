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
  const [curEvent, setCurrentEvent] = useState('neutral');
  const [startBird, setStartBird] = useState(false);
  const [startCactus, setCactus] = useState(false);

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
    // if (cactusRef.current) {
      move();
    // }
    // if (birdRef.current) {
      moveBird();
    // }
  };

  function move() {
    console.log("Move");
      setTimeout(() => {
        if (cactusRef.current) {
          cactusRef.current.style.animation = 'block 2s linear';
          cactusRef.current.style.left = '800px';
          cactusRef.current.style.display = 'block';
        }
      }, randomeDelay);

  }
  function moveBird() {
    console.log("Move");
      setTimeout(() => {
        if (birdRef.current) {
          birdRef.current.style.animation = 'fly 2s linear';
          birdRef.current.style.left = '800px';
          birdRef.current.style.display = 'block';
        }
        // setRandomDelay(randomeDelay + Math.floor(Math.random() * 1000) + 1000);
      }, randomeDelay);

  }

  useEffect(() => {
    setTimeout(() => {
      setStartBird(true);
    }, 8000);
    setTimeout(() => {
      setCactus(true);
    }, 5000);
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setCurrentEvent('jump');
        jump();
        setCurrentEvent('neutral');
      } else if (event.key === 'ArrowDown') {
        setCurrentEvent('crouch');
        crouch();
        setCurrentEvent('neutral');
      }
    };
    window.addEventListener('keyup', handleKeyPress);

    const isAlive = setInterval(function () {
      if (gameOver) {
        clearInterval(isAlive);
        return;
      }
      setRandomDelay(Math.floor(Math.random() * 1000) + 1000);
    
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current!).getPropertyValue("top")
      );
      const dinoRight = parseInt(
        getComputedStyle(dinoRef.current!).getPropertyValue('right')
      );
      let cactusLeft = 0;
      if (cactusRef.current) {
        cactusLeft = parseInt(
          getComputedStyle(cactusRef.current!).getPropertyValue("left")
        );
      }
      
      let birdLeft = 0;
      let birdBottom = 0;
      if (birdRef.current) {
        birdLeft = parseInt(
          getComputedStyle(birdRef.current!).getPropertyValue("left")
        );
        birdBottom = parseInt(
          getComputedStyle(birdRef.current!).getPropertyValue('bottom')
        );
      }
      
      console.log('dinoTop', dinoTop);
      console.log('bird bottom', birdBottom);
      // if (curEvent === 'jump') {
        if ((((cactusLeft - dinoRight) < 40 && cactusLeft > 0 && dinoTop >= 180) || ((birdLeft - dinoRight) < 40 && (birdBottom - dinoTop) < 30 && birdLeft > 0))) {
          console.log("hit");
          clearInterval(isAlive);
          if (cactusRef.current) {
            cactusRef.current.style.display = 'none';
            cactusRef.current.style.animation = 'none';
            cactusRef.current.style.left = '800px';
          }
          if (birdRef.current) {
            birdRef.current.style.display = 'none';
            birdRef.current.style.animation = 'none';
            birdRef.current.style.left = '800px';
          }
          
          setGameOver(true);
        } else if (cactusLeft < 20 && !gameOver) {
            console.log("cactus off")
            if (cactusRef.current) {
              cactusRef.current.style.animation = 'none';
              cactusRef.current.style.display = 'none';
            }
            move();
        } else if (birdLeft < 20 && !gameOver) {
            console.log("bird off")
            if (birdRef.current) {
              birdRef.current.style.animation = 'none';
              birdRef.current.style.display = 'none';
            }
            moveBird();
        } 
      // } else if (curEvent === 'crouch') {
        // console.log("not in jump")
        // if ((birdLeft - dinoRight) < 40 && (birdBottom - dinoTop) < 10 && birdLeft > 0 && dinoTop >= 180) {
        //   clearInterval(isAlive);
        //   birdRef.current.style.animation = 'none';
        //   setGameOver(true);
        //   birdRef.current.style.display = 'none';
        // } else if (birdLeft < 20 && !gameOver) {
        //     birdRef.current.style.animation = 'none';
        //     birdRef.current.style.display = 'none';
        //     moveBird();
        // }
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
        {/* <button onClick={resetGame}>Start</button> */}
        <div ref={dinoRef} className="dino"></div>
        {startCactus && (
            <div ref={cactusRef} className="cactus" id="cactus"></div>
        )}
        {/* <div ref={cactusRef} className="cactus" id="cactus"></div> */}
        {startBird && (
            <div ref={birdRef} className="bird" id="bird" ></div>
        )}
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
