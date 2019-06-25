import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { InteractionManager } from 'react-native';
import {
  compose,
  onlyUpdateForKeys,
  withHandlers,
  withProps,
} from 'recompact';
import { AssetPanel, AssetPanelAction, AssetPanelHeader } from './asset-panel';
import FloatingPanels from './FloatingPanels';
import { withAccountData, withAccountSettings } from '../../hoc';
import { ethereumUtils } from '../../utils';

const TokenExpandedState = ({
  onPressSend,
  price,
  subtitle,
  title,
}) => (
  <FloatingPanels>
    <AssetPanel>
      <AssetPanelHeader
        price={price}
        subtitle={subtitle}
        title={title}
      />
      <AssetPanelAction
        icon="send"
        label="Send to..."
        onPress={onPressSend}
      />
    </AssetPanel>
  </FloatingPanels>
);

TokenExpandedState.propTypes = {
  onPressSend: PropTypes.func,
  price: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default compose(
  withAccountData,
  withAccountSettings,
  withProps(({
    asset: {
      address,
      name,
      symbol,
      ...asset
    },
    assets,
    nativeCurrencySymbol,
  }) => {
    const selectedAsset = ethereumUtils.getAsset(assets, address);
    return {
      price: get(selectedAsset, 'native.price.display', null),
      subtitle: get(selectedAsset, 'balance.display', symbol),
      title: name,
    };
  }),
  withHandlers({
    onPressSend: ({ navigation, asset: { address } }) => () => {
      navigation.goBack();

      InteractionManager.runAfterInteractions(() => {
        navigation.navigate('SendSheet', { asset: address });
      });
    },
  }),
  onlyUpdateForKeys(['price', 'subtitle']),
)(TokenExpandedState);
