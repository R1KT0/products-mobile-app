import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';

import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';


export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [selectedImage, setSelectedImage] = useState<string>();


  const cameraRef = useRef<CameraView>(null);

    const onRequestPermissions = async () => {
        
        try {
            const {status: cameraPermissionStatus} = await requestCameraPermission();

            if (cameraPermissionStatus !== 'granted') Alert.alert('Lo sentimos', 'Necesitamos permiso a la camara para tomar fotos')

            const {status: mediaPermissionStatus} = await requestCameraPermission();

            if (mediaPermissionStatus !== 'granted') Alert.alert('Lo sentimos', 'Necesitamos permisos a la galeria para guardar las imagenes')

        

        } catch (error) {
            Alert.alert("Error", 'Algo salio mal los permisos')            
        }
    }


  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos permiso para usar la camara y la galeria</Text>
        <TouchableOpacity
        onPress={onRequestPermissions}
        >
          <ThemedText type="subtitle">Solicitar permiso</ThemedText>
        </TouchableOpacity>
        {/* <Button onPress={onRequestPermissions} title="grant permission" /> */}
      </View>
    );
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
        quality: 0.7,
    });

    if (!picture?.uri) return;

    setSelectedImage(picture.uri);

    // TODO: guardar imagen
  }


  const onReturnCancel = () => {
    // TODO: limpiar el estado

    router.dismiss();
  }


  const onPictureAccepted = async () => {
    // TODO: implementar funcion
    if (selectedImage) await MediaLibrary.createAssetAsync(selectedImage);
    console.log('onPictureAccepted');


    router.dismiss();
    
  }


  const onRetakePhoto = () => setSelectedImage(undefined);
  


  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if (selectedImage) {
    return (

        <View style={styles.container}>

                <Image
                    source={{uri: selectedImage}}
                    style={styles.camera}
                />

                <ConfirmImageButton onPress={onPictureAccepted}/>

                <RetakeImageButton onPress={onRetakePhoto}/>

                <ReturnCancelButton
                    onPress={onReturnCancel}
                />
        </View>
      )
  }


  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

        {/* Boton de captura */}
        <ShutterButton 
            onPress={onShutterButtonPress}
        />

        <FlipCameraButton 
            onPress={toggleCameraFacing}
        />

        <GalleryButton/>



        <ReturnCancelButton
            onPress={onReturnCancel}
        />



        {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity> */}
    </View>
  );
}


// Custom components
const ShutterButton = ({ onPress = () => {} }) => {

    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({}, 'primary')

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimensions.width / 2 - 32,
                    borderColor: primaryColor
                }
            ]}
        >

        </TouchableOpacity>
    )
}

const ConfirmImageButton = ({ onPress = () => {} }) => {

    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({}, 'primary')

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimensions.width / 2 - 32,
                    borderColor: primaryColor
                }
            ]}
        >
            <Ionicons
                name="checkmark-outline"
                size={30}
                color={primaryColor}
            />
        </TouchableOpacity>
    )
}

const FlipCameraButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.flipCameraButton}
        >
            <Ionicons
                name="camera-reverse-outline"
                size={30}
                color="white"
            />
        </TouchableOpacity>
    )
}

const ReturnCancelButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.returnCancelButton}
        >
            <Ionicons
                name="arrow-back-outline"
                size={30}
                color="white"
            />
        </TouchableOpacity>
    )
}


const GalleryButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.galleryButton}
        >
            <Ionicons
                name="images-outline"
                size={30}
                color="white"
            />
        </TouchableOpacity>
    )
}


const RetakeImageButton = ({onPress = () => {}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.flipCameraButton}
        >
            <Ionicons
                name="close-outline"
                size={30}
                color="white"
            />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  
    shutterButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'white',
      borderColor: 'red',
      borderWidth: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    flipCameraButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: '#17202A',
      position: 'absolute',
      bottom: 40,
      right: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    galleryButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: '#17202A',
      position: 'absolute',
      bottom: 40,
      left: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    returnCancelButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: '#17202A',
      position: 'absolute',
      top: 40,
      left: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });