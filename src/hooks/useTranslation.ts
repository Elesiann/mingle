import { api } from "../libs/axios";

const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || "";
const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

export const useTranslation = () => {
  const getTranslation = async (text: string | string[], target?: string) => {
    const resp = await api.post(apiUrl, {
      q: text,
      target: target || "pt"
    });

    return resp.data;
  };

  return {
    getTranslation
  };
};
