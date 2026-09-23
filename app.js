(() => {
  "use strict";

  const SLIDE_DURATION = 8000;
  const TRANSITION_DURATION = 440;
  const RELEASES_URL = "https://github.com/hikariCodeAi/mozart-ide/releases";

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
        navItems: ["性能", "Agent", "Review", "Git"],
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
        status: (index, title) => `第 ${index} 张，共 4 张：${title}`,
        evidence: [
          { label: "冷启动", icon: "ϟ" },
          { label: "内存 RSS", icon: "▦" },
          { label: "搜索 P95", icon: "⌕" },
          { label: "实测后公开", icon: "▥" },
        ],
      },
      slides: [
        {
          eyebrow: "01 / 极致暴力性能",
          headline: "压榨到最后一字节的极致暴力",
          body: "开个编辑器吃掉 4GB 内存、随手打字偶发掉帧的旧时代该结束了。Mozart 由纯 C++ 底层锻造，消灭黑盒，消灭 GC 停顿，精准控制每一寸内存的开辟与销毁。海量代码秒级加载，光标所至，亚毫秒级即刻响应。",
          memory: "“我们不管理内存，我们统治内存。”",
          chips: ["C++ Native", "零 GC 停顿", "120 FPS 满帧", "亚毫秒响应"],
          cta: "查看性能证据",
          tab: "极致性能",
          image: "assets/screenshots/performance-evidence-1710x1030.png",
          alt: "Mozart IDE 真实运行界面，用于可复现性能测量的证据截图",
        },
        {
          eyebrow: "02 / 官方纯血 AGENT",
          headline: "纯血 Agent 宿主：拒绝当二道贩子",
          body: "市面上的 AI 编辑器热衷于把模型扒皮阉割，包一层简陋的 Chat 界面，官方一升级你就抓瞎。Mozart 原生直通 OpenAI、Claude、Google 官方最新 CLI，不搞二流的自研 Agent，只做最高维度的掌控套件（Harness）。零损耗释放原厂最强战力，全球模型升级，你永远身处第一梯队。",
          memory: "“不做阉割版二道贩子，只做原厂 Agent 的最强战甲。”",
          chips: ["OpenAI CLI", "Claude Code", "Gemini CLI", "0 损耗 Harness"],
          cta: "探索 Agent 套件",
          tab: "纯血 Agent",
          image: "assets/screenshots/official-agent-cli-1710x1030.png",
          alt: "Mozart IDE 中的官方 Agent CLI 工作流真实截图",
        },
        {
          eyebrow: "03 / 代码终审特种兵",
          headline: "从打字员到代码审判官：斩断旧时代赘肉",
          body: "你明明 90% 的时间在审阅 Agent 生成的代码、比对 Git Diff、跨项目切换，传统 IDE 却依然逼你背负几个 G 的笨重运行时和吃灰的调试器。Mozart 是轻装特种兵，冷酷剔除一切冗余巨石，全数火力注入双栏极速 Diff、全系 Git 操控与架构透视。同时 100% 完整继承 JetBrains 肌肉记忆，你多年沉淀的手感，在此瞬间觉醒。",
          memory: "“代码不需要你手动敲，扔掉臃肿旧巨石；保留你的肌肉记忆，接管最纯粹的审判权。”",
          chips: ["双栏 Diff 审阅", "JetBrains 肌肉记忆", "全系 Git 操控", "零迁移成本"],
          cta: "查看审判视窗",
          tab: "代码审判",
          image: "assets/screenshots/review-diff-1710x1030.png",
          alt: "Mozart IDE 代码 Diff 终审界面真实截图",
        },
        {
          eyebrow: "04 / 原生工业美学",
          headline: "撕掉 Web 套壳伪装：原生工业美学的降维打击",
          body: "拒绝把 Chromium 浏览器包装成 IDE 卖给工程师。Mozart 采用全套原生 C++ GPU 硬件加速管线直接雕琢。每一个像素倒角、每一次展开动画、每一个按钮的阻尼反馈都经过严苛调校。不仅快得没有知觉，更精致得像一件精密机械艺术品。",
          memory: "“你用的是生产力武器，不是跑在 Chromium 里的网页。”",
          chips: ["GPU 硬件直描", "微倒角精工", "物理级阻尼", "拒绝 Electron"],
          cta: "品鉴工艺细节",
          tab: "原生美学",
          image: "assets/screenshots/git-command-center-1710x1030.png",
          alt: "Mozart IDE Git 提交图、历史与多项目工作区真实截图",
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
        navItems: ["Performance", "Agents", "Review", "Git"],
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
        status: (index, title) => `Slide ${index} of 4: ${title}`,
        evidence: [
          { label: "Cold start", icon: "ϟ" },
          { label: "Memory RSS", icon: "▦" },
          { label: "Search P95", icon: "⌕" },
          { label: "Published after measurement", icon: "▥" },
        ],
      },
      slides: [
        {
          eyebrow: "01 / NATIVE PERFORMANCE",
          headline: "Give every millisecond back to judgment.",
          body: "Mozart is built natively in C++, keeping resources for code, diffs, and Agents instead of a heavyweight web runtime. Incremental indexing, on-demand loading, and explicit memory lifecycles keep large projects direct, stable, and predictable.",
          memory: "Performance is not an adjective. It is reproducible evidence.",
          chips: ["C++ Native", "Explicit Memory", "Incremental Index", "GPU UI"],
          cta: "View performance evidence",
          tab: "Native Performance",
          image: "assets/screenshots/performance-evidence-1710x1030.png",
          alt: "A real Mozart IDE session prepared for reproducible performance measurement",
        },
        {
          eyebrow: "02 / OFFICIAL AGENTS",
          headline: "We don't rebuild Agents. We unleash them.",
          body: "Connect directly to the official OpenAI, Claude, and Google CLIs. Mozart preserves their native capabilities and adds cross-project sessions, terminal orchestration, context switching, and a focused review workflow.",
          memory: "No stripped-down middleman. Just first-party Agents in their strongest harness.",
          chips: ["OpenAI CLI", "Claude CLI", "Gemini CLI", "Harness"],
          cta: "Explore the Agent workflow",
          tab: "Official Agents",
          image: "assets/screenshots/official-agent-cli-1710x1030.png",
          alt: "A real Mozart IDE capture showing the official Agent CLI workflow",
        },
        {
          eyebrow: "03 / FINAL REVIEW",
          headline: "Agents produce. You decide.",
          body: "Traditional IDEs were built around writing code line by line. Today, most of your time goes into reviewing Agent changes, comparing diffs, and moving between projects and terminals. Mozart brings diffs, commits, branches, file history, structure, tests, and Agent reasoning into one review surface—so every change can be seen, understood, and held accountable.",
          memory: "Agents can produce the code. Judgment cannot be outsourced.",
          chips: ["Complete Git", "Multi-project Terminals", "Code Structure", "Agent Reasoning"],
          cta: "Explore Review",
          tab: "Final Review",
          image: "assets/screenshots/review-diff-1710x1030.png",
          alt: "A real Mozart IDE capture showing the final code-diff review surface",
        },
        {
          eyebrow: "04 / GIT COMMAND CENTER",
          headline: "Every project. One command deck.",
          body: "Inspect branches, commit graphs, file history, diffs, terminals, and run configurations in one workspace. Move across projects without losing context—and keep the JetBrains muscle memory you already own.",
          memory: "Projects may be distributed. Judgment must stay focused.",
          chips: ["Commit Graph", "File History", "Project Terminals", "JetBrains Keymap"],
          cta: "Explore the Git workflow",
          tab: "Git Command Center",
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
      headlineParts() {
        const parts = this.activeSlide.headline.match(/[^。！？.!?]+[。！？.!?]?/g) || [this.activeSlide.headline];
        return parts.map((part) => part.trim()).filter(Boolean);
      },
      nextSlide() { return this.slides[(this.currentIndex + 1) % this.slides.length]; },
      progressRatio() { return Math.min(this.elapsed / SLIDE_DURATION, 1).toFixed(4); },
      autoplayPaused() {
        return this.explicitPaused || this.pointerInside || this.focusInside || this.documentHidden || this.reducedMotion;
      },
      liveStatus() { return this.ui.status(this.currentIndex + 1, this.activeSlide.headline); },
    },
    watch: {
      locale() {
        this.applyMetadata();
        this.preloadImages();
      },
      currentIndex() { this.preloadImages(); },
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
        if (this.$refs.media) this.$refs.media.focus();
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
          if (this.failedImages[path]) return;
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
