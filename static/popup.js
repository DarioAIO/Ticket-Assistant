var toggle_btn = document.getElementById("toggle-btn");
var profile_btn = document.getElementById("profile-btn")

function updateButton() {
    // update button based on storage
    chrome.storage.local.get(['onOrOff'], result => {
        toggle_btn.innerHTML = result.onOrOff ? "Turn Off" : "Turn On";
        toggle_btn.className = result.onOrOff ? "buttonON" : "buttonOFF";
        toggle_btn.style.border = result.onOrOff ? "2px solid green": "2px solid red"
    })
}

function toggleButton(e) {
    // check className of button
    var bool = e.target.className === 'buttonON' ? false : true
    chrome.storage.local.set({ 'onOrOff': bool }, result => {
        updateButton()
    })

}

updateButton()
toggle_btn.onclick = toggleButton
profile_btn.onclick = function() {
    window.location.href="popup2.html";

}
