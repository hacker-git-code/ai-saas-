// Seamless video loop for #bg-video
function seamlessVideoLoop() {
  const video = document.getElementById('bg-video');
  if (!video) return;
  video.addEventListener('timeupdate', function() {
    if (video.currentTime >= 7) {
      video.currentTime = 0.01;
      video.play();
    }
  });
  // Ensure video starts at 0 on load
  video.addEventListener('loadedmetadata', function() {
    video.currentTime = 0.01;
  });
}

document.addEventListener('DOMContentLoaded', seamlessVideoLoop);

document.addEventListener('DOMContentLoaded', function() {
    ghibliBayAreaBackground();
});

// Chat bar to login/signup modal flow
const chatBarSection = document.getElementById('chatBarSection');
const chatBarForm = document.getElementById('chatBarForm');
const authModal = document.getElementById('authModal');
const mainApp = document.getElementById('mainApp');

if (chatBarForm) {
    chatBarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('loginEmail').focus();
        }, 100);
    });
}

// Auth modal tab switching
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.style.display = '';
        signupForm.style.display = 'none';
        document.getElementById('loginEmail').focus();
    });
    signupTab.addEventListener('click', function() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.style.display = '';
        loginForm.style.display = 'none';
        document.getElementById('signupEmail').focus();
    });
}

// Simulate login/signup (no backend)
function unlockApp() {
    authModal.style.display = 'none';
    chatBarSection.style.display = 'none';
    mainApp.style.display = '';
    document.body.style.overflow = '';
}
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        unlockApp();
    });
}
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        unlockApp();
    });
}

// MVP: Handle idea submission and send to Make.com webhook (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ideaForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitButton');
            submitBtn.innerHTML = 'Analyzing...';
            submitBtn.disabled = true;
            // Get form data
            const idea = document.getElementById('ideaDescription').value;
            const industry = document.getElementById('industry').value;
            const audience = document.getElementById('audience').value;
            const monetization = document.getElementById('monetization').value;
            // Send to Make.com webhook (replace URL below)
            try {
                const response = await fetch('YOUR_MAKE_WEBHOOK_URL', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idea, industry, audience, monetization })
                });
                const data = await response.json();
                // Store results
                localStorage.setItem('analysisResults', JSON.stringify(data));
                window.location.href = 'results.html';
            } catch (error) {
                alert('Error analyzing idea. Please try again.');
                submitBtn.innerHTML = 'Submit';
                submitBtn.disabled = false;
            }
        });
    }
});
