import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    tiers: [
      {
        label: "S",
        color: "#ff2222",
        /* eslint-disable */
        items: new Array(),
      },
      {
        label: "A",
        color: "#88ee00",
          /* eslint-disable */
          items: new Array(),
      },
      {
        label: "B",
        color: "#eeee00",
          /* eslint-disable */
          items: new Array(),
      },
      {
        label: "C",
        color: "#ee7700",
          /* eslint-disable */
          items: new Array(),
      },
      {
        label: "D",
        color: "#654321",
          /* eslint-disable */
          items: new Array(),
      },
      {
        label: "F",
        color: "#777777",
          /* eslint-disable */
          items: new Array(),
      },
    ],
      /* eslint-disable */
      items: new Array(),
  },
  mutations: {
    addTier(state, tier) {
      state.tiers.push(tier);
    },
    addItem(state, item: any) {
      state.items.push(item);
    },
    removeItem(state, index) {
      state.items.splice(index, 1);
    },
    removeItemFromTier(state, data) {
      state.tiers[data.tier].items.splice(data.item, 1);
    },
    addItemToTier(state, data) {
      state.tiers[data.index].items.push(data.src);
    },
    removeTier(state, index) {
      state.tiers.splice(index, 1);
    },
    insertTier(state, data) {
      state.tiers.splice(data.index, 0, data.tier);
    },
  },
});
