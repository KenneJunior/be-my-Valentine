// ===== CONFIGURATION & CONSTANTS =====
const CONFIG = {
    // Messaging
    NO_MESSAGES: [
        "Are you sure?",
        "Really sure??",
        "Think twice!",
        "Pookie please...",
        "Just think about it!",
        "I'll be really sad...",
        "Heartbreaking...",
        "Devastating...",
        "I'll stop asking...",
        "Just kidding, say YES! ❤️",
        "My heart is breaking 💔",
        "But we'd be so cute together!",
        "Think of the memorieeees!",
        "I'll write you poems!",
        "I'll bring you coffee every morning ☕",
        "Free hugs forever!",
        "I'll learn to bake your favorite dessert!",
        "We could have matching PJs!",
        "I'll watch all your favorite shows with you!",
        "I'll give you the last slice of pizza! 🍕",
        "Think of the puppy we could get! 🐶",
        "We could travel the world together! ✈️",
        "I'll always let you pick the movie!",
        "I'll support your dreams! ✨",
        "We'd be the ultimate power couple!",
        "Our love story would be legendary!",
        "I'll sing you love songs! 🎵",
        "Even my mom thinks you're perfect!",
        "My cat/dog already loves you! 🐱",
        "I'll learn to love your weird hobbies!",
        "We could start a garden together! 🌸",
        "I'll remember all your important dates!",
        "I'll always laugh at your jokes!",
        "We could have brunch every Sunday!",
        "I'll defend you in every argument!",
        "We'd have the best Instagram photos! 📸",
        "I'll build you a blanket fort!",
        "We could start a book club! 📚",
        "I'll always share my fries with you! 🍟",
        "We could adopt a plant together! 🌱",
        "I'll learn your love language!",
        "We could have movie marathons!",
        "I'll support your side hustle!",
        "We could create a secret handshake!",
        "I'll always be your biggest fan!",
        "We could start a YouTube channel!",
        "I'll learn to cook your favorite meal!",
        "We could have matching tattoos! (Maybe)",
        "I'll always save you the last cookie! 🍪",
        "We could build a pillow fortress!",
        "I'll watch the sunset with you every day! 🌅",
        "We could start a revolution together! ✊",
        "I'll always choose you first in games!",
        "We could have weekly date nights!",
        "I'll write you love letters! 💌",
        "We could adopt a pet rock together!",
        "I'll always remember your coffee order!",
        "We could start a band! 🎸",
        "I'll learn your star sign! ✨",
        "We could have picnics in the park!",
        "I'll always be your emergency contact!",
        "We could start a podcast together!",
        "I'll learn to love your favorite music!",
        "We could have themed costume parties!",
        "I'll always save you from awkward situations!",
        "We could create our own language!",
        "I'll always pick you up from the airport!",
        "We could start a small business!",
        "I'll learn all your family traditions!",
        "We could have a joint Netflix account!",
        "I'll always defend your honor! ⚔️",
        "We could have matching coffee mugs! ☕",
        "I'll learn your childhood stories!",
        "We could build a time capsule together!",
        "I'll always be your plus one!",
        "We could start a collection!",
        "I'll learn to appreciate your quirks!",
        "We could have weekly game nights!",
        "I'll always be your human pillow!",
        "We could start a food blog! 🍽️",
        "I'll learn your secret talents!",
        "We could have annual adventures!",
        "I'll always save you from bad dates!",
        "We could create our own holiday!",
        "I'll learn your life goals! 🎯",
        "We could have a joint bucket list!",
        "I'll always be your personal cheerleader!",
        "We could start a revolution of love! ❤️",
        "I'll learn to love your terrible puns!",
        "We could have endless inside jokes!",
        "I'll always choose you... forever!",
        "Okay fine... last chance to say YES! 🙏",
        "PLEASE PLEASE PLEASE say yes! 🥺",
        "I'm literally on my knees here!",
        "My heart can't take this rejection! 😭",
        "I'll change my name for you!",
        "I'll move to another country for you!",
        "I'll learn every language for you!",
        "I'll become a better person for you!",
        "I'll write a novel about us!",
        "I'll climb every mountain for you! ⛰️",
        "I'll swim every ocean for you! 🌊",
        "I'll fight dragons for you! 🐉",
        "I'll become a superhero for you! 🦸",
        "I'll solve world hunger for you!",
        "I'll invent time travel for you! ⏰",
        "I'll learn quantum physics for you!",
        "I'll become a millionaire for you! 💰",
        "I'll win a Nobel Prize for you!",
        "I'll discover a new planet for you! 🪐",
        "I'll become famous for you!",
        "I'll learn to fly for you! ✈️",
        "I'll make history for you!",
        "I'll become immortal for you!",
        "I'll create world peace for you! ☮️",
        "I'll find the meaning of life for you!",
        "I'll become the best version of myself for you!",
        "I'LL DO ANYTHING FOR YOU! 😫",
        "PLEASE BE MY VALENTINE! ❤️❤️❤️"
    ],
    YES_REDIRECT_URL: "yes_page.html",
    
    // Animation
    YES_BUTTON_GROWTH_FACTOR: 1.5,
    MAX_YES_BUTTON_SIZE: 1200000, // px
    ESCAPE_MODE_TRIGGER: 5, // After 5 clicks
    PARTICLE_COUNT: 50,
    
    // Timing
    REDIRECT_DELAY: 1500,
    MESSAGE_CHANGE_DELAY: 100,
    
    // Local Storage Keys
    STORAGE_KEYS: {
        THEME: 'valentine-theme',
        CLICK_COUNT: 'valentine-clicks',
        RESPONSE: 'valentine-response'
    }
};

