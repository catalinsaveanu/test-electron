const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

const path = require("path");

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.resolve(__dirname, "assets/icon"), // icon.icns (mac) / icon.ico (win) without extension

    // mac distribution? uncomment & configure (required for mac auto-update to work well in the wild):
    // osxSign: {},
    // osxNotarize: { tool: 'notarytool', keychainProfile: 'my-notary-profile' },
  },
  rebuildConfig: {},
  makers: [
    // mac installers
    { name: "@electron-forge/maker-dmg", platforms: ["darwin"] },
    { name: "@electron-forge/maker-zip", platforms: ["darwin"] },

    // windows installer (Squirrel)
    { name: "@electron-forge/maker-squirrel", platforms: ["win32"] },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main.js",
            config: "vite.main.config.mjs",
            target: "main",
          },
          {
            entry: "src/preload.js",
            config: "vite.preload.config.mjs",
            target: "preload",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.config.mjs",
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    // publish built artifacts to GitHub Releases in THIS repo
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: { owner: "catalinsaveanu", name: "test-electron" },
        draft: false,
        prerelease: false,
      },
    },
  ],
};
