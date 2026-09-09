// ===== PARTICLE SYSTEM CONFIGURATION =====
const PARTICLE_CONFIG = {
    // Particle Properties
    COUNT: {
        DESKTOP: 150,
        TABLET: 80,
        MOBILE: 40
    },
    COLORS: [
        'rgba(255, 46, 99, 0.8)',    // Primary pink
        'rgba(8, 217, 214, 0.6)',    // Teal
        'rgba(255, 222, 125, 0.7)',  // Yellow
        'rgba(255, 154, 60, 0.5)',   // Orange
        'rgba(255, 255, 255, 0.4)'   // White
    ],
    SHAPES: ['circle', 'heart', 'triangle'],
    
    // Physics
    GRAVITY: 0.05,
    FRICTION: 0.97,
    MOUSE_REPULSION: 100,
    MOUSE_ATTRACTION: 50,
    
    // Behavior
    INTERACTION_RADIUS: 150,
    CONNECTION_DISTANCE: 100,
    MAX_VELOCITY: 2,
    
    // Animation
    OPACITY_VARIATION: 0.3,
    SIZE_VARIATION: 2,
    PULSE_SPEED: 0.01,
    
    // Performance
    FPS_CAP: 60,
    LAZY_RENDER: true,
    LAZY_THRESHOLD: 30 // FPS threshold for lazy mode
};

// ===== PARTICLE TYPES =====
class HeartParticle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.color = PARTICLE_CONFIG.COLORS[Math.floor(Math.random() * PARTICLE_CONFIG.COLORS.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.pulse = 0;
        this.pulseDirection = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.shape = 'heart';
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation);
        
        // Create pulsing effect
        const pulseFactor = 1 + Math.sin(this.pulse) * 0.2;
        const currentSize = this.size * pulseFactor;
        
        // Draw heart shape
        this.ctx.beginPath();
        const topCurveHeight = currentSize * 0.7;
        this.ctx.moveTo(0, topCurveHeight / 2);
        
        // Top left curve
        this.ctx.bezierCurveTo(
            -currentSize / 2, -currentSize / 2,
            -currentSize, topCurveHeight / 2,
            0, topCurveHeight
        );
        
        // Top right curve
        this.ctx.bezierCurveTo(
            currentSize, topCurveHeight / 2,
            currentSize / 2, -currentSize / 2,
            0, topCurveHeight / 2
        );
        
        this.ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
        this.ctx.fill();
        this.ctx.restore();
    }

    update(mouse) {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Apply gravity
        this.speedY += PARTICLE_CONFIG.GRAVITY;
        
        // Apply friction
        this.speedX *= PARTICLE_CONFIG.FRICTION;
        this.speedY *= PARTICLE_CONFIG.FRICTION;
        
        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < PARTICLE_CONFIG.INTERACTION_RADIUS) {
                const force = PARTICLE_CONFIG.MOUSE_REPULSION / distance;
                this.speedX += (dx / distance) * force;
                this.speedY += (dy / distance) * force;
            }
        }
        
        // Boundary check with bounce
        if (this.x <= 0 || this.x >= this.ctx.canvas.width) {
            this.speedX *= -0.8;
            this.x = Math.max(0, Math.min(this.x, this.ctx.canvas.width));
        }
        
        if (this.y <= 0 || this.y >= this.ctx.canvas.height) {
            this.speedY *= -0.8;
            this.y = Math.max(0, Math.min(this.y, this.ctx.canvas.height));
        }
        
        // Limit velocity
        const velocity = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (velocity > PARTICLE_CONFIG.MAX_VELOCITY) {
            this.speedX = (this.speedX / velocity) * PARTICLE_CONFIG.MAX_VELOCITY;
            this.speedY = (this.speedY / velocity) * PARTICLE_CONFIG.MAX_VELOCITY;
        }
        
        // Update pulse
        this.pulse += PARTICLE_CONFIG.PULSE_SPEED * this.pulseDirection;
        if (this.pulse > Math.PI || this.pulse < 0) {
            this.pulseDirection *= -1;
        }
        
        // Update rotation
        this.rotation += this.rotationSpeed;
    }
}

