<template>
  <div v-if="avatar && userName">
    <a-form
      ref="formRef"
      :model="filters"
      layout="vertical"
      :hideRequiredMark="true"
    >
      <a-row>
        <a-col :span="24">
          <a-avatar :size="160">
            <template #icon>
              <img :src="avatar" :alt="avatar" :title="userName" />
            </template>
          </a-avatar>
        </a-col>
        <a-col span="24">
          <h3>Список</h3>
        </a-col>
        <a-col span="2">
          <a-radio-group v-model:value="filters.list" :options="options" />
        </a-col>
        <a-col span="22"> </a-col>
        <a-col span="24">
          <h3>Тип</h3>
        </a-col>
        <a-col :span="2">
          <a-checkbox-group
            v-model:value="filters.type"
            name="checkboxgroup"
            :options="typeOptions"
          />
        </a-col>
        <a-col span="22"> </a-col>
        <a-col span="24">
          <h3>Рейтинг</h3>
        </a-col>
        <a-col :span="2">
          <a-checkbox-group
            v-model:value="filters.rating"
            name="checkboxgroup"
            :options="ratingOptions"
          />
        </a-col>
        <a-col span="22"> </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import {
  options,
  ratingOptions,
  typeOptions,
} from "@/components/RightMenu/consts";

export default defineComponent({
  name: "RightMenu",
  props: {
    avatar: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  emits: ["onSaveFilters"],
  setup(props, { emit }) {
    const filters = ref({ list: "completed", type: ["tv"], rating: [] });

    watch(
      () => [
        filters.value.list,
        filters.value.type.length,
        filters.value.rating.length,
      ],
      () => {
        emit("onSaveFilters", filters.value);
      }
    );

    return {
      options,
      typeOptions,
      ratingOptions,
      filters,
    };
  },
});
</script>

<style scoped></style>
