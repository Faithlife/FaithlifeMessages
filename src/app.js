document.querySelector('.messages-iframe').addEventListener('new-window', (e) => {
    require('electron').shell.openExternal(e.url);
})
