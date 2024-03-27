import * as R3F from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { FoldingState } from './FoldingEngine';
import { FoldingSheet, FoldingSheetWithContext } from './FoldingSheet';
import {
  FoldingEventEmitter,
  PointerEventEmitter,
  PuzzleSolvedEventEmitter,
} from './InputEventEmitter';
import { PuzzleImageCarousel } from './PuzzleImageCarousel';
import { PuzzleSpec, checkPuzzleSolution } from './puzzle-solution';
import {
  AbsoluteFillSpace,
  DisplayBlock,
  Overlay,
  PuzzleButton,
} from './styled';
import { useWallet } from 'providers/WalletProvider';
import { useConnectWallet } from '@web3-onboard/react';
import { MintShard } from './MintShard';

export default function FoldingPuzzle(props: {
  puzzles: PuzzleSpec[];
  devMode?: boolean;
}) {
  const { isConnected, walletAddress } = useWallet();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [showConnect, setShowConnect] = useState(false);

  useEffect(() => {
    if (walletAddress && isConnected) {
      setShowConnect(false);
      return;
    }
    setShowConnect(true);
  }, [walletAddress, isConnected]);

  const { puzzles } = props;
  const pointerEventEmitter = useMemo(() => new PointerEventEmitter(), []);
  const foldingEventEmitter = useMemo(() => new FoldingEventEmitter(), []);
  const puzzleSolvedEventEmitter = useMemo(
    () => new PuzzleSolvedEventEmitter(),
    []
  );

  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [buttonState, setButtonState] = useState<FoldingState>({
    canUndo: false,
    canRedo: false,
  });
  const [dialogState, setDialogState] = useState<
    { heading: string; subheading: string } | undefined
  >(undefined);

  const foldingSheetRef = useRef<FoldingSheet>(null);

  const [allSolved, setAllSolved] = useState(false);

  // if devMode, set allSolved to true
  useEffect(() => {
    if (props.devMode) {
      setAllSolved(true);
    }
  }, [props.devMode]);

  const onMintCompleteHandler = () => {
    // setMintDone(true);
    // Anything needed here now? Probably not.
    // Do we need to set something in local storage?
  };

  return walletAddress ? (
    <PuzzleContainer>
      <PuzzleImageCarousel
        imgUrls={puzzles.map((p) => p.imgUrl)}
        puzzleSolvedEventEmitter={puzzleSolvedEventEmitter}
      />
      <CanvasContainer
        onPointerDown={(e) => pointerEventEmitter.emit('pointerdown', e)}
        onPointerMove={(e) => pointerEventEmitter.emit('pointermove', e)}
        onPointerUp={(e) => pointerEventEmitter.emit('pointerup', e)}
      >
        <WidthEqualHeight />
        <AbsoluteFillSpace>
          <R3F.Canvas
            flat
            linear
            camera={{ fov: 6.5, near: 90, far: 150, position: [0, 0, 110] }}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <ambientLight args={[0xffffff, 1]} />
            <Suspense fallback={null}>
              <FoldingSheetWithContext
                foldingSheetRef={foldingSheetRef}
                pointerEventEmitter={pointerEventEmitter}
                foldingEventEmitter={foldingEventEmitter}
                onFoldingStateChange={setButtonState}
                onFoldingLinesChange={(foldingLines) => {
                  const { solution } = puzzles[puzzleIdx];
                  const isSolved = checkPuzzleSolution(foldingLines, solution);
                  if (isSolved) {
                    setDialogState({
                      heading: 'Solved',
                      subheading: `${puzzleIdx + 1}/${puzzles.length}`,
                    });
                  }
                }}
              />
            </Suspense>
          </R3F.Canvas>
        </AbsoluteFillSpace>
      </CanvasContainer>
      <ButtonContainer>
        <PuzzleButton
          disabled={!buttonState.canUndo}
          onClick={() => {
            foldingEventEmitter.emit('unfold');
          }}
        >
          Unfold
        </PuzzleButton>
        <PuzzleButton
          disabled={!buttonState.canRedo}
          onClick={() => {
            foldingEventEmitter.emit('refold');
          }}
        >
          Refold
        </PuzzleButton>
      </ButtonContainer>
      <PuzzleDialog
        content={dialogState}
        onClose={() => {
          setDialogState(undefined);

          if (puzzleIdx >= puzzles.length) {
            // all puzzles are solved
            // set the complete state
            setAllSolved(true);
          }

          foldingSheetRef.current?.unfoldAll(() => {
            puzzleSolvedEventEmitter.emit('solved', puzzleIdx);
            setPuzzleIdx(puzzleIdx + 1);
          });
        }}
      />
      {allSolved && <MintShard onMintCompleteHandler={onMintCompleteHandler} />}
      {walletAddress && (
        <WalletInfo
          onClick={() => {
            if (wallet) {
              disconnect(wallet);
            }
          }}
        >
          Connected {walletAddress}
        </WalletInfo>
      )}
    </PuzzleContainer>
  ) : (
    <PuzzleContainer>
      <CenterAlignedDiv>
        <PuzzleButton
          onClick={() => {
            connect();
          }}
          style={{ flex: 0 }}
        >
          Connect Wallet
        </PuzzleButton>
      </CenterAlignedDiv>
    </PuzzleContainer>
  );
}

const CenterAlignedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const WalletInfo = styled.div`
  color: grey;
  font-size: 0.7rem;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
`;

function PuzzleDialog(props: {
  content?: { heading: string; subheading: string };
  onClose: () => void;
}) {
  return (
    <Overlay visible={!!props.content}>
      {props.content && (
        <DisplayBlock>
          <h1>{props.content.heading}</h1>
          <h1>{props.content.subheading}</h1>
          <br />
          <PuzzleButton onClick={props.onClose}>Continue</PuzzleButton>
        </DisplayBlock>
      )}
    </Overlay>
  );
}

const PuzzleContainer = styled.div`
  position: relative;
  max-width: 700px;
  margin: auto;
  padding: 20px;
`;

const CanvasContainer = styled.div`
  position: relative;
  min-height: 400px;
  min-width: 400px;
  overflow: hidden;
`;

const WidthEqualHeight = styled.div`
  padding-top: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: auto;
`;
