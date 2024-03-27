import styled from 'styled-components';
import { Overlay, DisplayBlock, PuzzleButton } from './styled';
import { useEffect, useState } from 'react';
import { useRelic } from 'providers/RelicProvider';
import { RelicEnclave } from 'providers/types';
import { getEnclavePalette } from '../Relic/RelicStatsPanel';
import { BigNumber } from 'ethers';
import { useWallet } from 'providers/WalletProvider';

type SelectRelicDialogProps = {
  onSelectRelic: (relicId: BigNumber) => void;
};

const SelectRelicDialog = ({ onSelectRelic }: SelectRelicDialogProps) => {
  // get inventory with all relics
  const { inventory, updateInventory, inventoryLoading } = useRelic();
  const { walletAddress } = useWallet();

  // update inventory on load
  useEffect(() => {
    updateInventory();
  }, [walletAddress]);

  useEffect(() => {
    // if (inventory) {
    console.log('Inventory', inventory);
    // }
  }, [inventory]);

  return inventoryLoading ? (
    <Overlay visible={true} blur={true}>
      <DisplayBlock>
        {/* <OrigamiHeaderLogo /> */}
        <SelectText>Loading Inventory...</SelectText>
      </DisplayBlock>
    </Overlay>
  ) : (
    <Overlay visible={true} blur={true}>
      <ButtonList>
        {/* <OrigamiHeaderLogo /> */}
        {inventory?.relics.length === 0 ? (
          <SelectText>No Relics Available</SelectText>
        ) : (
          <>
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
          </>
        )}
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

export default SelectRelicDialog;
