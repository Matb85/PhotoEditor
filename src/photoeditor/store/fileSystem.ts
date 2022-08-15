const readFile = (file: File, save = true) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (save) sessionStorage.setItem('originalsrc', reader.result as string);
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });

export async function saveFile(file: File): Promise<string> {
  let storageRoot: FileSystemDirectoryHandle;
  try {
    storageRoot = await navigator.storage.getDirectory();
  } catch (err) {
    console.error(err);
    try {
      return await readFile(file);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  // Create an empty (zero-byte) file in a new subdirectory: "art/file.png":
  const OPFSfile = await storageRoot.getFileHandle('file', { create: true });

  // Open the `file.png` file as a writable stream ( FileSystemWritableFileStream ):
  //eslint-disable-next-line
  // @ts-ignore
  const wtr = await OPFSfile.createWritable();
  try {
    // Then write the Blob object directly:
    await wtr.write(file);
  } finally {
    // And safely close the file stream writer:
    await wtr.close();
  }
  return await readFile(file, false);
}

export async function loadFile(): Promise<string> {
  let storageRoot: FileSystemDirectoryHandle;
  try {
    storageRoot = await navigator.storage.getDirectory();
  } catch (err) {
    console.error(err);
    return sessionStorage.getItem('originalsrc') as string;
  }
  const savedFile = await storageRoot.getFileHandle('file'); // Surprisingly there isn't a "fileExists()" function: instead you need to iterate over all files, which is odd... https://wicg.github.io/file-system-access/

  // Get the `savedFile` as a DOM `File` object (as opposed to a `FileSystemFileHandle` object):
  return await readFile(await savedFile.getFile(), false);
}
