import { app, BrowserWindow, shell } from "electron";
import { join } from "node:path";
import { updateElectronApp } from "update-electron-app";
import started from "electron-squirrel-startup";

const isDev = !app.isPackaged;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

updateElectronApp({
  repo: "https://github.com/catalinsaveanu/test-electron",
  updateInterval: "1 hour", // optional
  logger: console, // optional: see update logs in terminal
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Remote content: keep nodeIntegration off, isolation on
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
      devTools: true,
    },
  });

  // Load your external site
  win.loadURL("https://google.com");

  // Open target="_blank" links in the user’s default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    // allow same-origin popups if you want; here we send all else to the OS browser
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (isDev) win.webContents.openDevTools({ mode: "detach" });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
