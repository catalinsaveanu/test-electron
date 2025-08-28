# test-electron

An Electron 37 app scaffolded with **Electron Forge** and **Vite**.

## 🚀 What it does

- Opens an external website (e.g. https://google.com) in an Electron window.
- Builds installers for macOS (DMG, ZIP) and Windows (EXE).
- Supports auto-updates from GitHub Releases.

## 🛠️ Technology

- [Electron](https://www.electronjs.org/) 37
- [Electron Forge](https://www.electronforge.io/) + makers (DMG, ZIP, Squirrel)
- [Vite](https://vitejs.dev/) for fast bundling
- GitHub Actions for CI/CD

## 📦 Install & Run locally

```bash
git clone https://github.com/catalinsaveanu/test-electron.git
cd test-electron
npm ci
npm start
```

This starts the app in development mode.

## 📤 Deploy (build installers)

On macOS:

```bash
npm run make -- --platform=darwin
```

On Windows:

```bash
npm run make -- --platform=win32 --arch=x64
```

Artifacts appear in `out/make/`.

To publish a release (CI workflow):

1. Bump version in `package.json`
2. Commit the changes `git commit -am "Update to version 1.0.1"`
3. Tag the commit, e.g. `git tag v1.0.1 && git push --tags`
4. GitHub Actions builds and uploads DMG/ZIP/EXE to a GitHub Release.

---

MIT © Catalin Saveanu
