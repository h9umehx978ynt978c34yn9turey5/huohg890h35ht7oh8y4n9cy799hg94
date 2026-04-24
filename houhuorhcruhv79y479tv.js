(function () {
  "use strict";
  const URL_PATH = "/games/mines";
  const BET_AMOUNT_INPUT_SELECTOR =
    "input[type='number'][placeholder*='amount'], input[type='number'][placeholder*='bet'], input[type='number']";
  const BET_AMOUNT_IN_BTC_SELECTOR =
    ".currency-conversion span, [class*='currency-conversion'] span";
  const BET_BUTTON_SELECTOR =
    "button[data-testid='bet-button'], button.bg-green-500:not([data-testid='cashout-button']), button[class*='bg-green-500']:not([data-testid='cashout-button'])";
  const BET_BUTTON_MULTIPLY2_SELECTOR =
    "#main-content > div.parent.svelte-1powyzj > div > div > div > div > div.content.svelte-vrm0e8 > div.game-sidebar.svelte-wcee0x > div.scrollable-content.scrollY.svelte-wcee0x > label:nth-child(1) > div > div.input-button-wrap.svelte-dka04o > button:nth-child(1)";
  const BET_AMOUNT_DEVIDE2_SELECT = "label button:nth-child(2)";
  const SIDEBAR_MANUAL_PLAY_SELECTOR =
    "button[data-testid='manual-tab'], button[data-testid*='manual'], button[title*='Manual'], button[aria-label*='Manual']";
  const SIDEBAR_AUTO_PLAY_SELCTOR =
    "button[data-testid='auto-tab'], button[data-testid*='auto'], button[title*='Auto'], button[aria-label*='Auto']";
  const GEMS_INPUT_DATA_TESTID_SELECTOR = "input[data-testid*='gems']";
  const GEMS_INPUT_SELECTOR =
    GEMS_INPUT_DATA_TESTID_SELECTOR +
    ", input[readonly][type='text'], input[readonly]";
  const MINES_COUNT_SELECT_BY_TESTID = "select[data-testid*='mines']";
  const MINES_COUNT_SELECT_BY_NAME = "select[name*='mines']";
  const GAME_SIDEBAR_PRIMARY_SELECTOR = "div.game-sidebar.svelte-wcee0x";
  const GAME_SIDEBAR_FALLBACK_SELECTOR = '[class*="game-sidebar"]';
  const RANDOM_PICK_BUTTON_SELECTOR =
    '#main-content > div.parent.svelte-1powyzj > div > div > div > div > div.content.svelte-vrm0e8 > div.game-sidebar.svelte-wcee0x > div.scrollable-content.scrollY.svelte-wcee0x > button.\\[font-family\\:var\\(--ds-font-family-default\\)\\].\\[font-variant-numeric\\:var\\(--ds-font-variant-numeric\\,lining-nums_tabular-nums\\)\\].\\[font-feature-settings\\:var\\(--ds-font-feature-settings\\,\\"salt\\"_on\\)\\].\\[font-weight\\:var\\(--ds-font-weight-thick\\)\\].inline-flex.relative.items-center.gap-2.justify-center.rounded-md.whitespace-nowrap.ring-offset-background.transition.disabled\\:pointer-events-none.disabled\\:opacity-\\(--ds-opacity-disabled\\,0\\.5\\).focus-visible\\:outline-2.focus-visible\\:outline-offset-2.focus-visible\\:outline-\\(--ds-color-focus-ring-outer\\,var\\(--color-white\\)\\).active\\:scale-\\[0\\.98\\].state-layer-base.bg-\\(--ds-color-base-neutral\\,var\\(--color-grey-400\\)\\).text-\\(--ds-color-on-base-neutral\\,var\\(--color-white\\)\\).not-prime-active\\:hover\\:bg-grey-300.not-prime-active\\:hover\\:text-white.prime-active\\:\\[\\&_svg\\]\\:\\!text-subtle-on-base-neutral.prime-active\\:focus-visible\\:\\[\\&_svg\\]\\:\\!text-on-base-neutral.prime-active\\:hover\\:\\[\\&_svg\\]\\:\\!text-on-base-neutral.prime-active\\:\\[\\&_svg\\.dropdown-arrow\\]\\:\\!text-on-base-neutral.prime-active\\:\\[\\&\\:not\\(\\[data-icon-only\\=false\\]\\)\\:has\\(\\>svg\\:only-child\\)_svg\\]\\:\\!text-on-base-neutral.var\\(--ds-font-size-sm\\).shadow-md.py-\\[0\\.625rem\\].px-\\[1\\.25rem\\]';
  const CASHOUT_BUTTON_SELECTOR = "button[data-testid='cashout-button']";
  const CASHOUT_BUTTON_TEXT_SELECTOR = '[data-loader-content="true"]';
  const CASHOUT_BUTTON_LOADING_ANIMATION_DIV_SELECTOR =
    ".inline-flex.justify-center.items-center.absolute";
  const TILE_SELECTOR =
    'button[data-testid*="mines-tile"], button[data-testid*="tile"], button[class*="tile"]:not([disabled]), div[class*="game-content"] button:not([disabled]), div[class*="tiles"] button:not([disabled])';
  const TILES_GREY_COVER_SELECTOR = ".cover";
  const GAME_TILES_CONTAINER_SELECTOR =
    "[data-testid*='game-mines'] > div, div[class*='game-content'][class*='stake-original'][class*='bg-grey-700'] > div > div, div[class*='game-content'][class*='stake-original'] > div > div, div[class*='game-content'] > div > div, .tiles > div, [class*='tiles'] > div";
  const PROFIT_MULTIPLIER_SELECTOR =
    ".profit label span span, [class*='profit'] label span span, div[class*='profit'] label span span";
  const PROFIT_BTC_SELECTOR =
    ".profit label span div span, [class*='profit'] label span div span, div[class*='profit'] label span div span";
  const PROFIT_USD_SELECTOR =
    ".profit input, [class*='profit'] input, div[class*='profit'] input";
  const WIN_MODAL_SELECTOR = ".game-result-wrap.win";
  const BALANCE_SELECTOR =
    "#navigation-container-header > div.w-full.flex.justify-center > div > div > div > div > button > div > div > span.content.svelte-1jb7pu8 > span";
  const NAV_CRYPTO_ICON_SELECTOR =
    "#navigation-container-header > div.w-full.flex.justify-center > div > div > div > div > button > div > div > span.ds-body-md.inline-flex > svg";
  const BET_AMOUNT_LABEL_SELECTOR =
    "#main-content > div.parent.svelte-1powyzj > div > div > div > div > div.content.svelte-vrm0e8 > div.game-sidebar.svelte-wcee0x > div.scrollable-content.scrollY.svelte-wcee0x > label:nth-child(1)";
  const BALANCE_ERROR_HTML =
    '<div id="prlabs-balance-error" class="input-error svelte-qto0ce"><svg data-ds-icon="Caution" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="inline-block shrink-0">\x3c!----\x3e<path fill="currentColor" d="M21.78 19.04 13.83 3.13c-.75-1.51-2.91-1.51-3.66 0l-7.95 15.9c-.68 1.36.31 2.96 1.83 2.96h15.9c1.52 0 2.51-1.6 1.83-2.96zM11 7c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1zm1 12c-.83 0-1.5-.67-1.5-1.5S11.17 16 12 16s1.5.67 1.5 1.5S12.83 19 12 19"></path></svg>\x3c!----\x3e \x3c!----\x3e<span type="body" tag="span" size="sm" class="ds-body-sm" data-ds-text="true">\x3c!----\x3e\x3c!----\x3eCan\'t bet more than your balance!</span>\x3c!----\x3e</div>';
  const FREE_TRIAL_ERROR_HTML =
    '<div id="prlabs-trial-error" class="input-error svelte-qto0ce"><svg data-ds-icon="Caution" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="inline-block shrink-0">\x3c!----\x3e<path fill="currentColor" d="M21.78 19.04 13.83 3.13c-.75-1.51-2.91-1.51-3.66 0l-7.95 15.9c-.68 1.36.31 2.96 1.83 2.96h15.9c1.52 0 2.51-1.6 1.83-2.96zM11 7c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1zm1 12c-.83 0-1.5-.67-1.5-1.5S11.17 16 12 16s1.5.67 1.5 1.5S12.83 19 12 19"></path></svg>\x3c!----\x3e \x3c!----\x3e<span type="body" tag="span" size="sm" class="ds-body-sm" data-ds-text="true">\x3c!----\x3e\x3c!----\x3eFree trial only allows to play with 0.00.</span>\x3c!----\x3e</div>';
  const PREDICTION_USED_PREFIX = "prlabs_prediction_used_";
  const TRIAL_USED_STORAGE_KEY = "prlabs_trial_used";
  const CRYPTO_PRICE_STORAGE_KEY = "prlabs_crypto_prices";
  const COINGECKO_IDS =
    "bitcoin,ethereum,solana,litecoin,dogecoin,ripple,cardano,tron,avalanche-2,polygon,chainlink";
  const COINGECKO_ID_TO_SYMBOL = {
    bitcoin: "BTC",
    ethereum: "ETH",
    solana: "SOL",
    litecoin: "LTC",
    dogecoin: "DOGE",
    ripple: "XRP",
    cardano: "ADA",
    tron: "TRX",
    "avalanche-2": "AVAX",
    polygon: "MATIC",
    chainlink: "LINK",
  };
  const CRYPTO_FALLBACK_PRICES = {
    BTC: 1e5,
    ETH: 3500,
    SOL: 200,
    LTC: 100,
    DOGE: 0.4,
    XRP: 2,
    ADA: 1,
    TRX: 0.2,
    AVAX: 40,
    MATIC: 1,
    LINK: 15,
  };
  function getMinesAmountSelectEl() {
    function pick(selector) {
      var el = document.querySelector(selector);
      return el && el.tagName === "SELECT" ? el : null;
    }
    var el = pick(MINES_COUNT_SELECT_BY_TESTID);
    if (el) return el;
    el = pick(MINES_COUNT_SELECT_BY_NAME);
    if (el) return el;
    var sidebar =
      document.querySelector(GAME_SIDEBAR_PRIMARY_SELECTOR) ||
      document.querySelector(GAME_SIDEBAR_FALLBACK_SELECTOR);
    if (!sidebar) return null;
    var selects = sidebar.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      var tid = String(s.getAttribute("data-testid") || "").toLowerCase();
      if (tid.indexOf("mine") !== -1) return s;
    }
    return null;
  }
  function readMinesCountFromPage() {
    var sel = getMinesAmountSelectEl();
    if (sel) {
      var n = parseInt(sel.value, 10);
      if (Number.isFinite(n) && n >= 1) return Math.min(24, n);
    }
    var sidebar =
      document.querySelector(GAME_SIDEBAR_PRIMARY_SELECTOR) ||
      document.querySelector(GAME_SIDEBAR_FALLBACK_SELECTOR);
    if (sidebar) {
      var gemsInput = sidebar.querySelector(GEMS_INPUT_DATA_TESTID_SELECTOR);
      if (gemsInput) {
        var g = parseInt(
          String(gemsInput.value || "").replace(/[^\d]/g, ""),
          10,
        );
        if (Number.isFinite(g) && g >= 1 && g < 25)
          return Math.min(24, Math.max(1, 25 - g));
      }
    }
    return 3;
  }
  function getCurrentCrypto() {
    var el = document.querySelector(NAV_CRYPTO_ICON_SELECTOR);
    var icon = el && el.getAttribute("data-ds-icon");
    return (icon && String(icon).toUpperCase()) || "BTC";
  }
  let cryptoPrices = {};
  function loadCryptoPricesFromStorage() {
    try {
      var raw = localStorage.getItem(CRYPTO_PRICE_STORAGE_KEY);
      if (raw) {
        var obj = JSON.parse(raw);
        if (obj && typeof obj === "object") cryptoPrices = obj;
      }
      var legacy = localStorage.getItem("btcPrice");
      if (legacy && !cryptoPrices.BTC) {
        cryptoPrices.BTC = parseFloat(legacy);
      }
    } catch (e) {}
  }
  function saveCryptoPriceToStorage(symbol, price) {
    if (!symbol || price == null || isNaN(price)) return;
    cryptoPrices[symbol] = price;
    try {
      localStorage.setItem(
        CRYPTO_PRICE_STORAGE_KEY,
        JSON.stringify(cryptoPrices),
      );
    } catch (e) {}
  }
  function getStableCryptoPrice(symbol) {
    var sym = (symbol || getCurrentCrypto()).toUpperCase();
    if (cryptoPrices[sym] != null && !isNaN(cryptoPrices[sym]))
      return cryptoPrices[sym];
    return CRYPTO_FALLBACK_PRICES[sym] != null
      ? CRYPTO_FALLBACK_PRICES[sym]
      : sym === "BTC"
        ? 1e5
        : 1e3;
  }
  function getStableBTCPrice() {
    return getStableCryptoPrice(getCurrentCrypto());
  }
  let minePositions = [];
  let gemPositions = [];
  let predictedSafePositions = [];
  let predictedMinePositions = [];
  let predictionMode = "ultra";
  let currentAccuracy = null;
  let initialMinesCount = 0;
  let currentGemsCount = 0;
  let gameFeaturesInitialized = window.gameFeaturesInitialized || false;
  let tilesCloned = window.tilesCloned || false;
  let revealedGemsCount = 0;
  let betAmount = 0;
  let initialGemsCount = 0;
  let pendingTileAnimations = 0;
  let batchTimeout = null;
  let batchRevealCommitTimeout = null;
  let pendingTiles = [];
  let isFirstGame = true;
  let f2Pressed = false;
  let shiftPressed = false;
  const BOMB_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70"><title>bomb</title><path d="M35,70a35.47,35.47,0,0,1-8.45-1A35,35,0,1,1,49.83,3.3c3.53-2.25,8.75-.54,12.39,4.16.15.19.3.39.44.59a11.89,11.89,0,0,1,3.61,2.31,10.6,10.6,0,0,1,3.27,7.91A9,9,0,0,1,68,23.44a32.32,32.32,0,0,1,1.14,4h0A35,35,0,0,1,35,70ZM35,6.47A28.57,28.57,0,1,0,62.85,28.84h0A27.53,27.53,0,0,0,61.34,24a3.17,3.17,0,0,1-.16-2,3.2,3.2,0,0,1-1.49-1.33c-.29-.5-.6-1-.92-1.48a3.23,3.23,0,0,1-.11-3.39.92.92,0,0,0,.06-.29,3.33,3.33,0,0,1,.77-1.79,3.16,3.16,0,0,1-1.73-1.4,11.43,11.43,0,0,0-.65-.95c-1.59-2-3.35-2.68-3.87-2.62A1.81,1.81,0,0,1,53,9l-1.37.79a3.22,3.22,0,0,1-3.14.06A28.47,28.47,0,0,0,35,6.47Z" style="fill:#051d27"/><path d="M66.76,35A31.62,31.62,0,0,0,66,28.14c-2.45-.61-13.43-3.53-16.07-3.53-17.55,0-28.75,14.48-28.75,32,0,2.35,5.65,7,6.14,9.19A31.8,31.8,0,0,0,66.76,35Z" style="fill:#d8003e"/><path d="M58.34,27.2a31.72,31.72,0,0,1,7.67.94A31.76,31.76,0,1,0,27.33,65.83a31.77,31.77,0,0,1,31-38.63Z" style="fill:#fd013e"/><path d="M51.33,6.19,45.71,9.44c-2.24,1.74-1.7,6.17,1.19,9.9S54,24.69,56.19,23l4.55-4.64Z" style="fill:#d8003e"/><ellipse cx="56.03" cy="12.26" rx="4.6" ry="7.67" transform="translate(4.24 36.9) rotate(-37.78)" style="fill:#fd013e"/><path d="M41.45,38.53a1.55,1.55,0,0,1-.37,0,1.84,1.84,0,0,1-1.44-2.17c2-9.64,10.07-12,16-13.71,4.86-1.41,7-2.24,7-4.34a3.76,3.76,0,0,0-1.11-2.89c-1.91-1.81-5.63-1.67-5.67-1.66a1.84,1.84,0,1,1-.2-3.68c.22,0,5.33-.25,8.41,2.67a7.43,7.43,0,0,1,2.26,5.56c0,5.08-4.9,6.5-9.65,7.88-5.85,1.69-11.9,3.45-13.41,10.9A1.85,1.85,0,0,1,41.45,38.53Z" style="fill:#2a2f3c"/><polygon points="32.81 53.29 33.53 54.59 30.13 56.91 30.49 53.72 32.81 53.29" style="fill:#fff"/><polygon points="20.47 56.89 20.73 57.24 19.67 57.76 19.72 56.95 20.47 56.89" style="fill:#fff"/><polygon points="32.15 47.91 32.26 48.82 33.05 48.66 32.87 47.59 32.15 47.91" style="fill:#fff"/><polygon points="35.28 46.02 34.89 47.73 36.14 47.94 36.82 46.87 36.39 45.91 35.28 46.02" style="fill:#fff"/><polygon points="38.02 48.47 37.97 49.28 39.03 48.76 38.77 48.41 38.02 48.47" style="fill:#fff"/><polygon points="41.13 49.33 42.21 48.85 42.71 50.93 41.48 51.1 41.13 49.33" style="fill:#fff"/><polygon points="32.64 39.9 33.07 40.85 32.39 41.92 31.14 41.71 31.54 40 32.64 39.9" style="fill:#fff"/><polygon points="44.43 45.41 44.62 46.48 43.83 46.65 43.71 45.74 44.43 45.41" style="fill:#fff"/><polygon points="47.56 43.79 46.62 45.17 49.51 46.55 49.95 45.02 47.56 43.79" style="fill:#fff"/><polygon points="52.47 47.67 52.42 48.48 53.48 47.96 53.22 47.61 52.47 47.67" style="fill:#fff"/><polygon points="51.74 51.27 51.31 52.23 52.6 53.19 54.63 51.91 51.74 51.27" style="fill:#fff"/><polygon points="51.63 58.46 50.91 58.78 51.02 59.69 51.82 59.53 51.63 58.46" style="fill:#fff"/><polygon points="46.62 39.13 46.86 36.72 48.76 36.45 49.38 37.45 46.62 39.13" style="fill:#fff"/><polygon points="61.89 33.9 61.84 34.71 62.9 34.19 62.64 33.84 61.89 33.9" style="fill:#fff"/><polygon points="47.15 33.15 47.73 33.71 47.01 34.52 46.57 33.86 47.15 33.15" style="fill:#fff"/><polygon points="36.75 33.83 35.69 34.34 35.73 33.53 36.48 33.47 36.75 33.83" style="fill:#fff"/><polygon points="35.78 37.44 35.05 37.77 35.17 38.67 35.96 38.51 35.78 37.44" style="fill:#fff"/><polygon points="33.78 34.62 33 35.77 31.73 35.41 31.25 33.9 32.46 32.87 33.78 34.62" style="fill:#fff"/><polygon points="28.58 24.4 28.76 25.46 27.97 25.63 27.85 24.72 28.58 24.4" style="fill:#fff"/><polygon points="47 26.82 43.8 40.43 34.23 26.82 41.68 41.48 31.04 38.34 37.42 42.53 19.33 47.76 39.55 44.62 36.36 55.09 42.74 47.76 47 51.95 47 46.72 61.89 49.86 48.06 43.57 55.51 38.34 47 41.48 47 26.82" style="fill:#fdcb02"/><polygon points="56.57 43.61 63.67 41.84 63.67 43.61 56.57 43.61" style="fill:#fdcb02"/><polygon points="32.63 33.01 26.43 22.4 25.54 25.05 32.63 33.01" style="fill:#fdcb02"/><polygon points="34.41 52.44 28.2 63.04 27.31 60.39 34.41 52.44" style="fill:#fdcb02"/><polygon points="46.93 44.58 52.19 51.23 44.6 47 42.26 52.44 41.09 48.21 33.1 50.41 38.17 44.58 32.92 42.16 38.17 40.35 36.42 37.94 41.09 38.54 39.92 29.47 43.43 38.54 44.6 37.94 44.6 39.75 49.85 37.33 46.93 42.16 53.36 42.77 46.93 44.58" style="fill:#fff"/></svg>`;
  let sounds = {
    bet: null,
    win: null,
    gem0: null,
    gem1: null,
    gem2: null,
    mine: null,
  };
  loadCryptoPricesFromStorage();
  fetchCryptoPrices();
  loadSounds();
  function createPredictorModal() {
    if (document.getElementById("stake-predictor-modal")) {
      return;
    }
    const modalIconUrl =
      typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL
        ? chrome.runtime.getURL("modal-icon.png")
        : "";
    const modalContainer = document.createElement("div");
    modalContainer.id = "stake-predictor-modal";
    modalContainer.innerHTML = `\n            <div class="space-background" id="space-bg">\n                <div class="stars-container" id="stars"></div>\n                <div class="comets-container" id="comets"></div>\n            </div>\n            <div class="modal-header">\n                <div class="modal-header-left">\n                    <span class="modal-title-gradient">ZEN PREDICTOR DEMO</span>\n                </div>\n                <div class="header-buttons">\n                    <button id="close-modal" class="close-btn">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                            <line x1="18" y1="6" x2="6" y2="18"></line>\n                            <line x1="6" y1="6" x2="18" y2="18"></line>\n                        </svg>\n                    </button>\n                </div>\n            </div>\n            <div class="separator-line"></div>\n            <div class="modal-content" id="modal-content">\n                \x3c!-- Predictor content will be loaded here --\x3e\n            </div>\n        `;
    const style = document.createElement("style");
    style.textContent = `\n            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');\n\n            #stake-predictor-modal {\n                position: fixed;\n                top: 50px;\n                right: 50px;\n                z-index: 10000;\n                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n                background: linear-gradient(165deg, #041427 0%, #07203d 48%, #030d1c 100%);\n                border: 1px solid rgba(96, 165, 250, 0.42);\n                border-radius: 16px;\n                display: flex;\n                flex-direction: column;\n                overflow: hidden;\n                backdrop-filter: blur(10px);\n                min-width: 320px;\n                max-width: 360px;\n                height: auto;\n                box-shadow: 0 18px 38px rgba(3, 12, 24, 0.68), 0 0 60px rgba(59, 130, 246, 0.1), inset 0 0 22px rgba(96, 165, 250, 0.08);\n                user-select: none;\n            }\n\n            .space-background {\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                overflow: hidden;\n                pointer-events: none;\n                border-radius: 12px;\n            }\n\n            .stars-container {\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 40%;\n                pointer-events: none;\n            }\n\n            .star {\n                position: absolute;\n                background: #ffffff;\n                border-radius: 50%;\n                opacity: 0.6;\n                animation: twinkle 3s ease-in-out infinite;\n            }\n\n            @keyframes twinkle {\n                0%, 100% { opacity: 0.3; }\n                50% { opacity: 1; }\n            }\n\n            .comets-container {\n                position: absolute;\n                top: -50px;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                pointer-events: none;\n            }\n\n            .comet {\n                position: absolute;\n                width: 3px;\n                height: 20px;\n                background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.3));\n                opacity: 0.6;\n                animation: cometFall 4s ease-in-out infinite;\n            }\n\n            @keyframes cometFall {\n                0% {\n                    transform: translateY(-100px) translateX(0) rotate(45deg);\n                    opacity: 0;\n                }\n                10% {\n                    opacity: 0.8;\n                }\n                90% {\n                    opacity: 0.2;\n                }\n                100% {\n                    transform: translateY(400px) translateX(100px) rotate(45deg);\n                    opacity: 0;\n                }\n            }\n\n            .modal-header {\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n                padding: 20px 20px 15px;\n                cursor: move;\n                position: relative;\n                z-index: 10;\n            }\n\n            #stake-predictor-modal.dragging .modal-header {\n                cursor: grabbing;\n            }\n\n            .header-buttons {\n                display: flex;\n                gap: 8px;\n            }\n\n            .separator-line {\n                height: 1px;\n                background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.2));\n                margin: -5px 21px;\n                position: relative;\n                z-index: 10;\n            }\n\n            .separator-line-bottom {\n                margin: 15px 1px;\n            }\n\n            .modal-header-left {\n                display: flex;\n                align-items: center;\n                gap: 10px;\n            }\n\n            .modal-icon {\n                height: 35px;\n                width: auto;\n                display: block;\n            }\n\n            .modal-title-gradient {\n                font-size: 16px;\n                font-family: 'Montserrat', sans-serif;\n                font-weight: bold;\n                line-height: 1;\n                background: linear-gradient(130deg, #bfdbfe 0%, #60a5fa 45%, #2563eb 100%);\n                -webkit-background-clip: text;\n                background-clip: text;\n                color: transparent;\n                text-shadow: 0 0 20px rgba(59, 130, 246, 0.42), 0 0 42px rgba(30, 64, 175, 0.36);\n                letter-spacing: 1px;\n                text-transform: uppercase;\n            }\n\n            .close-btn {\n                background: rgba(59, 130, 246, 0.12);\n                border: 1px solid rgba(96, 165, 250, 0.4);\n                color: #bfdbfe;\n                cursor: pointer;\n                padding: 6px;\n                width: 32px;\n                height: 32px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                border-radius: 6px;\n                transition: all 0.3s ease;\n            }\n\n            .close-btn:hover {\n                background: rgba(59, 130, 246, 0.24);\n                color: #dbeafe;\n                box-shadow: 0 0 12px rgba(59, 130, 246, 0.35);\n            }\n\n            .modal-content {\n                padding: 25px 20px 20px 20px;\n                display: flex;\n                flex-direction: column;\n                position: relative;\n                z-index: 10;\n            }\n\n            .prediction-grid {\n                display: none;\n            }\n\n            .prediction-box {\n                display: none;\n            }\n\n            .prediction-box.lit-up {\n                display: none;\n            }\n\n            .prediction-box.check {\n                display: none;\n            }\n\n            .prediction-box.revealed {\n                display: none;\n            }\n\n            .prediction-box svg {\n                display: none;\n            }\n\n            .prediction-box.unknown {\n                display: none;\n            }\n\n            .predictor-buttons {\n                display: flex;\n                flex-direction: row;\n                flex-wrap: wrap;\n                gap: 10px;\n                justify-content: center;\n            }\n\n            .predictor-hero {\n                border: 1px solid rgba(96, 165, 250, 0.34);\n                border-radius: 12px;\n                background: linear-gradient(145deg, rgba(59, 130, 246, 0.16) 0%, rgba(30, 64, 175, 0.28) 100%);\n                padding: 12px;\n                margin-bottom: 12px;\n                box-shadow: inset 0 0 16px rgba(96, 165, 250, 0.1);\n            }\n\n            .hero-badge {\n                display: inline-flex;\n                align-items: center;\n                gap: 6px;\n                border: 1px solid rgba(147, 197, 253, 0.42);\n                border-radius: 999px;\n                padding: 4px 9px;\n                color: #dbeafe;\n                font-size: 10px;\n                font-weight: 700;\n                text-transform: uppercase;\n                letter-spacing: 0.5px;\n                background: rgba(8, 22, 45, 0.55);\n            }\n\n            .hero-title {\n                margin-top: 10px;\n                color: #eff6ff;\n                font-family: 'Montserrat', sans-serif;\n                font-size: 14px;\n                font-weight: 700;\n                line-height: 1.3;\n            }\n\n            .hero-subtitle {\n                margin-top: 4px;\n                color: rgba(191, 219, 254, 0.82);\n                font-size: 11px;\n                line-height: 1.4;\n            }\n\n            .icon-btn {\n                padding: 12px 14px;\n                border: 1px solid rgba(96, 165, 250, 0.52);\n                border-radius: 10px;\n                background: linear-gradient(140deg, rgba(37, 99, 235, 0.3) 0%, rgba(15, 23, 42, 0.76) 100%);\n                color: #dbeafe;\n                cursor: pointer;\n                transition: all 0.3s ease;\n                display: flex;\n                flex-direction: row;\n                align-items: center;\n                justify-content: center;\n                gap: 8px;\n                flex: 1 1 0;\n                min-width: 0;\n                min-height: 48px;\n                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.22);\n                transform-origin: center;\n                font-family: 'Montserrat', sans-serif;\n                font-size: 11px;\n                font-weight: 700;\n                line-height: 1.2;\n                text-transform: uppercase;\n                letter-spacing: 0.5px;\n            }\n\n            .icon-btn .btn-text {\n                text-align: center;\n            }\n\n            .icon-btn svg {\n                flex-shrink: 0;\n            }\n\n            .icon-btn:hover {\n                color: #eff6ff;\n                border-color: rgba(147, 197, 253, 0.95);\n                box-shadow: 0 0 15px rgba(59, 130, 246, 0.42);\n                background: linear-gradient(145deg, rgba(59, 130, 246, 0.44) 0%, rgba(37, 99, 235, 0.58) 100%);\n            }\n\n            .icon-btn:disabled {\n                opacity: 0.4;\n                cursor: not-allowed;\n                background: linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(30, 64, 175, 0.24) 100%);\n                border-color: rgba(96, 165, 250, 0.22);\n                color: rgba(191, 219, 254, 0.5);\n                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n            }\n\n            .icon-btn:disabled:hover {\n                background: linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(30, 64, 175, 0.24) 100%);\n                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n            }\n\n            .icon-btn:active {\n                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n            }\n\n            .info-containers {\n                display: flex;\n                flex-direction: row;\n                gap: 10px;\n                margin-top: 15px;\n                justify-content: space-between;\n            }\n\n            .info-container {\n                flex: 1;\n                background: linear-gradient(145deg, rgba(59, 130, 246, 0.14) 0%, rgba(30, 58, 138, 0.44) 100%);\n                border: 1px solid rgba(96, 165, 250, 0.36);\n                border-radius: 8px;\n                padding: 12px 12px;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                gap: 6px;\n                box-shadow: inset 0 0 12px rgba(147, 197, 253, 0.1);\n            }\n\n            .info-label {\n                font-size: 10px;\n                color: rgba(191, 219, 254, 0.82);\n                text-transform: uppercase;\n                letter-spacing: 0.5px;\n                font-weight: 700;\n            }\n\n            .info-value {\n                font-size: 16px;\n                color: #eff6ff;\n                font-weight: bold;\n                font-family: 'Montserrat', sans-serif;\n            }\n        `;
    document.head.appendChild(style);
    document.body.appendChild(modalContainer);
    makeDraggable(modalContainer);
    setupModalFunctionality();
    generateStarsAndComets();
  }
  function generateStarsAndComets() {
    const starsContainer = document.getElementById("stars");
    const cometsContainer = document.getElementById("comets");
    if (!starsContainer || !cometsContainer) return;
    const starCount = Math.floor(Math.random() * 5) + 8;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 1.5 + 0.5;
      const delay = Math.random() * 3;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = delay + "s";
      starsContainer.appendChild(star);
    }
    const cometCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < cometCount; i++) {
      const comet = document.createElement("div");
      comet.className = "comet";
      const delay = Math.random() * 8;
      const duration = Math.random() * 3 + 3;
      const startX = Math.random() * 100;
      comet.style.left = startX + "%";
      comet.style.animationDelay = delay + "s";
      comet.style.animationDuration = duration + "s";
      cometsContainer.appendChild(comet);
    }
  }
  function makeDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    const header = element.querySelector(".modal-header");
    if (!header) return;
    header.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
    function dragStart(e) {
      if (e.target.closest(".close-btn")) return;
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      isDragging = true;
      element.classList.add("dragging");
    }
    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    }
    function dragEnd() {
      isDragging = false;
      element.classList.remove("dragging");
    }
  }
  function setupModalFunctionality() {
    const modalContent = document.getElementById("modal-content");
    const closeBtn = document.getElementById("close-modal");
    if (modalContent) {
      showPredictorUIInModal(modalContent);
    }
    function showPredictorUIInModal(parentEl) {
      if (!parentEl) return;
      const modalContent = document.getElementById("modal-content");
      if (modalContent) modalContent.style.padding = "25px 20px 20px 20px";
      parentEl.innerHTML = `\n            <div class="predictor-hero">\n                <span class="hero-badge">Github Server</span>\n                <div class="hero-title">Zen Predictor Demo</div>\n                <div class="hero-subtitle">Zen Gives You Money!</div>\n            </div>\n            <div class="predictor-buttons">\n                <button id="predict-mines-btn" class="icon-btn predict-btn" title="Predict Tiles" disabled>\n                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n                        <circle cx="12" cy="12" r="3"></circle>\n                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>\n                    </svg>\n                    <span class="btn-text">Generate Prediction</span>\n                </button>\n            </div>\n            <div class="separator-line separator-line-bottom"></div>\n            <div class="info-containers">\n                <div class="info-container" id="accuracy-container">\n                    <span class="info-label">UPDT RQST</span>\n                    <span class="info-value" id="accuracy-value">--</span>\n                </div>\n                <div class="info-container" id="mode-container">\n                    <span class="info-label">State</span>\n                    <span class="info-value" id="mode-value">Ready</span>\n                </div>\n            </div>\n                `;
      const newPredictBtn = document.getElementById("predict-mines-btn");
      updateModeDisplay();
      updateAccuracyDisplay();
      newPredictBtn.addEventListener("click", function () {
        if (!this.disabled) {
          predictMines();
        }
      });
      newPredictBtn.disabled = false;
    }
    closeBtn.addEventListener("click", function () {
      const modal = document.getElementById("stake-predictor-modal");
      modal.style.display = "none";
    });
  }
  function updateModeDisplay() {
    const modeValue = document.getElementById("mode-value");
    if (modeValue) {
      modeValue.textContent = "Ready";
    }
  }
  function updateAccuracyDisplay() {
    const accuracyValue = document.getElementById("accuracy-value");
    if (accuracyValue) {
      accuracyValue.textContent = "APRX:%";
    }
  }
  window.setPredictionBox = function (index, type) {};
  window.clearPredictionGrid = function () {
    window.predictionsFinished = false;
    currentAccuracy = null;
    updateAccuracyDisplay();
  };
  window.markPredictionBoxRevealed = function (index) {};
  window.animatePredictionGrid = function (duration, callback) {
    setTimeout(callback, duration);
  };
  function checkF2AndShowMessage() {}
  function showErrorMessage(message) {
    const existingError = document.getElementById("astral-predictor-error");
    if (existingError) {
      existingError.remove();
    }
    const errorDiv = document.createElement("div");
    errorDiv.id = "astral-predictor-error";
    errorDiv.innerHTML = `\n            <span class="astral-toast-icon" aria-hidden="true">\n                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\n                    <path d="M20 6L9 17l-5-5"></path>\n                </svg>\n            </span>\n            <span class="astral-toast-text">${message}</span>\n        `;
    errorDiv.style.cssText = `\n            position: fixed;\n            top: 16px;\n            left: 16px;\n            display: flex;\n            align-items: center;\n            gap: 10px;\n            background: linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%);\n            color: #eff6ff;\n            border: 1px solid rgba(147, 197, 253, 0.6);\n            border-radius: 12px;\n            padding: 12px 14px;\n            font-family: 'Montserrat', sans-serif;\n            font-size: 13px;\n            font-weight: 600;\n            z-index: 10002;\n            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.42), 0 0 16px rgba(59, 130, 246, 0.3);\n            backdrop-filter: blur(10px);\n            text-align: left;\n            max-width: 330px;\n            word-wrap: break-word;\n            animation: astralToastIn 0.32s ease-out;\n        `;
    if (!document.getElementById("astral-toast-styles")) {
      const style = document.createElement("style");
      style.id = "astral-toast-styles";
      style.textContent = `\n                .astral-toast-icon {\n                    width: 24px;\n                    height: 24px;\n                    border-radius: 7px;\n                    display: inline-flex;\n                    align-items: center;\n                    justify-content: center;\n                    background: rgba(191, 219, 254, 0.2);\n                    color: #dbeafe;\n                    flex-shrink: 0;\n                }\n\n                .astral-toast-text {\n                    line-height: 1.35;\n                    letter-spacing: 0.2px;\n                }\n\n                @keyframes astralToastIn {\n                    from {\n                        opacity: 0;\n                        transform: translateY(-12px) scale(0.98);\n                    }\n                    to {\n                        opacity: 1;\n                        transform: translateY(0) scale(1);\n                    }\n                }\n\n                @keyframes astralToastOut {\n                    from {\n                        opacity: 1;\n                        transform: translateY(0) scale(1);\n                    }\n                    to {\n                        opacity: 0;\n                        transform: translateY(-10px) scale(0.98);\n                    }\n                }\n            `;
      document.head.appendChild(style);
    }
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (errorDiv && errorDiv.parentNode) {
        errorDiv.style.animation = "astralToastOut 0.25s ease-in forwards";
        setTimeout(() => {
          if (errorDiv && errorDiv.parentNode) {
            errorDiv.remove();
          }
        }, 300);
      }
    }, 3e3);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "F2") {
      f2Pressed = true;
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === "F2") {
      f2Pressed = false;
    }
    if (e.key === "Shift") {
      shiftPressed = false;
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Shift") {
      shiftPressed = true;
    }
  });
  function initializeGameFeatures() {
    if (gameFeaturesInitialized) {
      return true;
    }
    if (window.location.href.includes(URL_PATH)) {
      const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
      const betButton = document.querySelector(BET_BUTTON_SELECTOR);
      const btcConversion = document.querySelector(BET_AMOUNT_IN_BTC_SELECTOR);
      if (betInput && betButton && btcConversion) {
        setupBetInput();
        setupBetButton();
        setupMinesCountListener();
        setupBetButtonAttributeMonitor();
        setupBTCConversion();
        gameFeaturesInitialized = true;
        window.gameFeaturesInitialized = true;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function replaceTilesIfPresent() {
    if (!window.location.href.includes(URL_PATH)) {
      tilesCloned = false;
      window.tilesCloned = false;
      gameFeaturesInitialized = false;
      window.gameFeaturesInitialized = false;
      return;
    }
    if (tilesCloned) return;
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (!tilesContainer) return;
    const tiles = tilesContainer.querySelectorAll(TILE_SELECTOR);
    if (!tiles.length) return;
    cloneTilesOnLoad();
    tilesCloned = true;
    window.tilesCloned = true;
  }
  function startTilesObserver() {
    if (!window.location.href.includes(URL_PATH)) {
      tilesCloned = false;
      window.tilesCloned = false;
      gameFeaturesInitialized = false;
      window.gameFeaturesInitialized = false;
      return;
    }
    replaceTilesIfPresent();
    if (tilesCloned) return;
    if (window._tilesMutationObserver) return;
    const observer = new MutationObserver(() => {
      replaceTilesIfPresent();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window._tilesMutationObserver = observer;
  }
  startTilesObserver();
  if (!window._tilesMutationObserver && document.body) {
    const observer = new MutationObserver(() => {
      replaceTilesIfPresent();
      if (
        window.location.href.includes(URL_PATH) &&
        !window._tilesMutationObserver
      ) {
        startTilesObserver();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window._tilesMutationObserver = observer;
  }
  function onUrlChange() {
    if (!window.location.href.includes(URL_PATH)) {
      tilesCloned = false;
      window.tilesCloned = false;
      gameFeaturesInitialized = false;
      window.gameFeaturesInitialized = false;
      return;
    }
    initializeGameFeatures();
    replaceTilesIfPresent();
    startTilesObserver();
    setTimeout(() => {
      initializeGameFeatures();
      replaceTilesIfPresent();
    }, 150);
    setTimeout(() => {
      initializeGameFeatures();
      replaceTilesIfPresent();
    }, 500);
  }
  const origPushState = history.pushState;
  const origReplaceState = history.replaceState;
  if (origPushState) {
    history.pushState = function (...args) {
      origPushState.apply(this, args);
      onUrlChange();
    };
  }
  if (origReplaceState) {
    history.replaceState = function (...args) {
      origReplaceState.apply(this, args);
      onUrlChange();
    };
  }
  window.addEventListener("popstate", onUrlChange);
  if (!initializeGameFeatures()) {
    setTimeout(() => {
      if (!initializeGameFeatures()) {
        let attempts = 0;
        const maxAttempts = 10;
        const interval = setInterval(() => {
          attempts++;
          if (initializeGameFeatures() || attempts >= maxAttempts) {
            clearInterval(interval);
          }
        }, 1e3);
      }
    }, 2e3);
  }
  createPredictorModal();
  const BTC_ICON_SVG =
    '<svg data-ds-icon="BTC" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" normalised="false" class="inline-block shrink-0"><path fill="#F7931A" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path><path fill="#fff" d="M16.932 10.669c.213-1.437-.88-2.21-2.378-2.726l.484-1.948-1.182-.296-.481 1.897c-.313-.079-.633-.151-.949-.223l.481-1.9-1.185-.296-.485 1.945a31 31 0 0 1-.756-.179l-1.636-.409L8.532 7.8s.88.203.86.213a.633.633 0 0 1 .553.69V8.7l-.553 2.22q.071.018.13.04l-.007-.002-.123-.03-.777 3.093a.43.43 0 0 1-.546.28l.003.001-.863-.213-.588 1.351 1.544.381.845.22-.491 1.97 1.185.295.485-1.948q.483.129.945.244l-.485 1.941 1.186.296.488-1.966c2.024.382 3.544.227 4.183-1.601.515-1.471-.024-2.32-1.09-2.874.777-.165 1.358-.677 1.516-1.728m-2.712 3.797c-.364 1.475-2.842.688-3.646.478l.65-2.598c.804.189 3.381.588 2.996 2.12m.368-3.818c-.344 1.34-2.406.657-3.066.492l.591-2.365c.667.165 2.822.478 2.475 1.873"></path></svg>';
  function getCurrentCryptoIconSvg() {
    var el = document.querySelector(NAV_CRYPTO_ICON_SELECTOR);
    if (el && el.outerHTML) return el.outerHTML;
    return BTC_ICON_SVG;
  }
  function getBalanceFromPage() {
    const el = document.querySelector(BALANCE_SELECTOR);
    if (!el || !el.textContent) return 0;
    const text = el.textContent.trim().replace(/[$,]/g, "");
    const num = parseFloat(text);
    return isNaN(num) ? 0 : num;
  }
  function updateBetButtonState(input) {
    if (!input) return;
    const betAmount = parseFloat(input.value) || 0;
    const balance = getBalanceFromPage();
    const betButton = document.querySelector(BET_BUTTON_SELECTOR);
    if (betButton) {
      betButton.disabled = betAmount > balance || betAmount !== 0;
    }
  }
  function checkBalanceAndShowError(input) {
    if (!input) return;
    const betAmount = parseFloat(input.value) || 0;
    const balance = getBalanceFromPage();
    const label = document.querySelector(BET_AMOUNT_LABEL_SELECTOR);
    const balanceErrorEl = document.getElementById("prlabs-balance-error");
    const trialErrorEl = document.getElementById("prlabs-trial-error");
    if (betAmount > 0 && label && !trialErrorEl) {
      label.insertAdjacentHTML("afterbegin", FREE_TRIAL_ERROR_HTML);
    } else if (betAmount === 0 && trialErrorEl && trialErrorEl.parentNode) {
      trialErrorEl.remove();
    }
    if (betAmount > balance && betAmount > 0 && label && !balanceErrorEl) {
      label.insertAdjacentHTML("afterbegin", BALANCE_ERROR_HTML);
    } else if (
      !(betAmount > balance) &&
      balanceErrorEl &&
      balanceErrorEl.parentNode
    ) {
      balanceErrorEl.remove();
    }
    input.classList.toggle("invalid", betAmount > 0 || betAmount > balance);
    updateBetButtonState(input);
  }
  function setupBetInput() {
    const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
    if (betInput) {
      const newBetInput = betInput.cloneNode(true);
      newBetInput.removeAttribute("disabled");
      betInput.parentNode.replaceChild(newBetInput, betInput);
      newBetInput.addEventListener("focus", function () {
        this.classList.remove("invalid");
      });
      newBetInput.addEventListener("blur", function () {
        this.value = formatInputOnBlur(this.value);
        updateBTCConversion(this.value);
        checkBalanceAndShowError(newBetInput);
      });
      newBetInput.addEventListener("input", function () {
        this.value = validateInput(this.value);
        updateBTCConversion(this.value);
        checkBalanceAndShowError(newBetInput);
      });
      checkBalanceAndShowError(newBetInput);
    }
    setupBetAmountButtons();
  }
  function getCurrentBetBTC() {
    const btcEl = document.querySelector(BET_AMOUNT_IN_BTC_SELECTOR);
    if (!btcEl || !btcEl.textContent) return 0;
    const crypto = getCurrentCrypto();
    const text = btcEl.textContent
      .replace(new RegExp(crypto, "gi"), "")
      .trim()
      .replace(/,/g, "");
    const num = parseFloat(text);
    return isNaN(num) ? 0 : num;
  }
  function setupBetAmountButtons() {
    const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
    const firstBtn = document.querySelector(BET_BUTTON_MULTIPLY2_SELECTOR);
    const wrap = firstBtn ? firstBtn.closest(".input-button-wrap") : null;
    const secondBtn = wrap
      ? wrap.querySelector("button:nth-child(2)")
      : document.querySelector(BET_AMOUNT_DEVIDE2_SELECT);
    if (!betInput) return;
    if (firstBtn) {
      const newFirst = firstBtn.cloneNode(true);
      newFirst.disabled = false;
      newFirst.removeAttribute("disabled");
      firstBtn.parentNode.replaceChild(newFirst, firstBtn);
      newFirst.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const current = parseFloat(betInput.value) || 0;
        const newVal = current / 2;
        betInput.value =
          newVal % 1 === 0
            ? newVal.toFixed(2)
            : String(Math.round(newVal * 100) / 100);
        updateBTCConversion(betInput.value);
        checkBalanceAndShowError(betInput);
      });
    }
    let lastSteppedBTC = 0;
    if (secondBtn) {
      const newSecond = secondBtn.cloneNode(true);
      newSecond.disabled = false;
      newSecond.removeAttribute("disabled");
      secondBtn.parentNode.replaceChild(newSecond, secondBtn);
      newSecond.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const balance = getBalanceFromPage();
        if (balance <= 0) {
          lastSteppedBTC = 0;
          return;
        }
        const currentUsd = parseFloat(betInput.value) || 0;
        const displayBTC = getCurrentBetBTC();
        const currentBTC =
          currentUsd <= 0 && lastSteppedBTC > 0 ? lastSteppedBTC : displayBTC;
        const price = getStableBTCPrice();
        if (price <= 0) return;
        let newBTC;
        if (currentUsd <= 0 && currentBTC <= 0) {
          newBTC = 1e-8;
          if (newBTC * price > balance) return;
        } else if (currentBTC < 5e-9) {
          newBTC = 1e-8;
          if (newBTC * price > balance) return;
        } else {
          newBTC = currentBTC * 2;
        }
        let usd = newBTC * price;
        if (usd > balance) {
          usd = balance;
          newBTC = balance / price;
          lastSteppedBTC = newBTC;
        } else {
          lastSteppedBTC = newBTC;
        }
        if (usd < 0.01) {
          betInput.value = "0.00";
          updateBTCConversion(betInput.value);
          const btcEl = document.querySelector(BET_AMOUNT_IN_BTC_SELECTOR);
          if (btcEl)
            btcEl.textContent = newBTC.toFixed(8) + " " + getCurrentCrypto();
        } else {
          lastSteppedBTC = 0;
          betInput.value =
            usd >= 1 || usd % 1 === 0
              ? usd.toFixed(2)
              : String(Math.round(usd * 100) / 100);
          updateBTCConversion(betInput.value);
        }
        checkBalanceAndShowError(betInput);
      });
    }
  }
  async function fetchCryptoPrices() {
    try {
      var url =
        "https://api.coingecko.com/api/v3/simple/price?ids=" +
        COINGECKO_IDS +
        "&vs_currencies=usd";
      var response = await fetch(url);
      var data = await response.json();
      if (!data || typeof data !== "object") return;
      for (var id in COINGECKO_ID_TO_SYMBOL) {
        if (data[id] && data[id].usd != null) {
          var price = parseFloat(data[id].usd);
          if (price > 0) {
            var sym = COINGECKO_ID_TO_SYMBOL[id];
            var prev = cryptoPrices[sym];
            if (prev != null && Math.abs(price - prev) / prev > 0.5) continue;
            saveCryptoPriceToStorage(sym, price);
          }
        }
      }
    } catch (e) {}
  }
  function loadSounds() {
    const soundUrls = {
      bet: "https://stake.com/_app/immutable/assets/bet.DUx2OBl3.mp3",
      win: "https://stake.com/_app/immutable/assets/win.BpDMfFMt.mp3",
      gem0: "https://stake.com/_app/immutable/assets/gem0.-F12_z-j.mp3",
      gem1: "https://stake.com/_app/immutable/assets/gem1.GsL8JfTB.mp3",
      gem2: "https://stake.com/_app/immutable/assets/gem2.LRZteFQ0.mp3",
      mine: "https://stake.com/_app/immutable/assets/mine.DwyaPDKk.mp3",
    };
    Object.keys(soundUrls).forEach((soundName) => {
      const audio = new Audio(soundUrls[soundName]);
      audio.preload = "auto";
      audio.volume = 0.7;
      sounds[soundName] = audio;
    });
  }
  function playSound(soundName) {
    if (sounds[soundName]) {
      try {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play();
      } catch (error) {}
    }
  }
  function playSoundLayered(soundName, instances = 1) {
    if (sounds[soundName]) {
      try {
        for (let i = 0; i < instances; i++) {
          const audioClone = sounds[soundName].cloneNode();
          audioClone.currentTime = 0;
          audioClone.play();
        }
      } catch (error) {}
    }
  }
  function getGemSound(gemCount) {
    if (gemCount <= 7) {
      return "gem2";
    } else if (gemCount <= 15) {
      return "gem1";
    } else {
      return "gem0";
    }
  }
  function setupBTCConversion() {
    const btcElement = document.querySelector(BET_AMOUNT_IN_BTC_SELECTOR);
    if (btcElement) {
      const currentInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
      if (currentInput) {
        updateBTCConversion(currentInput.value);
      }
    }
  }
  function updateBTCConversion(usdAmount) {
    const btcElement = document.querySelector(BET_AMOUNT_IN_BTC_SELECTOR);
    if (btcElement) {
      const amount = parseFloat(usdAmount) || 0;
      const stablePrice = getStableBTCPrice();
      const btcValue = amount / stablePrice;
      const formattedBTC = btcValue.toFixed(8);
      const crypto = getCurrentCrypto();
      btcElement.textContent = formattedBTC + " " + crypto;
    }
  }
  function disableBetButton() {
    const betButton = document.querySelector(BET_BUTTON_SELECTOR);
    if (betButton) {
      betButton.disabled = true;
    }
  }
  function enableBetButton() {
    const betButton = document.querySelector(BET_BUTTON_SELECTOR);
    if (betButton) {
      betButton.disabled = false;
    }
  }
  function validateInput(value) {
    let cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }
    return cleaned;
  }
  function formatInputOnBlur(value) {
    if (!value || value.trim() === "") {
      return "0.00";
    }
    if (value.startsWith(".")) {
      return value;
    }
    const num = parseFloat(value);
    if (!isNaN(num)) {
      if (Number.isInteger(num)) {
        const formatted = num.toFixed(2);
        return formatted;
      } else {
        return value;
      }
    }
    return "0.00";
  }
  function setupBetButton() {
    const betButton = document.querySelector(BET_BUTTON_SELECTOR);
    if (betButton) {
      const newBetButton = betButton.cloneNode(true);
      newBetButton.removeAttribute("disabled");
      betButton.parentNode.replaceChild(newBetButton, betButton);
      newBetButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.isBetButtonClick = true;
        const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
        if (betInput) {
          betAmount = parseFloat(betInput.value) || 0;
        } else {
          betAmount = 0;
        }
        playSound("bet");
        disableGameControls();
        resetProfitElements();
        if (window.isBetButtonClick) {
          if (!isFirstGame) {
            resetTilesToOriginalState();
            cloneTilesOnLoad();
          } else {
            isFirstGame = false;
          }
        }
        const activeTilesContainer = document.querySelector(
          GAME_TILES_CONTAINER_SELECTOR,
        );
        if (activeTilesContainer) {
          const activeTiles =
            activeTilesContainer.querySelectorAll(TILE_SELECTOR);
          if (activeTiles.length > 0) {
            syncHiddenBoardMineLayoutFromPage(activeTiles.length);
          }
        }
        window.isBetButtonClick = false;
        replaceBetButtonWithCashout(this);
      });
    }
  }
  function setupMinesCountListener() {
    const minesSelect = getMinesAmountSelectEl();
    if (!minesSelect) return;
    const newMinesSelect = minesSelect.cloneNode(true);
    minesSelect.parentNode.replaceChild(newMinesSelect, minesSelect);
    newMinesSelect.addEventListener("change", function () {
      updateBetButtonState();
    });
    updateBetButtonState();
  }
  function updateBetButtonState() {
    const betButton = document.querySelector(BET_BUTTON_SELECTOR);
    const minesCount = readMinesCountFromPage();
    const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
    const betAmount = betInput ? parseFloat(betInput.value) || 0 : 0;
    const shouldDisableForAmount = betAmount > 0;
    const shouldDisableForMines = minesCount > 1;
    const shouldDisable = shouldDisableForAmount || shouldDisableForMines;
    if (betButton) {
      const currentlyDisabled =
        betButton.disabled || betButton.hasAttribute("disabled");
      if (currentlyDisabled === shouldDisable) return;
      if (shouldDisable) {
        betButton.disabled = true;
        if (!betButton.hasAttribute("disabled")) {
          betButton.setAttribute("disabled", "");
        }
        return;
      }
      betButton.disabled = false;
      if (betButton.hasAttribute("disabled")) {
        betButton.removeAttribute("disabled");
      }
    }
  }
  function setupBetButtonAttributeMonitor() {
    const betButton = document.querySelector(BET_BUTTON_SELECTOR);
    if (!betButton) return;
    if (window._betButtonObserver) {
      try {
        window._betButtonObserver.disconnect();
      } catch (e) {}
    }
    let isSyncingDisabledState = false;
    const observer = new MutationObserver(function (mutations) {
      if (isSyncingDisabledState) return;
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "disabled"
        ) {
          isSyncingDisabledState = true;
          updateBetButtonState();
          isSyncingDisabledState = false;
        }
      });
    });
    observer.observe(betButton, {
      attributes: true,
      attributeFilter: ["disabled"],
      attributeOldValue: true,
    });
    window._betButtonObserver = observer;
  }
  function replaceBetButtonWithCashout(betButton) {
    const cashoutButtonHTML = `\n            <button type="button" tabindex="0" class="[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,&quot;salt&quot;_on)] inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md) [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] var(--ds-font-size-sm) shadow-md py-[0.625rem] px-[1.25rem]" style="background-color: #1267c6; color: white;" data-testid="cashout-button" disabled data-test-action-enabled="false" data-test-action-cashout="disabled" data-button-root="">\n                \x3c!----\x3e\x3c!----\x3e\x3c!----\x3e\n                <div class="inline-flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" bis_skin_checked="1" style="color: white;">\n                    <div class="wobble svelte-3k7g21" bis_skin_checked="1">\n                        <svg data-ds-icon="Casino" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="inline-block shrink-0" style="color: white;">\n                            \x3c!----\x3e\n                            <path fill="white" d="m2.14 4.63 7.25-3.38c.63-.3 1.34-.23 1.89.11-.09.14-.18.28-.26.43L4.81 15.1 1.17 7.29c-.47-1-.03-2.19.97-2.66"></path>\n                            <path fill="white" fill-rule="evenodd" d="m21.86 4.63-7.25-3.38c-1-.47-2.19-.03-2.66.97l-6.76 14.5c-.47 1-.03 2.19.97 2.66l7.25 3.38c1 .47 2.19.03 2.66-.97l6.76-14.5c.47-1 .03-2.19-.97-2.66m-9.54 11-.85-4.81 4.23-2.44.85 4.81z" clip-rule="evenodd"></path>\n                        </svg>\n                        \x3c!----\x3e\n                    </div>\n                    \x3c!----\x3e\n                </div>\n                \x3c!----\x3e\n                <div data-loader-content="true" class="contents invisible" bis_skin_checked="1">\n                    \x3c!----\x3e\n                    <span type="body" tag="span" size="md" strong="true" class="ds-body-md-strong" data-ds-text="true" style="color: white;">\n                        \x3c!----\x3eCashout\x3c!----\x3e\n                    </span>\n                    \x3c!----\x3e\n                </div>\n            </button>\n        `;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cashoutButtonHTML;
    const cashoutButton = tempDiv.firstElementChild;
    betButton.parentNode.replaceChild(cashoutButton, betButton);
    if (!document.getElementById("stake-predictor-button-styles")) {
      const buttonStyle = document.createElement("style");
      buttonStyle.id = "stake-predictor-button-styles";
      buttonStyle.textContent = `\n                button[data-testid="bet-button"] {\n                    background-color: #1267c6 !important;\n                    color: white !important;\n                }\n                button[data-testid="bet-button"]:hover {\n                    background-color: #0f5ba8 !important;\n                }\n                button[data-testid="cashout-button"] {\n                    background-color: #1267c6 !important;\n                    color: white !important;\n                }\n                button[data-testid="cashout-button"]:disabled {\n                    background-color: #1475e1 !important;\n                    color: white !important;\n                    opacity: 0.38 !important;\n                }\n                button[data-testid="cashout-button"]:not(:disabled):hover {\n                    background-color: #0f5ba8 !important;\n                }\n                button[data-testid="cashout-button"] svg,\n                button[data-testid="cashout-button"] path {\n                    fill: white !important;\n                    color: white !important;\n                }\n                button[data-testid="bet-button"] svg,\n                button[data-testid="bet-button"] path {\n                    fill: white !important;\n                    color: white !important;\n                }\n            `;
      document.head.appendChild(buttonStyle);
    }
    const animationDelay = Math.random() * 500 + 200;
    setTimeout(() => {
      const loadingDiv = cashoutButton.querySelector(
        CASHOUT_BUTTON_LOADING_ANIMATION_DIV_SELECTOR,
      );
      if (loadingDiv) {
        loadingDiv.remove();
      }
      const cashoutTextDiv = cashoutButton.querySelector(
        CASHOUT_BUTTON_TEXT_SELECTOR,
      );
      if (cashoutTextDiv) {
        cashoutTextDiv.classList.remove("invisible");
      }
      const additionalGreyButton = document.querySelector(
        RANDOM_PICK_BUTTON_SELECTOR,
      );
      if (additionalGreyButton) {
        additionalGreyButton.disabled = false;
        additionalGreyButton.removeAttribute("disabled");
      }
      setupCashoutButtonClick();
    }, animationDelay);
  }
  function disableGameControls() {
    const minesSelectEl = getMinesAmountSelectEl();
    const gemsInput = document.querySelector(GEMS_INPUT_SELECTOR);
    if (gemsInput) {
      const minesCount = readMinesCountFromPage();
      gemsInput.value = String(25 - minesCount);
    }
    const elementsToDisable = [
      BET_AMOUNT_INPUT_SELECTOR,
      BET_BUTTON_MULTIPLY2_SELECTOR,
      BET_AMOUNT_DEVIDE2_SELECT,
      SIDEBAR_MANUAL_PLAY_SELECTOR,
      SIDEBAR_AUTO_PLAY_SELCTOR,
    ];
    elementsToDisable.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) element.disabled = true;
    });
    if (minesSelectEl) {
      minesSelectEl.disabled = true;
    }
  }
  function setupCashoutButtonClick() {
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (!cashoutButton) {
      return;
    }
    const newCashoutButton = cashoutButton.cloneNode(true);
    cashoutButton.parentNode.replaceChild(newCashoutButton, cashoutButton);
    newCashoutButton.addEventListener("click", handleCashoutClick);
  }
  function handleCashoutClick() {
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (cashoutButton) {
      cashoutButton.disabled = true;
      const cashoutText = cashoutButton.querySelector(
        CASHOUT_BUTTON_TEXT_SELECTOR,
      );
      if (cashoutText) {
        cashoutText.classList.add("invisible");
      }
      const animationHTML = `<div class="inline-flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" bis_skin_checked="1" style="color: white;"><div class="wobble svelte-3k7g21" bis_skin_checked="1"><svg data-ds-icon="Casino" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="inline-block shrink-0" style="color: white;">\x3c!----\x3e<path fill="white" d="m2.14 4.63 7.25-3.38c.63-.3 1.34-.23 1.89.11-.09.14-.18.28-.26.43L4.81 15.1 1.17 7.29c-.47-1-.03-2.19.97-2.66"></path><path fill="white" fill-rule="evenodd" d="m21.86 4.63-7.25-3.38c-1-.47-2.19-.03-2.66.97l-6.76 14.5c-.47 1-.03 2.19.97 2.66l7.25 3.38c1 .47 2.19.03 2.66-.97l6.76-14.5c.47-1 .03-2.19-.97-2.66m-9.54 11-.85-4.81 4.23-2.44.85 4.81z" clip-rule="evenodd"></path></svg>\x3c!----\x3e</div>\x3c!----\x3e</div>\x3c!----\x3e`;
      cashoutButton.insertAdjacentHTML("afterbegin", animationHTML);
    }
    const additionalGreyButton = document.querySelector(
      RANDOM_PICK_BUTTON_SELECTOR,
    );
    if (additionalGreyButton) {
      additionalGreyButton.disabled = true;
      additionalGreyButton.setAttribute("disabled", "true");
    }
    if (typeof window.clearPredictionGrid === "function") {
      window.clearPredictionGrid();
    }
    setTimeout(() => {
      showGameResultModal();
      revealAllRemainingTiles();
      enableGameControls();
      resetToBetButton();
    }, 400);
  }
  function enableGameControls() {
    const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
    if (betInput) {
      betInput.disabled = false;
      betInput.removeAttribute("disabled");
    }
    const inputButton1 = document.querySelector(BET_BUTTON_MULTIPLY2_SELECTOR);
    const inputButton2 = document.querySelector(BET_AMOUNT_DEVIDE2_SELECT);
    if (inputButton1) {
      inputButton1.disabled = false;
      inputButton1.removeAttribute("disabled");
    }
    if (inputButton2) {
      inputButton2.disabled = false;
      inputButton2.removeAttribute("disabled");
    }
    const stickyButton1 = document.querySelector(SIDEBAR_MANUAL_PLAY_SELECTOR);
    const stickyButton2 = document.querySelector(SIDEBAR_AUTO_PLAY_SELCTOR);
    if (stickyButton1) {
      stickyButton1.disabled = false;
      stickyButton1.removeAttribute("disabled");
    }
    if (stickyButton2) {
      stickyButton2.disabled = false;
      stickyButton2.removeAttribute("disabled");
    }
    const minesSelectRe = getMinesAmountSelectEl();
    if (minesSelectRe) {
      minesSelectRe.disabled = false;
      minesSelectRe.removeAttribute("disabled");
    }
  }
  function resetToBetButton() {
    cancelPendingBatchedReveals();
    const winModal = document.querySelector(WIN_MODAL_SELECTOR);
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (cashoutButton) {
      const betButtonHTML = `<button type="button" tabindex="0" class="[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,&quot;salt&quot;_on)] inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md) [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] focus-visible:outline-white var(--ds-font-size-sm) shadow-md py-[0.625rem] px-[1.25rem]" style="background-color: #1267c6; color: white;" data-testid="bet-button">Bet</button>`;
      cashoutButton.outerHTML = betButtonHTML;
      setupBetButton();
      setupBetButtonAttributeMonitor();
    }
    minePositions = [];
    gemPositions = [];
    predictedSafePositions = [];
    predictedMinePositions = [];
    initialMinesCount = 0;
    initialGemsCount = 0;
    currentGemsCount = 0;
    revealedGemsCount = 0;
    pendingTileAnimations = 0;
    isFirstGame = false;
    if (typeof window.predictionsFinished !== "undefined") {
      window.predictionsFinished = false;
    }
    if (typeof window.clearPredictionGrid === "function") {
      window.clearPredictionGrid();
    }
  }
  function resetTilesToOriginalState() {
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (!tilesContainer) {
      return;
    }
    const tiles = tilesContainer.querySelectorAll(TILE_SELECTOR);
    tiles.forEach((tile, index) => {
      tile.classList.remove("gem", "mine", "fetching");
      tile.classList.add("idle");
      tile.disabled = false;
      tile.removeAttribute("data-revealed");
      tile.removeAttribute("data-predicted-gem");
      tile.removeAttribute("data-predicted-mine");
      const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
      if (cover) {
        cover.classList.remove("gem", "mine", "fetching");
        cover.classList.add("idle");
      }
      tile.innerHTML =
        '\x3c!----\x3e\x3c!----\x3e <div class="cover idle svelte-12ha7jh" bis_skin_checked="1"></div>';
    });
  }
  function resetProfitElements() {
    const winModal = document.querySelector(WIN_MODAL_SELECTOR);
    if (winModal) {
      winModal.remove();
    }
    const profitMultiplier = document.querySelector(PROFIT_MULTIPLIER_SELECTOR);
    if (profitMultiplier) {
      profitMultiplier.textContent = "Total Profit (1.00×)";
    }
    const profitBTC = document.querySelector(PROFIT_BTC_SELECTOR);
    if (profitBTC) {
      profitBTC.textContent = "0.00000000 " + getCurrentCrypto();
    }
    const profitUSD = document.querySelector(PROFIT_USD_SELECTOR);
    if (profitUSD) {
      profitUSD.value = "0.00";
    }
  }
  function resetGameElements() {
    const winModal = document.querySelector(WIN_MODAL_SELECTOR);
    if (winModal) {
      winModal.remove();
    }
    const gemsInput = document.querySelector(GEMS_INPUT_SELECTOR);
    if (gemsInput) {
      const minesCount = readMinesCountFromPage();
      gemsInput.value = String(25 - minesCount);
    }
    const profitMultiplier = document.querySelector(PROFIT_MULTIPLIER_SELECTOR);
    if (profitMultiplier) {
      profitMultiplier.textContent = "Total Profit (1.00×)";
    }
    const profitBTC = document.querySelector(PROFIT_BTC_SELECTOR);
    if (profitBTC) {
      profitBTC.textContent = "0.00000000 " + getCurrentCrypto();
    }
    const profitUSD = document.querySelector(PROFIT_USD_SELECTOR);
    if (profitUSD) {
      profitUSD.value = "0.00";
    }
  }
  function addPredictionAnimationStyles() {
    if (document.getElementById("prediction-animation-styles")) {
      return;
    }
    const style = document.createElement("style");
    style.id = "prediction-animation-styles";
    style.textContent = `\n            #prediction-loading-overlay {\n                position: fixed;\n                inset: 0;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                background: rgba(5, 15, 25, 0.75);\n                z-index: 10050;\n                opacity: 0;\n                pointer-events: none;\n                transition: opacity 220ms ease;\n            }\n\n            #prediction-loading-overlay.active {\n                opacity: 1;\n                pointer-events: auto;\n            }\n\n            .prediction-spinner {\n                width: 72px;\n                height: 72px;\n                border-radius: 50%;\n                border: 6px solid rgba(255, 255, 255, 0.25);\n                border-top-color: #ffffff;\n                animation: predictionSpinnerRotate 0.85s linear infinite;\n                box-shadow: 0 0 22px rgba(255, 255, 255, 0.25);\n            }\n\n            .predicted-bomb-icon {\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                transform: translate(-50%, -50%);\n                width: 62%;\n                height: 62%;\n                pointer-events: none;\n                z-index: 8;\n            }\n\n            @keyframes predictionSpinnerRotate {\n                to { transform: rotate(360deg); }\n            }\n        `;
    document.head.appendChild(style);
  }
  addPredictionAnimationStyles();
  function showPredictionOverlay() {
    addPredictionAnimationStyles();
    let overlay = document.getElementById("prediction-loading-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "prediction-loading-overlay";
      overlay.innerHTML =
        '<div class="prediction-spinner" aria-hidden="true"></div>';
      document.body.appendChild(overlay);
    }
    overlay.classList.add("active");
  }
  function hidePredictionOverlay() {
    const overlay = document.getElementById("prediction-loading-overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
  }
  function hasUsedFreePrediction() {
    try {
      return localStorage.getItem(TRIAL_USED_STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }
  function markFreePredictionUsed() {
    try {
      localStorage.setItem(TRIAL_USED_STORAGE_KEY, "1");
    } catch (e) {}
  }
  function predictMines() {
    const betInput = document.querySelector(BET_AMOUNT_INPUT_SELECTOR);
    const currentBet = betInput ? parseFloat(betInput.value) || 0 : 0;
    if (currentBet > 0) {
      showErrorMessage("You Cant Bet Money In Demo");
      return;
    }
    if (hasUsedFreePrediction()) {
      showErrorMessage("Your 1 free prediction is over. Buy to continue.");
      return;
    }
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (!cashoutButton) {
      showErrorMessage("No Active Mines Bet Found");
      return;
    }
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (!tilesContainer) {
      showErrorMessage("Bet Not Found");
      return;
    }
    const tiles = tilesContainer.querySelectorAll(TILE_SELECTOR);
    const hasPredictionHighlight = Array.from(tiles).some((tile) => {
      const coverElement = tile.querySelector(TILES_GREY_COVER_SELECTOR);
      if (!coverElement) return false;
      const border = (coverElement.style && coverElement.style.border) || "";
      return border.includes("#3B82F6") || border.includes("#ff0000");
    });
    if (hasPredictionHighlight) {
      showErrorMessage("PREDICTION ALREADY EXISTS. CANNOT PREDICT AGAIN.");
      return;
    }
    if (tiles.length === 0) {
      showErrorMessage("No game tiles found");
      return;
    }
    markFreePredictionUsed();
    syncHiddenBoardMineLayoutFromPage(tiles.length);
    generatePredictionsFromBoard();
    if (shiftPressed) {
      corruptPredictions(tiles.length);
    }
    clearTileHighlights(tiles);
    if (typeof window.clearPredictionGrid === "function") {
      window.clearPredictionGrid();
    }
    const totalTime = Math.random() * 3e3 + 3e3;
    showPredictionOverlay();
    setTimeout(() => {
      hidePredictionOverlay();
      currentAccuracy = 100;
      updateAccuracyDisplay();
      highlightTiles(tiles, minePositions);
      window.predictionsFinished = true;
      updateProfitDisplayInitial();
    }, totalTime);
  }
  function calculateMultiplier(mines, remainingGems) {
    const multiplierTable = {
      1: {
        1: 1.01,
        2: 1.08,
        3: 1.12,
        4: 1.18,
        5: 1.24,
        6: 1.3,
        7: 1.37,
        8: 1.46,
        9: 1.55,
        10: 1.65,
        11: 1.77,
        12: 1.9,
        13: 2.06,
        14: 2.25,
        15: 2.47,
        16: 2.75,
        17: 3.09,
        18: 3.54,
        19: 4.12,
        20: 4.95,
        21: 6.19,
        22: 8.25,
        23: 12.37,
        24: 24.75,
      },
      2: {
        1: 1.08,
        2: 1.17,
        3: 1.29,
        4: 1.41,
        5: 1.56,
        6: 1.74,
        7: 1.94,
        8: 2.18,
        9: 2.47,
        10: 2.83,
        11: 3.26,
        12: 3.81,
        13: 4.5,
        14: 5.36,
        15: 6.6,
        16: 8.25,
        17: 10.61,
        18: 14.14,
        19: 19.8,
        20: 29.7,
        21: 49.5,
        22: 99,
        23: 297,
      },
      3: {
        1: 1.12,
        2: 1.29,
        3: 1.48,
        4: 1.71,
        5: 2,
        6: 2.35,
        7: 2.79,
        8: 3.35,
        9: 4.07,
        10: 5,
        11: 6.26,
        12: 7.96,
        13: 10.35,
        14: 13.8,
        15: 18.97,
        16: 27.11,
        17: 40.66,
        18: 65.06,
        19: 113.85,
        20: 227.7,
        21: 569.3,
        22: 2277,
      },
      4: {
        1: 1.18,
        2: 1.41,
        3: 1.71,
        4: 2.09,
        5: 2.58,
        6: 3.2,
        7: 4.09,
        8: 5.26,
        9: 6.88,
        10: 9.17,
        11: 12.61,
        12: 17.56,
        13: 25.3,
        14: 37.95,
        15: 59.64,
        16: 99.39,
        17: 178.91,
        18: 357.81,
        19: 834.9,
        20: 2504,
        21: 12523,
      },
      5: {
        1: 1.24,
        2: 1.56,
        3: 2,
        4: 2.58,
        5: 3.42,
        6: 4.52,
        7: 6,
        8: 8.05,
        9: 11,
        10: 15.25,
        11: 22,
        12: 33,
        13: 48.07,
        14: 75,
        15: 118.93,
        16: 208.72,
        17: 417.45,
        18: 939.26,
        19: 2504,
        20: 8768,
        21: 52598,
      },
      6: {
        1: 1.3,
        2: 1.74,
        3: 2.35,
        4: 3.23,
        5: 4.52,
        6: 6.46,
        7: 9.44,
        8: 14.17,
        9: 21.89,
        10: 35.05,
        11: 58.38,
        12: 102.17,
        13: 189.75,
        14: 379.5,
        15: 834.9,
        16: 2087,
        17: 6261,
        18: 25047,
        19: 175329,
      },
      7: {
        1: 1.37,
        2: 1.94,
        3: 2.79,
        4: 4.09,
        5: 6,
        6: 9.44,
        7: 14.71,
        8: 24.47,
        9: 44.05,
        10: 73.95,
        11: 138.66,
        12: 277.33,
        13: 600.87,
        14: 1442,
        15: 3965,
        16: 13219,
        17: 59486,
        18: 475893,
      },
      8: {
        1: 1.46,
        2: 2.18,
        3: 3.35,
        4: 5.26,
        5: 8.05,
        6: 14.17,
        7: 24.47,
        8: 44.05,
        9: 83.2,
        10: 166.4,
        11: 356.56,
        12: 831.98,
        13: 2163,
        14: 6489,
        15: 23794,
        16: 118973,
        17: 1070759,
      },
      9: {
        1: 1.55,
        2: 2.47,
        3: 4.07,
        4: 6.88,
        5: 12.1,
        6: 21.89,
        7: 40.41,
        8: 83.2,
        9: 176.8,
        10: 404.1,
        11: 1010,
        12: 2288,
        13: 9193,
        14: 36773,
        15: 202254,
        16: 2022545,
      },
      10: {
        1: 1.65,
        2: 2.83,
        3: 5,
        4: 9.17,
        5: 17.56,
        6: 35.05,
        7: 73.95,
        8: 166.4,
        9: 404.1,
        10: 1077,
        11: 3232,
        12: 11314,
        13: 49031,
        14: 294188,
        15: 3236072,
      },
      11: {
        1: 1.77,
        2: 3.26,
        3: 6.26,
        4: 12.61,
        5: 25.3,
        6: 58.38,
        7: 138.66,
        8: 356.56,
        9: 1010,
        10: 3232,
        11: 12123,
        12: 56574,
        13: 390622,
        14: 5148297,
      },
      12: {
        1: 1.9,
        2: 3.81,
        3: 7.96,
        4: 17.56,
        5: 40.66,
        6: 102.17,
        7: 277.33,
        8: 831.98,
        9: 2828,
        10: 11314,
        11: 56574,
        12: 396022,
        13: 5148297,
      },
      13: {
        1: 2.06,
        2: 4.5,
        3: 10.35,
        4: 25.3,
        5: 48.07,
        6: 138.66,
        7: 490.31,
        8: 10775,
        9: 49031,
        10: 367735,
        11: 5148297,
      },
      14: {
        1: 2.25,
        2: 5.36,
        3: 13.8,
        4: 37.95,
        5: 113.85,
        6: 379.5,
        7: 1442,
        8: 6489,
        9: 36773,
        10: 294188,
        11: 4412826,
      },
      15: {
        1: 2.47,
        2: 6.6,
        3: 18.97,
        4: 59.64,
        5: 208.72,
        6: 834.9,
        7: 3965,
        8: 23794,
        9: 202254,
        10: 3236072,
      },
      16: {
        1: 2.75,
        2: 8.25,
        3: 27.11,
        4: 99.39,
        5: 417.45,
        6: 2087,
        7: 13219,
        8: 118973,
        9: 2022545,
      },
      17: {
        1: 3.09,
        2: 10.61,
        3: 40.66,
        4: 178.91,
        5: 939.26,
        6: 6261,
        7: 59486,
        8: 1070759,
      },
      18: { 1: 3.54, 2: 14.14, 3: 65.06, 4: 357.81, 5: 25047, 6: 475893 },
      19: { 1: 4.12, 2: 19.8, 3: 113.9, 4: 834.9, 5: 8766, 6: 175329 },
      20: { 1: 4.95, 2: 29.7, 3: 227.7, 4: 2504, 5: 52598 },
      21: { 1: 6.19, 2: 49.5, 3: 569.3, 4: 12523 },
      22: { 1: 8.25, 2: 99, 3: 2277 },
      23: { 1: 12.37, 2: 297 },
      24: { 1: 24.75 },
    };
    const multiplier = multiplierTable[mines]?.[remainingGems] || 1;
    return multiplier;
  }
  function updateProfitDisplayInitial() {
    const multiplier = calculateMultiplier(initialMinesCount, 0);
    const profitUSD = betAmount * (multiplier - 1);
    const priceForCrypto = getStableCryptoPrice();
    const profitBTC = profitUSD / priceForCrypto;
    const multiplierElement = document.querySelector(
      PROFIT_MULTIPLIER_SELECTOR,
    );
    if (multiplierElement) {
      multiplierElement.textContent = `Total Profit (${multiplier.toFixed(2)}×)`;
    }
    const btcElement = document.querySelector(PROFIT_BTC_SELECTOR);
    var cryptoLabel = getCurrentCrypto();
    if (btcElement) {
      btcElement.textContent = profitBTC.toFixed(8) + " " + cryptoLabel;
    }
    const usdElement = document.querySelector(PROFIT_USD_SELECTOR);
    if (usdElement) {
      usdElement.value = profitUSD.toFixed(2);
    }
  }
  function updateProfitDisplay() {
    if (revealedGemsCount === 0) {
      return;
    }
    const multiplier = calculateMultiplier(
      initialMinesCount,
      revealedGemsCount,
    );
    const profitUSD = betAmount * (multiplier - 1);
    const profitBTC = profitUSD / getStableCryptoPrice();
    const multiplierElement = document.querySelector(
      PROFIT_MULTIPLIER_SELECTOR,
    );
    if (multiplierElement) {
      multiplierElement.textContent = `Total Profit (${multiplier.toFixed(2)}×)`;
    }
    const btcElement = document.querySelector(PROFIT_BTC_SELECTOR);
    var cryptoLabelUpdate = getCurrentCrypto();
    if (btcElement) {
      btcElement.textContent = profitBTC.toFixed(8) + " " + cryptoLabelUpdate;
    }
    const usdElement = document.querySelector(PROFIT_USD_SELECTOR);
    if (usdElement) {
      usdElement.value = profitUSD.toFixed(2);
    }
  }
  function revealAllRemainingTiles() {
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (!tilesContainer) {
      return;
    }
    const allTiles = tilesContainer.querySelectorAll(TILE_SELECTOR);
    allTiles.forEach((tile, index) => {
      if (
        tile.disabled ||
        tile.classList.contains("gem") ||
        tile.classList.contains("mine")
      ) {
        return;
      }
      const isActuallyMine = minePositions.includes(index);
      if (isActuallyMine) {
        tile.classList.remove("idle", "fetching");
        tile.classList.add("mine");
        const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
        if (cover) {
          cover.classList.remove("idle", "fetching");
          cover.classList.add("mine");
        }
        const mineHTML = `<div class="mine svelte-sx409p" style="background-image: url(&quot;/_app/immutable/assets/mine.BrdEJX0T.svg&quot;); --duration: 300ms;" bis_skin_checked="1"></div>`;
        tile.insertAdjacentHTML("afterbegin", mineHTML);
        tile.setAttribute("data-revealed", "true");
        tile.disabled = true;
      } else {
        tile.classList.remove("idle", "fetching");
        tile.classList.add("gem");
        const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
        if (cover) {
          cover.classList.remove("idle", "fetching");
          cover.classList.add("gem");
        }
        const gemHTML = `<div class="gem svelte-1qwk2y9" style="--mine: url(/_app/immutable/assets/gem-none.Bcv6X_BH.svg); --duration: 300ms;" bis_skin_checked="1"><div class="motion svelte-1qwk2y9" bis_skin_checked="1"></div></div>`;
        tile.insertAdjacentHTML("afterbegin", gemHTML);
        tile.setAttribute("data-revealed", "true");
        tile.disabled = true;
      }
    });
    const greyButton = document.querySelector(RANDOM_PICK_BUTTON_SELECTOR);
    if (greyButton) {
      greyButton.disabled = true;
      greyButton.setAttribute("disabled", "true");
    }
    const additionalGreyButton = document.querySelector(
      RANDOM_PICK_BUTTON_SELECTOR,
    );
    if (additionalGreyButton) {
      additionalGreyButton.disabled = true;
      additionalGreyButton.setAttribute("disabled", "true");
    }
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (cashoutButton) {
      const betButtonHTML = `<button type="button" tabindex="0" class="[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,&quot;salt&quot;_on)] inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md) [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] focus-visible:outline-white var(--ds-font-size-sm) shadow-md py-[0.625rem] px-[1.25rem]" style="background-color: #1267c6; color: white;" data-testid="bet-button">Bet</button>`;
      cashoutButton.outerHTML = betButtonHTML;
      setupBetButton();
      setupBetButtonAttributeMonitor();
    }
    minePositions = [];
    gemPositions = [];
    predictedSafePositions = [];
    predictedMinePositions = [];
    initialMinesCount = 0;
    initialGemsCount = 0;
    currentGemsCount = 0;
    revealedGemsCount = 0;
    pendingTileAnimations = 0;
    isFirstGame = false;
  }
  function addWinModalStyles() {
    if (document.getElementById("win-modal-styles")) {
      return;
    }
    const style = document.createElement("style");
    style.id = "win-modal-styles";
    style.textContent = `\n            .game-result-wrap.svelte-1g8uakg {\n                background: var(--color-grey-600);\n                border-radius: 16px;\n                text-align: center;\n                position: absolute;\n                font-weight: var(--ds-font-weight-heavy);\n                top: 50%;\n                left: 50%;\n                transform: translate(-50%, -50%) scale(1);\n                width: var(--modal-width);\n                height: var(--modal-height);\n                overflow: hidden;\n                animation-duration: var(--duration);\n                border: 6px solid;\n                box-shadow: var(--shadows-lg);\n                padding: var(--spacing-3);\n            }\n\n            .game-result-wrap.win.svelte-1g8uakg {\n                border-color: var(--color-green-500);\n            }\n\n            .game-result-wrap.svelte-1g8uakg {\n                animation: winModalAppear var(--duration) ease-out;\n            }\n\n            @keyframes winModalAppear {\n                0% {\n                    transform: translate(-50%, -50%) scale(0.8);\n                    opacity: 0;\n                }\n                50% {\n                    transform: translate(-50%, -50%) scale(1.05);\n                }\n                100% {\n                    transform: translate(-50%, -50%) scale(1);\n                    opacity: 1;\n                }\n            }\n        `;
    document.head.appendChild(style);
  }
  function showGameResultModal() {
    if (typeof window.clearPredictionGrid === "function") {
      window.clearPredictionGrid();
    }
    playSound("win");
    addWinModalStyles();
    const finalMultiplier = calculateMultiplier(
      initialMinesCount,
      revealedGemsCount,
    );
    const profitUSD = betAmount * (finalMultiplier - 1);
    const profitBTC = profitUSD / getStableCryptoPrice();
    const totalWinUSD = profitUSD + betAmount;
    const modalHTML = `\n            <div class="game-result-wrap win svelte-1g8uakg" style="--duration: 300ms; --modal-width: 150px; --modal-height: 132px; --win-modal-heading-color: #B1BAD3; z-index: 65 !important;" bis_skin_checked="1">\n                <div class="game-result-content svelte-1g8uakg" bis_skin_checked="1">\n                    <span class="number-multiplier svelte-1g8uakg" style="--truncate-max-width: 118px;">\n                        <span tag="span" type="body" strong="true" size="md" class="ds-body-md-strong" data-ds-text="true">${finalMultiplier.toFixed(2)}×</span>\n                    </span>\n                    <div class="divider svelte-1g8uakg" bis_skin_checked="1"></div>\n                    <span class="payout-result win svelte-1g8uakg">\n                        <div role="presentation" class="inline-flex items-center gap-1 max-w-full text-center svelte-1jb7pu8" bis_skin_checked="1">\n                            <span class="content svelte-1jb7pu8" style="max-width: 98px;">\n                                <span tag="span" type="body" class="text-neutral-subtle ds-body-md-strong text-center" size="md" strong="true" variant="neutral-subtle" data-ds-text="true" style="max-width: 98px;">$${totalWinUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>\n                            </span>\n                            <span tag="span" type="body" title="${getCurrentCrypto().toLowerCase()}" size="md" class="ds-body-md inline-flex" data-ds-text="true">\n                                ${getCurrentCryptoIconSvg()}\n                            </span>\n                        </div>\n                    </span>\n                </div>\n            </div>\n        `;
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (tilesContainer) {
      tilesContainer.insertAdjacentHTML("beforeend", modalHTML);
    } else {
    }
  }
  function getRandomPositions(totalTiles, minesCount) {
    const positions = new Set();
    while (positions.size < minesCount) {
      const randomPos = Math.floor(Math.random() * totalTiles);
      positions.add(randomPos);
    }
    return Array.from(positions);
  }
  function syncHiddenBoardMineLayoutFromPage(tileCount) {
    if (!Number.isFinite(tileCount) || tileCount < 1) return;
    var minesCount = readMinesCountFromPage();
    var mc = Math.max(1, Math.min(minesCount, tileCount - 1));
    minePositions = getRandomPositions(tileCount, mc);
    gemPositions = [];
    for (var i = 0; i < tileCount; i++) {
      if (minePositions.indexOf(i) === -1) gemPositions.push(i);
    }
    initialMinesCount = mc;
    initialGemsCount = tileCount - mc;
    currentGemsCount = initialGemsCount;
    revealedGemsCount = 0;
  }
  function corruptPredictions(totalTiles) {
    if (predictionMode === "basic") {
      const wrongCount = Math.min(
        2,
        Math.min(predictedSafePositions.length, minePositions.length),
      );
      if (wrongCount > 0) {
        const wrongSafe = predictedSafePositions
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, wrongCount);
        const wrongMines = minePositions
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, wrongCount);
        predictedSafePositions = predictedSafePositions.filter(
          (pos) => !wrongSafe.includes(pos),
        );
        predictedSafePositions = predictedSafePositions.concat(wrongMines);
      }
    } else {
      const wrongCount = Math.min(
        5,
        Math.min(predictedSafePositions.length, predictedMinePositions.length),
      );
      if (wrongCount > 0) {
        const wrongSafe = predictedSafePositions
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, wrongCount);
        const wrongMines = predictedMinePositions
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, wrongCount);
        predictedSafePositions = predictedSafePositions.filter(
          (pos) => !wrongSafe.includes(pos),
        );
        predictedSafePositions = predictedSafePositions.concat(wrongMines);
        predictedMinePositions = predictedMinePositions.filter(
          (pos) => !wrongMines.includes(pos),
        );
        predictedMinePositions = predictedMinePositions.concat(wrongSafe);
      }
    }
  }
  function clearTileHighlights(tiles) {
    tiles.forEach((tile) => {
      tile.style.boxShadow = "";
      tile.style.border = "";
      tile.style.backgroundColor = "";
      const bombIcon = tile.querySelector(".predicted-bomb-icon");
      if (bombIcon) bombIcon.remove();
      const coverElement = tile.querySelector(TILES_GREY_COVER_SELECTOR);
      if (coverElement) {
        coverElement.style.background = "";
        coverElement.style.border = "";
      }
    });
  }
  function addBombOverlayToTile(tile) {
    if (!tile || tile.querySelector(".predicted-bomb-icon")) return;
    tile.style.position = "relative";
    const iconWrap = document.createElement("div");
    iconWrap.className = "predicted-bomb-icon";
    iconWrap.innerHTML = BOMB_ICON_SVG;
    tile.appendChild(iconWrap);
  }
  function highlightTiles(tiles, minePositions) {
    const highlightedMineIndex =
      predictedMinePositions.length > 0
        ? predictedMinePositions[0]
        : minePositions.length > 0
          ? minePositions[0]
          : -1;
    tiles.forEach((tile, index) => {
      const coverElement = tile.querySelector(TILES_GREY_COVER_SELECTOR);
      const isPredictedMine = index === highlightedMineIndex;
      if (typeof window.setPredictionBox === "function") {
        const predictionGrid = document.getElementById("prediction-grid");
        if (predictionGrid) {
          const boxes = predictionGrid.querySelectorAll(".prediction-box");
          if (boxes[index]) {
            boxes[index].classList.remove("lit-up");
          }
        }
      }
      if (isPredictedMine) {
        if (coverElement) {
          coverElement.style.background = "";
          coverElement.style.border = "2px solid #ff2e2e";
        }
        addBombOverlayToTile(tile);
        if (typeof window.setPredictionBox === "function") {
          window.setPredictionBox(index, "cross");
        }
      } else {
        if (coverElement) {
          coverElement.style.background = "";
          coverElement.style.border = "";
        }
        if (typeof window.setPredictionBox === "function") {
          window.setPredictionBox(index, "unknown");
        }
      }
    });
  }
  function generatePredictionsFromBoard() {
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (!tilesContainer) return;
    const tiles = tilesContainer.querySelectorAll(TILE_SELECTOR);
    if (tiles.length === 0) return;
    if (minePositions.length === 0 && gemPositions.length === 0) return;
    if (predictionMode === "basic") {
      const safeCount = Math.min(5, gemPositions.length);
      const shuffledGems = gemPositions.slice().sort(() => Math.random() - 0.5);
      predictedSafePositions = shuffledGems.slice(0, safeCount);
      predictedMinePositions = [];
    } else {
      predictedSafePositions = gemPositions.slice();
      predictedMinePositions = minePositions.slice();
    }
  }
  function cloneTilesOnLoad() {
    const tilesContainer = document.querySelector(
      GAME_TILES_CONTAINER_SELECTOR,
    );
    if (!tilesContainer) {
      return;
    }
    const tiles = tilesContainer.querySelectorAll(TILE_SELECTOR);
    if (tiles.length === 0) {
      return;
    }
    syncHiddenBoardMineLayoutFromPage(tiles.length);
    predictedSafePositions = [];
    predictedMinePositions = [];
    tiles.forEach((tile, index) => {
      const newTile = tile.cloneNode(true);
      const clickHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        handleTileClick(newTile, index);
      };
      newTile.addEventListener("click", clickHandler);
      newTile.style.cursor = "pointer";
      tile.parentNode.replaceChild(newTile, tile);
    });
    window.originalTiles = Array.from(
      tilesContainer.querySelectorAll(TILE_SELECTOR),
    ).map((tile) => tile.cloneNode(true));
  }
  function handleTileClick(tile, tileIndex) {
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (!cashoutButton) {
      return;
    }
    if (
      tile.disabled ||
      tile.classList.contains("gem") ||
      tile.classList.contains("mine")
    ) {
      return;
    }
    if (tile.classList.contains("fetching")) {
      return;
    }
    const isPredictedSafe =
      tile.getAttribute("data-predicted-gem") === "true" ||
      predictedSafePositions.includes(tileIndex);
    const isActuallyMine = minePositions.includes(tileIndex);
    if (isActuallyMine) {
      cancelPendingBatchedReveals();
      animateCashoutButton();
      const additionalGreyButton = document.querySelector(
        RANDOM_PICK_BUTTON_SELECTOR,
      );
      if (additionalGreyButton) {
        additionalGreyButton.disabled = true;
        additionalGreyButton.setAttribute("disabled", "true");
      }
      revealMineTile(tile, tileIndex);
      return;
    }
    pendingTiles.push({ tile: tile, tileIndex: tileIndex });
    tile.classList.remove("idle");
    tile.classList.add("fetching");
    const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
    if (cover) {
      cover.classList.remove("idle");
      cover.classList.add("fetching");
    }
    if (pendingTiles.length === 1) {
      animateCashoutButton();
    }
    if (batchTimeout) {
      clearTimeout(batchTimeout);
    }
    batchTimeout = setTimeout(() => {
      revealBatchedTiles();
    }, 250);
  }
  function cancelPendingBatchedReveals() {
    if (batchTimeout) {
      clearTimeout(batchTimeout);
      batchTimeout = null;
    }
    if (batchRevealCommitTimeout) {
      clearTimeout(batchRevealCommitTimeout);
      batchRevealCommitTimeout = null;
    }
    pendingTiles.forEach(({ tile: tile }) => {
      if (
        !tile ||
        tile.disabled ||
        tile.classList.contains("gem") ||
        tile.classList.contains("mine")
      )
        return;
      tile.classList.remove("fetching");
      tile.classList.add("idle");
      const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
      if (cover) {
        cover.classList.remove("fetching");
        cover.classList.add("idle");
      }
    });
    pendingTiles = [];
  }
  function revealBatchedTiles() {
    batchRevealCommitTimeout = setTimeout(() => {
      batchRevealCommitTimeout = null;
      const mineTiles = pendingTiles.filter(({ tileIndex: tileIndex }) =>
        minePositions.includes(tileIndex),
      );
      if (mineTiles.length > 0) {
        mineTiles.forEach(({ tile: tile, tileIndex: tileIndex }) => {
          tile.classList.remove("idle");
          tile.classList.add("fetching");
          setTimeout(() => {
            const mineHTML = `\x3c!----\x3e\x3c!----\x3e<img alt="mine effect" class="effect svelte-sx409p" src="/_app/immutable/assets/mineEffect.CTwuSNug.gif" style="z-index: 1000;">\x3c!----\x3e <div class="mine svelte-sx409p revealed" style="background-image: url(&quot;/_app/immutable/assets/mine.BrdEJX0T.svg&quot;); --duration: 300ms; z-index: 1001;" bis_skin_checked="1"></div>\x3c!----\x3e <div class="cover mine svelte-12ha7jh" bis_skin_checked="1"></div>`;
            tile.innerHTML = mineHTML;
            tile.classList.remove("fetching");
            tile.classList.add("mine");
            tile.setAttribute("data-revealed", "true");
            tile.disabled = true;
            if (typeof window.markPredictionBoxRevealed === "function") {
              window.markPredictionBoxRevealed(tileIndex);
            }
            if (typeof window.clearPredictionGrid === "function") {
              setTimeout(() => {
                window.clearPredictionGrid();
              }, 800);
            }
          }, 100);
        });
        playSound("mine");
        setTimeout(() => {
          enableGameControls();
          resetToBetButton();
        }, 500);
      } else {
        pendingTiles.forEach(({ tile: tile, tileIndex: tileIndex }) => {
          revealGemTile(tile, tileIndex, true);
        });
        const finalGemsCount = currentGemsCount;
        const gemSound = getGemSound(finalGemsCount);
        const tileCount = pendingTiles.length;
        const layers = Math.min(tileCount, 5);
        playSoundLayered(gemSound, layers);
      }
      pendingTiles = [];
      batchTimeout = null;
    }, 100);
  }
  function animateCashoutButton() {
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (!cashoutButton) {
      return;
    }
    if (cashoutButton.classList.contains("animating")) {
      return;
    }
    cashoutButton.classList.add("animating");
    cashoutButton.disabled = true;
    const additionalGreyButton = document.querySelector(
      RANDOM_PICK_BUTTON_SELECTOR,
    );
    if (additionalGreyButton) {
      additionalGreyButton.disabled = true;
      additionalGreyButton.setAttribute("disabled", "true");
    }
    const cashoutText = cashoutButton.querySelector(
      CASHOUT_BUTTON_TEXT_SELECTOR,
    );
    if (cashoutText) {
      cashoutText.classList.add("invisible");
    }
    const animationHTML = `<div class="inline-flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" bis_skin_checked="1"><div class="wobble svelte-3k7g21" bis_skin_checked="1"><svg data-ds-icon="Casino" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="inline-block shrink-0">\x3c!----\x3e<path fill="currentColor" d="m2.14 4.63 7.25-3.38c.63-.3 1.34-.23 1.89.11-.09.14-.18.28-.26.43L4.81 15.1 1.17 7.29c-.47-1-.03-2.19.97-2.66"></path><path fill="currentColor" fill-rule="evenodd" d="m21.86 4.63-7.25-3.38c-1-.47-2.19-.03-2.66.97l-6.76 14.5c-.47 1-.03 2.19.97 2.66l7.25 3.38c1 .47 2.19.03 2.66-.97l6.76-14.5c.47-1 .03-2.19-.97-2.66m-9.54 11-.85-4.81 4.23-2.44.85 4.81z" clip-rule="evenodd"></path></svg>\x3c!----\x3e</div>\x3c!----\x3e</div>\x3c!----\x3e`;
    cashoutButton.insertAdjacentHTML("afterbegin", animationHTML);
  }
  function stopCashoutButtonAnimation() {
    const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
    if (!cashoutButton) {
      return;
    }
    pendingTileAnimations--;
    if (pendingTileAnimations > 0) {
      cashoutButton.disabled = true;
      return;
    }
    cashoutButton.classList.remove("animating");
    const animationDiv = cashoutButton.querySelector(
      CASHOUT_BUTTON_LOADING_ANIMATION_DIV_SELECTOR,
    );
    if (animationDiv) {
      animationDiv.remove();
    }
    const cashoutText = cashoutButton.querySelector(
      CASHOUT_BUTTON_TEXT_SELECTOR,
    );
    if (cashoutText) {
      cashoutText.classList.remove("invisible");
    }
    cashoutButton.disabled = false;
    const additionalGreyButton = document.querySelector(
      RANDOM_PICK_BUTTON_SELECTOR,
    );
    if (additionalGreyButton) {
      additionalGreyButton.disabled = false;
      additionalGreyButton.removeAttribute("disabled");
    }
  }
  function revealGemTile(tile, tileIndex, isBatched = false) {
    pendingTileAnimations++;
    tile.classList.remove("idle");
    tile.classList.add("fetching");
    const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
    if (cover) {
      cover.classList.remove("idle");
      cover.classList.add("fetching");
    }
    setTimeout(() => {
      const gemHTML = `<div class="gem svelte-1qwk2y9 revealed" style="--mine: url(/_app/immutable/assets/gem-none.Bcv6X_BH.svg); --duration: 300ms;" bis_skin_checked="1"><div class="motion svelte-1qwk2y9" bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 280" width="308" height="280" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_2"><rect width="308" height="280" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_2)"><g transform="matrix(4,0,0,4,0.579010009765625,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,38.30699920654297,35)"><path fill="rgb(5,29,39)" fill-opacity="1" d=" M-0.2809999883174896,35 C-0.2809999883174896,35 -0.29600000381469727,35 -0.29600000381469727,35 C-1.0740000009536743,34.99599838256836 -1.815000057220459,34.6619987487793 -2.3340001106262207,34.082000732421875 C-2.3340001106262207,34.082000732421875 -37.606998443603516,-5.380000114440918 -37.606998443603516,-5.380000114440918 C-38.409000396728516,-6.2769999504089355 -38.53499984741211,-7.591000080108643 -37.91899871826172,-8.625 C-37.91899871826172,-8.625 -27.281999588012695,-26.45400047302246 -27.281999588012695,-26.45400047302246 C-26.988000869750977,-26.94700050354004 -26.547000885009766,-27.336000442504883 -26.020000457763672,-27.56599998474121 C-26.020000457763672,-27.56599998474121 -15.1899995803833,-32.29399871826172 -15.1899995803833,-32.29399871826172 C-14.991000175476074,-32.38100051879883 -14.781999588012695,-32.444000244140625 -14.567999839782715,-32.481998443603516 C-14.567999839782715,-32.481998443603516 -0.5709999799728394,-34.95800018310547 -0.5709999799728394,-34.95800018310547 C-0.2529999911785126,-35.013999938964844 0.0729999989271164,-35.013999938964844 0.38999998569488525,-34.95800018310547 C0.38999998569488525,-34.95800018310547 14.312999725341797,-32.481998443603516 14.312999725341797,-32.481998443603516 C14.526000022888184,-32.444000244140625 14.732999801635742,-32.38100051879883 14.930000305175781,-32.29499816894531 C14.930000305175781,-32.29499816894531 26.114999771118164,-27.423999786376953 26.114999771118164,-27.423999786376953 C26.1560001373291,-27.4060001373291 26.197999954223633,-27.386999130249023 26.23900032043457,-27.367000579833984 C26.23900032043457,-27.367000579833984 26.242000579833984,-27.364999771118164 26.242000579833984,-27.364999771118164 C26.242000579833984,-27.364999771118164 26.243999481201172,-27.36400032043457 26.243999481201172,-27.36400032043457 C26.243999481201172,-27.36400032043457 26.2450008392334,-27.36400032043457 26.246000289916992,-27.363000869750977 C26.246000289916992,-27.363000869750977 26.249000549316406,-27.36199951171875 26.249000549316406,-27.36199951171875 C26.249000549316406,-27.36199951171875 26.249000549316406,-27.361000061035156 26.25,-27.361000061035156 C26.492000579833984,-27.240999221801758 26.711999893188477,-27.086999893188477 26.9060001373291,-26.9060001373291 C26.9060001373291,-26.905000686645508 26.9060001373291,-26.905000686645508 26.9060001373291,-26.905000686645508 C26.906999588012695,-26.90399932861328 26.908000946044922,-26.902999877929688 26.909000396728516,-26.902000427246094 C27.059999465942383,-26.760000228881836 27.195999145507812,-26.60099983215332 27.312999725341797,-26.424999237060547 C27.31399917602539,-26.424999237060547 27.31399917602539,-26.423999786376953 27.31399917602539,-26.423999786376953 C27.31399917602539,-26.423999786376953 27.31399917602539,-26.42300033569336 27.31399917602539,-26.42300033569336 C27.344999313354492,-26.378000259399414 27.37299919128418,-26.332000732421875 27.402000427246094,-26.284000396728516 C27.402000427246094,-26.284000396728516 37.926998138427734,-8.402000427246094 37.926998138427734,-8.402000427246094 C38.53900146484375,-7.361000061035156 38.402000427246094,-6.041999816894531 37.58700180053711,-5.14900016784668 C37.58700180053711,-5.14900016784668 1.7519999742507935,34.104000091552734 1.7519999742507935,34.104000091552734 C1.2309999465942383,34.67499923706055 0.492000013589859,35 -0.2809999883174896,35z"></path></g><g opacity="1" transform="matrix(1,0,0,1,38.30699920654297,35)"><path fill="rgb(86,252,126)" fill-opacity="1" d=" M25.023000717163086,-24.89699935913086 C25.023000717163086,-24.89699935913086 13.831999778747559,-29.77199935913086 13.831999778747559,-29.77199935913086 C13.831999778747559,-29.77199935913086 -0.09099999815225601,-32.24700164794922 -0.09099999815225601,-32.24700164794922 C-0.09099999815225601,-32.24700164794922 -14.088000297546387,-29.77199935913086 -14.088000297546387,-29.77199935913086 C-14.088000297546387,-29.77199935913086 -24.917999267578125,-25.04400062561035 -24.917999267578125,-25.04400062561035 C-24.917999267578125,-25.04400062561035 -35.55400085449219,-7.215000152587891 -35.55400085449219,-7.215000152587891 C-35.55400085449219,-7.215000152587891 -0.2809999883174896,32.24700164794922 -0.2809999883174896,32.24700164794922 C-0.2809999883174896,32.24700164794922 35.55400085449219,-7.00600004196167 35.55400085449219,-7.00600004196167 C35.55400085449219,-7.00600004196167 25.023000717163086,-24.89699935913086 25.023000717163086,-24.89699935913086z"></path></g><g opacity="1" transform="matrix(1,0,0,1,30.392000198364258,28.7549991607666)"><path fill="rgb(6,227,3)" fill-opacity="1" d=" M-8.263999938964844,-10.008000373840332 C-8.263999938964844,-10.008000373840332 -6.172999858856201,10.008000373840332 -6.172999858856201,10.008000373840332 C-6.172999858856201,10.008000373840332 8.263999938964844,-6.982999801635742 8.263999938964844,-6.982999801635742 C8.263999938964844,-6.982999801635742 -8.263999938964844,-10.008000373840332 -8.263999938964844,-10.008000373840332z"></path></g><g opacity="1" transform="matrix(1,0,0,1,64.11799621582031,19.048999786376953)"><path fill="rgb(5,169,2)" fill-opacity="1" d=" M9.743000030517578,8.944999694824219 C9.743000030517578,8.944999694824219 -0.7879999876022339,-8.944999694824219 -0.7879999876022339,-8.944999694824219 C-0.7879999876022339,-8.944999694824219 -9.743000030517578,-0.041999999433755875 -9.743000030517578,-0.041999999433755875 C-9.743000030517578,-0.041999999433755875 9.743000030517578,8.944999694824219 9.743000030517578,8.944999694824219z"></path></g><g opacity="1" transform="matrix(1,0,0,1,62.303001403808594,28.743000030517578)"><path fill="rgb(3,189,2)" fill-opacity="1" d=" M-11.557999610900879,9.736000061035156 C-11.557999610900879,9.736000061035156 11.557999610900879,-0.7490000128746033 11.557999610900879,-0.7490000128746033 C11.557999610900879,-0.7490000128746033 -7.928999900817871,-9.736000061035156 -7.928999900817871,-9.736000061035156 C-7.928999900817871,-9.736000061035156 -11.557999610900879,9.736000061035156 -11.557999610900879,9.736000061035156z"></path></g><g opacity="1" transform="matrix(1,0,0,1,46.43199920654297,28.757999420166016)"><path fill="rgb(1,228,1)" fill-opacity="1" d=" M-7.941999912261963,-6.822000026702881 C-7.941999912261963,-6.822000026702881 4.245999813079834,9.75100040435791 4.245999813079834,9.75100040435791 C4.245999813079834,9.75100040435791 4.313000202178955,9.720999717712402 4.313000202178955,9.720999717712402 C4.313000202178955,9.720999717712402 7.941999912261963,-9.75100040435791 7.941999912261963,-9.75100040435791 C7.941999912261963,-9.75100040435791 -7.941999912261963,-6.822000026702881 -7.941999912261963,-6.822000026702881z"></path></g><g opacity="1" transform="matrix(1,0,0,1,37.44900131225586,30.350000381469727)"><path fill="rgb(0,212,3)" fill-opacity="1" d=" M-13.229999542236328,8.413000106811523 C-13.229999542236328,8.413000106811523 13.229999542236328,8.15999984741211 13.229999542236328,8.15999984741211 C13.229999542236328,8.15999984741211 1.0410000085830688,-8.413000106811523 1.0410000085830688,-8.413000106811523 C1.0410000085830688,-8.413000106811523 -13.229999542236328,8.413000106811523 -13.229999542236328,8.413000106811523z"></path></g><g opacity="1" transform="matrix(1,0,0,1,13.486000061035156,28.83799934387207)"><path fill="rgb(8,252,2)" fill-opacity="1" d=" M-10.732999801635742,-1.0520000457763672 C-10.732999801635742,-1.0520000457763672 10.732999801635742,9.925000190734863 10.732999801635742,9.925000190734863 C10.732999801635742,9.925000190734863 8.807000160217285,-9.925000190734863 8.807000160217285,-9.925000190734863 C8.807000160217285,-9.925000190734863 -10.732999801635742,-1.0520000457763672 -10.732999801635742,-1.0520000457763672z"></path></g><g opacity="1" transform="matrix(1,0,0,1,37.481998443603516,52.862998962402344)"><path fill="rgb(8,252,2)" fill-opacity="1" d=" M13.196999549865723,-14.354000091552734 C13.196999549865723,-14.354000091552734 -13.262999534606934,-14.10099983215332 -13.262999534606934,-14.10099983215332 C-13.262999534606934,-14.10099983215332 0.5450000166893005,14.383000373840332 0.5450000166893005,14.383000373840332 C0.5450000166893005,14.383000373840332 13.196000099182129,-14.02299976348877 13.196000099182129,-14.02299976348877 C13.196000099182129,-14.02299976348877 13.262999534606934,-14.383000373840332 13.262999534606934,-14.383000373840332 C13.262999534606934,-14.383000373840332 13.196999549865723,-14.354000091552734 13.196999549865723,-14.354000091552734z"></path></g><g opacity="1" transform="matrix(1,0,0,1,55.944000244140625,47.62099838256836)"><path fill="rgb(1,153,2)" fill-opacity="1" d=" M-5.198999881744385,-9.142000198364258 C-5.198999881744385,-9.142000198364258 -5.265999794006348,-8.781000137329102 -5.265999794006348,-8.781000137329102 C-5.265999794006348,-8.781000137329102 -17.91699981689453,19.625999450683594 -17.91699981689453,19.625999450683594 C-17.91699981689453,19.625999450683594 17.91699981689453,-19.625999450683594 17.91699981689453,-19.625999450683594 C17.91699981689453,-19.625999450683594 -5.198999881744385,-9.142000198364258 -5.198999881744385,-9.142000198364258z"></path></g><g opacity="1" transform="matrix(1,0,0,1,20.388999938964844,47.51599884033203)"><path fill="rgb(1,226,0)" fill-opacity="1" d=" M-17.636999130249023,-19.729999542236328 C-17.636999130249023,-19.729999542236328 17.636999130249023,19.729999542236328 17.636999130249023,19.729999542236328 C17.636999130249023,19.729999542236328 3.8289999961853027,-8.753000259399414 3.8289999961853027,-8.753000259399414 C3.8289999961853027,-8.753000259399414 -17.636999130249023,-19.729999542236328 -17.636999130249023,-19.729999542236328z"></path></g><g opacity="1" transform="matrix(1,0,0,1,38.35900115966797,12.345000267028809)"><path fill="rgb(8,252,2)" fill-opacity="1" d=" M13.779000282287598,-7.117000102996826 C13.779000282287598,-7.117000102996826 -0.14399999380111694,-9.592000007629395 -0.14399999380111694,-9.592000007629395 C-0.14399999380111694,-9.592000007629395 -14.140999794006348,-7.117000102996826 -14.140999794006348,-7.117000102996826 C-14.140999794006348,-7.117000102996826 -24.97100067138672,-2.3889999389648438 -24.97100067138672,-2.3889999389648438 C-24.97100067138672,-2.3889999389648438 -19.09000015258789,3.5269999504089355 -19.09000015258789,3.5269999504089355 C-19.09000015258789,3.5269999504089355 -16.06599998474121,6.567999839782715 -16.06599998474121,6.567999839782715 C-16.06599998474121,6.567999839782715 -8.567999839782715,7.9670000076293945 -8.567999839782715,7.9670000076293945 C-8.567999839782715,7.9670000076293945 0.13199999928474426,9.592000007629395 0.13199999928474426,9.592000007629395 C0.13199999928474426,9.592000007629395 16.013999938964844,6.660999774932861 16.013999938964844,6.660999774932861 C16.013999938964844,6.660999774932861 24.97100067138672,-2.242000102996826 24.97100067138672,-2.242000102996826 C24.97100067138672,-2.242000102996826 13.779000282287598,-7.117000102996826 13.779000282287598,-7.117000102996826z"></path></g><g opacity="1" transform="matrix(1,0,0,1,12.52299976348877,18.871000289916992)"><path fill="rgb(86,252,126)" fill-opacity="1" d=" M6.747000217437744,-2.999000072479248 C6.747000217437744,-2.999000072479248 0.8659999966621399,-8.914999961853027 0.8659999966621399,-8.914999961853027 C0.8659999966621399,-8.914999961853027 -9.770000457763672,8.914999961853027 -9.770000457763672,8.914999961853027 C-9.770000457763672,8.914999961853027 9.770000457763672,0.041999999433755875 9.770000457763672,0.041999999433755875 C9.770000457763672,0.041999999433755875 6.747000217437744,-2.999000072479248 6.747000217437744,-2.999000072479248z"></path></g><g opacity="1" transform="matrix(1,0,0,1,25.80299949645996,6.790999889373779)"><path fill="rgb(86,252,126)" fill-opacity="1" d=" M-11.90999984741211,4.038000106811523 C-11.90999984741211,4.038000106811523 -1.437000036239624,-1.3650000095367432 -1.437000036239624,-1.3650000095367432 C-1.437000036239624,-1.3650000095367432 12.413000106811523,-4.038000106811523 12.413000106811523,-4.038000106811523 C12.413000106811523,-4.038000106811523 -1.5829999446868896,-1.562999963760376 -1.5829999446868896,-1.562999963760376 C-1.5829999446868896,-1.562999963760376 -12.413000106811523,3.1649999618530273 -12.413000106811523,3.1649999618530273 C-12.413000106811523,3.1649999618530273 -11.90999984741211,4.038000106811523 -11.90999984741211,4.038000106811523z"></path></g><g opacity="1" transform="matrix(1,0,0,1,22.658000946044922,28.836999893188477)"><path fill="rgb(86,252,126)" fill-opacity="1" d=" M-0.36500000953674316,-9.925000190734863 C-0.36500000953674316,-9.925000190734863 1.5609999895095825,9.925000190734863 1.5609999895095825,9.925000190734863 C1.5609999895095825,9.925000190734863 -1.5609999895095825,-9.788999557495117 -1.5609999895095825,-9.788999557495117 C-1.5609999895095825,-9.788999557495117 -0.36500000953674316,-9.925000190734863 -0.36500000953674316,-9.925000190734863z"></path></g><g opacity="1" transform="matrix(1,0,0,1,30.391000747680664,20.697999954223633)"><path fill="rgb(86,252,126)" fill-opacity="1" d=" M-8.097999572753906,-1.7860000133514404 C-8.097999572753906,-1.7860000133514404 8.097999572753906,1.2380000352859497 8.097999572753906,1.2380000352859497 C8.097999572753906,1.2380000352859497 7.635000228881836,1.7860000133514404 7.635000228881836,1.7860000133514404 C7.635000228881836,1.7860000133514404 -8.097999572753906,-1.7860000133514404 -8.097999572753906,-1.7860000133514404z"></path></g><g opacity="1" transform="matrix(1,0,0,1,58.165000915527344,14.6899995803833)"><path fill="rgb(86,252,126)" fill-opacity="1" d=" M5.164999961853027,-4.586999893188477 C5.164999961853027,-4.586999893188477 -5.164999961853027,4.586999893188477 -5.164999961853027,4.586999893188477 C-5.164999961853027,4.586999893188477 -3.7899999618530273,4.315999984741211 -3.7899999618530273,4.315999984741211 C-3.7899999618530273,4.315999984741211 5.164999961853027,-4.586999893188477 5.164999961853027,-4.586999893188477z"></path></g></g><g style="display: none;"><g><path></path></g></g><g style="display: none;"><g><path></path></g></g><g style="display: none;"><g><path></path></g></g><g style="display: none;"><g><path></path></g></g><g style="display: none;"><g><path></path></g></g><g style="display: none;"><g><path></path></g></g></g></svg></div></div>`;
      tile.insertAdjacentHTML("afterbegin", gemHTML);
      tile.classList.remove("fetching");
      tile.classList.add("gem");
      if (cover) {
        cover.classList.remove("fetching");
        cover.classList.add("gem");
      }
      tile.setAttribute("data-revealed", "true");
      tile.disabled = true;
      if (typeof window.markPredictionBoxRevealed === "function") {
        window.markPredictionBoxRevealed(tileIndex);
      }
      currentGemsCount--;
      revealedGemsCount++;
      if (revealedGemsCount === 1) {
        const cashoutButton = document.querySelector(CASHOUT_BUTTON_SELECTOR);
        if (cashoutButton) {
          cashoutButton.disabled = false;
          cashoutButton.classList.remove("disabled");
        }
      }
      const gemsInput = document.querySelector(GEMS_INPUT_SELECTOR);
      if (gemsInput) {
        gemsInput.value = currentGemsCount;
      }
      updateProfitDisplay();
      if (!isBatched) {
        const gemSound = getGemSound(currentGemsCount);
        playSound(gemSound);
      }
      stopCashoutButtonAnimation();
      if (currentGemsCount === 0) {
        setTimeout(() => {
          showGameResultModal();
          revealAllRemainingTiles();
          enableGameControls();
          resetToBetButton();
        }, 600);
      }
    }, 75);
  }
  function revealMineTile(tile, tileIndex) {
    pendingTileAnimations++;
    tile.classList.remove("idle");
    tile.classList.add("fetching");
    const cover = tile.querySelector(TILES_GREY_COVER_SELECTOR);
    if (cover) {
      cover.classList.remove("idle");
      cover.classList.add("fetching");
    }
    setTimeout(() => {
      const mineHTML = `\x3c!----\x3e\x3c!----\x3e<img alt="mine effect" class="effect svelte-sx409p" src="/_app/immutable/assets/mineEffect.CTwuSNug.gif" style="z-index: 1000;">\x3c!----\x3e <div class="mine svelte-sx409p revealed" style="background-image: url(&quot;/_app/immutable/assets/mine.BrdEJX0T.svg&quot;); --duration: 300ms; z-index: 1001;" bis_skin_checked="1"></div>\x3c!----\x3e <div class="cover mine svelte-12ha7jh" bis_skin_checked="1"></div>`;
      tile.innerHTML = mineHTML;
      tile.classList.remove("fetching");
      tile.classList.add("mine");
      tile.setAttribute("data-revealed", "true");
      tile.disabled = true;
      if (typeof window.clearPredictionGrid === "function") {
        setTimeout(() => {
          window.clearPredictionGrid();
        }, 1500);
      }
      playSound("mine");
      const profitMultiplier = document.querySelector(
        PROFIT_MULTIPLIER_SELECTOR,
      );
      if (profitMultiplier) {
        profitMultiplier.textContent = "Total Profit (1.00×)";
      }
      const profitBTC = document.querySelector(PROFIT_BTC_SELECTOR);
      if (profitBTC) {
        profitBTC.textContent = "0.00000000 " + getCurrentCrypto();
      }
      const profitUSD = document.querySelector(PROFIT_USD_SELECTOR);
      if (profitUSD) {
        profitUSD.value = "0.00";
      }
      pendingTileAnimations--;
      setTimeout(() => {
        revealAllRemainingTiles();
        enableGameControls();
        resetToBetButton();
      }, 350);
    }, 450);
  }
})();
