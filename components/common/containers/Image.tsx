// Image rendering component
import React, { PropsWithChildren, FC, useState } from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { H5 } from '../../../styles/styled-elements';

type ImageRendererProps = ImageBackgroundProps & {
  loadingText?: string;
};

const ImageRenderer: FC<PropsWithChildren<ImageRendererProps>> = ({
  loadingText = 'Loading image, please wait...',
  style,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  return (
    <ImageBackground
      style={[styles.container, { height: Math.floor(width / 1.6), width }, style]}
      resizeMode='contain'
      resizeMethod='scale'
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
      {...props}
    >
      <ActivityIndicator size='large' animating={loading} color={colors.primary} />
      {loading ? <H5 style={styles.loadingText}>{loadingText}</H5> : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: 'white', textTransform: 'none', marginTop: 10 },
});

export default ImageRenderer;
