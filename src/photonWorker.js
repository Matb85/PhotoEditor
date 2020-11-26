let Photon = import("@silvia-odwyer/photon");

async function alterPhoto(msg) {
  const width = msg.data.message.img.width;
  const height = msg.data.message.img.height;
  //console.time("time");
  const img = new Photon.PhotonImage(msg.data.message.img.data, width, height);

  Photon[msg.data.message.func](img, msg.data.message.val);
  const imgdata = msg.data.message.val
    ? Photon.to_image_data(img)
    : msg.data.message.img;
  self.postMessage({
    message: {
      data: imgdata.data,
      width: width,
      height: height,
    },
  });
  //console.timeEnd("time");
}

Photon.then(result => {
  Photon = result;
  console.log(Photon);
  addEventListener("message", data => {
    alterPhoto(data);
  });
});
