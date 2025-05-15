const mainBtn = document.querySelector('.clicker__btn')
const clickerBalance = document.querySelector('.clicker__balance-amount')
const auto1 = document.getElementById('auto1')
const auto2 = document.getElementById('auto2')
const auto3 = document.getElementById('auto3')
const auto4 = document.getElementById('auto4')
const auto5 = document.getElementById('auto5')


let clickerBalanceAmount = 0;
let automationBoost = 0;

clickerBalance.textContent = clickerBalanceAmount

document.addEventListener('click', (event) => {
  switch (event.target) {
    case mainBtn:
      clickerBalanceAmount = clickerBalanceAmount + 1
      clickerBalance.textContent = clickerBalanceAmount.toFixed(0);
      break;
    case auto1:
      automationBoost += 0.1
      break;
    case auto2:
      automationBoost += 1
      break;
    case auto3:
      automationBoost += 10
      break;
    case auto4:
      automationBoost += 100
      break;
    case auto5:
      automationBoost += 1000
      break;
    default:
  }

})
setInterval(() => {
  clickerBalanceAmount += automationBoost
  clickerBalance.textContent = clickerBalanceAmount.toFixed(0);
}, 1000);