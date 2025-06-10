import '../styles/scss/main.scss';

import headerTemplate from '@templates/header/header.html?raw';
import HeroSection from '@templates/heroSection/HeroSection.html?raw';
import walletTemplate from '@templates/wallet/wallet.html?raw';
import marketTemplate from '@/templates/market/marketSection.html?raw';
import wareHouseTemplate from '@templates/warehouse/warehouse.html?raw';
import productionTemplate from '@templates/production/production.html?raw';

const app = document.getElementById('app');
const header = document.createElement('div');
header.innerHTML = headerTemplate;

const container = document.createElement('div');
container.className = 'container';

const heroSection = document.createElement('div');
heroSection.innerHTML = HeroSection;

const wallet = document.createElement('div');
wallet.innerHTML = walletTemplate;

const market = document.createElement('div');
market.innerHTML = marketTemplate;

const warehouse = document.createElement('div');
warehouse.innerHTML = wareHouseTemplate;

const production = document.createElement('div');
production.innerHTML = productionTemplate;

container.appendChild(heroSection);
container.appendChild(wallet);
container.appendChild(market);
container.appendChild(warehouse);
container.appendChild(production);

app.appendChild(header);
app.appendChild(container);
