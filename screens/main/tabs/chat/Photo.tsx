import * as React from 'react';
import { ImageBackground, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Modal, Portal, useTheme } from 'react-native-paper';
import { H5 } from '../../../../styles/styled-elements';

const PhotoModal = ({ visible, hideModal, imageUrl }) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true);
  return (
    <Portal theme={{ ...theme, colors: { ...theme.colors, backdrop: 'rgba(0,0,0,0.85)' } }}>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}
      >
        <ImageBackground
          style={{
            width,
            height: Math.floor(width / 1.6),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{ uri: imageUrl }}
          resizeMode='contain'
          resizeMethod='scale'
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        >
          <ActivityIndicator size='large' animating={loading} color={theme.colors.primary} />
          {loading ? (
            <H5 style={{ color: 'white', textTransform: 'none', marginTop: 10 }}>
              Loading image, please wait...
            </H5>
          ) : null}
        </ImageBackground>
      </Modal>
    </Portal>
  );
};

export default PhotoModal;
