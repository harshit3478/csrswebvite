// Path: src/utils/statsUtils.ts
import { Emergency } from "../context/EmergencyContext";

export const getLast30DaysData = (emergencies: Emergency[]): Emergency[] => {
  const now = new Date().getTime();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  return emergencies.filter((emergency) => new Date(emergency.createdOn).getTime() > thirtyDaysAgo);
};

export const getHighCasesZone = (data: Emergency[]): string => {
  const landmarkCount: { [key: string]: number } = {};
  data.forEach((item) => {
    if (item.location.landmark) {
      landmarkCount[item.location.landmark] = (landmarkCount[item.location.landmark] || 0) + 1;
    }
  });

  return Object.entries(landmarkCount).reduce(
    (acc, [landmark, count]) => (count > acc.count ? { landmark, count } : acc),
    { landmark: "", count: 0 }
  ).landmark;
};

export const getAverageTime = (emergencies: Emergency[]): number => {
  //timeTaken is in seconds and we need to convert it to minutes
    // find the emergency with timeTaken
    const validEmergencies = emergencies.filter((emergency) => emergency.timeTaken !== null);
    if (validEmergencies.length === 0) return 0;
    const totalMinutes = validEmergencies.reduce((acc, emergency) => acc + Number(emergency.timeTaken!/60), 0);
    return totalMinutes / validEmergencies.length;

  };
