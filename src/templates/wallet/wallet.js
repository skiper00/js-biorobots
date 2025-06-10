const progressBar = document.querySelector('.wallet__coins-progress-bar');
const coinsCount = 35;

document.addEventListener('DOMContentLoaded', () => {
  if (progressBar) {
    for (let i = 0; i < coinsCount; i++) {
      const coinSpan = document.createElement('span');
      coinSpan.className = 'wallet__coin';

      const coinImg = document.createElement('img');
      coinImg.src = '@public/images/Coin.png';
      coinImg.className = 'wallet__coin-img';

      progressBar.appendChild(coinSpan);
      coinSpan.appendChild(coinImg);
    }
  }
});
