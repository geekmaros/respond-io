<script setup>
import { ref } from 'vue'
import { ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  nodeData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update'])

const daysOfWeek = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
]

const businessHours = ref(
  props.nodeData.data.times.map((data) => ({
    day: data.day,
    startTime: data.startTime,
    endTime: data.endTime,
    isActive: true,
  })),
)

const timezone = ref(props.nodeData.data.timezone || 'UTC')

const updateHours = () => {
  const times = businessHours.value
    .filter((day) => day.isActive)
    .map(({ day, startTime, endTime }) => ({
      day,
      startTime,
      endTime,
    }))

  emit('update', {
    times,
    timezone: timezone.value,
  })
}

const timezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Europe/London',
  'Europe/Paris',
]
</script>

<template>
  <div class="space-y-6">
    <!-- Business Hours Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium text-gray-900">Business Hours</h3>
      <ClockIcon class="w-5 h-5 text-gray-400" />
    </div>

    <!-- Timezone Selection -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700"> Timezone </label>
      <select
        v-model="timezone"
        @change="updateHours"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option v-for="tz in timezones" :key="tz" :value="tz">
          {{ tz }}
        </option>
      </select>
    </div>

    <!-- Business Hours Grid -->
    <div class="space-y-3">
      <div
        v-for="(day, index) in businessHours"
        :key="day.day"
        class="flex items-center flex-col gap-4 p-3 rounded-lg"
        :class="day.isActive ? 'bg-blue-50' : 'bg-gray-50'"
      >
        <!-- Day Toggle -->
        <div class="flex items-center min-w-[10px]">
          <span
            class="ml-3 text-sm font-medium"
            :class="day.isActive ? 'text-gray-900' : 'text-gray-500'"
          >
            {{ daysOfWeek.find((d) => d.key === day.day)?.label }}
          </span>
        </div>

        <!-- Time Inputs -->
        <div class="flex gap-4 flex-1" :class="{ 'opacity-50': !day.isActive }">
          <div class="flex items-center gap-2">
            <input
              type="time"
              v-model="day.startTime"
              :disabled="!day.isActive"
              class="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              @change="updateHours"
            />
            <span class="text-gray-500">to</span>
            <input
              type="time"
              v-model="day.endTime"
              :disabled="!day.isActive"
              class="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              @change="updateHours"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Preview -->
    <div class="mt-6 bg-gray-50 p-4 rounded-lg">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Schedule Summary</h4>
      <div class="space-y-1">
        <div
          v-for="day in businessHours.filter((d) => d.isActive)"
          :key="day.day"
          class="text-sm text-gray-600"
        >
          {{ daysOfWeek.find((d) => d.key === day.day)?.label }}: {{ day.startTime }} -
          {{ day.endTime }}
        </div>
        <div class="text-sm text-gray-500 mt-2">Timezone: {{ timezone }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='time'] {
  min-width: 120px;
}
</style>
