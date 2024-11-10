"use client";
import React, { useEffect, useRef, useState } from 'react';
import './dino.css';
import { getEventListeners } from 'events';

function Dino() {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const birdRef = useRef();

  const [score, setScore] = useState(0);

  const jump = () => {
    console.log('jump');
    if (!!dinoRef.current && !dinoRef.current.classList.contains('jump')) {
  
      dinoRef.current.classList.add('jump');

      
      setTimeout(function () {
        dinoRef.current.classList.remove('jump');
      }, 200);
    }
  };
  const crouch = () => {
    console.log('crouch');
    if (!!dinoRef.current && !dinoRef.current.classList.contains('crouch')) {
      dinoRef.current.classList.add('crouch');

      setTimeout(function () {
        dinoRef.current.classList.remove('crouch');
      }, 200);
    }
  };

  // DO: Chnage the code below to call the jump function by any keypress instead of a button click
  // Hint! use useEffect and addEventListener
  // const handleJumpButtonClick = () => {
  //   jump();
  // };
 

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
          jump();
        }
        else if (event.key === 'ArrowDown') {
          crouch();
        }
      };

      window.addEventListener('keyup', handleKeyPress);

      const isAlive = setInterval(function () {
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current!).getPropertyValue('top')
      );
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current!).getPropertyValue('left')
      );
      let birdLeft = parseInt(
        getComputedStyle(birdRef.current!).getPropertyValue('left')
      );
      let birdTop = parseInt(
        getComputedStyle(birdRef.current!).getPropertyValue('top')
      );

      if (
        (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) ||
        (birdLeft < 40 && birdLeft > 0 && dinoTop <= birdTop + 50 && dinoTop >= birdTop - 50)
      ) {
        console.log('Game Over! Your Score : ' + score);
        clearInterval(isAlive);
        setScore(0);
      } else {
        setScore(score+1);
      }
    }, 10);

    // const randomizeCactusPosition = () => {
    //   if (cactusRef.current) {
    //     const randomLeft = Math.floor(Math.random() * 500) + 80; // Random position between 80 and 580
    //     cactusRef.current.style.left = `${randomLeft}px`;
    //   }
    // };

    // const cactusInterval = setInterval(randomizeCactusPosition, 2000); // Change position every 2 seconds
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        clearInterval(isAlive);
        // clearInterval(cactusInterval);
      };
    }, []);

  return (
    <div className="game">
      <div ref={dinoRef} className="dino"></div>
      <div ref={cactusRef} className="cactus" id="cactus"></div>
      <div ref={birdRef} className="bird" id="bird"></div>
      <div className='track'></div>
      <div>Score: {score}</div>
    </div>
  );
}

export default Dino;
