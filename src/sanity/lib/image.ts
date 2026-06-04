import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

/**
 * Lazy builder so module import doesn't require projectId.
 * Returns a no-op chain when Sanity isn't configured — every method
 * returns itself and url() returns an empty string.
 */
type Builder = ReturnType<typeof createImageUrlBuilder>;
let _builder: Builder | null = null;

function getBuilder(): Builder | null {
  if (!projectId) return null;
  if (!_builder) {
    _builder = createImageUrlBuilder({ projectId, dataset });
  }
  return _builder;
}

type ImageChain = {
  width: (n: number) => ImageChain;
  height: (n: number) => ImageChain;
  url: () => string;
};

const noop: ImageChain = {
  width: () => noop,
  height: () => noop,
  url: () => "",
};

export function urlForImage(source: Image): ImageChain {
  const builder = getBuilder();
  if (!builder) return noop;
  return builder.image(source).auto("format").fit("max") as unknown as ImageChain;
}
