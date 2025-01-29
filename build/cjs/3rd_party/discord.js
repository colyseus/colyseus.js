// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Discord Embedded App SDK
 * https://github.com/colyseus/colyseus/issues/707
 *
 * All URLs must go through the local proxy from
 * https://<app_id>.discordsays.com/.proxy/<mapped_url>/...
 *
 * URL Mapping Examples:
 *
 * 1. Using Colyseus Cloud:
 *   - /colyseus/{subdomain} -> {subdomain}.colyseus.cloud
 *
 *   Example:
 *     const client = new Client("https://xxxx.colyseus.cloud");
 *
 * -------------------------------------------------------------
 *
 * 2. Using `cloudflared` tunnel:
 *   - /colyseus/ -> <your-cloudflared-url>.trycloudflare.com
 *
 *   Example:
 *     const client = new Client("https://<your-cloudflared-url>.trycloudflare.com");
 *
 * -------------------------------------------------------------
 *
 * 3. Providing a manual /.proxy/your-mapping:
 *   - /your-mapping/ -> your-endpoint.com
 *
 *   Example:
 *     const client = new Client("/.proxy/your-mapping");
 *
 */
function discordURLBuilder(url) {
    var _a;
    var localHostname = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) || "localhost";
    var remoteHostnameSplitted = url.hostname.split('.');
    var subdomain = (!url.hostname.includes("trycloudflare.com") && // ignore cloudflared subdomains
        !url.hostname.includes("discordsays.com") && // ignore discordsays.com subdomains
        remoteHostnameSplitted.length > 2)
        ? "/".concat(remoteHostnameSplitted[0])
        : '';
    return (url.pathname.startsWith("/.proxy"))
        ? "".concat(url.protocol, "//").concat(localHostname).concat(subdomain).concat(url.pathname).concat(url.search)
        : "".concat(url.protocol, "//").concat(localHostname, "/.proxy/colyseus").concat(subdomain).concat(url.pathname).concat(url.search);
}

exports.discordURLBuilder = discordURLBuilder;
//# sourceMappingURL=discord.js.map
