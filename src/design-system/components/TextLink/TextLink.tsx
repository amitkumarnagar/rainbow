import React, { ReactNode, useCallback } from 'react';
import { Linking, Text as NativeText, TextStyle } from 'react-native';

const style: TextStyle = {
  textDecorationLine: 'underline',
};

export interface TextLinkProps {
  url: string;
  children: ReactNode;
}

/**
 * @description Renders a plain, static text link, designed to be used within a
 * block of text.
 */
export function TextLink({ children, url }: TextLinkProps) {
  return (
    <NativeText
      onPress={useCallback(() => Linking.openURL(url), [url])}
      style={style}
    >
      {children}
    </NativeText>
  );
}
