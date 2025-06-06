const btnOpen = document.getElementById('btnOpenForm');
const overlay = document.getElementById('addUsuario');
const btnCancel = document.getElementById('btnCancel');

btnOpen.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

btnCancel.addEventListener('click', () => {
  overlay.style.display = 'none';
});
