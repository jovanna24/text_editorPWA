const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent default behavior 
    event.preventDefault();
    // store the triggered events 
    window.deferredPrompt = event; 
    // show install button 
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }
    // show prompt
    promptEvent.prompt(); 
    // wait for user to respond to prompt 
    const choiceResult = await promptEvent.userChoice;
    // reset deferred prompt variable 
    window.deferredPrompt = null;
    // hide install button after prompt is shown
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt 
    window.deferredPrompt = null;
});
