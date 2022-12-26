const convertImageToString = async (imageList: FileList): Promise<string> => {
    const imagePromise: Promise<string> = new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const {result} = e.target as FileReader
            if (result) {
                // console.log(result)
                resolve(result as string)
            }
        }

        fileReader.readAsDataURL(imageList[0]);
    })
    return imagePromise
}

export default convertImageToString