# Mozart IDE public website and releases

This repository hosts the [Mozart IDE homepage](https://hikaricodeai.github.io/mozart-ide/), public release notes, and update metadata. The product source code remains in the private development repository.

本仓库用于维护 [Mozart IDE 官网](https://hikaricodeai.github.io/mozart-ide/)、公开版本说明和更新清单；IDE 产品源码仍保存在私有开发仓库中。

## Repository and cloning / 仓库地址与下载

Public repository / 公开仓库：[hikariCodeAi/mozart-ide](https://github.com/hikariCodeAi/mozart-ide)

To keep the same directory layout on another computer, run these commands from the product repository root (the directory containing `readme.txt` and `src/`) / 要在另一台电脑上保持相同目录结构，请先进入产品主仓库根目录（包含 `readme.txt` 和 `src/` 的目录），再执行：

```bash
mkdir -p Publish
git clone https://github.com/hikariCodeAi/mozart-ide.git Publish/mozart-ide
cd Publish/mozart-ide
```

The resulting path is `<product repository root>/Publish/mozart-ide/`, matching this computer. The publishing project is an independent Git repository on its own `main` branch. The parent product repository ignores `Publish/`, so cloning the parent alone does not download this project. See [Local development](#local-development--本地开发) below to preview the website.

克隆后的路径是`<产品主仓库根目录>/Publish/mozart-ide/`，与当前电脑一致。发布项目是独立 Git 仓库，使用自己的 `main` 分支。主仓库忽略 `Publish/`，因此只克隆主仓库不会自动下载此项目。本地预览步骤见下方[本地开发](#local-development--本地开发)。

Cloning downloads the website files, release notes, and update metadata. To install Mozart IDE itself, download an installer from [GitHub Releases](https://github.com/hikariCodeAi/mozart-ide/releases).

克隆得到官网文件、版本说明和更新清单。若要安装 Mozart IDE 应用，请从 [GitHub Releases](https://github.com/hikariCodeAi/mozart-ide/releases) 下载安装包。

## Architecture / 项目架构

The website is a static GitHub Pages project with no build step or backend:

- `index.html` — semantic page structure and accessible controls.
- `styles.css` — visual system, responsive layout, and motion preferences.
- `app.js` — Vue 2 state, bilingual copy, carousel behavior, and release-state loading.
- `DESIGN_GUIDE.md` — shared typography, color, spacing, control, icon, and motion rules.
- `assets/` — approved brand artwork, layered hero artwork, and real product screenshots.
- `update/latest.json` — the single source of truth for download availability.
- `update/appcast-macos-arm64.xml` and `update/appcast-windows-x64.xml` — reserved for optional signed automatic-update feeds. macOS direct downloads do not publish an appcast.
- `release-notes/` — notes for verified public releases.
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow.

Vue 2.7.16 and Tailwind CSS Browser v4 are loaded from pinned jsDelivr URLs. There is no `package.json`, bundler, application server, database, PM2 process, SSH deployment, or server password in this repository.

The website targets desktop users learning about Mozart IDE and downloading the desktop application. H5, phone, tablet, and touch-specific adaptation are outside the scope of implementation and validation unless explicitly requested.

The performance carousel slot uses an interactive HTML comparison with six user-supplied measurements. Its rationale appears on hover, keyboard focus, or click; the detail view enlarges the comparison. Global-search P95 is omitted pending actual measurement.

The five feature slides advance vertically every 8 seconds. Each image slide has two horizontal screenshot slots that advance every 4 seconds; both slots currently reference the same approved capture until a second real screenshot is available. The performance comparison remains an interactive HTML slide. Manual arrows and keyboard navigation work in both directions.

The right control rail uses larger labels and a scrolling list with four visible slots for five chapters. The selected chapter scrolls into view vertically within the desktop rail. Antique-gold dividers and a countdown scale accompany a cyan pointer; remaining tenths, pointer, and slide transition share the same 8-second clock. Pointer hover and clicks do not stop autoplay. Keyboard focus, a hidden page, an open detail dialog, or explicit pause freezes both carousel levels; resume works while the button retains focus. Reduced-motion preferences disable autoplay by default but allow explicit playback with transitions still suppressed. The rail has no visible “自动播放 / Autoplay” caption. Its width, screenshot geometry, and single-screen desktop layout remain unchanged. CSS and JavaScript URLs carry a version suffix so published control changes do not reuse stale cached files.

## Local development / 本地开发

Run a static HTTP server from the repository root:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/`. Opening `index.html` directly is not supported because the page fetches `update/latest.json`.

Before changing the homepage, read `AGENTS.md` and `assets/ASSET_MANIFEST.md`. Use real Mozart IDE screenshots and keep all visible copy and controls in HTML/CSS; design composites are reference material only.

## Verification / 验证

Check these viewports after visible changes:

- `1920×1080`, `1440×900`, `1280×720`

Desktop layouts must fit within `100svh`. Verify both languages, all five feature slides and their image slots, mouse and keyboard navigation, pause/autoplay, persisted language, and reduced-motion behavior. Do not run H5, phone, or tablet adaptation checks.

Basic source checks:

```bash
node --check app.js
python3 -m json.tool update/latest.json >/dev/null
git diff --check
```

## Release truth / 发布真实性

Each platform can be published independently. A downloadable manifest uses a stable `X.Y.Z` version and at least one real GitHub Release asset, including platform, architecture, byte size, and SHA-256. Only set `published: true` after the public Release and its actual installer URL have been verified. Never publish placeholder links, fabricated checksums, signatures, or performance numbers.

macOS is distributed as a direct-download `macos/arm64` DMG, without requiring an Apple developer account, Developer ID signing, notarization, or a Windows package. This package uses an ad-hoc integrity signature and keeps `MOZART_ENABLE_SELF_UPDATE=OFF`; users update by downloading and installing the next DMG. It does not contain an automatic-update feed or fabricated Ed25519 signature. This distribution choice preserves the IDE's existing features.

The homepage selects a verified asset for the visitor's desktop platform. If that platform has no installer yet, the action opens GitHub Releases as “查看安装包 / View downloads” rather than downloading a different platform's package. An unavailable or invalid manifest still displays “即将发布 / Coming soon”.

A manual-download asset records `updateEnabled: false` and `edSignature: null`. Signed automatic-update assets, when configured, must include a real Ed25519 signature and a matching signed appcast; these are not prerequisites for macOS direct downloads.

## Windows publishing / Windows 发布准备

在另一台 Windows 电脑上打包、验证、截取 Microsoft Store 截图并交接产物时，按 [Windows 打包与商店截图交接](docs/WINDOWS_RELEASE_HANDOFF.md) 执行。当前商店草稿采用 MSIX 路线；产品仓库现有 `package-windows.ps1` 生成的 Inno EXE 不能直接上传到该草稿的 MSIX 程序包栏。

For the current website/GitHub distribution, provide:

- A Windows 10/11 x64 build machine and its source/build paths, or an existing native x64 installer. The build requires MSVC C++ tools, CMake/Ninja, Qt 6 (Core, Gui, Widgets, Network, Svg, Core5Compat and Test), and Inno Setup 7.
- The release version and supported Windows versions.
- Whether Authenticode signing is available. If available, provide the certificate thumbprint or signing-provider configuration location; keep passwords and private keys out of chat and Git.

Uploading a Windows installer to GitHub Releases does not require a Microsoft Store developer account. Unsigned downloads can show Windows security prompts; code signing should be configured for normal public distribution. See [Microsoft's signing options](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/code-signing-options).

The Microsoft Store now has a reserved Mozart IDE product and an MSIX submission draft. Follow the [Windows handoff](docs/WINDOWS_RELEASE_HANDOFF.md) to build and capture the actual Windows app; the Store listing still needs a price choice, support contact, and public privacy-policy URL. Do not commit account passwords, verification codes, identity documents, or signing keys.

## Deployment / 部署

Pushing website changes to `origin/main` automatically deploys GitHub Pages through `.github/workflows/pages.yml`; no server credentials or manual file synchronization are required.

Production URL: https://hikaricodeai.github.io/mozart-ide/
