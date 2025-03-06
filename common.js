// common.js

// Theme Change Functionality
function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save theme in local storage
}

// Load the saved theme, title, and icon from localStorage on page load
window.onload = function() {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to 'dark' theme
    changeTheme(savedTheme);

    // Set saved title and icon
    const savedTitle = localStorage.getItem('title');
    const savedIcon = localStorage.getItem('icon');
    if (savedTitle) document.title = savedTitle;
    if (savedIcon) document.querySelector("link[rel*='icon']").href = savedIcon;
};

const output = (msg, clr) => {
    const txt = document.getElementById("console-output");
    txt.style.color = clr;
    txt.innerText = msg;
};

const tcInput = document.getElementById("userinput");

const changeTabTitle = () => {
    if (tcInput.value == "") {
        window.localStorage.removeItem("title");
        output("No title entered. Default applied, refresh to see changes", "red");
    } else {
        window.localStorage.setItem("title", tcInput.value);
        window.document.title = tcInput.value;
        output("Title change successful", "green");
    }
    tcInput.value = "";
};

const changeTabIcon = () => {
    if (tcInput.value === "") {
        document.querySelector("link[rel*='icon']").href = "";
        window.localStorage.removeItem("icon");
        output("No image entered. Default applied, refresh to see changes", "red");
    } else if (validURL(tcInput.value)) {
        document.querySelector("link[rel*='icon']").href = tcInput.value;
        window.localStorage.setItem("icon", tcInput.value);
        output("Icon change successful", "green");
    } else {
        output("Icon change failed. Make sure you are using a valid URL", "red");
    }
    tcInput.value = "";
};

const validURL = (str) => {
    const exp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const reg = new RegExp(exp);
    return !!reg.test(str);
};

const resetTabSettings = () => {
    let items = ["icon", "title"];
    items.forEach((item) => window.localStorage.removeItem(item));
    window.location.reload();
};

const applyUrl = (url, title) => {
    document.getElementById("userinput").value = url;
    changeTabIcon();
    document.getElementById("userinput").value = title;
    changeTabTitle();
    output("Preset applied successfully!", "green");
};

const url = document.getElementById("url-target");
document.getElementById("create").onclick = function () {
    if (!url.value.startsWith("https://") && !url.value.startsWith("http://")) {
        url.value = `https://${url.value.split("https://").pop()}`;
    } else if (url.value.startsWith("http://")) {
        url.value = `https://${url.value.split("http://").pop()}`;
    }
    const win = window.open();
    win.document.body.style.margin = "0";
    win.document.body.style.height = "100vh";
    const iframe = win.document.createElement("iframe");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = "0";
    iframe.referrerpolicy = "no-referrer";
    iframe.allow = "fullscreen";
    iframe.src = url.value;
    win.document.body.appendChild(iframe);
};

function toggleCustomInput(value) {
    const customInputWrapper = document.getElementById("custom-input-wrapper");
    if (value === "custom") {
        customInputWrapper.style.display = "block";
    } else {
        customInputWrapper.style.display = "none";
        // Apply preset URL and title based on dropdown selection
        if (value === "preset1") {
            applyUrl('https://example1.com', 'Preset 1 Title');
        } else if (value === "preset2") {
            applyUrl('https://example2.com', 'Preset 2 Title');
        }
    }
}
