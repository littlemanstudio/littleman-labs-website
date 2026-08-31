export type Zone = "entry" | "workshop" | "studio" | "comms";

export const RING: Zone[] = ["entry", "workshop", "studio", "comms"];

export const ZONE_BY_PATH: Record<string, Zone> = {
  "/": "entry",
  "/services": "workshop",
  "/about": "studio",
  "/contact": "comms",
};

function ringNeighbors(zone: Zone): [Zone, Zone] {
  const i = RING.indexOf(zone);
  const prev = RING[(i - 1 + RING.length) % RING.length];
  const next = RING[(i + 1) % RING.length];
  return [prev, next];
}

function isDirectNeighbor(a: Zone, b: Zone): boolean {
  return ringNeighbors(a).includes(b);
}

/** Same edge logic as js/room-transition.js on the live site: a direct ring
    neighbor is one clip, anything else (currently just the two "across the
    building" pairs) is two clips back-to-back through the connecting room. */
export function clipSequence(from: Zone, to: Zone): string[] {
  if (from === to) return [];
  if (isDirectNeighbor(from, to)) return [`${from}-${to}`];

  const [fromPrev, fromNext] = ringNeighbors(from);
  const bridge = isDirectNeighbor(fromPrev, to) ? fromPrev : fromNext;
  return [`${from}-${bridge}`, `${bridge}-${to}`];
}

export function zoneForPath(path: string): Zone {
  return ZONE_BY_PATH[path] ?? "entry";
}

export function hasZone(path: string): boolean {
  return path in ZONE_BY_PATH;
}