// ===== STATE MANAGEMENT =====
class ValentineState {
    constructor() {
        this.noMessageIndex = 0;
        this.clickCount = 0;
        this.isYesClicked = false;
        this.isAnimating = false;
        this.theme = 'light';
        this.escapeMode = false;
    }

    saveToStorage() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.CLICK_COUNT, this.clickCount.toString());
            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, this.theme);
            localStorage.setItem(CONFIG.STORAGE_KEYS.RESPONSE, this.isYesClicked ? 'yes' : 'pending');
        } catch (error) {
            console.warn('LocalStorage not available:', error);
        }
    }

    loadFromStorage() {
        try {
            this.clickCount = parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.CLICK_COUNT)) || 0;
            this.theme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light';
            this.isYesClicked = localStorage.getItem(CONFIG.STORAGE_KEYS.RESPONSE) === 'yes';
        } catch (error) {
            console.warn('LocalStorage not available:', error);
        }
    }
}

// ===== DOM ELEMENTS =====
const DOM = {
    get yesButton() { return document.getElementById('yes-button'); },
    get noButton() { return document.getElementById('no-button'); },
    get noButtonText() { return document.getElementById('no-button-text'); },
    get mainContainer() { return document.querySelector('.valentine-container'); },
    get loadingOverlay() { return document.getElementById('loading-overlay'); },
    get confettiContainer() { return document.getElementById('confetti-container'); },
    get themeToggle() { return document.getElementById('theme-toggle'); },
    get particlesCanvas() { return document.getElementById('particles-canvas'); }
};

