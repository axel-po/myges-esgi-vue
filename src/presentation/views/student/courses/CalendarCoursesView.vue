<template>
  <div class="schedule-container">
    <div class="schedule-header">
      <div class="time-column"></div>
      <div v-for="day in days" :key="day" class="day-column header">
        {{ day }}
      </div>
    </div>

    <div class="schedule-body">
      <div class="time-column">
        <div v-for="hour in hours" :key="hour" class="time-slot">
          {{ hour }}
        </div>
      </div>

      <div v-for="day in days" :key="day" class="day-column">
        <div
          v-for="event in getEventsForDay(schedules, day)"
          :key="event.id"
          class="event"
          :style="getEventStyle(event)"
        >
          <strong>{{ event.title }}</strong>
          <br />
          {{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStudentScheduleViewModel } from "@/presentation/viewmodels/Schedules/StudentScheduleViewModel";
import { useAuthGuard } from "@/presentation/composables/useAuthGuard";
import {
  getEventsForDay,
  getEventStyle,
  formatTime,
} from "@/presentation/utils/scheduleUtils";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const { getCurrentUserOrThrow } = useAuthGuard();

const { schedules, fetchSchedulesByClassIds } = useStudentScheduleViewModel();

onMounted(async () => {
  try {
    const currentUserId = getCurrentUserOrThrow();
    await fetchSchedulesByClassIds(currentUserId);
  } catch (error) {
    console.error("Erreur lors de la récupération des horaires :", error);
  }
});
</script>

<style scoped>
.schedule-container {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 1000px;
  border: 1px solid #ddd;
}

.schedule-header,
.schedule-body {
  display: flex;
}

.time-column {
  width: 60px;
  border-right: 1px solid #ddd;
}

.time-slot {
  height: 60px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 12px;
  line-height: 60px;
}

.day-column {
  flex: 1;
  position: relative;
  border-right: 1px solid #ddd;
  height: 720px;
}

.header {
  height: 40px;
  background: #f4f4f4;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
}

.event {
  position: absolute;
  left: 5px;
  right: 5px;
  padding: 5px;
  font-size: 12px;
  color: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
