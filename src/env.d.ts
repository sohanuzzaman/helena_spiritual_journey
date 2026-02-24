/// <reference types="astro/client" />
import type { Runtime } from "@astrojs/cloudflare";

declare namespace App {
  interface Locals extends Runtime {}
}
