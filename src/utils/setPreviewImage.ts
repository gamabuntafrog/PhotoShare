import {Dispatch} from "react";

export default function setPreviewImage(fileList: FileList, hook: Dispatch<string>) {
    if (!fileList || fileList && fileList.length < 1) return

    const imageFile = fileList[0]

    const setPreview = () => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const {result} = e.target as FileReader
            if (result) {
                hook(result as string)
            }
        }
        fileReader.readAsDataURL(imageFile);
    }

    setPreview()
}