/**
 * ==============================================================================
 * Seasonal Celebration Card — Interactive Frontend Logic
 * ==============================================================================
 * Features:
 * - Dynamic Date-based seasonal heading & theme auto-detection:
 *   • Before Sep 22: 'Happy Birthday!'
 *   • Sep 22 – Dec 25: 'Merry Christmas!'
 *   • Dec 25 – Jan 1: 'Happy New Year!'
 *   • Otherwise: 'Will you be my Valentine?'
 * - Animated seasonal jumping bears (SVG / GIF) matching each celebration
 * - Cursor-dodging 'Deny' button with safe 50px viewport boundaries
 * - Simultaneously scaling 'Accept' button by 1.2x on each dodge attempt
 * - Celebratory success state with canvas-confetti and jumping victory bear
 * - Real-time upward floating seasonal emojis (cakes, trees, fireworks, hearts)
 * - Interactive seasonal switcher pills for instant manual preview & testing
 * - Web Audio API cheerful acoustic chimes (zero external audio dependencies)
 * ==============================================================================
 */

// --------------------------------------------------------------------------
// 1. Seasonal Configurations & Theming
// --------------------------------------------------------------------------
const SEASONS = {
    birthday: {
        id: 'birthday',
        name: 'Birthday',
        themeClass: 'theme-birthday',
        heading: 'Happy Birthday',
        subMessage: 'Today is entirely about celebrating the most incredible person I know. Wishing you a day overflowing with sweet moments, endless laughter, and a love that grows exponentially. You deserve the entire universe and more! 🎂✨💖🥺',
        badge: '🎂 Special Day',
        bearNormal: './assets/bear-birthday.svg',
        bearSuccess: './assets/bear-birthday-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '🎂',
        denyText: 'Deny',
        denyEmoji: '🙈',
        denyPhrases: [
            "Deny", 
            "Are you seriously clicking this? 🥺", 
            "But I made this just for you! 🥺❤️", 
            "My heart is breaking a little 💔", 
            "Error: Your finger must have slipped! 🙈", 
            "Still trying? You're too cute! 🥰", 
            "The math says you must click Accept! 📈", 
            "Just surrender to the birthday love! 🎂", 
            "Click Accept for infinite hugs! 🧸💖"
        ],
        successHeading: 'Yaaay! Happy Birthday',
        successSubtext: 'My greatest wish is to see you smiling every single day. May this new chapter bring you closer to all your dreams, and I promise to be right here cheering you on through every beautiful moment. I love you endlessly! ✨💖🦋',
        celebrationBadge: '🎉 BEST BIRTHDAY EVER! 🎂',
        particleType: 'up',
        floatingEmojis: ['🎂', '🎈', '🍰', '🎁', '🎉', '✨', '🧁', '🥳', '💖', '🍭'],
        confettiColors: ['#ff758c', '#ffd166', '#ffb199', '#fbc2eb', '#06d6a0', '#ffffff']
    },
    christmas: {
        id: 'christmas',
        name: 'Christmas',
        themeClass: 'theme-christmas',
        heading: 'Merry Christmas, my love! 🎄❤️✨',
        subMessage: 'The holidays are magical, but absolutely nothing compares to the warmth and light you bring into my life every single day. Sending you the coziest winter vibes and all my love! 🎄❄️🥰☕',
        badge: '🎄 Holiday Magic',
        bearNormal: './assets/bear-christmas.svg',
        bearSuccess: './assets/bear-christmas-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '🎁',
        denyText: 'Deny',
        denyEmoji: '⛄',
        denyPhrases: [
            "Deny", 
            "Wait, are you sure? 🎄🥺", 
            "Santa is literally watching us 🎅", 
            "Don't break my heart this Christmas! 💔", 
            "Too slow for the mistletoe! ❄️💋", 
            "Cozy hugs are waiting for you over here! 👉", 
            "Slippery like ice! ⛸️", 
            "Just take my gift! 🎁", 
            "Holiday kisses await! ✨🥰"
        ],
        successHeading: 'Merry Christmas, my beautiful angel! 🎄🎅✨❤️',
        successSubtext: 'You are the absolute best gift I could ever ask for. May our holiday season be wrapped in warmth, sweet kisses, and cozy memories that we will cherish forever. Let\'s make this unforgettable! 🎁🍪💏',
        celebrationBadge: '🎄 MERRY & BRIGHT! 🎅',
        particleType: 'snow',
        floatingEmojis: ['❄️', '❅', '❆', '✻', '✨', '❤️', '🎁'],
        confettiColors: ['#d90429', '#2b9348', '#ffd166', '#ffffff', '#ef233c', '#55a630']
    },
    newyear: {
        id: 'newyear',
        name: 'New Year',
        themeClass: 'theme-newyear',
        heading: 'Happy New Yea',
        subMessage: 'As the year comes to a close, I am incredibly grateful that I get to walk into this brand-new chapter holding your hand. Cheers to our beautiful future together! 🎆🥂✨🥺',
        badge: '🎆 2026 Celebration',
        bearNormal: './assets/bear-newyear.svg',
        bearSuccess: './assets/bear-newyear-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '✨',
        denyText: 'Deny',
        denyEmoji: '🎇',
        denyPhrases: [
            "Deny", 
            "Are you sure? 🎆🥺", 
            "Don't ruin our midnight countdown! ⏳❤️", 
            "Think again, my love! 👀", 
            "Too slow! ⚡", 
            "Midnight toast over here! 👉🥂", 
            "We are going into 2026 together! 🛸", 
            "Say yes to us! 🌟", 
            "Our magic awaits! 💫🥰"
        ],
        successHeading: 'Cheers to us and an amazing 2026! 🎆🥂✨🥰',
        successSubtext: 'Here is to 365 new chances to shine, laugh, and write the next beautiful pages of our love story. There is no one else I would rather build a future with. I love you more than words can say! 🥳🌟💖🥂',
        celebrationBadge: '🎆 CHEERS TO US! 🥂',
        particleType: 'spark',
        floatingEmojis: ['✨', '🌟', '💫', '⭐', '🎇', '🥂', '💖', '🥰'],
        confettiColors: ['#ffd166', '#00f5d4', '#f72585', '#7209b7', '#ffffff', '#4cc9f0']
    },
    valentine: {
        id: 'valentine',
        name: 'Valentine',
        themeClass: 'theme-valentine',
        heading: 'will you be my Valentine? 🥺🌹💖',
        subMessage: 'Every single variable in my life changed for the better the moment I met you. Statistically and undeniably, you are my perfect match. Will you do me the absolute honor? 💌🦋🥺❤️',
        badge: '💖 Special Question',
        bearNormal: './assets/img1.gif',
        bearSuccess: './assets/img3.gif',
        acceptText: 'Accept',
        acceptEmoji: '💖',
        denyText: 'Deny',
        denyEmoji: '🥺',
        denyPhrases: [
            "Deny", 
            "Wait, seriously? 🥺", 
            "Recalculate that! 📊💔", 
            "Probability of clicking this: 0% 🛑", 
            "The limit does not exist! 📉", 
            "Graphing your hesitation... 🤔", 
            "Coordinate geometry says no! 🛸", 
            "Just optimize for Accept! 👉", 
            "Q.E.D. Just click Yes already! 🥰💋"
        ],
        successHeading: 'Hypothesis Confirmed! You said YES! 💖🌹🥰💍',
        successSubtext: 'My heart just skipped a beat! You are my absolute favorite person in the entire universe. Happy Valentine\'s Day! Let\'s keep optimizing our love forever and ever! ✨🥰🧸💘',
        celebrationBadge: '🎉 100% PROBABILITY OF HAPPINESS! 💖',
        particleType: 'up',
        floatingEmojis: ['💖', '❤️', '💘', '🌹', '💕', '💌', '💝', '🥰', '✨', '🌸', '🦋'],
        confettiColors: ['#ff2e63', '#ff6b8b', '#ff9a9e', '#fbc2eb', '#ffffff', '#ffd166']
    }
};

