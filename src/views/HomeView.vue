<template>
  <div>
    <div>
      <div class="top-content">
        <h2 class="title">Shikimori Tierlist Generator</h2>
        <a-input
          class="input"
          type="text"
          required="required"
          :value="name"
          @input="name = $event.target.value"
        />
        <a-button class="btn" v-on:click="handleSearch" :disabled="name === ''">
          Поиск
        </a-button>
        <a-button
          class="btn"
          v-on:click="generateTierList"
          :disabled="name === ''"
        >
          Сгенерировать Тирлист
        </a-button>
      </div>
      <TierList :user-info="userInfo" @set-user-info="onSetUserInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { services } from "@/services/services";
import { getCategoryId } from "@/utils/getCategoryId";
import TierList from "@/components/TierList/TierList.vue";
import { UserInfo } from "@/components/TierList/types";
import { errorNotification } from "@/utils/errorNotification";

export default defineComponent({
  name: "HomeView",
  components: { TierList },
  setup() {
    const userInfo = ref<UserInfo[]>([]);
    const name = ref("");
    const handleSearch = async () => {
      try {
        services
          .getUserIdByName(name.value)
          .then(async (id) => {
            userInfo.value = await services.getAnimeList(id);
          })
          .catch(() =>
            errorNotification("Введите корректное имя пользователя")
          );
      } catch {
        errorNotification("Ошибка при загрузке данных пользователя");
      }
    };

    const onSetUserInfo = (newUserInfo: UserInfo[]) => {
      userInfo.value = newUserInfo;
    };

    const generateTierList = () => {
      userInfo.value = userInfo.value.map((elem: any) => ({
        ...elem,
        categoryId: getCategoryId(elem.score),
      }));
      console.log(userInfo.value);
    };

    return {
      //script setup
      onSetUserInfo,
      name,
      handleSearch,
      userInfo,
      generateTierList,
    };
  },
});
</script>

<style>
.top-content {
  margin-bottom: 10px;
}

.tier-label h3 {
  text-align: center;
  color: #333;
  font-family: "Comfortaa", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
}

.title {
  font-family: "Comfortaa", sans-serif;
  font-weight: bold;
}
</style>
