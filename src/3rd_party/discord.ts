/**
 * Discord Embedded App SDK
 * https://github.com/colyseus/colyseus/issues/707
 *
 * All URLs must go through the local proxy from
 * https://<app_id>.discordsays.com/<backend>/...
 *
 * You must configure your URL Mappings with:
 * - /colyseus/{subdomain} -> {subdomain}.colyseus.cloud
 *
 * Example:
 *  const client = new Client("https://xxxx.colyseus.cloud");
 *
 */
 export function discordURLBuilder (url: URL): string {
    const localHostname = window?.location?.hostname || "localhost";

    const remoteHostnameSplitted = url.hostname.split('.');
    const subdomain = (remoteHostnameSplitted.length > 2)
        ? `/${remoteHostnameSplitted[0]}`
        : '';

    return `${url.protocol}//${localHostname}/colyseus${subdomain}${url.pathname}${url.search}`;
 }