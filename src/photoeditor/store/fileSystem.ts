const readFile = (file: File, save = true) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (save) {
        try {
          sessionStorage.removeItem('originalsrc');
          sessionStorage.setItem('originalsrc', reader.result as string);
        } catch (e) {
          alert(
            'Unfortunately We could not save your image to the File System - you can still use Photo Editor, but if you reload the page your progress will be lost',
          );
        }
      }
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });

export async function saveFile(file: File): Promise<string> {
  let storageRoot: FileSystemDirectoryHandle;
  try {
    storageRoot = await navigator.storage.getDirectory();
    // Create an empty (zero-byte) file:
    const FSfile = await storageRoot.getFileHandle('file', { create: true });

    // Open the file as a writable stream ( FileSystemWritableFileStream ):
    const wtr = await FSfile.createWritable();

    // Then write the Blob object directly:
    await wtr.write(file);
    // And safely close the file stream writer:
    await wtr.close();
    return await readFile(file, false);
  } catch (err) {
    console.error(err);
    try {
      return await readFile(file, true);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export async function loadFile(): Promise<string> {
  try {
    const storageRoot = await navigator.storage.getDirectory();
    const savedFile = await storageRoot.getFileHandle('file'); // Surprisingly there isn't a "fileExists()" function: instead you need to iterate over all files, which is odd... https://wicg.github.io/file-system-access/
    // Get the `savedFile` as a DOM `File` object (as opposed to a `FileSystemFileHandle` object):
    const src = await readFile(await savedFile.getFile(), false);
    return savedFile['createWritable'] ? src : sessionStorage.getItem('originalsrc') || '';
  } catch (err) {
    console.error(err);
    return sessionStorage.getItem('originalsrc') || '';
  }
}
