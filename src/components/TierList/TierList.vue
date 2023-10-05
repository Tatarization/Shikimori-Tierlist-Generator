<template>
  <div class="row">
    <div class="droppable" v-for="category in categories" :key="category.id">
      <div class="tier-label" :style="{ backgroundColor: category?.color }">
        <h3>{{ category.title }}</h3>
      </div>
      <draggable
        class="zone"
        :list="category.items"
        group="people"
        itemKey="name"
        :animation="150"
      >
        <template #item="{ element }">
          <div class="draggable">
            <img
              :src="element.url"
              :alt="element.name"
              :title="element.name"
              width="100"
              height="100"
            />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import { categories } from "@/components/TierList/consts";

export default defineComponent({
  name: "TierList",
  components: {
    draggable,
  },
  data() {
    return {
      categories,
    };
  },

  methods: {},
});
</script>

<style scoped>
.droppable {
  padding: 15px;
  border-radius: 5px;
  background: #2c3e50;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  min-height: 150px;
}

.tier-label {
  border-right: solid 1px #000;
  max-width: 100px;
  min-width: 100px;
  min-height: 80px;
  background-color: rgb(127, 255, 255);
  border-radius: 5px 0 0 5px;
  margin-top: -15px;
  margin-bottom: -15px;
  margin-left: -15px;
}

.zone {
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.draggable {
  background: gray;
  padding: 5px 5px 2px;
  border-radius: 5px;
  margin: 3px 5px 5px;
  width: 110px;
}
</style>
