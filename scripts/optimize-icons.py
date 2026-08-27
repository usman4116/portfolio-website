#!/usr/bin/env python3
"""
Re-encode the favicon / touch-icon PNGs.

These were exported from the profile photo. Photographic PNGs compress poorly,
and favicon-512.png shipped at ~240 KB.

Strategy, by how each icon is actually consumed:

  favicon-32
      The only icon referenced from <link rel="icon">, so it is fetched on
      every visit and rendered at 16-32 px in the browser tab. Re-encoded
      losslessly (metadata stripped, max zlib effort). Pixels are untouched.

  apple-touch-icon
      Fetched only when a visitor adds the site to an iOS home screen.
      Re-encoded losslessly.

  favicon-192 / favicon-512
      Referenced only from site.webmanifest, where they are used for PWA
      install and the Android home-screen / splash icon -- rendered at
      ~100-192 px. Palette-quantised to 256 colours with transparency
      preserved, which is imperceptible at that render size and cuts ~81% of
      the bytes.

Dimensions and transparency are preserved for every icon.

Run from the repo root:  python3 scripts/optimize-icons.py
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

LOSSLESS = ["favicon-32.png", "apple-touch-icon.png"]
QUANTIZED = {"favicon-192.png": 256, "favicon-512.png": 256}


def save_lossless(path):
    im = Image.open(path)
    # Drop the alpha plane only when it carries no information at all.
    if im.mode == "RGBA" and im.getchannel("A").getextrema() == (255, 255):
        im = im.convert("RGB")
    clean = Image.new(im.mode, im.size)
    clean.putdata(list(im.getdata()))
    clean.save(path, "PNG", optimize=True, compress_level=9)


def save_quantized(path, colors):
    im = Image.open(path)
    # FASTOCTREE is the one PIL method that quantises RGBA directly, so the
    # circular crop keeps its transparent corners.
    im.quantize(colors=colors, method=Image.FASTOCTREE).save(
        path, "PNG", optimize=True, compress_level=9
    )


def main():
    for name in LOSSLESS + list(QUANTIZED):
        path = PUBLIC / name
        before = path.stat().st_size

        if name in QUANTIZED:
            save_quantized(path, QUANTIZED[name])
            how = f"quantised {QUANTIZED[name]}c"
        else:
            save_lossless(path)
            how = "lossless"

        after = path.stat().st_size
        print(
            f"{name:22} {before / 1024:7.1f} KB -> {after / 1024:6.1f} KB "
            f"({(1 - after / before) * -100:+.0f}%)  [{how}]"
        )


if __name__ == "__main__":
    main()
