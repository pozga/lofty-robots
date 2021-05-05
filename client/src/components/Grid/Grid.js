import { useState } from "react";

import "./Grid.css";

// States in the room
// 0 - not explored
// 1 - loading
// 2 - explored, no switch
// 3 - obstacle
// 4 - switch here!
// @TODO: define state as object with possible values

// generates array with dimensions: width x length filled with initial values
const generateRoomInitialState = (width, length) => {
  return Array(width).fill(Array(length).fill(0));
};

const getAdditionalCellClasses = (status) => {
  switch (status) {
    case 2:
      return " Explored";
    case 3:
      return " Obstacle";
    case 4:
      return " Switch";
    default:
  }
  return "";
};

function Grid(props) {
  const [grid, setGrid] = useState(
    generateRoomInitialState(props.width, props.length)
  );
  const [isGridLoading, setIsGridLoading] = useState(false);

  const mapBumpyResponseToState = (responseJson) => {
    // @TODO: this function should have unit tests
    // setGrid(newState);
  };

  const handleCellClick = (x, y) => {
    // a trick to make a deep clone of grid
    const newGrid = JSON.parse(JSON.stringify(grid));
    // set state to loading
    newGrid[x][y] = 1;
    setGrid(newGrid);
    setIsGridLoading(true);
    //TODO: request to bumpy to check search the x,y coordinates
    // fetch->mapBumpyResponseToState
  };

  return (
    <div>
      <p>The room is still dark.</p>
      <div className="Grid">
        {grid.map((col, colIndex) => (
          <div className="Column" key={colIndex}>
            {col.map((cell, rowIndex) => (
              <div
                className={`Cell${getAdditionalCellClasses(cell)}`}
                key={colIndex.toString() + rowIndex.toString()}
                // @TODO: prevent onClick when bumpy is processing
                onClick={() => handleCellClick(colIndex, rowIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {isGridLoading && <p>Bumpy is searching...</p>}
    </div>
  );
}

export default Grid;
