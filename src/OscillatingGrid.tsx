import { useState, useEffect } from 'react';

const OscillatingGrid = () => {
  const [grid, setGrid] = useState<boolean[][]>([]);
  const rows = 20;
  const cols = 20;
  const maxActiveCells = 15;
  const cellOpacity = 0.1;

  useEffect(() => {
    const createGrid = () => {
      const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(false));
      let activeCells = 0;
      while (activeCells < maxActiveCells) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        if (!newGrid[randomRow][randomCol]) {
          newGrid[randomRow][randomCol] = true;
          activeCells++;
        }
      }
      return newGrid;
    };

    setGrid(createGrid());

    const intervalId = setInterval(() => {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        const activeCells = newGrid.flat().filter(cell => cell).length;

        if (activeCells > 0) {
          // Turn off a random active cell
          let turnedOff = false;
          while (!turnedOff) {
            const randomRow = Math.floor(Math.random() * rows);
            const randomCol = Math.floor(Math.random() * cols);
            if (newGrid[randomRow][randomCol]) {
              newGrid[randomRow][randomCol] = false;
              turnedOff = true;
            }
          }
        }

        // Turn on a random inactive cell
        let turnedOn = false;
        while (!turnedOn) {
          const randomRow = Math.floor(Math.random() * rows);
          const randomCol = Math.floor(Math.random() * cols);
          if (!newGrid[randomRow][randomCol]) {
            newGrid[randomRow][randomCol] = true;
            turnedOn = true;
          }
        }

        return newGrid;
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={index}
          style={{
            backgroundColor: cell ? `rgba(0, 0, 0, ${cellOpacity})` : `rgba(255,200,100, ${cellOpacity + 0.2})`,
            transition: 'background-color 0.3s ease',
          }}
        />
      ))}
    </div>
  );
};

export default OscillatingGrid;