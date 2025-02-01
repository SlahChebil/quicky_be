const RESTRICTED_DOMAINS = [
    'badsite.com',
    'spam.com',
    'malicious.net',
    'phishing-site.org',
  ];

export function isBlockedDomain(url: string): boolean {
  const parsedUrl = new URL(url);
  return RESTRICTED_DOMAINS.includes(parsedUrl.hostname);
}
