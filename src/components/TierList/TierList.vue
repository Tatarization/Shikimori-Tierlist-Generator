<template>
  <div v-if="userInfo && userInfo.length">
    <div
      v-for="category in categories"
      :key="category.id"
      @drop="onDrop($event, category.id)"
      class="droppable"
      @dragover.prevent
      @dragenter.prevent
      :style="{ backgroundColor: '#333' }"
    >
      <div class="tier-label" :style="{ backgroundColor: category?.color }">
        <h3>{{ category.title }}</h3>
      </div>
      <div class="zone">
        <div
          v-for="item in userInfo?.filter((x) => x.categoryId === category.id)"
          @dragstart="onDragStart($event, item)"
          class="draggable"
          draggable="true"
          :key="item"
        >
          <img :src="item.url" :title="item.name" width="100" height="100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { categories } from "@/components/TierList/consts";
import { UserInfo } from "@/components/TierList/types";

export default defineComponent({
  name: "TierList",
  props: {
    userInfo: { type: Array as PropType<UserInfo[]>, required: true },
  },
  emits: ["setUserInfo"],
  setup(props, { emit }) {
    function onDragStart(e: DragEvent, item: UserInfo) {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
      }
      e?.dataTransfer?.setData("itemId", item.id.toString());
    }

    function onDrop(e: DragEvent, categoryId: number) {
      if (e.dataTransfer) {
        const itemId = parseInt(e.dataTransfer.getData("itemId"));
        emit(
          "setUserInfo",
          props.userInfo.map((x) => {
            if (x.id == itemId) x.categoryId = categoryId;
            return x;
          })
        );
      }
    }
    return { categories, onDragStart, onDrop };
  },
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
}

.draggable {
  background: white;
  padding: 5px 5px 2px;
  border-radius: 5px;
  margin: 3px 5px 5px;
  width: 110px;
}
</style>
