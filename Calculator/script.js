const display = document.getElementById('display');

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value.replace(/(\d+)%/g, '($1/100)');
    display.value = eval(expression);
  } catch {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  const keyMap = {
    '/': '÷',
    '*': '×',
    '-': '−',
    '+': '+'
  };
  const displayKey = keyMap[key] || key;

  const buttons = document.querySelectorAll('button');
  const button = Array.from(buttons).find(btn => btn.textContent.trim() === displayKey);

  if (button) {
    button.classList.add('active-key');
    setTimeout(() => button.classList.remove('active-key'), 150);
  }

  if (!isNaN(key) || ['+', '-', '*', '/', '%', '.'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});

// Dark mode persistence
const toggleButton = document.getElementById('theme-toggle');
const isDark = localStorage.getItem('darkMode') === 'true';
if (isDark) {
  document.body.classList.add('dark');
  toggleButton.textContent = '☀️ Light Mode';
}

toggleButton.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  const darkModeOn = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', darkModeOn);
  this.textContent = darkModeOn ? '☀️ Light Mode' : '🌙 Dark Mode';
});
function clearDisplay() {
  display.value = '';
  document.activeElement.blur(); // 👈 this removes focus from the "C" button
}
