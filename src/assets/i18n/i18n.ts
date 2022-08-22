import { I18n } from 'i18n-js';
import en from './en.json';
import vi from './vi.json';

export const i18n = new I18n({
  ...vi,
  ...en,
});
i18n.enableFallback = true;
i18n.translations = { vi, en };
