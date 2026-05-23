(function() {
    "use strict";
    
    // ========== GSAP + SCROLLTRIGGER DETECTION ==========
    const hasGSAP = typeof gsap !== 'undefined';
    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    
    if (hasGSAP && hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.fromTo(".hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(0.5)" });
        gsap.fromTo("h1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "back.out(0.5)" });
        gsap.fromTo(".typewriter-container", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "back.out(0.5)" });
        gsap.fromTo(".hero p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(0.5)" });
        gsap.fromTo(".hero .btn", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.8, stagger: 0.1, ease: "elastic.out(1, 0.5)" });
        gsap.fromTo(".profile-wrapper", { opacity: 0, scale: 0.8, rotation: -5 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, delay: 0.5, ease: "back.out(0.6)" });
        
        gsap.fromTo("#skills h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#skills", start: "top 85%" } });
        gsap.fromTo(".skill-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: "#skills .skills-grid", start: "top 80%" } });
        gsap.fromTo("#projects h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#projects", start: "top 85%" } });
        gsap.fromTo(".project-card", { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: "#projects .projects-grid", start: "top 80%" } });
        gsap.fromTo("#about h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#about", start: "top 85%" } });
        gsap.fromTo(".about-flex", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: "#about .about-wrap", start: "top 80%" } });
        gsap.fromTo("#contact h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#contact", start: "top 85%" } });
        gsap.fromTo(".contact-grid", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: "#contact .contact-section", start: "top 80%" } });
    } else {
        document.querySelectorAll('.hero-badge, h1, .typewriter-container, .hero p, .hero .btn, .profile-wrapper').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    
    // ========== NUMBER COUNTER ==========
    function animateNumber(element, start, end, duration) {
        if (!element) return;
        let startTime = null;
        function update(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.id === 'stat3' ? '%' : '');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
    
    const stat1 = document.getElementById('stat1');
    if (stat1) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(stat1, 0, 4, 1500);
                    const stat2 = document.getElementById('stat2');
                    const stat3 = document.getElementById('stat3');
                    if (stat2) animateNumber(stat2, 0, 15, 1500);
                    if (stat3) animateNumber(stat3, 0, 100, 1500);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(stat1);
    }
    
    // ========== MAGNETIC BUTTON (DESKTOP ONLY) ==========
    if (!('ontouchstart' in window)) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
                }
            });
            btn.addEventListener('mouseleave', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
                }
            });
        });
    }
    
    // ========== PARTICLE BACKGROUND ==========
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;
        let animFrameId;
        
        function resizeCanvas() {
            const hero = canvas.parentElement;
            width = hero.offsetWidth;
            height = hero.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        }
        
        function createParticles() {
            particles = [];
            const count = window.innerWidth < 768 ? 25 : 50;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            animFrameId = requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', () => {
            if (animFrameId) cancelAnimationFrame(animFrameId);
            resizeCanvas();
            createParticles();
            animateParticles();
        });
        
        resizeCanvas();
        createParticles();
        animateParticles();
    }
    
    // ========== TYPEWRITER ==========
    const typeEl = document.getElementById('typewriter-text');
    if (typeEl) {
        const phrases = ["Embedded Systems Engineer", "IoT & Firmware Developer", "Neubrutal UI Enthusiast", "Computer Engineering 2026"];
        let idx = 0, charI = 0, del = false, curTxt = '', timeoutId;
        
        function type() {
            const full = phrases[idx];
            if (del) {
                curTxt = full.substring(0, charI - 1);
                charI--;
            } else {
                curTxt = full.substring(0, charI + 1);
                charI++;
            }
            typeEl.textContent = curTxt;
            
            if (!del && charI === full.length) {
                del = true;
                timeoutId = setTimeout(type, 1800);
                return;
            }
            if (del && charI === 0) {
                del = false;
                idx = (idx + 1) % phrases.length;
                timeoutId = setTimeout(type, 300);
                return;
            }
            timeoutId = setTimeout(type, del ? 60 : 100);
        }
        
        type();
        
        window.addEventListener('beforeunload', () => {
            clearTimeout(timeoutId);
        });
    }
    
    // ========== MUSIC PLAYER - INSTAN RESPON, NO DELAY ==========
    const tracks = [
        { name: "When I Was Your Man", file: "music/1.mp3" },
        { name: "Into It", file: "music/2.mp3" },
        { name: "Who Knows", file: "music/3.mp3" },
        { name: "That Should Be Me", file: "music/4.mp3" },
        { name: "About You", file: "music/5.mp3" }
    ];
    
    let currentTrack = 0;
    let audio = null;
    let isPlaying = false;
    
    const musicMainBtn = document.getElementById('musicMainBtn');
    const popupCard = document.getElementById('musicPopupCard');
    const closePopup = document.getElementById('closePopupBtn');
    const trackListDiv = document.getElementById('trackListVertical');
    const nowPlayingSpan = document.getElementById('nowPlayingName');
    const playPauseBtn = document.getElementById('playPauseMini');
    const prevBtn = document.getElementById('prevTrackMini');
    const nextBtn = document.getElementById('nextTrackMini');
    const progressFill = document.getElementById('progressFillMini');
    const progressBar = document.getElementById('progressBarMini');
    const currentTimeSpan = document.getElementById('currentTimeMini');
    const durationSpan = document.getElementById('durationTimeMini');
    
    if (!musicMainBtn || !popupCard) {
        console.log("Music player elements missing.");
    } else {
        
        function createAudio() {
            if (audio) return;
            audio = new Audio();
            audio.preload = "auto";
            audio.volume = 1.0;
            
            audio.addEventListener('ended', () => {
                isPlaying = false;
                updatePlayIcon();
                nextTrackFunc();
            });
            
            audio.addEventListener('loadedmetadata', () => {
                if (audio.duration && isFinite(audio.duration)) {
                    durationSpan.textContent = formatTimeSec(audio.duration);
                }
            });
            
            audio.addEventListener('error', () => {
                nowPlayingSpan.textContent = '❌ Gagal load';
                isPlaying = false;
                updatePlayIcon();
            });
            
            audio.addEventListener('timeupdate', () => {
                if (audio.duration && isFinite(audio.duration)) {
                    const percent = (audio.currentTime / audio.duration) * 100;
                    progressFill.style.width = Math.min(percent, 100) + '%';
                    currentTimeSpan.textContent = formatTimeSec(audio.currentTime);
                }
            });
        }
        
        function formatTimeSec(sec) {
            if (isNaN(sec) || !isFinite(sec)) return "0:00";
            const mins = Math.floor(sec / 60);
            const secs = Math.floor(sec % 60);
            return mins + ":" + (secs < 10 ? '0' + secs : secs);
        }
        
        function updatePlayIcon() {
            const icon = playPauseBtn.querySelector('i');
            if (!icon) return;
            if (isPlaying) {
                icon.className = 'fas fa-pause';
            } else {
                icon.className = 'fas fa-play';
            }
        }
        
        function setPlaying(state) {
            isPlaying = state;
            updatePlayIcon();
        }
        
        function loadTrack(index) {
            createAudio();
            if (index < 0 || index >= tracks.length) index = 0;
            currentTrack = index;
            audio.src = tracks[currentTrack].file;
            nowPlayingSpan.textContent = '🎵 ' + tracks[currentTrack].name;
            updateActiveTrackUI();
            progressFill.style.width = '0%';
            currentTimeSpan.textContent = "0:00";
            durationSpan.textContent = "0:00";
        }
        
        function updateActiveTrackUI() {
            document.querySelectorAll('.track-item-mini').forEach((item, i) => {
                item.classList.toggle('active-track', i === currentTrack);
            });
        }
        
        function playTrack() {
            createAudio();
            if (!audio.src || audio.src === window.location.href) {
                loadTrack(currentTrack);
            }
            setPlaying(true);
            audio.play().then(() => {
                setPlaying(true);
            }).catch(() => {
                setPlaying(false);
                nowPlayingSpan.textContent = 'Klik lagi ya!';
            });
        }
        
        function pauseTrack() {
            if (!audio) return;
            setPlaying(false);
            audio.pause();
        }
        
        function togglePlay() {
            if (isPlaying) {
                pauseTrack();
            } else {
                playTrack();
            }
        }
        
        function nextTrackFunc() {
            currentTrack = (currentTrack + 1) % tracks.length;
            loadTrack(currentTrack);
            setPlaying(true);
            audio.play().then(() => {
                setPlaying(true);
            }).catch(() => {
                setPlaying(false);
            });
        }
        
        function prevTrackFunc() {
            currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrack);
            setPlaying(true);
            audio.play().then(() => {
                setPlaying(true);
            }).catch(() => {
                setPlaying(false);
            });
        }
        
        function renderTrackList() {
            if (!trackListDiv) return;
            trackListDiv.innerHTML = '';
            tracks.forEach((track, i) => {
                const div = document.createElement('div');
                div.className = 'track-item-mini';
                div.innerHTML = '<span class="track-name-mini">' + track.name + '</span> <i class="fas fa-play-circle"></i>';
                div.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (currentTrack === i && isPlaying) {
                        pauseTrack();
                    } else {
                        currentTrack = i;
                        loadTrack(currentTrack);
                        playTrack();
                    }
                });
                trackListDiv.appendChild(div);
            });
            updateActiveTrackUI();
        }
        
        musicMainBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            popupCard.classList.toggle('show');
            createAudio();
            if (!audio.src || audio.src === window.location.href) {
                loadTrack(0);
            }
        });
        
        closePopup.addEventListener('click', function(e) {
            e.stopPropagation();
            popupCard.classList.remove('show');
        });
        
        playPauseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            togglePlay();
        });
        
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            prevTrackFunc();
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nextTrackFunc();
        });
        
        document.addEventListener('click', function(e) {
            if (popupCard.classList.contains('show') &&
                !popupCard.contains(e.target) &&
                e.target !== musicMainBtn &&
                !musicMainBtn.contains(e.target)) {
                popupCard.classList.remove('show');
            }
        });
        
        progressBar.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!audio || !audio.duration || !isFinite(audio.duration)) return;
            const rect = progressBar.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audio.currentTime = percent * audio.duration;
        });
        
        renderTrackList();
        setPlaying(false);
    }
    
    // ========== EMAILJS FORM HANDLER ==========
    (function() {
        const RECIPIENT_EMAIL = "mnajat0508@gmail.com";
        const MAX_MESSAGES_PER_MINUTE = 3;
        const SUBMIT_COOLDOWN = 3500;
        const MIN_MESSAGE_LENGTH = 5;
        const MAX_MESSAGE_LENGTH = 1500;
        const HONEYPOT_NAME = "user_website_" + Math.random().toString(36).substring(2, 8);
        
        let messageTimestamps = [];
        let lastSubmitTime = 0;
        let isSubmitting = false;
        let emailJSInitDone = false;
        
        const form = document.getElementById('modernForm');
        if (!form) return;
        
        const statusDiv = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitBtn');
        const honeypotField = form.querySelector('input[name="website"]');
        
        if (honeypotField) {
            honeypotField.setAttribute('name', HONEYPOT_NAME);
        }
        
        function initEmailJS() {
            if (!emailJSInitDone && typeof emailjs !== 'undefined') {
                emailjs.init("d2oi_fcBXnjBWkW8Z");
                emailJSInitDone = true;
            }
        }
        initEmailJS();
        
        function isRateLimited() {
            const now = Date.now();
            messageTimestamps = messageTimestamps.filter(time => time > now - 60000);
            if (messageTimestamps.length >= MAX_MESSAGES_PER_MINUTE) return true;
            messageTimestamps.push(now);
            return false;
        }
        
        function isInCooldown() {
            const now = Date.now();
            if (now - lastSubmitTime < SUBMIT_COOLDOWN) return true;
            lastSubmitTime = now;
            return false;
        }
        
        function sanitizeInput(str) {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }
        
        function validateInput(name, email, msg) {
            if (!name || !email || !msg) return { valid: false, error: '⚠️ Mohon lengkapi semua field!' };
            if (name.length > 100) return { valid: false, error: '⚠️ Nama terlalu panjang!' };
            if (!email.includes('@') || email.length > 200) return { valid: false, error: '❌ Format email tidak valid!' };
            if (msg.length < MIN_MESSAGE_LENGTH) return { valid: false, error: '⚠️ Pesan minimal ' + MIN_MESSAGE_LENGTH + ' karakter!' };
            if (msg.length > MAX_MESSAGE_LENGTH) return { valid: false, error: '⚠️ Pesan terlalu panjang! Maksimal ' + MAX_MESSAGE_LENGTH + ' karakter.' };
            const dangerousPatterns = /<script|javascript:|on\w+=/i;
            if (dangerousPatterns.test(name) || dangerousPatterns.test(email) || dangerousPatterns.test(msg)) {
                return { valid: false, error: '⚠️ Input mengandung karakter tidak valid!' };
            }
            return { valid: true };
        }
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!emailJSInitDone) {
                initEmailJS();
                if (!emailJSInitDone) {
                    statusDiv.innerHTML = '❌ Layanan email belum siap, coba refresh.';
                    statusDiv.style.color = "#d9534f";
                    setTimeout(() => statusDiv.innerHTML = '', 3000);
                    return;
                }
            }
            
            if (honeypotField && honeypotField.value) {
                statusDiv.innerHTML = '✅ Terkirim! Terima kasih.';
                statusDiv.style.color = "#2b8c2b";
                form.reset();
                setTimeout(() => { statusDiv.innerHTML = ''; }, 2000);
                return;
            }
            
            if (isInCooldown()) {
                statusDiv.innerHTML = '⏳ Tunggu beberapa detik sebelum kirim lagi...';
                statusDiv.style.color = "#ffb703";
                setTimeout(() => statusDiv.innerHTML = '', 2000);
                return;
            }
            
            if (isRateLimited()) {
                statusDiv.innerHTML = '⚠️ Kamu sudah mengirim terlalu banyak pesan. Coba lagi nanti!';
                statusDiv.style.color = "#d9534f";
                setTimeout(() => statusDiv.innerHTML = '', 3000);
                return;
            }
            
            if (isSubmitting) return;
            
            const name = document.getElementById('fullname')?.value.trim();
            const email = document.getElementById('emailAddr')?.value.trim();
            const msg = document.getElementById('msgContent')?.value.trim();
            
            const validation = validateInput(name, email, msg);
            if (!validation.valid) {
                statusDiv.innerHTML = validation.error;
                statusDiv.style.color = "#d9534f";
                setTimeout(() => statusDiv.innerHTML = '', 3000);
                return;
            }
            
            isSubmitting = true;
            submitBtn.disabled = true;
            statusDiv.innerHTML = '⏳ Mengirim...';
            statusDiv.style.color = "#ffb703";
            
            const templateParams = {
                name: sanitizeInput(name),
                email: sanitizeInput(email),
                message: sanitizeInput(msg),
                time: new Date().toLocaleString('id-ID', { 
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                }),
                to_email: RECIPIENT_EMAIL
            };
            
            emailjs.send("service_9measla", "template_67rf4v7", templateParams)
                .then(function() {
                    statusDiv.innerHTML = '✅ Pesan terkirim! Terima kasih, ' + sanitizeInput(name) + '!';
                    statusDiv.style.color = "#2b8c2b";
                    statusDiv.style.background = "#dcfce7";
                    statusDiv.style.padding = "0.3rem";
                    form.reset();
                    setTimeout(() => { 
                        statusDiv.innerHTML = ''; 
                        statusDiv.style.background = ''; 
                        submitBtn.disabled = false;
                        isSubmitting = false;
                    }, 3500);
                })
                .catch(function(error) {
                    console.error("EmailJS Error:", error);
                    statusDiv.innerHTML = '❌ Gagal mengirim. Silakan coba lagi!';
                    statusDiv.style.color = "#d9534f";
                    submitBtn.disabled = false;
                    isSubmitting = false;
                    setTimeout(() => statusDiv.innerHTML = '', 3000);
                });
        });
        
        form.addEventListener('reset', () => {
            if (honeypotField) honeypotField.value = '';
        });
    })();
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('nav a, .hero .btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    const offset = target.offsetTop - 70;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });
    
})();