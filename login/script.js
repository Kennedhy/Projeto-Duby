document.getElementById('show-password').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.textContent = 'HIDE';
    } else {
        passwordField.type = 'password';
        this.textContent = 'SHOW';
    }
});
