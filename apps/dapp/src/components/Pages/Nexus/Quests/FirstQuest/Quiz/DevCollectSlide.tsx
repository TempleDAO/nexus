import { useLocation } from 'react-router-dom';
import CollectSlide from './CollectSlide';
import { BigNumber } from 'ethers';
import { useState } from 'react';
import SelectRelicDialog from 'components/Pages/Nexus/Origami/SelectRelicDialog';
import SuccessSlide from './SuccessSlide';

const DevCollectSlide = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const passed = searchParams.get('passed') === 'true';

  const mintSuccess = searchParams.get('mintsuccess') === 'true';

  const onMintSuccess = () => {
    console.log('Dev Mint success');
  };

  const [selectedRelic, setSelectedRelic] = useState<BigNumber | undefined>(undefined);

  const onRelicSelect = (relicId: BigNumber) => {
    setSelectedRelic(relicId);
  }

  if (mintSuccess) {
    return <SuccessSlide />;
  }

  if (!selectedRelic) {
    return <SelectRelicDialog onSelectRelic={onRelicSelect} />;
  }

  return (
    <CollectSlide
      passed={passed}
      tryAgainButtonClickHandler={() => {}}
      onSuccessCallback={onMintSuccess}
      selectedRelic={selectedRelic}
    />
  );
};

export default DevCollectSlide;
