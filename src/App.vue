<template>
  <div>
    <div>
      <div class="top-content">
        <h2 class="title">Shikimori Tierlist Generator</h2>
        <input
          class="input"
          type="text"
          required="required"
          :value="name"
          @input="name = $event.target.value"
        />
        <button class="btn" v-on:click="handleSearch">Поиск</button>
      </div>
      <div v-if="userInfo.length">
        <div
          v-for="category in categories"
          :key="category.id"
          @drop="onDrop($event, category.id)"
          class="droppable"
          @dragover.prevent
          @dragenter.prevent
          :style="{ backgroundColor: category.color }"
        >
          <h4>{{ category.title }}</h4>
          <div class="zone">
            <div
              v-for="item in userInfo.filter(
                (x) => x.categoryId === category.id
              )"
              @dragstart="onDragStart($event, item)"
              class="draggable"
              draggable="true"
              :key="item"
            >
              <img
                :src="item.url"
                :title="item.name"
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Shikimori } from "shikimori.ts";
import { fetchUsers } from "@/utils/fetchUsers";
import { getCategoryId } from "@/utils/getCategoryId";

export default defineComponent({
  name: "App",
  setup() {
    const userInfo = ref<any[]>([]);
    const name = ref("");
    const handleSearch = async () => {
      try {
        Shikimori.getUser({ name: name.value }).then(async (user) => {
          userInfo.value = await fetchUsers(user.id);
          userInfo.value = userInfo.value.map((elem: any) => ({
            ...elem,
            categoryId: getCategoryId(elem.score),
          }));
          console.log(userInfo.value);
        });
      } catch {
        console.log("biba");
      }
    };
    console.log(userInfo);
    const categories = ref([
      {
        id: 0,
        title: "SSS", /// 10
      },
      {
        id: 1,
        title: "SS", // 9
      },
      {
        id: 2,
        title: "S", // 8
      },
      {
        id: 3,
        title: "A", // 7
      },
      {
        id: 4,
        title: "B", // 6
      },
      {
        id: 5,
        title: "D", //5
      },
      {
        id: 6,
        title: "E", //3-4
      },
      {
        id: 7,
        title: "F", // 1-2 0
      },
      {
        id: 8,
        title: "",
        color: "red",
      },
    ]);

    function onDragStart(e: DragEvent, item: any) {
      console.log(item);
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
      }
      e?.dataTransfer?.setData("itemId", item.id.toString());
    }

    function onDrop(e: DragEvent, categoryId: any) {
      if (e.dataTransfer) {
        const itemId = parseInt(e.dataTransfer.getData("itemId"));
        userInfo.value = userInfo.value.map((x) => {
          if (x.id == itemId) x.categoryId = categoryId;
          return x;
        });
      }
    }

    return {
      name,
      categories,
      onDragStart,
      onDrop,
      handleSearch,
      userInfo,
      configKonva: {
        width: 200,
        height: 200,
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
      },
    };
  },
});
</script>

<style>
* {
  margin: 20;
  padding: 20;
  box-sizing: border-box;
}
.top-content {
  margin-bottom: 10px;
}

.input {
  width: 30%;
  height: 63px;
  border-radius: 5px;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
  margin-right: 10px;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
}
.droppable {
  padding: 15px;
  border-radius: 5px;
  background: #2c3e50;
  margin-bottom: 10px;
}

.title {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}

.droppable h4 {
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: bold;
}

.zone {
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
}

.btn {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: bold;
  background: #1e90ff;
  width: 130px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.01);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-swadow, transform;
  transition-property: box-swadow, transform;
}

.btn:hover,
.btn:focus,
.btn:active {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.draggable {
  background: white;
  padding: 5px 5px 2px;
  border-radius: 5px;
  margin: 3px 5px 5px;
  width: 110px;
}
</style>