/**
 * Generates personalized headings based on URL recipient parameter (?to=Lucie or ?name=...)
 */
function getPersonalizedHeading(seasonKey, name) {
    if (!name) return SEASONS[seasonKey].heading;
    switch (seasonKey) {
        case 'birthday':
            return `Happy Birthday, ${name}!`;
        case 'christmas':
            return `Merry Christmas, ${name}!`;
        case 'newyear':
            return `Happy New Year, ${name}!`;
        case 'valentine':
            return `${name}, will you be my Valentine?`;
        default:
            return `${name}, will you be my Valentine?`;
    }
}

function getPersonalizedSubMessage(seasonKey, name) {
    if (!name) return SEASONS[seasonKey].subMessage;
    switch (seasonKey) {
        case 'birthday':
            return `Wishing you a magical day filled with sweet moments, huge smiles, and unlimited cake, ${name}! 🎂✨`;
        case 'christmas':
            return `Sending you cozy winter vibes, warm cocoa hugs, and holiday cheer, ${name}! 🎄❄️`;
        case 'newyear':
            return `Cheers to brand-new adventures, sparkling dreams, and an unforgettable 2026, ${name}! 🎆🥂`;
        case 'valentine':
            return `My heart has been waiting to ask you this all year long, ${name}... 💌`;
        default:
            return SEASONS[seasonKey].subMessage;
    }
}

function getPersonalizedSuccessHeading(seasonKey, name) {
    if (!name) return SEASONS[seasonKey].successHeading;
    switch (seasonKey) {
        case 'birthday':
            return `Yaaay, ${name}! Happy Birthday! 🎂🎉🥳`;
        case 'christmas':
            return `Merry Christmas, ${name}! 🎄🎅✨`;
        case 'newyear':
            return `Cheers to 2026, ${name}! 🎆🥂✨`;
        case 'valentine':
            return `Yaaay, ${name}! You said YES! 💖🌹`;
        default:
            return SEASONS[seasonKey].successHeading;
    }
}

