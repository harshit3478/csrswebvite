// Path: src/utils/timeUtils.ts
export const timeStringToMinutes = (time: number | null ): number => {
    if(time == undefined || time == null) return 0;
    const minutes = time / 60;
    return minutes;
    
  };
  