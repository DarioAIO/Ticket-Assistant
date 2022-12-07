chrome.runtime.onInstalled.addListener(() => {
     chrome.storage.local.set({ 'onOrOff': true }, result => {
         console.log("On Installed Set value to on")
     })
})
 
var isExtensionOn = true;
 
chrome.storage.onChanged.addListener(function (changes, area) {
    if (area === 'local' && changes.onOrOff) {
        console.log(changes.onOrOff.newValue)
        if (changes.onOrOff.newValue) {
            console.log("Extension Is On")
            isExtensionOn = true;
        }
        else {
            console.log("Extension Is Off")
            isExtensionOn = false;
        }
    }
})