"use client";

export function setItem(key: string, value: any) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItem(key: string) {
  if (typeof window !== "undefined") {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
}
