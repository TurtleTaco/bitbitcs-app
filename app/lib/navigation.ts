// app/lib/navigation.ts

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleBackNavigation = (
  router: Pick<AppRouterInstance, 'push'>,
  pathname: string | null
): void => {
  console.log('handle ' + pathname);
  if (pathname) {
    const pathSegments: string[] = pathname.split('/').filter((segment: string) => segment !== '');

    if (pathSegments.length > 1) {
      // Remove the last segment and navigate to the new path
      const newPath: string = '/' + pathSegments.slice(0, -1).join('/');
      console.log(newPath);
      router.push(newPath);
    }
    // If there's only one segment or less, do nothing
  }
};