// ===== ANIMATION UTILITIES =====
const Animator = {
    // Confetti effect
    createConfetti() {
        if (!DOM.confettiContainer) return;
        
        DOM.confettiContainer.innerHTML = '';
        
        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const colors = ['#ff2e63', '#08d9d6', '#ffde7d', '#ff9a3c'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 2 + 3;
            
            // Apply styles
            Object.assign(confetti.style, {
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                left: `${left}vw`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
            });
            
            DOM.confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            DOM.confettiContainer.innerHTML = '';
        }, 5000);
    },

    // Button bounce animation
    bounceButton(button) {
        if (!button || this.isAnimating) return;
        
        this.isAnimating = true;
        button.classList.add('bouncing');
        
        setTimeout(() => {
            button.classList.remove('bouncing');
            this.isAnimating = false;
        }, 300);
    },

    // Grow animation for yes button
    growButton(button) {
        const currentSize = parseFloat(window.getComputedStyle(button).fontSize);
        const newSize = currentSize * CONFIG.YES_BUTTON_GROWTH_FACTOR;
        
        if (newSize <= CONFIG.MAX_YES_BUTTON_SIZE) {
            button.style.fontSize = `${newSize}px`;
            this.bounceButton(button);
        }
    },

    // Shake animation for no button
    shakeButton(button) {
        button.classList.add('escape-mode');
        setTimeout(() => {
            button.classList.remove('escape-mode');
        }, 500);
    },

    // Floating hearts animation
    animateHearts() {
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach(heart => {
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            heart.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
};

// ===== EVENT HANDLERS =====
class EventHandlers {
    constructor(state) {
        this.state = state;
    }

    handleYesClick = async (event) => {
        event.preventDefault();
        
        //if (this.state.isYesClicked) return;
        
        this.state.isYesClicked = true;
        this.state.saveToStorage();
        
        // Visual feedback
        Animator.bounceButton(DOM.yesButton);
        Animator.createConfetti();
        
        // Show loading state
        this.showLoading();
        
        // Play success sound if available
        this.playSound('success');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = CONFIG.YES_REDIRECT_URL;
        }, CONFIG.REDIRECT_DELAY);
    };

    handleNoClick = (event) => {
        event.preventDefault();
        
        this.state.clickCount++;
        this.state.saveToStorage();
        
        // Update button text
        const message = CONFIG.NO_MESSAGES[this.state.noMessageIndex];
        DOM.noButtonText.textContent = message;
        
        // Visual feedback
        Animator.growButton(DOM.yesButton);
        Animator.bounceButton(DOM.noButton);
        
        // Escape mode after certain clicks
        if (this.state.clickCount >= CONFIG.ESCAPE_MODE_TRIGGER && !this.state.escapeMode) {
            this.state.escapeMode = true;
            Animator.shakeButton(DOM.noButton);
            this.playSound('escape');
        } else {
            this.playSound('click');
        }
        
        // Move to next message
        this.state.noMessageIndex = (this.state.noMessageIndex + 1) % CONFIG.NO_MESSAGES.length;
        
        // Update button accessibility
        DOM.noButton.setAttribute('aria-label', `No: ${message}`);
    };

    handleThemeToggle = () => {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.state.theme);
        this.state.saveToStorage();
        
        // Update toggle button
        const icon = DOM.themeToggle.querySelector('.theme-icon');
        icon.textContent = this.state.theme === 'light' ? '🌙' : '☀️';
        DOM.themeToggle.setAttribute('aria-label', 
            `Switch to ${this.state.theme === 'light' ? 'dark' : 'light'} mode`);
        
        this.playSound('toggle');
    };

    handleKeyPress = (event) => {
        switch(event.key) {
            case 'y':
            case 'Y':
                DOM.yesButton.focus();
                break;
            case 'n':
            case 'N':
                DOM.noButton.focus();
                break;
            case 'Enter':
                if (document.activeElement === DOM.yesButton) {
                    this.handleYesClick(event);
                } else if (document.activeElement === DOM.noButton) {
                    this.handleNoClick(event);
                }
                break;
            case 'Escape':
                if (this.state.escapeMode) {
                    Animator.shakeButton(DOM.noButton);
                }
                break;
        }
    };

    // Utility methods
    showLoading() {
        if (DOM.loadingOverlay) {
            DOM.loadingOverlay.hidden = false;
            DOM.loadingOverlay.setAttribute('aria-busy', 'true');
        }
    }

    hideLoading() {
        if (DOM.loadingOverlay) {
            DOM.loadingOverlay.hidden = true;
            DOM.loadingOverlay.setAttribute('aria-busy', 'false');
        }
    }

    playSound(type) {
        // In a real implementation, you would play actual audio files
        console.log(`Playing ${type} sound`);
        // Example: new Audio(`sounds/${type}.mp3`).play().catch(() => {});
    }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(255, 46, 99, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ===== COUNTDOWN TIMER =====
class CountdownTimer {
    constructor() {
      
    }

    update() {

    }
}

// ===== MAIN INITIALIZATION =====
class ValentineApp {
    constructor() {
        this.state = new ValentineState();
        this.handlers = new EventHandlers(this.state);
        this.particleSystem = null;
        this.countdownTimer = null;
    }

    init() {
        // Load state from storage
        this.state.loadFromStorage();
        
        // Initialize theme
        this.initTheme();
        
        // Initialize particles
        this.initParticles();
        
        // Initialize countdown timer
        this.countdownTimer = new CountdownTimer();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start animations
        Animator.animateHearts();
        
        // Add CSS for animations
        this.injectAnimationStyles();
        
        console.log('💖 Valentine App Initialized');
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        const icon = DOM.themeToggle?.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.state.theme === 'light' ? '🌙' : '☀️';
        }
    }

    initParticles() {
        if (DOM.particlesCanvas) {
            this.particleSystem = new ParticleSystem(DOM.particlesCanvas);
        }
    }

    setupEventListeners() {
        // Button events
        if (DOM.yesButton) {
            DOM.yesButton.addEventListener('click', this.handlers.handleYesClick);
            DOM.yesButton.addEventListener('touchstart', this.handlers.handleYesClick, { passive: true });
        }
        
        if (DOM.noButton) {
            DOM.noButton.addEventListener('click', this.handlers.handleNoClick);
            DOM.noButton.addEventListener('touchstart', this.handlers.handleNoClick, { passive: true });
        }
        
        // Theme toggle
        if (DOM.themeToggle) {
            DOM.themeToggle.addEventListener('click', this.handlers.handleThemeToggle);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handlers.handleKeyPress);
        
        // Prevent context menu on buttons
        document.querySelectorAll('.valentine-button').forEach(button => {
            button.addEventListener('contextmenu', (e) => e.preventDefault());
        });
        
        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                Animator.animateHearts();
            }
        });
    }

    injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(10deg); }
            }
            
            .bouncing {
                animation: bounce 0.3s ease;
            }
            
            @keyframes bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            [data-theme="dark"] {
                --neutral-light: #121212;
                --neutral-dark: #f8f9fa;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            }
        `;
        document.head.appendChild(style);
    }

    destroy() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
        }
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handlers.handleKeyPress);
        
        console.log('💔 Valentine App Cleaned Up');
    }
}

// ===== APP START =====
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    const app = new ValentineApp();
    app.init();
    
    // Make app available globally for debugging
    window.ValentineApp = app;
    
    // Handle page unload
    window.addEventListener('beforeunload', () => {
        app.destroy();
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    
    // Graceful degradation
    if (DOM.yesButton) {
        DOM.yesButton.onclick = () => {
            window.location.href = CONFIG.YES_REDIRECT_URL;
        };
    }
    
    if (DOM.noButton) {
        DOM.noButton.onclick = () => {
            alert("Something went wrong, but you're still awesome! ❤️");
        };
    }
});

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}
