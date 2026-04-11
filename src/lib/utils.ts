export const generateId = () => crypto.randomUUID().replaceAll("-", "");

export const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));
