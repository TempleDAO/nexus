import origami_header_logo from 'assets/images/origami-header-logo.svg';
import styled from 'styled-components';
import { Overlay, DisplayBlock, PuzzleButton } from './styled';
import { useEffect, useState } from 'react';
import { useRelic } from 'providers/RelicProvider';
import { RelicEnclave } from 'providers/types';
import { getEnclavePalette } from '../Relic/RelicStatsPanel';
import { BigNumber } from 'ethers';

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

type SelectRelicDialogProps = {
  onSelectRelic: (relicId: BigNumber) => void;
};

const SelectRelicDialog = ({ onSelectRelic }: SelectRelicDialogProps) => {
  // get inventory with all relics
  const { inventory, updateInventory, inventoryLoading } = useRelic();

  // update inventory on load
  useEffect(() => {
    updateInventory();
  }, []);

  return inventoryLoading ? (
    <Overlay visible={true} blur={true}>
      <DisplayBlock>
        <OrigamiHeaderLogo />
        <SelectText>Loading Inventory...</SelectText>
      </DisplayBlock>
    </Overlay>
  ) : (
    <Overlay visible={true} blur={true}>
      <ButtonList>
        <OrigamiHeaderLogo />
        <SelectText>Select a Relic To Mint</SelectText>
        {inventory?.relics.map((relic, idx) => (
          <RelicButton
            key={idx}
            enclave={relic.enclave}
            onClick={() => {
              onSelectRelic(relic.id);
            }}
          >{`Relic ${relic.id}`}</RelicButton>
        ))}
      </ButtonList>
    </Overlay>
  );
};

const SelectText = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type RelicButtonProps = {
  enclave: RelicEnclave;
};

const RelicButton = styled.button<RelicButtonProps>`
  margin: 12px;
  font-size: 1.5rem;
  background: ${(props) =>
    props.theme.palette.enclave[getEnclavePalette(props.enclave)]};
  border: 1px solid
    ${(props) => props.theme.palette.enclave[getEnclavePalette(props.enclave)]};
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
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

const ClaimedMessage = styled.div`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const OrigamiHeaderLogo = styled.img.attrs({
  src: origami_header_logo,
  alt: 'Origami Header Logo',
})`
  width: 250px;
  max-width: 300px;
`;
