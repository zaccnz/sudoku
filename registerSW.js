if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/sudoku/sw.js', { scope: '/sudoku/' })})}