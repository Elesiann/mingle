export const useGetLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key || "");
    return JSON.parse(item!);
  } catch (error) {
    return;
  }
};
