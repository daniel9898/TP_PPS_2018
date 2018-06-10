import { CameraOptions } from "@ionic-native/camera";

export const cameraConfig: CameraOptions = {
    quality: 35,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
}