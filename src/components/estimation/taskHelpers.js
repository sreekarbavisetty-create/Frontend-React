import { ROLES } from '../../data/rolesData';
import { formatCost } from '../../utils/formatters';

/**
 * Factory function to create a new task with a unique stable id.
 * Starts with empty employeeName, empty task name, no role selected, and empty hours.
 */
export function createEmptyTask() {
  return {
    id: crypto.randomUUID(),
    employeeName: "", // Employee / Developer name
    name: "",         // Task description
    roleId: "",       // Empty by default - user must explicitly select role
    hours: "",        // String in state to allow typing decimals and clearing
  };
}

/**
 * Calculates raw cost for a task row: hours * role rate.
 * If role is not selected or hours is 0/empty, cost is 0.
 * 
 * @param {Object} task 
 * @returns {number}
 */
export function getTaskCost(task) {
  const hours = parseFloat(task.hours);
  if (!hours || hours <= 0 || isNaN(hours)) {
    return 0;
  }
  if (!task.roleId || !ROLES[task.roleId]) {
    return 0;
  }
  const rate = ROLES[task.roleId].hourlyRate;
  return hours * rate;
}

/**
 * Formats row cost for display.
 * Shows dash "—" if cost is 0 (no hours or no role selected yet).
 * 
 * @param {Object} task 
 * @returns {string}
 */
export function formatRowCost(task) {
  const cost = getTaskCost(task);
  if (cost === 0) {
    return "—";
  }
  return formatCost(cost);
}

/**
 * Starts empty by default
 */
export const INITIAL_TASKS = [];
