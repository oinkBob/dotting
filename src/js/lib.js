/*jshint esversion: 6 */
/*jshint -W030*/

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

window.addEventListener('keydown', function (e) {
    keys[e.code] = true;
});

window.addEventListener('keyup', function (e) {
    keys[e.code] = false;
});
let element = document.body;

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    keycode.info;
    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
//Enter (for FullScreen)
document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        requestFullScreen(element);
    }
}, false);

//Gamepad
window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  });

//Implement hit oder shoot or smth ALSO Controller 
//https://keycode.info
// document.addEventListener("keypress", function (e) {
//     if (e.keyCode === 87) {
//         requestFullScreen(element);
//     }
// }, false);