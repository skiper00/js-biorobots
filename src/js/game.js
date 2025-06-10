class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (Dep.target) {
      this.subscribers.add(Dep.target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Dep.target = null;

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      if (Dep.target) {
        if (!target._deps) {
          target._deps = {};
        }
        if (!target._deps[key]) {
          target._deps[key] = new Dep();
        }
        target._deps[key].depend();
      }
      const value = target[key];
      if (typeof value === 'object' && value !== null) {
        return reactive(value);
      }
      return value;
    },
    set(target, key, value) {
      target[key] = value;
      if (target._deps && target._deps[key]) {
        target._deps[key].notify();
      }
      return true;
    },
  });
}

function computed(getter) {
  let value;
  let dirty = true;
  const dep = new Dep();

  const evaluate = () => {
    Dep.target = () => {
      dirty = true;
      dep.notify();
    };
    value = getter();
    Dep.target = null;
  };

  evaluate();

  return {
    get value() {
      if (dirty) {
        evaluate();
        dirty = false;
      }
      dep.depend();
      return value;
    },
  };
}

export function createInitialGame() {
  const state = reactive({
    isModalOpen: false,
    coins: 45,
    productionCoins: 10,
    justProduced: false,
    marketPrices: {
      biomechanism: 7,
      processor: 5,
      soul: 25,
    },
    wareHouse: {
      biomechanism: { count: 0, sellPrice: 5 },
      processor: { count: 0, sellPrice: 3 },
      soul: { count: 0, sellPrice: 15 },
    },
    production: {
      biomechanism: [false, false, false, false],
      processor: [false, false, false, false],
      soul: [false],
    },
    robotConfig: {
      type: 'FrontEnd',
      gender: 'Male',
    },
  });

  const canStartProductionComputed = computed(() => {
    const hasEnoughParts =
      state.production.biomechanism.filter(Boolean).length === 4 &&
      state.production.processor.filter(Boolean).length === 4 &&
      state.production.soul.filter(Boolean).length === 1;

    const enoughCoins = state.coins >= state.productionCoins;

    return hasEnoughParts && enoughCoins;
  });

  const hasEnoughPartsComputed = computed(() => {
    return (
      state.wareHouse.biomechanism.count >= 4 &&
      state.wareHouse.processor.count >= 4 &&
      state.wareHouse.soul.count >= 1
    );
  });

  function canAffordPurchase(part) {
    return state.coins >= state.marketPrices[part];
  }

  return {
    state,
    get canStartProduction() {
      return canStartProductionComputed.value;
    },
    get hasEnoughParts() {
      return hasEnoughPartsComputed.value;
    },
    canAffordPurchase,
  };
}