class CircleParticle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.color = PARTICLE_CONFIG.COLORS[Math.floor(Math.random() * PARTICLE_CONFIG.COLORS.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.3 + 0.3;
        this.shape = 'circle';
        this.glow = Math.random() > 0.7;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.glow) {
            // Add glow effect
            this.ctx.shadowColor = this.color;
            this.ctx.shadowBlur = 10;
        }
        
        this.ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
        this.ctx.fill();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    update(mouse) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Boundary wrap
        if (this.x < -this.size) this.x = this.ctx.canvas.width + this.size;
        if (this.x > this.ctx.canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = this.ctx.canvas.height + this.size;
        if (this.y > this.ctx.canvas.height + this.size) this.y = -this.size;
        
        // Mouse interaction (attraction)
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < PARTICLE_CONFIG.INTERACTION_RADIUS) {
                const force = PARTICLE_CONFIG.MOUSE_ATTRACTION / (distance * distance);
                this.speedX += dx * force;
                this.speedY += dy * force;
            }
        }
        
        // Random motion
        this.speedX += (Math.random() - 0.5) * 0.1;
        this.speedY += (Math.random() - 0.5) * 0.1;
        
        // Dampen motion
        this.speedX *= 0.99;
        this.speedY *= 0.99;
    }
}

// ===== PARTICLE SYSTEM CORE =====
class AdvancedParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn(`Canvas element with id "${canvasId}" not found`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.animationId = null;
        this.lastTimestamp = 0;
        this.fps = 60;
        this.frameCount = 0;
        this.lastFpsUpdate = 0;
        this.lazyMode = false;
        this.connections = [];
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        
        // Performance monitoring
        this.setupPerformanceMonitor();
    }

    setupCanvas() {
        // Set canvas size
        this.resizeCanvas();
        
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        
        // Handle resize
        const resizeObserver = new ResizeObserver(() => {
            this.resizeCanvas();
            this.createParticles(); // Recreate particles on resize
        });
        
        resizeObserver.observe(this.canvas);
        
        // Store observer for cleanup
        this.resizeObserver = resizeObserver;
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    getParticleCount() {
        if (window.innerWidth < 768) {
            return PARTICLE_CONFIG.COUNT.MOBILE;
        } else if (window.innerWidth < 1024) {
            return PARTICLE_CONFIG.COUNT.TABLET;
        }
        return PARTICLE_CONFIG.COUNT.DESKTOP;
    }

    createParticles() {
        this.particles = [];
        const count = this.getParticleCount();
        
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const type = PARTICLE_CONFIG.SHAPES[Math.floor(Math.random() * PARTICLE_CONFIG.SHAPES.length)];
            
            let particle;
            switch(type) {
                case 'heart':
                    particle = new HeartParticle(this.ctx, x, y);
                    break;
                case 'triangle':
                    // Triangle particle could be implemented similarly
                default:
                    particle = new CircleParticle(this.ctx, x, y);
            }
            
            this.particles.push(particle);
        }
    }

    setupEventListeners() {
        // Mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Touch support
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.touches[0].clientX - rect.left;
            this.mouse.y = e.touches[0].clientY - rect.top;
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Particle explosion on click/tap
        this.canvas.addEventListener('click', (e) => {
            this.createExplosion(e.clientX, e.clientY);
        });
    }

    createExplosion(x, y) {
        const rect = this.canvas.getBoundingClientRect();
        const explosionX = x - rect.left;
        const explosionY = y - rect.top;
        
        // Create 10 new particles at explosion point
        for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            
            const particle = new HeartParticle(
                this.ctx,
                explosionX,
                explosionY
            );
            
            particle.speedX = Math.cos(angle) * speed;
            particle.speedY = Math.sin(angle) * speed;
            particle.size = Math.random() * 6 + 3;
            
            this.particles.push(particle);
        }
    }

    drawConnections() {
        // Draw lines between nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < PARTICLE_CONFIG.CONNECTION_DISTANCE) {
                    // Calculate opacity based on distance
                    const opacity = 0.3 * (1 - distance / PARTICLE_CONFIG.CONNECTION_DISTANCE);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    drawBackground() {
        // Create gradient background
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            0,
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.max(this.canvas.width, this.canvas.height) / 2
        );
        
        gradient.addColorStop(0, 'rgba(255, 240, 245, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 228, 230, 0.05)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateFPS(timestamp) {
        this.frameCount++;
        
        if (timestamp >= this.lastFpsUpdate + 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = timestamp;
            
            // Enable lazy mode if FPS drops
            if (PARTICLE_CONFIG.LAZY_RENDER) {
                this.lazyMode = this.fps < PARTICLE_CONFIG.LAZY_THRESHOLD;
            }
        }
    }

setupPerformanceMonitor() {
    const isDevelopment = 
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        localStorage.getItem('debug-mode') === 'true';
    
    if (isDevelopment) {
        setInterval(() => {
            console.log(`%cParticle System: ${this.particles.length} particles, ${this.fps} FPS${this.lazyMode ? ' (Lazy Mode)' : ''}`, 
                'color: #ff2e63; font-weight: bold;');
        }, 5000);
    }
}

    animate(timestamp = 0) {
        // Calculate delta time for smooth animations
        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        
        // Update FPS counter
        this.updateFPS(timestamp);
        
        // Clear canvas with fade effect for trails
        this.ctx.fillStyle = 'rgba(255, 240, 245, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.drawBackground();
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            // Skip updates in lazy mode for some particles
            if (!this.lazyMode || i % 2 === 0) {
                particle.update(this.mouse);
            }
            
            particle.draw();
        }
        
        // Draw connections between particles
        if (!this.lazyMode) {
            this.drawConnections();
        }
        
        // Request next frame with FPS cap
        setTimeout(() => {
            this.animationId = requestAnimationFrame((ts) => this.animate(ts));
        }, 1000 / PARTICLE_CONFIG.FPS_CAP);
    }

    destroy() {
        // Stop animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Clean up observers
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Remove event listeners
        this.canvas.replaceWith(this.canvas.cloneNode(true));
        
        console.log('Particle system destroyed');
    }

    // Public methods for interaction
    addParticle(x, y, type = 'heart') {
        let particle;
        
        switch(type) {
            case 'heart':
                particle = new HeartParticle(this.ctx, x, y);
                break;
            default:
                particle = new CircleParticle(this.ctx, x, y);
        }
        
        this.particles.push(particle);
        return particle;
    }

    removeParticle(index) {
        if (index >= 0 && index < this.particles.length) {
            this.particles.splice(index, 1);
        }
    }

    changeColorScheme(scheme) {
        const schemes = {
            valentine: ['rgba(255, 46, 99, 0.8)', 'rgba(8, 217, 214, 0.6)', 'rgba(255, 222, 125, 0.7)'],
            pastel: ['rgba(255, 182, 193, 0.8)', 'rgba(173, 216, 230, 0.6)', 'rgba(221, 160, 221, 0.7)'],
            neon: ['rgba(255, 20, 147, 0.8)', 'rgba(0, 255, 255, 0.6)', 'rgba(255, 215, 0, 0.7)']
        };
        
        PARTICLE_CONFIG.COLORS = schemes[scheme] || schemes.valentine;
        
        // Update existing particles
        this.particles.forEach(particle => {
            particle.color = PARTICLE_CONFIG.COLORS[Math.floor(Math.random() * PARTICLE_CONFIG.COLORS.length)];
        });
    }

    getStats() {
        return {
            particleCount: this.particles.length,
            fps: this.fps,
            lazyMode: this.lazyMode,
            canvasSize: {
                width: this.canvas.width,
                height: this.canvas.height
            }
        };
    }
}

// ===== EXPORT & INITIALIZATION =====
// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdvancedParticleSystem, HeartParticle, CircleParticle };
}

// Auto-initialize if script is loaded in browser
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
        // Check if canvas exists
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            // Initialize particle system
            window.particleSystem = new AdvancedParticleSystem('particles-canvas');
            
            // Make system available globally for debugging
            window.ValentineParticles = window.particleSystem;
            
            // Handle page visibility
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    window.particleSystem.destroy();
                } else {
                    window.particleSystem = new AdvancedParticleSystem('particles-canvas');
                }
            });
        }
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
        if (window.particleSystem) {
            window.particleSystem.destroy();
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('Particle system error:', event.error);
    
    // Graceful fallback - simple particle system
    const fallbackParticles = () => {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function createFallbackParticles() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            
            particles = [];
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speed: Math.random() * 0.5 + 0.2,
                    color: 'rgba(255, 46, 99, 0.3)'
                });
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) p.y = canvas.height;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        createFallbackParticles();
        animate();
        window.addEventListener('resize', createFallbackParticles);
    };
    
    setTimeout(fallbackParticles, 100);
});
