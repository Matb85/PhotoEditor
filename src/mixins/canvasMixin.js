export default {
  methods: {
    async canFil(func, val) {
      if (!val) val = [0, 0, 0, 0, 0, 0, 0, 0];
      if(typeof val == Number)
      console.log(`
      opacity(${1 + val[0]}) 
      brightness(${1 + val[1]}) 
      hue-rotate(${val[2]}deg) 
      saturate(${1 + val[3]})
      contrast(${1 + val[4]}) 
      invert(${val[5]}) 
      sepia(${val[6]}) 
      grayscale(${val[7]}%)`);

      this.canvas.style.filter = `
      opacity(${1 + val[0]}) 
      brightness(${1 + val[1]}) 
      hue-rotate(${val[2]}deg) 
      saturate(${1 + val[3]})
      contrast(${1 + val[4]}) 
      invert(${val[5]}) 
      sepia(${val[6]}) 
      grayscale(${val[7]}%)`;
    },
  },
};
