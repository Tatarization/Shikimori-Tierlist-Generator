<template>
  <div>
    <div>
      <div class="top-content">
        <a-row :gutter="[24, 10]">
          <a-col span="24">
            <h2 class="title">Shikimori Tierlist Generator</h2>
          </a-col>
          <a-col span="8">
            <a-input
              class="input"
              type="text"
              required="required"
              :value="name"
              @input="name = $event.target.value"
            />
          </a-col>
          <a-col span="7">
            <a-button
              class="btn"
              v-on:click="handleSearch"
              :disabled="name === ''"
            >
              Поиск
            </a-button>
            <a-button
              class="btn"
              v-on:click="generateTierList"
              :disabled="name === ''"
            >
              Сгенерировать Тирлист
            </a-button>
            <a-button class="btn" v-on:click="onReset" :disabled="name === ''">
              Очистить
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div>
        <a-row :gutter="[36, 30]">
          <a-col span="20">
            <TierList v-if="userInfo.length && filters" />
          </a-col>
          <a-col span="4">
            <RightMenu
              v-if="userInformation"
              :avatar="userInformation.avatar"
              :user-name="userInformation.userName"
              @onSaveFilters="onSaveFilters"
            />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { services } from "@/services/services";
import { getCategoryId } from "@/utils/getCategoryId";
import TierList from "@/components/TierList/TierList.vue";
import { Tier, User, UserInfo } from "@/components/TierList/types";
import { errorNotification } from "@/utils/errorNotification";
import { categories } from "@/components/TierList/consts";
import RightMenu from "@/components/RightMenu/RightMenu.vue";

export default defineComponent({
  name: "HomeView",
  components: { RightMenu, TierList },
  setup() {
    const userInformation = ref<User>({ userId: 0, userName: "", avatar: "" });
    const userInfo = ref<UserInfo[]>([]);
    const tiers = ref<Tier[]>(categories);
    const name = ref("");
    const filters = ref({ list: "completed", type: ["tv"], rating: [] });

    const onReset = () => {
      for (let i = 0; i <= 8; i++) {
        tiers.value[i].items = new Array(0);
      }
    };

    const handleSearch = async () => {
      onReset();
      try {
        userInformation.value = await services.getUserIdByName(name.value);
        userInfo.value = await services.getAnimeList(
          userInformation.value.userId,
          filters.value
        );
        tiers.value[8].items = userInfo.value;
      } catch {
        errorNotification("Ошибка при загрузке данных пользователя");
      }
    };

    const onSaveFilters = async (newFilters: any) => {
      filters.value = newFilters;
    };

    watch(
      () => [
        filters.value.list,
        filters.value.type.length,
        filters.value.rating.length,
      ],
      async () => {
        userInfo.value = await services.getAnimeList(
          userInformation.value.userId,
          filters.value
        );
        tiers.value[8].items = userInfo.value;
      }
    );

    const generateTierList = () => {
      onReset();
      userInfo.value = userInfo.value.map((elem: UserInfo) => ({
        ...elem,
        categoryId: getCategoryId(elem.score),
      }));
      const tiersItems = Object.values(
        userInfo.value.reduce((acc: any, value: UserInfo) => {
          const categoryId = value.categoryId;
          acc[categoryId] ??= [];
          acc[categoryId].push({ ...value });
          return acc;
        }, {})
      );
      for (let i = 0; i <= 8; i++) {
        if (!tiersItems[i]) {
          console.log(tiers.value[i]);
          tiers.value[i].items = new Array(0);
        }
        tiers.value[i].items = tiersItems[i] as any;
      }
      tiers.value[8].items = new Array(0);
    };

    return {
      name,
      handleSearch,
      userInfo,
      generateTierList,
      onReset,
      userInformation,
      onSaveFilters,
      filters,
    };
  },
});
</script>

<style>
.top-content {
  margin-bottom: 10px;
}

.btn {
  margin-left: 8px;
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
