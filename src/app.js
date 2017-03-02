const webViewElement = document.querySelector('.messages-iframe');

webViewElement.addEventListener('new-window', (e) => {
    require('electron').shell.openExternal(e.url);
})

window.addEventListener('focus', () => webViewElement.focus());
window.addEventListener('blur', () => webViewElement.blur());
