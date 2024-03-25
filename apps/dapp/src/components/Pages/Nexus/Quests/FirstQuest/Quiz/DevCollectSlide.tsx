import { useLocation } from 'react-router-dom';
import CollectSlide from './CollectSlide';

const DevCollectSlide = () => {
  // render the CollectSlide with passed or not passed based on querystring
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const passed = searchParams.get('passed') === 'true';

  const onMintSuccess = () => {
    console.log('Dev Mint success');
  };

  return (
    <CollectSlide
      passed={passed}
      tryAgainButtonClickHandler={() => {}}
      onSuccessCallback={onMintSuccess}
    />
  );
};
