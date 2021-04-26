const NAME = "Photo Editor";

const islib = process.argv.includes("build") && process.argv.includes("lib");
console.log("lib: " + islib);

module.exports = islib
  ? {}
  : {
      publicPath: process.env.NODE_ENV === "production" ? process.env.VUE_APP_PUBLIC_PATH : "/",
      chainWebpack: config => {
        config.plugin("html").tap(args => {
          args[0].title = NAME;
          args[0].description = "A fully functional free online " + NAME;
          return args;
        });
      },
      pwa: {
        name: NAME,
        themeColor: "#00d1b2",
        msTileColor: "#603cba",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black-translucent",
        manifestOptions: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "img/icons/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "img/icons/android-chrome-maskable-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "img/icons/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "img/icons/android-chrome-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        iconPaths: {
          favicon32: "img/icons/favicon-32x32.png",
          favicon16: "img/icons/favicon-16x16.png",
          appleTouchIcon: "img/icons/apple-touch-icon.png",
          maskIcon: "img/icons/safari-pinned-tab.svg",
          msTileImage: "img/icons/mstile-144x144.png",
        },
        // configure the workbox plugin
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
          // swSrc is required in InjectManifest mode.
          swSrc: "./devdocs/workers/service-worker.js",
          // ...other Workbox options...
        },
      },
    };
