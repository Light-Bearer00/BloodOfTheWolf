document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    
    initializeShrine();
    startPoetryAnimation(isMobile);
    
    // Only create heavy effects on desktop
    if (!isMobile) {
        createParticles();
        createFloatingAshes();
        initMysticCanvas();
        addAudioAmbiance();
    }
    
    addInteractiveEffects(isMobile);
});

function initializeShrine() {
    const symbol = document.getElementById('wolfSymbol');
    if (symbol) {
        symbol.addEventListener('load', function() {
            console.log('Wolf symbol loaded successfully');
        });
        
        symbol.addEventListener('error', function() {
            console.warn('Symbol image not found. Please ensure symbol.png is in the same directory or update the path.');
            createFallbackSymbol();
        });
    } else {
        console.warn('Wolf symbol element not found. Please check your HTML ID.');
        createFallbackSymbol();
    }
}

function createFallbackSymbol() {
    const symbolContainer = document.querySelector('.symbol-container');
    if (symbolContainer) {
        const fallbackSymbol = document.createElement('div');
        fallbackSymbol.className = 'fallback-symbol';
        fallbackSymbol.innerHTML = '🐺';
        fallbackSymbol.style.cssText = `
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
            filter: drop-shadow(0 0 20px rgba(255, 0, 0, 1)) 
                    drop-shadow(0 0 40px rgba(255, 0, 0, 0.9));
            opacity: 0.9;
            /* Animation will be disabled by CSS media query on mobile */
            animation: symbolGlow 5s ease-in-out infinite;
            will-change: transform, filter;
        `;
        symbolContainer.appendChild(fallbackSymbol);
    }
}

function startPoetryAnimation(isMobile) {
    const lines = [
        'line1', 'line2', 'line3', 'line4', 'line5', 
        'line6', 'line7', 'line8', 'line9', 'line10', 
        'line11', 'finalLine'
    ];
    
    let currentIndex = 0;
    
    function animateNextLine() {
        if (currentIndex < lines.length) {
            const lineElement = document.getElementById(lines[currentIndex]);
            if (lineElement) {
                const lineDelay = isMobile ? 250 : 450; 
                setTimeout(() => {
                    lineElement.classList.add('visible');
                    
                    if (!isMobile) {
                        if (lines[currentIndex] === 'finalLine') {
                            addFinalLineGlow(lineElement);
                        }
                        addMysticalEffect(lineElement);
                    }
                    
                    currentIndex++;
                    animateNextLine();
                }, lineDelay);
            }
        }
    }
    
    const initialPoetryDelay = isMobile ? 3000 : 4500;
    setTimeout(() => {
        animateNextLine();
    }, initialPoetryDelay);
}

function addMysticalEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: mysticalRipple 2s ease-out forwards;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    if (!document.querySelector('#mysticalRippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'mysticalRippleAnimation';
        style.textContent = `
            @keyframes mysticalRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 180px;
                    height: 180px; 
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 2000);
}

function addFinalLineGlow(element) {
    element.style.animation = 'finalLineGlow 3s ease-in-out infinite';
    
    if (!document.querySelector('#finalLineGlowStyle')) {
        const style = document.createElement('style');
        style.id = 'finalLineGlowStyle';
        style.textContent = `
            @keyframes finalLineGlow {
                0%, 100% {
                    text-shadow: 0 0 25px rgba(139, 0, 0, 0.8), 0 0 50px rgba(139, 0, 0, 0.6);
                }
                50% {
                    text-shadow: 0 0 35px rgba(139, 0, 0, 1), 0 0 70px rgba(139, 0, 0, 0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 3500);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

function addInteractiveEffects(isMobile) {
    const symbol = document.getElementById('wolfSymbol');
    const fallbackSymbol = document.querySelector('.fallback-symbol');
    
    if (!isMobile) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            if (symbol) {
                symbol.style.willChange = 'transform'; 
                symbol.style.transform = `scale(1) translate(${x * 8}px, ${y * 8}px)`;
            }
            if (fallbackSymbol) {
                fallbackSymbol.style.willChange = 'transform'; 
                fallbackSymbol.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
            }
        });
    }
    
    const symbolContainer = document.querySelector('.symbol-container');
    if (symbolContainer) {
        symbolContainer.addEventListener('click', function(e) {
            if (!isMobile) {
                createRippleEffect(e);
            } else {
                symbolContainer.style.opacity = '0.7';
                setTimeout(() => {
                    symbolContainer.style.opacity = '';
                }, 100);
            }
        });
    }
    
    const mysticButton = document.getElementById('mysticButton');
    if (mysticButton) {
        if (!isMobile) {
            mysticButton.addEventListener('mouseenter', function() {
                createButtonParticles(this);
            });
        }
        
        mysticButton.addEventListener('click', function(e) {
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            if (!isMobile) {
                createButtonClickEffect(e);
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            restartPoetryAnimation(isMobile);
        }
    });
    
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (diff > 50) {
            restartPoetryAnimation(isMobile);
        }
    });
}

