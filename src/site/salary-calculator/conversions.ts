import { BASE_MONTHLY_HOURS_AT_FULL_TIME } from "./config";

export function roundCent(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getMonthlyHours(workTimePercent: number): number {
  return BASE_MONTHLY_HOURS_AT_FULL_TIME * (workTimePercent / 100);
}

export function hourlyToMonthly(hourly: number, workTimePercent: number): number {
  return hourly * getMonthlyHours(workTimePercent);
}

export function monthlyToHourly(monthly: number, workTimePercent: number): number {
  const hours = getMonthlyHours(workTimePercent);
  if (hours <= 0) {
    return 0;
  }
  return monthly / hours;
}

export function monthlyToAnnual(monthly: number, salaryMonths: number): number {
  return monthly * salaryMonths;
}

export function annualToMonthly(annual: number, salaryMonths: number): number {
  if (salaryMonths <= 0) {
    return 0;
  }
  return annual / salaryMonths;
}
