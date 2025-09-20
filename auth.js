// Google Auth Configuration - Load from config.js
let GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

document.addEventListener('DOMContentLoaded', function() {
    if (typeof GOOGLE_AUTH_CONFIG !== 'undefined') {
        GOOGLE_CLIENT_ID = GOOGLE_AUTH_CONFIG.CLIENT_ID;
    }
    loadGoogleAPI();
});

function loadGoogleAPI() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = function() {
        gapi.load('auth2', initGoogleAuth);
    };
    document.head.appendChild(script);
}

function initGoogleAuth() {
    gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email'
    }).then(function(authInstance) {
        console.log('Google Auth initialized');
        attachSignInHandler();
        checkSignInStatus();
    }).catch(function(error) {
        console.error('Error initializing Google Auth:', error);
        showAuthError('Failed to initialize Google Authentication.');
    });
}

function attachSignInHandler() {
    const signInButton = document.getElementById('google-signin-btn');
    const signOutButton = document.getElementById('google-signout-btn');
    
    if (signInButton) {
        signInButton.addEventListener('click', signIn);
    }
    if (signOutButton) {
        signOutButton.addEventListener('click', signOut);
    }
}

function signIn() {
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        alert('Please configure your Google Client ID in config.js');
        return;
    }
    
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(function(googleUser) {
        const profile = googleUser.getBasicProfile();
        const userInfo = {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl(),
            idToken: googleUser.getAuthResponse().id_token
        };
        handleSignInSuccess(userInfo);
    }).catch(function(error) {
        handleSignInError(error);
    });
}

function signOut() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(function() {
        handleSignOut();
    });
}

function handleSignInSuccess(userInfo) {
    updateUIForSignedInUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    prefillRegistrationForm(userInfo);
    showSuccessMessage(`Welcome ${userInfo.name}! You are now signed in.`);
}

function handleSignInError(error) {
    let errorMessage = 'Sign-in failed. Please try again.';
    if (error.error === 'popup_closed_by_user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
    }
    showAuthError(errorMessage);
}

function handleSignOut() {
    updateUIForSignedOutUser();
    localStorage.removeItem('userInfo');
    showSuccessMessage('You have been signed out successfully.');
}

function updateUIForSignedInUser(userInfo) {
    const signInButton = document.getElementById('google-signin-btn');
    const signOutButton = document.getElementById('google-signout-btn');
    const userProfile = document.getElementById('user-profile');
    
    if (signInButton) signInButton.style.display = 'none';
    if (signOutButton) signOutButton.style.display = 'inline-block';
    
    if (userProfile) {
        userProfile.innerHTML = `
            <div class="user-info">
                <img src="${userInfo.imageUrl}" alt="Profile" class="profile-img">
                <span>Welcome, ${userInfo.name.split(' ')[0]}!</span>
            </div>
        `;
        userProfile.style.display = 'block';
    }
}

function updateUIForSignedOutUser() {
    const signInButton = document.getElementById('google-signin-btn');
    const signOutButton = document.getElementById('google-signout-btn');
    const userProfile = document.getElementById('user-profile');
    
    if (signInButton) signInButton.style.display = 'inline-block';
    if (signOutButton) signOutButton.style.display = 'none';
    if (userProfile) userProfile.style.display = 'none';
}

function checkSignInStatus() {
    try {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance && authInstance.isSignedIn.get()) {
            const googleUser = authInstance.currentUser.get();
            const profile = googleUser.getBasicProfile();
            const userInfo = {
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl(),
                idToken: googleUser.getAuthResponse().id_token
            };
            handleSignInSuccess(userInfo);
        }
    } catch (error) {
        console.error('Error checking sign-in status:', error);
    }
}

function prefillRegistrationForm(userInfo) {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    
    if (nameField && !nameField.value) {
        nameField.value = userInfo.name;
        nameField.style.borderColor = '#39ff14';
    }
    if (emailField && !emailField.value) {
        emailField.value = userInfo.email;
        emailField.style.borderColor = '#39ff14';
    }
}

function showSuccessMessage(message) {
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

function showAuthError(message) {
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 7000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `auth-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    return notification;
}
