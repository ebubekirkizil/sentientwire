import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'en-US', 'en-GB', 'en-CA', 'es', 'de', 'fr', 'it', 'nl', 'pl', 'ru', 'zh', 'tr'],
  defaultLocale: 'en-US'
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
