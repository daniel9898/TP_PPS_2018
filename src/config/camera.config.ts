import { CameraOptions, DestinationType, EncodingType, MediaType } from "@ionic-native/camera";

export const cameraConfig: CameraOptions = {
    quality: 35,
    destinationType: DestinationType.DATA_URL,
    encodingType: EncodingType.JPEG,
    mediaType: MediaType.PICTURE,
    correctOrientation: true
}