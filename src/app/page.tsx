"use client";

import Pads from "@/components/Pads";
import { useEffect, useRef, useState } from "react";

const colors = ["green", "maroon", "darkgoldenrod", "darkblue"];

const sounds = [
  "/sounds/green.mp3",
  "/sounds/maroon.mp3",
  "/sounds/darkgoldenrod.mp3",
  "/sounds/darkblue.mp3",
  "/sounds/reset.mp3",
];

const Home = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [clickable, setClickable] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [playingId, setPlayingId] = useState(0);
  const containRef = useRef<HTMLDivElement | null>(null);

  const resetGame = () => {
    setSequence([]);
    setClickable(false);
    setGameStart(false);
    setPlayingId(0);
  };

  const addItemSequence = () => {
    const random = Math.floor(Math.random() * colors.length);
    setSequence((prev) => [...prev, random]);
  };

  const handleStart = () => {
    if (!gameStart) {
      setGameStart(true);
      addItemSequence();
    }
  };

  useEffect(() => {
    setClickable(false);
    if (sequence.length > 0) {
      const showSequence = (id = 0) => {
        setTimeout(() => {
          const audio = new Audio(sounds[sequence[id]]);
          audio.play();
          containRef.current?.children[sequence[id]].classList.add(
            "brightness-200"
          );
          setTimeout(() => {
            containRef.current?.children[sequence[id]].classList.remove(
              "brightness-200"
            );
            if (id < sequence.length - 1) {
              showSequence(id + 1);
            } else {
              setClickable(true);
            }
          }, 300);
        }, 300);
      };
      showSequence();
    }
  }, [sequence.length]);

  const handleColorClick = (id: number) => {
    const audio = new Audio(sounds[id]);
    audio.play();
    if (sequence[playingId] === id) {
      if (playingId === sequence.length - 1) {
        setTimeout(() => {
          addItemSequence();
          setPlayingId(0);
        }, 300);
      } else {
        setPlayingId(playingId + 1);
      }
    } else {
      const audio = new Audio(sounds[4]);
      audio.play();
      resetGame();
    }
  };

  return (
    <div className="h-full flex flex-col gap-24 justify-center items-center">
      <h1 className="text-cyan-400 shadow-xl p-4 rounded-lg shadow-cyan-600 text-5xl font-bold">
        Simon Game
      </h1>
      <div
        ref={containRef}
        className="relative grid grid-cols-2 w-fit mx-auto pads gap-2.5"
      >
        {colors.map((color, index) => (
          <Pads
            key={index}
            index={index}
            color={color}
            clickable={clickable}
            onClick={handleColorClick}
          />
        ))}
        <button
          className={`absolute translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2 text-purple-400 text-xl bg-black w-24 h-24 rounded-full shadow-lg shadow-black ${
            !gameStart && "hover:scale-105"
          } transition-all duration-[200ms] ease-in-out `}
          onClick={handleStart}
        >
          {gameStart ? sequence.length : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Home;
