const API_BASE = "https://api.seliseblocks.com";
const PROJECT_KEY = "P43335b928ba643959d9755c542239a1d";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/uilm") {
      const language = url.searchParams.get("Language") || "en-US";
      const moduleName = url.searchParams.get("ModuleName") || "common";
      const projectKey = url.searchParams.get("ProjectKey") || PROJECT_KEY;

      const apiUrl = `${API_BASE}/uilm/v1/Key/GetUilmFile?Language=${encodeURIComponent(language)}&ModuleName=${encodeURIComponent(moduleName)}&ProjectKey=${encodeURIComponent(projectKey)}`;

      const apiRes = await fetch(apiUrl, {
        headers: { "x-blocks-key": PROJECT_KEY },
      });

      return new Response(apiRes.body, {
        status: apiRes.status,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
