import puzzle0Img from 'assets/images/origami/puzzle-0.png';
import puzzle1Img from 'assets/images/origami/puzzle-1.png';
import puzzle2Img from 'assets/images/origami/puzzle-2.png';
import puzzle3Img from 'assets/images/origami/puzzle-3.png';
import FoldingPuzzle from "./FoldingPuzzle";
import { PuzzleSpec } from './puzzle-solution';
import { useLocation } from 'react-router-dom';

const PUZZLE_0: PuzzleSpec = {
  imgUrl: puzzle0Img,
  solution: [[
    [{ x: 0, y: 5}, { x: -5, y: 0 }],
    [{ x: -5, y: 0}, { x: 0, y: -5 }],
    [{ x: 0, y: -5}, { x: 5, y: 0 }],
    [{ x: 5, y: 0}, { x: 0, y: 5 }],
  ]]
}
const PUZZLE_1: PuzzleSpec = {
  imgUrl: puzzle1Img,
  solution: [[
    [[{ x: 0, y: 5}, { x: -5, y: 2.5 }], [[{ x: 0, y: 5}, { x: -5, y: 0 }]]],
    [[{ x: -5, y: 0}, { x: -2.5, y: -5 }], [[{ x: -5, y: 0}, { x: 0, y: -5 }]]],
    [[{ x: 0, y: -5}, { x: 5, y: -2.5 }], [[{ x: 0, y: -5}, { x: 5, y: 0 }]]],
    [[{ x: 5, y: 0}, { x: 2.5, y: 5 }], [[{ x: 5, y: 0}, { x: 0, y: 5 }]]],
  ]]
}
const PUZZLE_2: PuzzleSpec = {
  imgUrl: puzzle2Img,
  solution: [[
    [[{ x: 0, y: 5}, { x: -5, y: 0 }], [[{ x: 0, y: 5 }, { x: -5, y: -5 }]]],
    [[{ x: 5, y: 0}, { x: 0, y: 5 }], [[{ x: 5, y: -5 }, { x: 0, y: 5 }]]],
  ], [
    [{ x: -5, y: -2.5 }, { x: 5, y: -2.5 }]
  ]]
}
const PUZZLE_3: PuzzleSpec = {
  imgUrl: puzzle3Img,
  solution: [[
    [[{ x: -2.5, y: 5}, { x: -5, y: 0 }], [[{ x: 0, y: 5 }, { x: -5, y: -2.5 }]]],
    [[{ x: 2.5, y: -5}, { x: 5, y: 0 }], [[{ x: 0, y: -5 }, { x: 5, y: 2.5 }]]],
    [[{ x: -5, y: 0}, { x: -2.5, y: -5 }], [[{ x: -5, y: 2.5 }, { x: 0, y: -5 }]]],
    [[{ x: 5, y: 0}, { x: 2.5, y: 5 }], [[{ x: 5, y: -2.5 }, { x: 0, y: 5 }]]],
  ]]
}

const OrigamiPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDev = searchParams.get('dev');

  return <FoldingPuzzle puzzles={[PUZZLE_0, PUZZLE_1, PUZZLE_2, PUZZLE_3]} devMode={!!isDev} />
};

export default OrigamiPage;