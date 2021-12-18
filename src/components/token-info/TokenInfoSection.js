import { ColumnWithMargins } from '../layout';
import styled from '@rainbow-me/styled';
import { padding } from '@rainbow-me/styles';

const TokenInfoSection = styled(ColumnWithMargins).attrs({
  margin: 15,
})(({ isNft }) => ({
  ...(ios ? padding(isNft ? 0 : 24, isNft ? 5 : 0, isNft ? 24 : 5) : {}),
  width: '100%',
}));

export default TokenInfoSection;
