# Windows 打包与商店截图交接

本文件给另一台 **Windows x64** 电脑上的执行者使用。目标是从 Mozart IDE 产品源码构建真实 Windows 应用，准备 Microsoft Store 可接收的 MSIX 包，截取真实 Windows 应用截图，并把可供下一阶段上传的产物交接回来。完成本阶段后提交、推送本次新增的文档和截图；商店草稿的最终填写、上传、送审及官网状态更新由后续任务继续。

## 当前入口与边界（2026-09-28）

- 产品源码在私有产品仓库，根目录包含 `CMakeLists.txt`、`readme.txt`、`src/` 和 `scripts/`；其工作分支为 `dev`。先读产品仓库的 `AGENTS.md`、`readme.txt`、`test-guide.txt` 及所改目录的 `readme.txt`。不要把私有源码复制到本公开仓库。
- 本公开仓库是独立的 `hikariCodeAi/mozart-ide`，分支为 `main`。建议放在 `<产品仓库>/Publish/mozart-ide/`；先读本仓库的 `README.md`、`AGENTS.md`，处理截图前读 `assets/ASSET_MANIFEST.md`。两个仓库分别提交、推送，只暂存本任务文件，保留已有未提交内容。
- [Microsoft Partner Center 中已保留的 Mozart IDE 产品](https://partner.microsoft.com/zh-CN/dashboard/products/9PKDKVFSLW15/overview)已有第 1 次 **MSIX** 提交草稿；目前没有 Windows 包或 Windows 截图上传。该草稿上传栏接受 `.msix`、`.msixbundle`、`.msixupload` 等 MSIX/AppX 格式，不能把 `.exe` 或 macOS `.dmg` 当作此栏的包上传。
- [GitHub v0.1.0 Release](https://github.com/hikariCodeAi/mozart-ide/releases/tag/untagged-6dafa437f7bc8ebbe510)目前仍是草稿，已有一个尚未通过完整发布门禁的 macOS 候选包。不要公开该 Release、替换或删除其现有资产，也不要提前把 `update/latest.json` 改成 `published: true`。

## 1. 构建 Windows 应用

1. 在 Windows 10/11 x64 上同步产品仓库 `dev`，记录准确的源码 commit、`git status`、Windows 版本、MSVC／Windows SDK、CMake、Ninja、Qt 6 版本。检查 `CMakeLists.txt` 的实际版本；当前源码版本为 `0.1.0`。不要用旧 Debug 目录或仅改文件名来冒充发布包。
2. 安装并使用产品构建所需的 MSVC C++ 工具、CMake/Ninja、Qt 6 模块（Core、Gui、Widgets、Network、Svg、Core5Compat、Test）和 Windows SDK。使用产品已有的 `release` preset 构建原生 x64 的 `mozart_ide.exe` 与 `mozart_current_file_search_worker.exe`，确认两者及 Qt 运行库实际可用。
3. 商店包使用 `MOZART_ENABLE_SELF_UPDATE=OFF`：让 Microsoft Store 管理商店包更新，不在包内提供未经配置的 WinSparkle 更新流；**保留 IDE 的编辑、搜索、Git、终端、构建运行等既有功能**。先在未打包 Release 构建上做最小功能检查，再在安装后的 MSIX 上重复检查，以发现封装导致的文件访问、外部工具调用或路径差异。
4. 产品仓库现有 `scripts/package-windows.ps1` 只生成 Inno Setup 7 **EXE**，并且要求更新公钥、WinSparkle；正式模式还要求 Authenticode 证书。它不能直接产出当前商店草稿要上传的 MSIX。为本次商店交付，在产品仓库中新增或调整可复现的 MSIX 打包方式（Visual Studio 包装项目、Windows SDK 工具或其他受维护的方式均可），把必要脚本、清单和资源提交到产品仓库 `dev`；不要只留下一次性的手工点击步骤。
5. 在 Partner Center 的“产品标识”页读取该产品的 **准确、大小写敏感** 的 Package Name 和 Publisher 值，把它们用于 MSIX manifest；不要猜测、改用其他账号的标识，或把账户资料、证书私钥、密码提交到仓库。包目标仅为 **Windows 10/11 Desktop x64**。MSIX 的四段版本须符合商店规则：第一段非零，第四段为 `0`；在交接报告里写清它与应用版本 `0.1.0` 的对应关系。
6. 提供应用图标、显示名称、桌面启动入口、所需语言和实际需要的权限。使用真实文件部署 Qt 依赖及搜索 worker；不要把 Git、ripgrep、Codex 凭据或用户数据打进包。MSIX 安装后要能从开始菜单启动、打开安全演示项目、完成基本操作、正常退出和卸载。

MSIX 提交到商店后由 Microsoft 重签，因此**商店提交不要求购买 CA 代码签名证书**。本机侧载测试仍需适合测试机的签名和信任设置。独立的官网 EXE 下载是另一条发布路径：现有 Inno 脚本正式模式需要 Authenticode 证书及构建时的更新公钥，后续签名更新发布还需对应私钥；没有这些条件时只把 EXE 用作本地 QA，不能把 `-QaUnsigned` 的结果标为正式官网／商店下载，也不要修改官网发布清单。[MSIX 包规则](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/app-package-requirements)；[EXE/MSI 商店规则](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msi/app-package-requirements)。

## 2. 验证并截取真实 Windows 画面

- 在安装的 **同一份 MSIX 候选包** 中运行真实 Mozart IDE，而不是 macOS 版本、设计稿、测试用假界面或网页。用仓库的安全演示项目或临时无隐私项目；不要出现用户名、私人路径、令牌、聊天内容、其他应用窗口或远程桌面水印。截图前检查标题栏、任务栏、通知、菜单和代码内容。
- 商店至少需要 **1 张**截图，建议 **4 张**有区别的 Desktop 截图；每张为 PNG，横屏或竖屏，Desktop 至少 **1366×768**，单张不超过 **50 MB**。优先在 **1920×1080** 的 Windows 桌面上以统一缩放截取应用窗口，画面清晰且没有遮挡；关键界面放在图像上部，勿叠加广告文案或伪造性能数字。商店最多支持 10 张 Desktop 截图；多语言商店一览须分别提供图片，即使重用相同画面。[Microsoft 截图规则](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/screenshots-and-images)。
- 建议拍摄四种已验证的实际界面：① 项目与编辑器；② 全局／工作区搜索；③ Git 变更或差异；④ 终端或构建运行。AI 画面只在确实能用安全夹具展示、且不出现真实账号／对话时再增加。某项功能若没有通过 Windows 包内验证，就不要用截图暗示它可用。
- 把原始、未伪造的商店截图放到本仓库 `assets/screenshots/windows-store/`，建议文件名 `01-editor.png`、`02-search.png`、`03-git.png`、`04-terminal.png`。实际图片到位时同步更新 `assets/ASSET_MANIFEST.md`，逐张写明版本、Windows 包、采集方式和内容。官网轮播若需复用，应另按本仓库的 **1710×1030 / 171:103** 规范制作并登记；商店截图不必强制裁成官网比例。不能为了满足比例裁掉 IDE 的关键区域。

## 3. 交付、提交与接续

1. 在产品仓库执行相关构建／测试；对 MSIX 候选做全新安装、启动、打开安全项目、编辑保存、搜索、Git、终端或构建运行、关闭与卸载的实机检查，并记录成功、失败和未测项。产品仓库 `test-guide.txt` 的发布门禁仍有效；未通过的门禁要如实标记，不能写 PASS。对 MSIX 运行商店适用的包验证或 Windows App Certification Kit，保存原始结果；商店最终认证仍以 Partner Center 的结果为准。
2. 包二进制 **不要 `git add` 到公开源码仓库**。若可访问本产品的 GitHub Release 草稿，可将唯一命名的 Windows MSIX 候选上传到现有 `v0.1.0` **草稿**作为跨电脑交接资产，保持草稿状态，不加 `--clobber`，不替换 macOS 资产。若无法上传草稿，提供后续这台电脑可读取的明确传输位置；仅给出 Windows 本地路径不算完成交接。
3. 在**私有产品仓库**的 `docs/` 下新增 Windows 发布交接结果文档，并按该仓库规则更新目录索引。写明：产品源码 commit、公开仓库 commit、应用版本、MSIX 四段版本、Windows／构建工具版本、产物**草稿资产链接**、文件名、字节数、SHA-256、目标架构、真实截图路径、运行与包验证结果、已知问题、尚需用户提供的支持邮箱／隐私政策 URL 等。仅报告“manifest 标识与 Partner Center 一致”，不要在公开仓库中放测试报告、账号或证书材料。可用 PowerShell `Get-FileHash -Algorithm SHA256` 和 `Get-Item ... | Select-Object Length` 取得校验数据。
4. 只提交本任务涉及的打包源码和交接结果（产品仓库 `dev`）及真实截图、素材清单（公开仓库 `main`），分别推送。不要提交其他人的未提交文件、构建目录、测试报告原始隐私数据、私钥、证书、令牌或个人路径。推送后给出两个仓库的 commit、草稿资产链接和每张截图的仓库路径。
5. 接续任务会拉取两个仓库，重新校验 SHA-256、包身份、真实截图与测试证据，再从商店草稿的“程序包”和“Store 一览”完成上传与填写。任何尚未通过审核的资产均保持草稿；官网 `update/latest.json` 只在真实公开 GitHub Release 与可访问的安装包 URL 通过验证后变更。

商店一览还需要准确的中文／英文产品描述、价格选择、适用地区、年龄分级、支持联系方式及公开隐私政策 URL。这些由后续商店提交阶段核对；不要编造地址、邮箱、隐私政策或性能结论。[商店一览要求](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/add-and-edit-store-listing-info)。
