function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save theme in local storage
}

window.onload = function() {
    const savedTheme = localStorage.getItem('theme') || 'indigo'; // Default to 'indigo' theme
    changeTheme(savedTheme);
};
