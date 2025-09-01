import type { UserAgentInfo } from './types';

export const getUserAgent = (): { userAgent: string } => {
  return { userAgent: navigator.userAgent };
};

export const parseUserAgent = (): UserAgentInfo => {
  const ua = navigator.userAgent;
  
  return {
    userAgent: ua,
    isMobile: /Mobi|Android/i.test(ua),
    isTablet: /Tablet|iPad/i.test(ua),
    isDesktop: !/Mobi|Android|Tablet|iPad/i.test(ua),
    isBot: /bot|crawler|spider|crawling/i.test(ua),
  };
};
