const datepickerService = {
  generateDailyOptionsData: function (offset) {
    if (isNaN(offset)) offset = 0;

    const result = [];
    const startingDay = new Date();
    startingDay.setDate(startingDay.getDate() - 3 + offset);
    startingDay.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      const endDate = new Date(startingDay);
      endDate.setHours(23, 59, 59, 999);

      result.push({ startDate: new Date(startingDay), endDate: endDate });
      startingDay.setDate(startingDay.getDate() + 1);
    }

    return result;
  },
  generateWeeklyOptionsData: function (offset) {
    if (isNaN(offset)) {
      offset = 0;
    }

    const numberOfOptions = 5;
    let sunday = new Date();
    let dayOfWeek = sunday.getDay();
    sunday.setDate(sunday.getDate() - dayOfWeek);

    sunday.setDate(sunday.getDate() - Math.floor(numberOfOptions / 2) * 7 + offset * 7);
    sunday.setHours(0, 0, 0, 0);
    const result = [];

    for (let i = 0; i < numberOfOptions; i++) {
      const endOfWeek = new Date(sunday);
      endOfWeek.setDate(sunday.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      result.push({ startDate: new Date(sunday), endDate: endOfWeek });
      sunday.setDate(sunday.getDate() + 7);
    }

    return result;
  },
  generateMonthlyOptionsData: function (offset) {
    if (isNaN(offset)) {
      offset = 0;
    }

    const numberOfOptions = 5;
    const result = [];
    const currentMonth = new Date().getMonth() - Math.floor(numberOfOptions / 2) + offset;
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < numberOfOptions; i++) {
      const startDate = result.push({ startDate: new Date(currentYear, currentMonth + i, 1, 0, 0, 0, 0), endDate: new Date(currentYear, currentMonth + i + 1, 0, 23, 59, 59, 999) });
    }

    return result;
  },
  generateYearlyOptionsData: function (offset) {
    if (isNaN(offset)) {
      offset = 0;
    }

    const numberOfOptions = 7;
    const result = [];
    const currentYear = new Date().getFullYear() - Math.floor(numberOfOptions / 2) + offset;

    for (let i = 0; i < numberOfOptions; i++) {
      result.push({ startDate: new Date(currentYear + i, 0, 1, 0, 0, 0, 0), endDate: new Date(currentYear + i, 11, 31, 23, 59, 59, 999) });
    }

    return result;
  },
  isSamePeriod: function (periodA, periodB) {
    if (periodA.startDate?.getTime() === periodB.startDate?.getTime() && periodA.endDate?.getTime() === periodB.endDate?.getTime()) {
      return true;
    }

    return false;
  },
};

export default datepickerService;
