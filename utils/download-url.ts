import {
  getDownloadURL as doGetDownloadURL,
  getStorage,
  ref,
} from "@firebase/storage"

export async function getDownloadURL(filePath: string) {
  const storage = getStorage()
  const pathRef = ref(storage, filePath)
  return await doGetDownloadURL(pathRef)
}