/**
 * Determines seasonal identifier strictly based on date requirements:
 * - If before September 22 of the current year: 'Happy Birthday!' ('birthday')
 * - If between September 22 and December 25: 'Merry Christmas!' ('christmas')
 * - If between December 25 and January 1: 'Happy New Year!' ('newyear')
 * - Otherwise: 'Will you be my Valentine?' ('valentine')
 */
function getSeasonKeyByDate(date = new Date()) {
    const month = date.getMonth(); // 0-indexed: 0 = Jan, 8 = Sep, 11 = Dec
    const day = date.getDate();

    // 1. Between December 25 and January 1 -> Happy New Year!
    const isNewYear = (month === 11 && day >= 25) || (month === 0 && day <= 1);
    if (isNewYear) {
        return 'newyear';
    }

    // 2. Between September 22 and December 25 -> Merry Christmas!
    const isChristmas = (month === 8 && day >= 22) || (month > 8 && month < 11) || (month === 11 && day < 25);
    if (isChristmas) {
        return 'christmas';
    }

    // 3. Valentine window (January 2 through end of February / early spring) -> "Otherwise"
    const isValentinePeriod = (month === 0 && day > 1) || (month === 1);
    if (isValentinePeriod) {
        return 'valentine';
    }

    // 4. Before September 22 of the current year -> Happy Birthday!
    const isBeforeSep22 = (month < 8) || (month === 8 && day < 22);
    if (isBeforeSep22) {
        return 'birthday';
    }

    // Default "Otherwise" fallback
    return 'valentine';
}

/**
 * Public helper function to return the heading string for any given Date.
 */
function determineHeadingByDate(date = new Date()) {
    const seasonKey = getSeasonKeyByDate(date);
    return SEASONS[seasonKey].heading;
}

