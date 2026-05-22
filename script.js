(function() {
    // ========== SECURITY WARNING ==========
    console.log("%c⚠️ PERHATIAN!", "color: #ffb703; font-size: 20px; font-weight: bold;");
    console.log("%cshippai wa owari janai. sore wa tsugi no kaishi da.", "color: #d9534f; font-size: 14px;");
    console.log("%c— nazat", "color: #d9534f; font-size: 14px;");
    
    // ========== GSAP + SCROLLTRIGGER ==========
    gsap.registerPlugin(ScrollTrigger);
    
    // Animasi Hero
    gsap.fromTo(".hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(0.5)" });
    gsap.fromTo("h1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "back.out(0.5)" });
    gsap.fromTo(".typewriter-container", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "back.out(0.5)" });
    gsap.fromTo(".hero p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(0.5)" });
    gsap.fromTo(".hero .btn", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.8, stagger: 0.1, ease: "elastic.out(1, 0.5)" });
    gsap.fromTo(".profile-wrapper", { opacity: 0, scale: 0.8, rotation: -5 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, delay: 0.5, ease: "back.out(0.6)" });
    
    // Scroll animations
    gsap.fromTo("#skills h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#skills", start: "top 85%" } });
    gsap.fromTo(".skill-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: "#skills .skills-grid", start: "top 80%" } });
    gsap.fromTo("#projects h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#projects", start: "top 85%" } });
    gsap.fromTo(".project-card", { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: "#projects .projects-grid", start: "top 80%" } });
    gsap.fromTo("#about h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#about", start: "top 85%" } });
    gsap.fromTo(".about-flex", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: "#about .about-wrap", start: "top 80%" } });
    gsap.fromTo("#contact h2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: "#contact", start: "top 85%" } });
    gsap.fromTo(".contact-grid", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: "#contact .contact-section", start: "top 80%" } });
    
    // ========== NUMBER COUNTER ==========
    function animateNumber(element, start, end, duration) {
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
    const stat2 = document.getElementById('stat2');
    const stat3 = document.getElementById('stat3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(stat1, 0, 4, 1500);
                animateNumber(stat2, 0, 15, 1500);
                animateNumber(stat3, 0, 100, 1500);
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(stat1);
    
    // ========== MAGNETIC BUTTON ==========
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(this, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
        });
    });
    
    // ========== PARTICLE BACKGROUND ==========
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;
        
        function resizeCanvas() {
            const hero = canvas.parentElement;
            width = hero.offsetWidth;
            height = hero.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        }
        
        function createParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) {
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
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });
            requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        resizeCanvas();
        createParticles();
        animateParticles();
    }
    
    // ========== TYPEWRITER ==========
    const typeEl = document.getElementById('typewriter-text');
    const phrases = ["Embedded Systems Engineer", "IoT & Firmware Developer", "Neubrutal UI Enthusiast", "Computer Engineering 2026"];
    let idx = 0, charI = 0, del = false, curTxt = '';
    function type() {
        const full = phrases[idx];
        if (del) curTxt = full.substring(0, charI - 1), charI--;
        else curTxt = full.substring(0, charI + 1), charI++;
        typeEl.textContent = curTxt;
        if (!del && charI === full.length) { del = true; setTimeout(type, 1800); return; }
        if (del && charI === 0) { del = false; idx = (idx + 1) % phrases.length; setTimeout(type, 300); return; }
        setTimeout(type, del ? 60 : 100);
    }
    type();
    
    // ========== MUSIC PLAYER ==========
    const tracks = [
        { name: "When I Was Your Man ", file: "music/1.mp3" },
        { name: "Into It", file: "music/2.mp3" },
        { name: "Who Knows", file: "music/3.mp3" },
        { name: "That Should Be Me ",  file: "music/4.mp3" },
        { name: "About You ",  file: "music/5.mp3" }
    ];
    let currentTrack = 0;
    let audio = new Audio();
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
    
    function formatTimeSec(sec) {
        if (isNaN(sec)) return "0:00";
        const mins = Math.floor(sec / 60);
        const secs = Math.floor(sec % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }
    
    function loadTrack(index) {
        if (index < 0) index = 0;
        if (index >= tracks.length) index = 0;
        currentTrack = index;
        audio.src = tracks[currentTrack].file;
        audio.load();
        if (isPlaying) audio.play().catch(e => console.log("Need interaction"));
        nowPlayingSpan.innerHTML = `🎵 ${tracks[currentTrack].name}`;
        updateActiveTrackUI();
        progressFill.style.width = '0%';
        currentTimeSpan.innerText = "0:00";
        audio.addEventListener('loadedmetadata', function onMeta() {
            if (audio.duration && !isNaN(audio.duration)) durationSpan.innerText = formatTimeSec(audio.duration);
            audio.removeEventListener('loadedmetadata', onMeta);
        });
    }
    
    function updateActiveTrackUI() {
        document.querySelectorAll('.track-item-mini').forEach((item, i) => {
            if (i === currentTrack) item.classList.add('active-track');
            else item.classList.remove('active-track');
        });
    }
    
    function renderTrackList() {
        trackListDiv.innerHTML = '';
        tracks.forEach((track, i) => {
            const div = document.createElement('div');
            div.className = 'track-item-mini';
            div.innerHTML = `<span class="track-name-mini">${track.name}</span> <i class="fas fa-play-circle"></i>`;
            div.addEventListener('click', () => {
                if (currentTrack === i && isPlaying) {
                    audio.pause();
                    isPlaying = false;
                    updatePlayIcon();
                } else {
                    currentTrack = i;
                    loadTrack(currentTrack);
                    audio.play().then(() => { isPlaying = true; updatePlayIcon(); }).catch(() => {});
                }
            });
            trackListDiv.appendChild(div);
        });
        updateActiveTrackUI();
    }
    
    function updatePlayIcon() {
        const icon = playPauseBtn.querySelector('i');
        if (isPlaying) icon.className = 'fas fa-pause';
        else icon.className = 'fas fa-play';
    }
    
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play().catch(e => console.warn);
            isPlaying = true;
        }
        updatePlayIcon();
    }
    
    function nextTrackFunc() {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
        audio.play().then(() => { isPlaying = true; updatePlayIcon(); }).catch(() => {});
    }
    
    function prevTrackFunc() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrack);
        audio.play().then(() => { isPlaying = true; updatePlayIcon(); }).catch(() => {});
    }
    
    musicMainBtn.addEventListener('click', () => popupCard.classList.toggle('show'));
    closePopup.addEventListener('click', () => popupCard.classList.remove('show'));
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrackFunc);
    nextBtn.addEventListener('click', nextTrackFunc);
    
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isNaN(audio.duration)) {
            progressFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
            currentTimeSpan.innerText = formatTimeSec(audio.currentTime);
        }
    });
    audio.addEventListener('ended', nextTrackFunc);
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = percent * audio.duration;
    });
    
    renderTrackList();
    loadTrack(0);
    isPlaying = false;
    updatePlayIcon();
    
    // ========== SECURE EMAILJS FORM HANDLER ==========
    (function() {
        const RECIPIENT_EMAIL = "mnajat0508@gmail.com";
        const MAX_MESSAGES_PER_MINUTE = 3;
        const SUBMIT_COOLDOWN = 3500;
        const MIN_MESSAGE_LENGTH = 5;
        const MAX_MESSAGE_LENGTH = 1500;
        
        let messageTimestamps = [];
        let lastSubmitTime = 0;
        let isSubmitting = false;
        
        // ✅ PERBAIKAN 1: Public Key tanpa strip di akhir
        emailjs.init("d2oi_fcBXnjBWkW8Z");
        
        const form = document.getElementById('modernForm');
        const statusDiv = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitBtn');
        const honeypotField = document.querySelector('input[name="website"]');
        
        function isRateLimited() {
            const now = Date.now();
            const oneMinuteAgo = now - 60000;
            messageTimestamps = messageTimestamps.filter(time => time > oneMinuteAgo);
            
            if (messageTimestamps.length >= MAX_MESSAGES_PER_MINUTE) {
                return true;
            }
            
            messageTimestamps.push(now);
            return false;
        }
        
        function isInCooldown() {
            const now = Date.now();
            if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
                return true;
            }
            lastSubmitTime = now;
            return false;
        }
        
        function sanitizeInput(str) {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }
        
        function validateInput(name, email, msg) {
            if (!name || !email || !msg) {
                return { valid: false, error: '⚠️ Mohon lengkapi semua field!' };
            }
            
            if (name.length > 100) {
                return { valid: false, error: '⚠️ Nama terlalu panjang!' };
            }
            
            if (!email.includes('@') || email.length > 200) {
                return { valid: false, error: '❌ Format email tidak valid!' };
            }
            
            if (msg.length < MIN_MESSAGE_LENGTH) {
                return { valid: false, error: '⚠️ Pesan minimal ' + MIN_MESSAGE_LENGTH + ' karakter!' };
            }
            
            if (msg.length > MAX_MESSAGE_LENGTH) {
                return { valid: false, error: '⚠️ Pesan terlalu panjang! Maksimal ' + MAX_MESSAGE_LENGTH + ' karakter.' };
            }
            
            const dangerousPatterns = /<script|javascript:|on\w+=/i;
            if (dangerousPatterns.test(name) || dangerousPatterns.test(email) || dangerousPatterns.test(msg)) {
                return { valid: false, error: '⚠️ Input mengandung karakter tidak valid!' };
            }
            
            return { valid: true };
        }
        
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (honeypotField && honeypotField.value) {
                    console.warn("Bot detected via honeypot!");
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
                
                if (isSubmitting) {
                    return;
                }
                
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
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    to_email: RECIPIENT_EMAIL
                };
                
                // ✅ PERBAIKAN 2: Template ID yang benar
                emailjs.send("service_9measla", "template_67rf4v7", templateParams)
                    .then(function(response) {
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
                    }, function(error) {
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
        }
    })();
    
    // Smooth scroll
    document.querySelectorAll('nav a, .hero .btn, .btn-outline').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if(target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });
})();