export default {
  data() {
    const workers = [];
    for (let i = 0; i < 3; i++) {
      const worker = new Worker("../photonWorker.js", { type: "module" });
      const send = message =>
        worker.postMessage({
          message,
        });
      worker.addEventListener("message", event => {
        this.queue.splice(0, 1);
        this.ctx.putImageData(
          new ImageData(event.data.message.data, event.data.message.width, event.data.message.height),
          0,
          0
        );
      });
      workers.push({
        worker: worker,
        send: send,
      });
    }
    return {
      workers,
      image: "",
      curworker: 0,
      queue: [],
    };
  },
  methods: {
    async photon(func, val) {
      this.queue.unshift(val);
      if (this.queue.length > 7) {
        this.queue.splice(1, 1);
        this.queue.splice(3, 1);
        this.queue.splice(5, 1);
      }
      //console.log(this.queue);
      if (this.curworker > 2) this.curworker = 0;
      this.workers[this.curworker].send({
        img: this.image,
        func: func,
        val: this.queue[0],
      });
      this.curworker++;
    },
    async savechange(option) {
      this.image = this.ctx.getImageData(0, 0, 630, 420);
      this.drawImage();
      this.$store.commit("updateHistory", {
        id: this.$store.state.history.length,
        name: option.name,
        func: option.func,
        val: option.val,
      });
    },
  },
};
