import { createInitialGame } from './game';

const game = createInitialGame();

export function createActions() {
  function addCoins(amount) {
    if (amount < 0) return;

    if (game.state.coins === 100) {
      game.state.isModalOpen = true;
      return;
    }

    const newCoins = game.state.coins + amount;

    game.state.coins = newCoins > 100 ? 100 : newCoins;
  }

  function buyPart(part) {
    if (!game.canAffordPurchase(part)) {
      return false;
    }

    const cost = game.state.marketPrices[part];
    game.state.coins -= cost;

    game.state.wareHouse[part].count += 1;
  }

  function sellPart(part) {
    if (game.state.wareHouse[part].count <= 0) {
      return;
    }

    const sellPrice = game.state.wareHouse[part].sellPrice;

    if (game.state.coins > 100) {
      game.state.isModalOpen = true;
      return;
    }

    const newCoins = game.state.coins + sellPrice;

    if (newCoins > 100) {
      game.state.isModalOpen = true;
      return;
    }

    const cost = game.state.wareHouse[part];
    game.state.coins += cost.sellPrice;

    cost.count -= 1;
  }
  return {
    addCoins,
    buyPart,
    sellPart,
  };
}