// Expose globally for testing/inspection
window.determineHeadingByDate = determineHeadingByDate;
window.getSeasonKeyByDate = getSeasonKeyByDate;
window.SEASONS = SEASONS;

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 2. DOM Elements & State
    // --------------------------------------------------------------------------
    const acceptBtn = document.getElementById('accept-btn') || document.getElementById('yes-btn');
    const denyBtn = document.getElementById('deny-btn') || document.getElementById('no-btn');
    const buttonGroup = document.getElementById('button-group');
    const contentHeader = document.getElementById('content-header');
    const questionText = document.getElementById('question-text');
    const subMessage = document.getElementById('sub-message');
    const successContainer = document.getElementById('success-container');
    const visualContainer = document.getElementById('visual-container');
    const mainGif = document.getElementById('main-gif');
    const cardBadge = document.getElementById('card-badge');
    const badgeText = document.getElementById('badge-text');
    const valentineCard = document.getElementById('valentine-card');
    const replayBtn = document.getElementById('replay-btn');
    const floatingHeartsContainer = document.getElementById('floating-hearts-container');
    const fallbackCanvas = document.getElementById('fallback-confetti-canvas');

    // Preloader Elements
    const preloader = document.getElementById('app-preloader');
    const preloaderBarFill = document.getElementById('preloader-bar-fill');
    const preloaderStatus = document.getElementById('preloader-status');
    const preloaderBadgeText = document.getElementById('preloader-badge-text');
    const dropletIcon = document.getElementById('droplet-icon');

    // Birthday Music Elements
    const birthdayAudio = document.getElementById('birthday-audio');
    const musicPlayerPill = document.getElementById('music-player-pill');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicLabel = document.getElementById('music-label');

    // Prime the card for fluid entrance scaling when preloader fades
    if (valentineCard && preloader) {
        valentineCard.classList.add('card-initial-hide');
    }

    const acceptTextSpan = document.getElementById('accept-text');
    const acceptEmojiSpan = document.getElementById('accept-emoji');
    const denyTextSpan = document.getElementById('deny-text');
    const denyEmojiSpan = document.getElementById('deny-emoji');

    // Parse URL parameters for recipient (?to=Lucie or ?name=...) and manual overrides
    const urlParams = new URLSearchParams(window.location.search);
    const rawRecipient = urlParams.get('to') || urlParams.get('name') || urlParams.get('recipient') || '';
    const recipientName = rawRecipient.trim().slice(0, 36);

    // Interactive State Variables
    let currentSeasonKey = 'birthday';
    let currentSeason = SEASONS.birthday;
    let acceptScale = 1.0;
    let dodgeCount = 0;
    let isAccepted = false;
    let floatingInterval = null;

    // --------------------------------------------------------------------------
    // Dynamic Aspect-Ratio Calculation for Visual Container
    // --------------------------------------------------------------------------
    function updateVisualAspectRatio() {
        if (!mainGif || !visualContainer) return;

        let naturalW = mainGif.naturalWidth;
        let naturalH = mainGif.naturalHeight;

        // Fallback to HTML width/height or bounding dimensions if naturalWidth not yet ready
        if (!naturalW || !naturalH) {
            naturalW = parseFloat(mainGif.getAttribute('width')) || 240;
            naturalH = parseFloat(mainGif.getAttribute('height')) || 200;
        }

        if (naturalW > 0 && naturalH > 0) {
            const ratio = naturalW / naturalH;
            visualContainer.style.setProperty('--img-ratio', `${naturalW} / ${naturalH}`);
            visualContainer.dataset.aspectRatio = ratio.toFixed(2);

            // Dynamically mark wide or tall animations for tailored maximum constraints
            if (ratio > 1.35) {
                visualContainer.classList.add('is-wide-visual');
                visualContainer.classList.remove('is-tall-visual');
            } else if (ratio < 0.88) {
                visualContainer.classList.add('is-tall-visual');
                visualContainer.classList.remove('is-wide-visual');
            } else {
                visualContainer.classList.remove('is-wide-visual', 'is-tall-visual');
            }
        }
    }

    if (mainGif) {
        mainGif.addEventListener('load', updateVisualAspectRatio);
        if (mainGif.complete) {
            updateVisualAspectRatio();
        }
    }

    // --------------------------------------------------------------------------
    // 3. Audio Synthesizer (Zero-dependency Web Audio API)
    // --------------------------------------------------------------------------
    class SoundEffects {
        constructor() {
            this.ctx = null;
        }

        initContext() {
            if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playDodgePop() {
            try {
                this.initContext();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + 0.12);
            } catch {
                // Optional enhancement
            }
        }

        playCelebrationChime() {
            try {
                this.initContext();
                if (!this.ctx) return;
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, index) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.value = freq;

                    const startTime = this.ctx.currentTime + index * 0.1;
                    gain.gain.setValueAtTime(0, startTime);
                    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(startTime);
                    osc.stop(startTime + 0.65);
                });
            } catch {
                // Optional enhancement
            }
        }
    }

    const sound = new SoundEffects();

    // --------------------------------------------------------------------------
    // 4. Seasonal Theme Application
    // --------------------------------------------------------------------------
    function applySeason(seasonKey) {
        if (!SEASONS[seasonKey]) seasonKey = 'birthday';
        currentSeasonKey = seasonKey;
        currentSeason = SEASONS[seasonKey];

        // Update body theme gradient
        document.body.className = currentSeason.themeClass;

        // Update Heading & Sub-message with personalized recipient support
        const personalizedHeading = getPersonalizedHeading(currentSeasonKey, recipientName);
        const personalizedSubMessage = getPersonalizedSubMessage(currentSeasonKey, recipientName);

        if (questionText) questionText.textContent = personalizedHeading;
        if (subMessage) subMessage.textContent = personalizedSubMessage;

        // Update document title & Open Graph tags for personal links
        if (recipientName) {
            document.title = `${personalizedHeading} | Special Message`;
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', personalizedHeading);
        }

        // Update Badge
        if (badgeText) badgeText.textContent = currentSeason.badge;

        // Update Jumping Bear Visual
        if (mainGif) {
            mainGif.src = isAccepted ? currentSeason.bearSuccess : currentSeason.bearNormal;
            mainGif.alt = `Animated jumping bear for ${currentSeason.name}`;
            mainGif.style.transform = '';
            if (mainGif.complete) {
                updateVisualAspectRatio();
            }
        }

        // Update Buttons
        if (acceptTextSpan) acceptTextSpan.textContent = currentSeason.acceptText;
        if (acceptEmojiSpan) acceptEmojiSpan.textContent = currentSeason.acceptEmoji;
        if (denyTextSpan) denyTextSpan.textContent = currentSeason.denyText;
        if (denyEmojiSpan) denyEmojiSpan.textContent = currentSeason.denyEmoji;

        // Reset positions & scaling
        resetButtonStates();
    }

    function resetButtonStates() {
        isAccepted = false;
        acceptScale = 1.0;
        dodgeCount = 0;

        if (acceptBtn) {
            acceptBtn.style.transform = 'scale(1)';
            acceptBtn.style.boxShadow = '';
        }

        if (denyBtn) {
            // Restore back inside buttonGroup if it was moved to <body>
            if (buttonGroup && denyBtn.parentElement !== buttonGroup) {
                buttonGroup.appendChild(denyBtn);
            }
            denyBtn.classList.remove('dodging');
            denyBtn.style.position = '';
            denyBtn.style.left = '';
            denyBtn.style.top = '';
            denyBtn.style.margin = '';
            denyBtn.style.display = '';
            if (denyTextSpan) denyTextSpan.textContent = currentSeason.denyText;
            if (denyEmojiSpan) denyEmojiSpan.textContent = currentSeason.denyEmoji;
        }

        if (contentHeader) {
            contentHeader.style.display = '';
            contentHeader.removeAttribute('hidden');
        }

        if (buttonGroup) {
            buttonGroup.style.display = 'flex';
            buttonGroup.removeAttribute('hidden');
        }

        if (successContainer) {
            successContainer.hidden = true;
            successContainer.setAttribute('aria-hidden', 'true');
            successContainer.style.display = 'none';
        }

        if (mainGif) {
            mainGif.src = currentSeason.bearNormal;
            mainGif.style.transform = '';
        }
    }

    // --------------------------------------------------------------------------
    // 5. High-Performance Background Particles (Thrust & Season Customization)
    // --------------------------------------------------------------------------
    // Detect mobile or touch device to throttle particle creation and prevent jitter
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           window.innerWidth < 768 || 
                           window.matchMedia('(pointer: coarse)').matches;
    const maxActiveParticles = isMobileDevice ? 6 : 14;
    const spawnIntervalMs = isMobileDevice ? 1300 : 700;

    function spawnFloatingParticle() {
        if (document.hidden || !floatingHeartsContainer) return;
        // Strict thrust limit: drop new particles if max count reached on screen to prevent jitter/lag
        if (floatingHeartsContainer.childElementCount >= maxActiveParticles) return;

        const particleType = currentSeason.particleType || 'up';
        const particleEl = document.createElement('span');
        particleEl.className = `floating-particle particle-${particleType}`;

        const glyphList = currentSeason.floatingEmojis || ['❤️', '✨', '🎉'];
        const randomGlyph = glyphList[Math.floor(Math.random() * glyphList.length)];
        particleEl.textContent = randomGlyph;

        const startX = (Math.random() * 92 + 4).toFixed(1);
        const duration = (Math.random() * 3 + (isMobileDevice ? 5 : 4)).toFixed(2);
        const size = (Math.random() * (particleType === 'snow' ? 0.8 : 0.7) + (isMobileDevice ? 0.95 : 1.1)).toFixed(2);
        const drift = (Math.random() * 80 - 40).toFixed(0) + 'px';
        const spin = (Math.random() * 60 - 30).toFixed(0) + 'deg';

        particleEl.style.left = `${startX}vw`;
        particleEl.style.fontSize = `${size}rem`;
        particleEl.style.animationDuration = `${duration}s`;
        particleEl.style.setProperty('--drift', drift);
        particleEl.style.setProperty('--spin', spin);

        floatingHeartsContainer.appendChild(particleEl);

        let cleanedUp = false;
        const cleanup = () => {
            if (!cleanedUp && particleEl.parentNode) {
                cleanedUp = true;
                particleEl.remove();
            }
        };

        particleEl.addEventListener('animationend', cleanup, { once: true });
        // Safe timeout fallback
        setTimeout(cleanup, parseFloat(duration) * 1000 + 400);
    }

    // Backwards-compatible alias for particle spawner
    const spawnFloatingEmoji = spawnFloatingParticle;

    function startEmojiSpawner() {
        if (!floatingInterval) {
            const initialCount = isMobileDevice ? 2 : 4;
            for (let i = 0; i < initialCount; i++) {
                setTimeout(spawnFloatingParticle, i * 250);
            }
            floatingInterval = setInterval(spawnFloatingParticle, spawnIntervalMs);
        }
    }

    // --------------------------------------------------------------------------
    // 6. 'Deny' Button Dodge Logic & 'Accept' Button Scaling
    // --------------------------------------------------------------------------
    function dodgeDenyButton(event) {
        if (isAccepted) return;
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        sound.playDodgePop();
        dodgeCount++;

        // 1. Solution 2: If the button is not yet attached to document.body, append it to <body>
        // This completely bypasses any parent container's overflow:hidden, backdrop-filter, or transform clipping context!
        if (denyBtn.parentElement !== document.body) {
            const initialRect = denyBtn.getBoundingClientRect();
            document.body.appendChild(denyBtn);
            denyBtn.classList.add('dodging');
            denyBtn.style.position = 'fixed';
            denyBtn.style.left = `${initialRect.left}px`;
            denyBtn.style.top = `${initialRect.top}px`;
            denyBtn.style.margin = '0';
        } else {
            denyBtn.classList.add('dodging');
            denyBtn.style.position = 'fixed';
            denyBtn.style.margin = '0';
        }

        // 2. Measure button and viewport client dimensions
        const btnWidth = denyBtn.offsetWidth || 120;
        const btnHeight = denyBtn.offsetHeight || 50;

        // Calculate boundaries relative to the viewport's client dimensions (width and height)
        const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        const viewportHeight = document.documentElement.clientHeight || window.innerHeight;

        // Safe margin ensuring the button stays comfortably away from viewport edges
        const safeMargin = 40;

        const minX = safeMargin;
        const maxX = Math.max(safeMargin, viewportWidth - btnWidth - safeMargin);
        const minY = safeMargin;
        const maxY = Math.max(safeMargin, viewportHeight - btnHeight - safeMargin);

        // Generate random target coordinates strictly within the safe margins
        const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        // Apply new bounded position across the entire screen
        denyBtn.style.left = `${randomX}px`;
        denyBtn.style.top = `${randomY}px`;

        // 3. Update 'Deny' button playful text & emoji
        const phrases = currentSeason.denyPhrases || ["Deny", "Are you sure? 👀", "Think again!"];
        const phrase = phrases[dodgeCount % phrases.length];
        if (denyTextSpan) denyTextSpan.textContent = phrase;

        // 4. Gradually scale up the 'Accept' button over ~16 gentle steps, with a reduced maximum cap
        // Increased number of steps (from ~6 steps to ~16 steps) and reduced maximum scale (from 3.2 down to 1.65)
        const maxScale = 1.65;
        const scaleStep = 0.04;
        const currentScale = Math.min(1.0 + (dodgeCount * scaleStep), maxScale);
        acceptScale = parseFloat(currentScale.toFixed(3));

        if (acceptBtn) {
            acceptBtn.style.transform = `scale(${acceptScale})`;
            if (dodgeCount >= 2) {
                const glowIntensity = Math.min(0.35 + (dodgeCount * 0.025), 0.7);
                acceptBtn.style.boxShadow = `0 14px 28px -4px rgba(255, 46, 99, ${glowIntensity}), 0 0 18px 3px rgba(255, 117, 140, 0.45)`;
            }
        }

        // Spawn a burst of celebratory particles around the card on dodge
        for (let i = 0; i < 3; i++) {
            setTimeout(spawnFloatingParticle, i * 80);
        }
    }

    if (denyBtn) {
        denyBtn.addEventListener('mouseenter', dodgeDenyButton);
        denyBtn.addEventListener('mouseover', dodgeDenyButton);
        denyBtn.addEventListener('pointerdown', dodgeDenyButton);
        denyBtn.addEventListener('touchstart', dodgeDenyButton, { passive: false });
        denyBtn.addEventListener('click', dodgeDenyButton);
    }

    // --------------------------------------------------------------------------
    // 7. Confetti System (Canvas-Confetti with Built-in Fallback)
    // --------------------------------------------------------------------------
    function launchCelebrationConfetti(customColors) {
        const colors = customColors || currentSeason.confettiColors || ['#ff2e63', '#ffd166', '#06d6a0', '#ffffff'];

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 90,
                spread: 100,
                origin: { y: 0.6 },
                colors: colors,
                startVelocity: 45
            });

            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    angle: 60,
                    spread: 75,
                    origin: { x: 0.1, y: 0.7 },
                    colors: colors
                });
            }, 250);

            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    angle: 120,
                    spread: 75,
                    origin: { x: 0.9, y: 0.7 },
                    colors: colors
                });
            }, 450);

            const duration = 2.5 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        } else {
            runFallbackConfetti(colors);
        }
    }

    function runFallbackConfetti(colors) {
        if (!fallbackCanvas) return;
        const ctx = fallbackCanvas.getContext('2d');
        if (!ctx) return;

        fallbackCanvas.width = window.innerWidth;
        fallbackCanvas.height = window.innerHeight;

        const particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.8) * 20,
                size: Math.random() * 8 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        let animationFrameId;
        const render = () => {
            ctx.clearRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
            let activeCount = 0;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.007;

                if (p.opacity > 0) {
                    activeCount++;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            });

            if (activeCount > 0) {
                animationFrameId = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
                cancelAnimationFrame(animationFrameId);
            }
        };

        render();
    }

    // --------------------------------------------------------------------------
    // 8. 'Accept' Button Success State
    // --------------------------------------------------------------------------
    function triggerAcceptSuccess() {
        if (isAccepted) return;
        isAccepted = true;

        sound.playCelebrationChime();

        // 1. Hide question content-header, buttons group, and Deny button
        if (contentHeader) {
            contentHeader.style.display = 'none';
            contentHeader.setAttribute('hidden', 'true');
        }
        if (buttonGroup) {
            buttonGroup.style.display = 'none';
            buttonGroup.setAttribute('hidden', 'true');
        }
        if (denyBtn) {
            denyBtn.style.display = 'none';
        }

        // 2. Update Jumping Bear to celebratory victory bear
        if (mainGif) {
            mainGif.src = currentSeason.bearSuccess;
            mainGif.alt = `Celebratory ${currentSeason.name} animation`;
            mainGif.style.transform = 'scale(1.08)';
            if (mainGif.complete) {
                updateVisualAspectRatio();
            }
        }

        // 3. Update Card Badge
        if (cardBadge && badgeText) {
            badgeText.textContent = currentSeason.celebrationBadge;
        }

        // 4. Update Success Container elements (Single, unified celebration message with personal name)
        const successHeading = document.getElementById('success-heading');
        const successSubtext = document.getElementById('success-subtext');
        const celebrationBadge = document.getElementById('celebration-badge');

        const personalizedSuccessHeading = getPersonalizedSuccessHeading(currentSeasonKey, recipientName);

        if (successHeading) successHeading.textContent = personalizedSuccessHeading;
        if (successSubtext) successSubtext.textContent = currentSeason.successSubtext;
        if (celebrationBadge) celebrationBadge.innerHTML = `<span>${currentSeason.celebrationBadge}</span>`;

        // 5. Reveal celebratory container cleanly
        if (successContainer) {
            successContainer.hidden = false;
            successContainer.removeAttribute('aria-hidden');
            successContainer.style.display = 'flex';
        }

        // 6. Fire Confetti
        launchCelebrationConfetti();

        // 7. Extra celebratory particles shower (respecting mobile thrust cap)
        const burstCount = isMobileDevice ? 6 : 14;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(spawnFloatingParticle, i * 110);
        }

        // 8. Play Birthday Celebration Music (Simi ft. Adekunle Gold & Deja - Happy Birthday)
        playCelebrationMusic();
    }

    // --------------------------------------------------------------------------
    // Birthday Celebration Audio Controller
    // --------------------------------------------------------------------------
    function playCelebrationMusic() {
        if (!birthdayAudio) return;
        try {
            birthdayAudio.currentTime = 0;
            birthdayAudio.volume = 0;
            const playPromise = birthdayAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Smooth volume fade-in from 0 to 0.75 over 1.2s
                    let vol = 0;
                    const fadeTimer = setInterval(() => {
                        vol = Math.min(vol + 0.06, 0.75);
                        birthdayAudio.volume = parseFloat(vol.toFixed(2));
                        if (vol >= 0.75) clearInterval(fadeTimer);
                    }, 80);

                    if (musicToggleBtn) {
                        musicToggleBtn.classList.remove('is-paused');
                    }
                    if (musicLabel) {
                        musicLabel.textContent = 'Birthday Music: Playing 🎶';
                    }
                }).catch((err) => {
                    console.log('Audio playback waiting for user tap:', err);
                    if (musicToggleBtn) {
                        musicToggleBtn.classList.add('is-paused');
                    }
                    if (musicLabel) {
                        musicLabel.textContent = 'Tap to Play Birthday Music 🎶';
                    }
                });
            }
        } catch (e) {
            console.error('Audio playback error:', e);
        }
    }

    // Music Player Toggle Control (Pause / Resume)
    if (musicToggleBtn && birthdayAudio) {
        musicToggleBtn.addEventListener('click', () => {
            if (birthdayAudio.paused) {
                birthdayAudio.play().then(() => {
                    musicToggleBtn.classList.remove('is-paused');
                    if (musicLabel) musicLabel.textContent = 'Birthday Music: Playing 🎶';
                }).catch(() => {});
            } else {
                birthdayAudio.pause();
                musicToggleBtn.classList.add('is-paused');
                if (musicLabel) musicLabel.textContent = 'Birthday Music: Paused ⏸️';
            }
        });
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', triggerAcceptSuccess);
    }

    // Replay / Reset
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            // Stop and reset birthday music if playing
            if (birthdayAudio) {
                birthdayAudio.pause();
                birthdayAudio.currentTime = 0;
            }
            if (musicToggleBtn) {
                musicToggleBtn.classList.remove('is-paused');
            }
            if (musicLabel) {
                musicLabel.textContent = 'Birthday Music: Playing 🎶';
            }

            resetButtonStates();
            applySeason(currentSeasonKey);
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }

    // --------------------------------------------------------------------------
    // 9. Automated Date-Based Initialization
    // --------------------------------------------------------------------------
    // Check URL parameters for manual season override: ?season=birthday|christmas|newyear|valentine
    const seasonQuery = urlParams.get('season')?.toLowerCase();
    const dateQuery = urlParams.get('date');

    let initialSeasonKey = 'birthday';

    if (dateQuery) {
        const parsedDate = new Date(dateQuery);
        if (!isNaN(parsedDate.getTime())) {
            initialSeasonKey = getSeasonKeyByDate(parsedDate);
        }
    } else if (seasonQuery && SEASONS[seasonQuery]) {
        initialSeasonKey = seasonQuery;
    } else {
        // Automatically determine season via JavaScript Date function
        const today = new Date();
        initialSeasonKey = getSeasonKeyByDate(today);
    }

    // Apply the determined seasonal content, jumping bear, and texts
    applySeason(initialSeasonKey);

    startEmojiSpawner();

    // Pause spawner when tab is hidden to save GPU/battery
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (floatingInterval) {
                clearInterval(floatingInterval);
                floatingInterval = null;
            }
        } else {
            startEmojiSpawner();
        }
    });

    // --------------------------------------------------------------------------
    // 10. AOS (Animate On Scroll) Initialization Helper
    // --------------------------------------------------------------------------
    let aosInitialized = false;
    function initAOS() {
        if (aosInitialized) {
            if (typeof AOS !== 'undefined') AOS.refresh();
            return;
        }
        if (typeof AOS !== 'undefined') {
            aosInitialized = true;
            AOS.init({
                duration: 850,
                easing: 'ease-out-cubic',
                once: true,
                offset: 10,
                delay: 40,
                disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
            });
        }
    }

    // --------------------------------------------------------------------------
    // 11. Subtle 3D Tilt Hover Effect (vanilla-tilt.js)
    // --------------------------------------------------------------------------
    let tiltInitialized = false;
    function initCardTilt() {
        if (tiltInitialized) return;
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        // Strictly enable only for desktop/laptops with fine cursor to keep mobile zero-cost & jitter-free
        if (canHover && valentineCard && typeof VanillaTilt !== 'undefined') {
            tiltInitialized = true;
            VanillaTilt.init(valentineCard, {
                max: 8,
                speed: 700,
                perspective: 1100,
                scale: 1.015,
                glare: true,
                "max-glare": 0.16,
                gyroscope: false, // Turn off mobile sensor listening to prevent battery drain & jitter
                reset: true,
                easing: "cubic-bezier(.03,.98,.52,.99)"
            });
        }
    }

    // --------------------------------------------------------------------------
    // 12. Liquid Glass Droplet Preloader & Fluid Card Entrance
    // --------------------------------------------------------------------------
    const MIN_PRELOADER_TIME = 2500; // Minimum 2.5s duration to let liquid droplet animation play out
    const preloaderStartTime = performance.now();
    let isPreloaderDismissed = false;
    let windowLoadFired = (document.readyState === 'complete');

    // Adapt preloader droplet icon and badge to current season
    if (dropletIcon && currentSeason) {
        dropletIcon.textContent = currentSeason.btnAcceptEmoji || '💖';
    }
    if (preloaderBadgeText && currentSeason) {
        preloaderBadgeText.textContent = currentSeason.name === 'Birthday' ? 'Crafting Birthday Joy 🎂' : `Crafting ${currentSeason.name} Magic ✨`;
    }

    const preloaderPhrases = [
        "Infusing sweetness... 🍯",
        "Polishing frosted glass... ✨",
        "Preparing celebratory magic... 🎁",
        "Almost ready! 💖"
    ];

    // Smoothly animate progress bar and cycle status phrases
    const progressInterval = setInterval(() => {
        if (isPreloaderDismissed) {
            clearInterval(progressInterval);
            return;
        }

        const elapsed = performance.now() - preloaderStartTime;
        const ratio = Math.min(elapsed / MIN_PRELOADER_TIME, 0.96);
        const percent = Math.round(ratio * 100);

        if (preloaderBarFill) {
            preloaderBarFill.style.width = `${percent}%`;
        }

        // Phrase cycling based on time progress
        if (preloaderStatus) {
            const phraseIdx = Math.min(Math.floor(ratio * preloaderPhrases.length), preloaderPhrases.length - 1);
            preloaderStatus.textContent = preloaderPhrases[phraseIdx];
        }
    }, 60);

    function dismissPreloader() {
        if (isPreloaderDismissed) return;
        isPreloaderDismissed = true;
        clearInterval(progressInterval);

        if (preloaderBarFill) {
            preloaderBarFill.style.width = '100%';
        }
        if (preloaderStatus) {
            preloaderStatus.textContent = 'Welcome! ✨';
        }

        // Elegantly fade out the preloader and scale the main glass UI card into view
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('preloader-hiding');
            }

            if (valentineCard) {
                valentineCard.classList.remove('card-initial-hide');
                valentineCard.classList.add('card-revealed');
            }

            initAOS();

            // After fadeout completes (850ms), fully remove preloader from view and activate 3D tilt
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('preloader-hidden');
                    preloader.setAttribute('aria-hidden', 'true');
                }
                initCardTilt();
            }, 850);
        }, 180);
    }

    function checkReadyToDismiss() {
        const elapsed = performance.now() - preloaderStartTime;
        if (elapsed >= MIN_PRELOADER_TIME && windowLoadFired) {
            dismissPreloader();
        }
    }

    window.addEventListener('load', () => {
        windowLoadFired = true;
        checkReadyToDismiss();
    });

    // Ensure preloader plays for at least 2.5 seconds, then dismisses once window load has fired
    if (preloader) {
        setTimeout(() => {
            if (windowLoadFired || document.readyState === 'complete') {
                dismissPreloader();
            } else {
                // If window load is taking extra time (e.g. slow network), wait for it or fallback safely at +1.8s
                const fallbackSafetyTimer = setTimeout(dismissPreloader, 1800);
                window.addEventListener('load', () => {
                    clearTimeout(fallbackSafetyTimer);
                    dismissPreloader();
                }, { once: true });
            }
        }, MIN_PRELOADER_TIME);
    } else {
        // Fallback if preloader element is absent
        initAOS();
        initCardTilt();
    }

    if (valentineCard) {
        valentineCard.addEventListener('mouseenter', initCardTilt, { once: true });
    }

    // Adjust canvas and visual container on window resize and orientation change
    const handleViewportChange = () => {
        if (fallbackCanvas) {
            fallbackCanvas.width = window.innerWidth;
            fallbackCanvas.height = window.innerHeight;
        }
        updateVisualAspectRatio();
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 120);
    });
});
