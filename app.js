(() => {
  "use strict";

  const SLIDE_DURATION = 8000;
  const TRANSITION_DURATION = 440;
  const RELEASES_URL = "https://github.com/hikariCodeAi/mozart-ide/releases";
  const PERFORMANCE_METRICS = [
    {
      values: ["180 ms", "240 ms", "1,450 ms", "4,200 ms"],
      zh: { name: "冷启动就绪", reason: "纯 C++ 原生启动，减少运行时初始化的等待。" },
      en: { name: "Cold start", reason: "Native C++ startup reduces runtime initialization work." },
    },
    {
      values: ["68 MB", "95 MB", "380 MB", "1,250 MB"],
      zh: { name: "初始空闲内存", reason: "紧凑对象布局与按需加载，减少空闲时的常驻占用。" },
      en: { name: "Idle memory", reason: "Compact data structures and on-demand loading reduce resident memory at idle." },
    },
    {
      values: ["165 MB", "240 MB", "980 MB", "2,850 MB"],
      zh: { name: "100 万行项目常驻内存", shortName: "百万行项目内存", reason: "按需索引与可控的内存生命周期，降低大型项目的常驻占用。" },
      en: { name: "1M-line project memory", shortName: "1M-line memory", reason: "On-demand indexing and controlled memory lifecycles limit large-project residency." },
    },
    {
      values: ["1.8 ms", "3.5 ms", "18.2 ms", "36.5 ms"],
      zh: { name: "击键到屏幕首帧延迟 P99", shortName: "击键到屏幕 P99", reason: "原生 GPU 绘制让输入后的界面更新更直接。" },
      en: { name: "Key-to-screen P99", reason: "Native GPU drawing shortens the path from input to the next frame." },
    },
    {
      values: ["0.0 ms", "0.0 ms", "≈42 ms", "≈260 ms"],
      zh: { name: "垃圾回收停顿", reason: "C++ 显式管理对象生命周期，不依赖周期性的垃圾回收。" },
      en: { name: "GC pauses", reason: "Explicit C++ object lifecycles avoid periodic garbage collection." },
    },
    {
      values: ["42 ms", "85 ms", "720 ms", "2,100 ms"],
      zh: { name: "50 MB 加载与语法树", shortName: "50 MB 加载+语法树", reason: "流式分块解析，避免一次性处理整份大文件。" },
      en: { name: "50 MB load and syntax tree", shortName: "50 MB load + AST", reason: "Streaming, chunked parsing avoids processing the whole large file at once." },
    },
  ];

  const TRANSLATIONS = {
    zh: {
      meta: {
        title: "Mozart IDE — 代码由 Agent 批量生产，审查由特种兵一枪毙命",
        description: "Mozart IDE：告别 4GB 内存巨婴。纯 C++ 底层锻造，专为现代代码审判而生的原生 IDE 与官方 Agent 宿主。",
      },
      ui: {
        skip: "跳到主要内容",
        headerLabel: "网站页眉",
        brandHome: "返回 Mozart IDE 首页",
        navLabel: "主要导航",
        navItems: ["前言", "性能", "Agent", "审查", "好用"],
        languageLabel: "选择语言",
        download: "下载 Mozart",
        comingSoon: "即将发布",
        releases: "前往 GitHub Releases",
        carousel: "轮播",
        carouselLabel: "Mozart IDE 核心能力",
        capabilities: "当前能力",
        previous: "上一张",
        next: "下一张",
        pause: "暂停自动播放",
        play: "继续自动播放",
        slideNavigation: "选择能力页面",
        evidenceLabel: "性能证据项目",
        evidencePending: "性能证据将在真实测量后公开",
        noFabrication: "不生成虚假 IDE 界面，不编造性能数字。",
        performanceLabel: "四款编辑器的用户提供实测性能对比",
        performanceMeasured: "实测",
        closePerformance: "关闭性能对比",
        performanceBrands: [
          { name: "Mozart IDE", stack: "纯 C++" },
          { name: "Zed", stack: "Rust" },
          { name: "VS Code", stack: "Electron" },
          { name: "WebStorm", stack: "JVM" },
        ],
        status: (index, title) => `第 ${index} 张，共 5 张：${title}`,
        evidence: [
          { label: "冷启动", icon: "ϟ" },
          { label: "内存 RSS", icon: "▦" },
          { label: "大文件加载", icon: "⌕" },
          { label: "用户实测", icon: "▥" },
        ],
      },
      slides: [
        {
          eyebrow: "00 / 前言 WHY MOZART",
          headline: "专为掌舵 AI 的次世代 IDE。",
          body: "JetBrains、VS Code 这种业界标杆的代码编辑器已珠玉在前，为什么我们还要重新发明轮子？因为在 AI 时代，人类逐渐告别手工编写代码，核心职责已从生产代码转变为代码的掌舵员。因此，我们以极致的代码审阅体验为第一优先级，大幅优化速度与内存控制，精简冗余并便利各类查阅面板。以 Mozart 为名，致敬所有将代码作品视为艺术、创造卓越体验的人类工程师，为您精心献上我们雕琢的 IDE 生产力工具。",
          memory: "“将美好奉献于你，是我们做这一切的初心。”",
          chips: ["审阅优先", "性能优先", "AI 优先"],
          cta: "探索 Mozart",
          tab: "前言",
          image: "assets/screenshots/performance-evidence-1710x1030.png",
          alt: "Mozart IDE 真实工作区全貌与代码界面截图",
        },
        {
          eyebrow: "01 / 系统级原生动力",
          headline: "以原生 C++，换回直接响应。",
          body: "六项用户提供的实测数据，覆盖启动、内存、输入延迟、垃圾回收与大文件加载。悬停或点按任一行，查看背后的设计原因。",
          memory: "每一个数字，都可以复测。",
          chips: ["原生 C++", "按需索引", "GPU 绘制", "显式内存"],
          cta: "放大查看数据",
          tab: "系统性能",
          image: null,
          alt: "Mozart IDE、Zed、VS Code 和 WebStorm 的六项用户提供实测性能对比",
        },
        {
          eyebrow: "02 / 原厂 Harness 架构",
          headline: "直通第一梯队：官方 CLI 级严密调度。",
          body: "摒弃浅层交互包装。Mozart 构建了专业的系统级 Harness，精准承载 OpenAI、Claude Code、Gemini 等官方原生命令行。提供原汁原味的指令执行、环境隔离与上下文注入，让原厂前沿能力毫无保留地落地为实际产出。",
          memory: "“不做功能阉割的壳，只做最坚固的原生执行宿主。”",
          chips: ["官方 CLI 调度", "隔离环境运行", "零损耗 Harness", "全功能透传"],
          cta: "探索 Agent 套件",
          tab: "官方宿主",
          image: "assets/screenshots/official-agent-cli-1710x1030.png",
          alt: "Mozart IDE 中的官方 Agent CLI 工作流真实截图",
        },
        {
          eyebrow: "03 / 专业级 Diff 与裁决",
          headline: "严谨终审视窗，全盘承袭专业手感。​",
          body: "告别低效的零散修改，进入结构化的代码审阅阶段。Mozart 深度优化双栏 Diff 与语法 AST 语义对齐，并 1:1 完整保留 JetBrains 快捷键操作惯性。多年淬炼的击键手感与肌肉记忆在此无缝衔接，助你以最高敏锐度完成每一次合并决策。",
          memory: "“手感无需重新学习，审查效率迎来量级飞跃。”",
          chips: ["双栏毫秒 Diff", "JetBrains 键位全兼容", "语法语义对齐", "高效审阅流"],
          cta: "查看审阅视窗",
          tab: "专业审查",
          image: "assets/screenshots/review-diff-1710x1030.png",
          alt: "Mozart IDE 代码 Diff 终审界面真实截图",
        },
        {
          eyebrow: "04 / 真实程序员体验",
          headline: "让你的每一次注意力分配，都得到尊重。",
          body: "做加法容易，更需要懂得做减法，珍惜开发者的视觉注意力。我们调研了大量程序员问卷，把高频、直截了当的核心功能移至第一视野，将低频、冗余的功能果断移除或收拢至深层入口。具体体现在：项目的快速选择与切换、终端独立执行、项目状态记忆、Git 操控与自动配置加载。",
          memory: "“好用，源自精心的雕琢、取舍与平衡。”",
          chips: ["便捷直达", "GPU 细腻交互", "克制减法", "专注高效"],
          cta: "品鉴交互细节",
          tab: "好看更好用",
          image: "assets/screenshots/git-command-center-1710x1030.png",
          alt: "Mozart IDE 项目管理、终端与 Git 工作区真实截图",
        },
      ],
    },
    en: {
      meta: {
        title: "Mozart IDE — Built for the Agent era",
        description: "Mozart IDE is a native C++ development and final-review workspace for the Agent era.",
      },
      ui: {
        skip: "Skip to main content",
        headerLabel: "Site header",
        brandHome: "Back to the Mozart IDE home page",
        navLabel: "Primary navigation",
        navItems: ["Prologue", "Performance", "Agents", "Review", "Experience"],
        languageLabel: "Choose language",
        download: "Download Mozart",
        comingSoon: "Coming soon",
        releases: "Open GitHub Releases",
        carousel: "carousel",
        carouselLabel: "Mozart IDE core capabilities",
        capabilities: "Current capabilities",
        previous: "Previous slide",
        next: "Next slide",
        pause: "Pause autoplay",
        play: "Resume autoplay",
        slideNavigation: "Choose a capability slide",
        evidenceLabel: "Performance evidence categories",
        evidencePending: "Performance evidence will be published after real measurement",
        noFabrication: "No synthetic IDE screen. No invented performance numbers.",
        performanceLabel: "User-supplied measurements comparing four editors",
        performanceMeasured: "Measured",
        closePerformance: "Close performance comparison",
        performanceBrands: [
          { name: "Mozart IDE", stack: "Native C++" },
          { name: "Zed", stack: "Rust" },
          { name: "VS Code", stack: "Electron" },
          { name: "WebStorm", stack: "JVM" },
        ],
        status: (index, title) => `Slide ${index} of 5: ${title}`,
        evidence: [
          { label: "Cold start", icon: "ϟ" },
          { label: "Memory RSS", icon: "▦" },
          { label: "Large-file load", icon: "⌕" },
          { label: "User measurements", icon: "▥" },
        ],
      },
      slides: [
        {
          eyebrow: "00 / PROLOGUE WHY MOZART",
          headline: "A Next-Gen IDE Built to Helm AI.",
          body: "Industry standards like JetBrains and VS Code have set high benchmarks. Why reinvent the wheel? In the AI era, software engineering is moving away from manual line-by-line typing; human responsibility has shifted from writing code to serving as the helm and judge of generated code. We prioritize a ruthless review experience—optimizing speed, controlling memory, and stripping away redundant clutter. Named after Mozart, we dedicate this crafted instrument to engineers who see code as art and strive for extraordinary experience.",
          memory: "“Dedicating beauty and excellence to you is our original aspiration.”",
          chips: ["Review First", "Performance First", "AI First"],
          cta: "Explore Mozart",
          tab: "Prologue",
          image: "assets/screenshots/performance-evidence-1710x1030.png",
          alt: "Mozart IDE workspace overview capture",
        },
        {
          eyebrow: "01 / SYSTEM-LEVEL NATIVE POWER",
          headline: "Native C++. Direct response.",
          body: "Six user-supplied measurements cover startup, memory, input latency, garbage collection, and large-file loading. Hover or tap a row to see the design behind it.",
          memory: "Every number can be measured again.",
          chips: ["Native C++", "On-demand Index", "GPU Drawing", "Explicit Memory"],
          cta: "Enlarge comparison",
          tab: "Performance",
          image: null,
          alt: "Six user-supplied measurements comparing Mozart IDE, Zed, VS Code, and WebStorm",
        },
        {
          eyebrow: "02 / OFFICIAL AGENT HARNESS",
          headline: "Direct to Tier 1: Rigorous official CLI orchestration.",
          body: "Reject superficial wrapper interfaces. Mozart builds a professional, system-level Harness that precisely hosts first-party CLIs from OpenAI, Claude Code, and Gemini. It delivers authentic command execution, process isolation, and context injection—unleashing frontier model capabilities into tangible output without compromise.",
          memory: "“Not a stripped-down wrapper. Just the strongest native execution host.”",
          chips: ["Official CLI Dispatch", "Isolated Environment", "Zero-Loss Harness", "Full Passthrough"],
          cta: "Explore the Agent workflow",
          tab: "Official Host",
          image: "assets/screenshots/official-agent-cli-1710x1030.png",
          alt: "A real Mozart IDE capture showing the official Agent CLI workflow",
        },
        {
          eyebrow: "03 / SURGICAL CODE REVIEW",
          headline: "A rigorous review viewport inheriting professional muscle memory.",
          body: "Move past inefficient piecemeal edits into structured code judgment. Mozart deeply optimizes two-pane diffs and AST semantic alignment while faithfully preserving 100% of JetBrains keyboard shortcuts. Years of refined keystroke reflexes and muscle memory carry over seamlessly, empowering decisive merges with surgical precision.",
          memory: "“No relearning needed. Code review efficiency takes a quantum leap.”",
          chips: ["Sub-ms Dual Diff", "JetBrains Keymap", "AST Semantic Align", "Review Pipeline"],
          cta: "Explore Review",
          tab: "Code Review",
          image: "assets/screenshots/review-diff-1710x1030.png",
          alt: "A real Mozart IDE capture showing the final code-diff review surface",
        },
        {
          eyebrow: "04 / REAL DEVELOPER EXPERIENCE",
          headline: "Every slice of your attention is respected.",
          body: "Adding features is easy; knowing what to subtract is craftsmanship that protects your focus. Based on developer surveys, we brought high-frequency essentials directly into your line of sight while removing or deeply tucking away rare, cluttered functions. Experience it in quick project switching, isolated terminal execution, workspace state memory, Git operations, and automatic configuration loading.",
          memory: "“Great usability is born of thoughtful craftsmanship, sacrifice, and balance.”",
          chips: ["Direct & Fast", "Subtle GPU Motion", "Focused Subtraction", "High Efficiency"],
          cta: "Inspect Craftsmanship",
          tab: "Experience",
          image: "assets/screenshots/git-command-center-1710x1030.png",
          alt: "A real Mozart IDE capture showing Git history and a multi-project command workspace",
        },
      ],
    },
  };

  const storedLocale = (() => {
    try {
      return window.localStorage.getItem("mozart-locale");
    } catch (_) {
      return null;
    }
  })();

  const initialLocale = storedLocale === "zh" || storedLocale === "en"
    ? storedLocale
    : (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";

  new Vue({
    el: "#app",
    data: {
      locale: initialLocale,
      currentIndex: 0,
      elapsed: 0,
      lastFrame: 0,
      animationFrame: 0,
      explicitPaused: false,
      pointerInside: false,
      focusInside: false,
      documentHidden: document.hidden,
      reducedMotion: false,
      transitioning: false,
      transitionTimer: 0,
      touchStart: null,
      hoveredMetricIndex: null,
      focusedMetricIndex: null,
      pinnedMetricIndex: null,
      performanceDialogOpen: false,
      failedImages: {},
      release: {
        available: false,
        url: RELEASES_URL,
      },
    },
    computed: {
      dictionary() { return TRANSLATIONS[this.locale]; },
      ui() { return this.dictionary.ui; },
      slides() { return this.dictionary.slides; },
      activeSlide() { return this.slides[this.currentIndex]; },
      performanceMetrics() {
        return PERFORMANCE_METRICS.map((metric) => ({
          values: metric.values,
          name: metric[this.locale].name,
          shortName: metric[this.locale].shortName || metric[this.locale].name,
          reason: metric[this.locale].reason,
        }));
      },
      activeMetricIndex() {
        return this.hoveredMetricIndex ?? this.focusedMetricIndex ?? this.pinnedMetricIndex;
      },
      activeMetric() {
        return this.activeMetricIndex === null ? null : this.performanceMetrics[this.activeMetricIndex];
      },
      headlineParts() {
        const parts = this.activeSlide.headline.match(/[^。！？.!?]+[。！？.!?]?/g) || [this.activeSlide.headline];
        return parts.map((part) => part.trim()).filter(Boolean);
      },
      nextSlide() { return this.slides[(this.currentIndex + 1) % this.slides.length]; },
      progressRatio() { return Math.min(this.elapsed / SLIDE_DURATION, 1).toFixed(4); },
      autoplayPaused() {
        return this.explicitPaused || this.pointerInside || this.focusInside
          || this.performanceDialogOpen || this.documentHidden || this.reducedMotion;
      },
      liveStatus() { return this.ui.status(this.currentIndex + 1, this.activeSlide.headline); },
    },
    watch: {
      locale() {
        this.applyMetadata();
        this.preloadImages();
      },
      currentIndex() {
        this.hoveredMetricIndex = null;
        this.focusedMetricIndex = null;
        this.pinnedMetricIndex = null;
        this.preloadImages();
      },
    },
    created() {
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.reducedMotion = this.motionQuery.matches;
      this.onMotionChange = (event) => {
        this.reducedMotion = event.matches;
        if (event.matches) this.elapsed = 0;
      };
      if (this.motionQuery.addEventListener) this.motionQuery.addEventListener("change", this.onMotionChange);
      else this.motionQuery.addListener(this.onMotionChange);
      document.addEventListener("visibilitychange", this.onVisibilityChange);
    },
    mounted() {
      this.applyMetadata();
      this.preloadImages();
      this.loadReleaseState();
      this.animationFrame = window.requestAnimationFrame(this.tick);
    },
    beforeDestroy() {
      this.closePerformanceDialog();
      window.cancelAnimationFrame(this.animationFrame);
      window.clearTimeout(this.transitionTimer);
      document.removeEventListener("visibilitychange", this.onVisibilityChange);
      if (this.motionQuery.removeEventListener) this.motionQuery.removeEventListener("change", this.onMotionChange);
      else this.motionQuery.removeListener(this.onMotionChange);
    },
    methods: {
      pad(value) { return String(value).padStart(2, "0"); },
      tick(timestamp) {
        if (!this.lastFrame) this.lastFrame = timestamp;
        const delta = Math.min(timestamp - this.lastFrame, 100);
        this.lastFrame = timestamp;
        if (!this.autoplayPaused) {
          this.elapsed += delta;
          if (this.elapsed >= SLIDE_DURATION) this.next();
        }
        this.animationFrame = window.requestAnimationFrame(this.tick);
      },
      changeSlide(index) {
        const normalized = (index + this.slides.length) % this.slides.length;
        if (normalized === this.currentIndex) {
          this.elapsed = 0;
          return;
        }
        window.clearTimeout(this.transitionTimer);
        if (!this.reducedMotion) this.transitioning = true;
        this.currentIndex = normalized;
        this.elapsed = 0;
        this.transitionTimer = window.setTimeout(() => {
          this.transitioning = false;
        }, this.reducedMotion ? 0 : TRANSITION_DURATION);
      },
      goTo(index) { this.changeSlide(index); },
      previous() { this.changeSlide(this.currentIndex - 1); },
      next() { this.changeSlide(this.currentIndex + 1); },
      togglePause() { this.explicitPaused = !this.explicitPaused; },
      toggleMetric(index) {
        this.pinnedMetricIndex = this.pinnedMetricIndex === index ? null : index;
      },
      metricAccessibilityLabel(metric) {
        const values = this.ui.performanceBrands
          .map((brand, index) => `${brand.name} (${brand.stack}) ${metric.values[index]}`).join(", ");
        return `${metric.name}. ${values}. ${metric.reason}`;
      },
      setLocale(locale) {
        if (locale !== "zh" && locale !== "en") return;
        this.locale = locale;
        try {
          window.localStorage.setItem("mozart-locale", locale);
        } catch (_) {
          // Storage can be blocked in privacy modes; the live language still changes.
        }
      },
      applyMetadata() {
        document.documentElement.lang = this.locale === "zh" ? "zh-CN" : "en";
        document.title = this.dictionary.meta.title;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", this.dictionary.meta.description);
      },
      handleFocusOut() {
        window.requestAnimationFrame(() => {
          const carousel = document.getElementById("carousel-area");
          this.focusInside = Boolean(carousel && carousel.contains(document.activeElement));
        });
      },
      focusMedia() {
        if (this.currentIndex === 1 && this.$refs.performanceDialog?.showModal) {
          this.$refs.performanceDialog.showModal();
          this.performanceDialogOpen = true;
          return;
        }
        if (this.$refs.media) this.$refs.media.focus();
      },
      closePerformanceDialog() {
        if (this.$refs.performanceDialog?.open) this.$refs.performanceDialog.close();
        this.performanceDialogOpen = false;
      },
      onTouchStart(event) {
        const touch = event.changedTouches && event.changedTouches[0];
        if (touch) this.touchStart = { x: touch.clientX, y: touch.clientY };
      },
      onTouchEnd(event) {
        if (!this.touchStart) return;
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - this.touchStart.x;
        const dy = touch.clientY - this.touchStart.y;
        this.touchStart = null;
        if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
        if (dx < 0) this.next();
        else this.previous();
      },
      onVisibilityChange() {
        this.documentHidden = document.hidden;
        this.lastFrame = performance.now();
      },
      markImageFailed(path) { this.$set(this.failedImages, path, true); },
      preloadImages() {
        [this.activeSlide.image, this.nextSlide.image].forEach((path) => {
          if (!path || this.failedImages[path]) return;
          const image = new Image();
          image.src = path;
        });
      },
      async loadReleaseState() {
        try {
          const response = await fetch("update/latest.json", { cache: "no-store" });
          if (!response.ok) return;
          const manifest = await response.json();
          const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
          const firstAsset = assets.find((asset) => asset && (asset.browser_download_url || asset.url));
          if (manifest.published === true && firstAsset) {
            this.release = {
              available: true,
              url: firstAsset.browser_download_url || firstAsset.url,
            };
          }
        } catch (_) {
          // Fail closed: no verified manifest means no download CTA.
        }
      },
    },
  });
})();