function createRippleEffect(event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(139, 0, 0, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        left: ${event.offsetX}px; 
        top: ${event.offsetY}px;
    `;
    
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const symbolContainer = document.querySelector('.symbol-container');
    if (symbolContainer) {
        symbolContainer.appendChild(ripple);
    }
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function restartPoetryAnimation(isMobile) {
    const lines = document.querySelectorAll('.poem-line');
    lines.forEach(line => {
        line.classList.remove('visible');
        if (!isMobile) {
             line.style.position = ''; 
        }
    });
    
    const restartDelay = isMobile ? 800 : 1500;
    setTimeout(() => {
        startPoetryAnimation(isMobile);
    }, restartDelay);
}

window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
        });

        const canvas = document.getElementById('mysticCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
});

function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'button-particle';
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(255, 0, 0, 0.9); 
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: buttonParticleFloat 1s ease-out forwards;
        `;
        
        if (!document.querySelector('#buttonParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'buttonParticleAnimation';
            style.textContent = `
                @keyframes buttonParticleFloat {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function createButtonClickEffect(event) {
    const ripple = document.createElement('div');
    ripple.className = 'button-ripple';
    ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.5) 0%, transparent 70%);
        transform: scale(0);
        animation: buttonRipple 0.8s ease-out;
        pointer-events: none;
        z-index: 1000;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        width: 0;
        height: 0;
    `;
    
    if (!document.querySelector('#buttonRippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'buttonRippleAnimation';
        style.textContent = `
            @keyframes buttonRipple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 800);
}

function createFloatingAshes() {
    const ashesContainer = document.querySelector('.floating-ashes');
    const ashCount = 15;
    
    for (let i = 0; i < ashCount; i++) {
        createAshParticle(ashesContainer);
    }
    
    setInterval(() => {
        if (ashesContainer.children.length < ashCount) {
            createAshParticle(ashesContainer);
        }
    }, 2500);
}

function createAshParticle(container) {
    const ash = document.createElement('div');
    ash.className = 'ash-particle';
    
    const x = Math.random() * window.innerWidth;
    const duration = 8 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    ash.style.cssText = `
        left: ${x}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(ash);
    
    setTimeout(() => {
        if (ash.parentNode) {
            ash.parentNode.removeChild(ash);
        }
    }, (duration + delay) * 1000);
}

function initMysticCanvas() {
    const canvas = document.getElementById('mysticCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const particleCount = 20;
    
    class MysticParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.life = Math.random() * 80 + 40;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            if (this.life <= 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.life = Math.random() * 80 + 40;
            }
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
            ctx.shadowColor = 'rgba(255, 0, 0, 0.6)';
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new MysticParticle());
    }
    
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 80) {
                    ctx.save();
                    ctx.globalAlpha = (80 - distance) / 80 * 0.08;
                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = []; 
        for (let i = 0; i < particleCount; i++) {
            particles.push(new MysticParticle());
        }
        animate();
    });
}

function addAudioAmbiance() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(55, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start();
        
        setTimeout(() => {
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
            setTimeout(() => oscillator.stop(), 3100); 
        }, 7000);
    }
}

// Removed the problematic setTimeout that was hiding ambient effects on load.
// They will now persist on desktop where they are enabled by default.
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});