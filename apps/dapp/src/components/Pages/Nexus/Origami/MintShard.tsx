import origami_header_logo from 'assets/images/origami-header-logo.svg';
import styled from 'styled-components';
import { Overlay, DisplayBlock, PuzzleButton } from './styled';
import { useState } from 'react';
import { useRelic } from 'providers/RelicProvider';
import { BigNumber } from 'ethers';
import SelectRelicDialog from './SelectRelicDialog';

type MintShardProps = {
  onMintCompleteHandler: () => void;
};

export const MintShard = ({ onMintCompleteHandler }: MintShardProps) => {
  const [mintDone, setMintDone] = useState(false);

  const internalMintCompleteHandler = () => {
    setMintDone(true);
    onMintCompleteHandler();
  };

  const [selectedRelic, setSelectedRelic] = useState<BigNumber | undefined>(
    undefined
  );

  const selectRelicHandler = (relicId: BigNumber) => {
    setSelectedRelic(relicId);
  };

  return (
    <>
      {!selectedRelic ? (
        <SelectRelicDialog onSelectRelic={selectRelicHandler} />
      ) : (
        <>
          {!mintDone && (
            <PuzzleShardClaimDialog
              selectedRelicId={selectedRelic}
              onMintCompleteHandler={internalMintCompleteHandler}
            />
          )}
          {mintDone && <PuzzleShardClaimCompleteDialog />}
        </>
      )}
    </>
  );
};

const SelectText = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

type PuzzleShardClaimDialogProps = {
  onMintCompleteHandler: () => void;
  selectedRelicId: BigNumber;
};

const PuzzleShardClaimDialog = ({
  onMintCompleteHandler,
  selectedRelicId,
}: PuzzleShardClaimDialogProps) => {
  const { mintOrigamiShard } = useRelic();
  const {
    handler: mintOrigamiShardHandler,
    isLoading,
    error,
  } = mintOrigamiShard;

  return (
    <Overlay visible={true} blur={true}>
      <DisplayBlock>
        <OrigamiHeaderLogo />
        {/* // TODO: Show relic with enclave color and rarity info? */}
        <SelectText>{`Minting Shard for Relic ${selectedRelicId}`}</SelectText>
        <PuzzleButton
          loading={isLoading}
          onClick={async () => {
            await mintOrigamiShardHandler(selectedRelicId);
            onMintCompleteHandler();
          }}
        >
          {`Mint Origami Shard`}
        </PuzzleButton>
        {error && <ErrorText>{formatErrorMessage(error.message)}</ErrorText>}
      </DisplayBlock>
    </Overlay>
  );
};

const formatErrorMessage = (errorMessage: string) => {
  const boundary = errorMessage.indexOf('(');
  if (boundary > 0) return errorMessage.substring(0, boundary - 1);
  return errorMessage.substring(0, 20).concat('...');
};

const ErrorText = styled.div`
  color: red;
  font-size: 1rem;
`;

const PuzzleShardClaimCompleteDialog = () => {
  return (
    <Overlay visible={true} blur={true}>
      <DisplayBlock>
        <OrigamiHeaderLogo />
        <SelectText>Successfully minted!</SelectText>
        <PuzzleButton
          onClick={() => {
            window.opener = null;
            window.open('', '_self');
            window.close();
          }}
        >
          Close Tab to Return to Nexus
        </PuzzleButton>
      </DisplayBlock>
    </Overlay>
  );
};

const OrigamiHeaderLogo = styled.img.attrs({
  src: origami_header_logo,
  alt: 'Origami Header Logo',
})`
  width: 250px;
  max-width: 300px;
`;
