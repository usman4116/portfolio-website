#!/usr/bin/env python3
"""
Generate the social-share (Open Graph / Twitter) image for usmanfarhan.com.

Composes the site's real profile photo with real text from the portfolio onto a
1200x630 canvas that matches the site's near-black aesthetic. No invented
imagery -- the photo is public/profile.jpg as-is.

Run from the repo root:  python3 scripts/generate-og-image.py
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

W, H = 1200, 630
BG = (2, 2, 2)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def text_width(draw, s, f, tracking=0):
    w = draw.textlength(s, font=f)
    if tracking:
        w += tracking * max(0, len(s) - 1)
    return w


def draw_tracked(draw, xy, s, f, fill, tracking):
    """Draw text with manual letter-spacing (PIL has no tracking support)."""
    x, y = xy
    for ch in s:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking


def radial_glow():
    """Soft centre-left glow, mirroring the site's radial background gradient."""
    glow = Image.new("L", (W, H), 0)
    gd = ImageDraw.Draw(glow)
    cx, cy = int(W * 0.42), int(H * 0.40)
    for r, v in ((520, 10), (400, 14), (280, 18), (170, 22)):
        gd.ellipse((cx - r, cy - r, cx + r, cy + r), fill=v)
    return glow.filter(ImageFilter.GaussianBlur(90))


def circular_photo(size):
    src = Image.open(PUBLIC / "profile.jpg").convert("RGB")
    side = min(src.size)
    left = (src.width - side) // 2
    top = (src.height - side) // 2
    src = src.crop((left, top, left + side, top + side)).resize(
        (size, size), Image.LANCZOS
    )

    # Anti-aliased circular mask via 4x supersampling.
    ss = 4
    mask = Image.new("L", (size * ss, size * ss), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * ss - 1, size * ss - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(src, (0, 0), mask)
    return out, mask


def main():
    img = Image.new("RGB", (W, H), BG)

    # Depth: radial glow behind everything.
    img.paste(Image.new("RGB", (W, H), (26, 26, 26)), (0, 0), radial_glow())

    draw = ImageDraw.Draw(img, "RGBA")

    # --- Profile photo (right side) -------------------------------------
    photo_size = 330
    px, py = 790, (H - photo_size) // 2
    photo, mask = circular_photo(photo_size)

    # Faint outer halo, then the photo, then a hairline ring.
    halo = Image.new("L", (W, H), 0)
    hr = photo_size // 2 + 26
    hcx, hcy = px + photo_size // 2, py + photo_size // 2
    ImageDraw.Draw(halo).ellipse((hcx - hr, hcy - hr, hcx + hr, hcy + hr), fill=34)
    img.paste(
        Image.new("RGB", (W, H), (255, 255, 255)),
        (0, 0),
        halo.filter(ImageFilter.GaussianBlur(30)),
    )
    img.paste(photo, (px, py), mask)
    draw.ellipse(
        (px, py, px + photo_size - 1, py + photo_size - 1),
        outline=(255, 255, 255, 46),
        width=2,
    )

    # --- Text block (left side) -----------------------------------------
    x = 84
    f_eyebrow = font(FONT_BOLD, 21)
    f_name = font(FONT_BOLD, 78)
    f_role = font(FONT_REG, 37)
    f_sub = font(FONT_REG, 24)

    y = 118
    draw_tracked(draw, (x, y), "USMANFARHAN.COM", f_eyebrow, (140, 145, 155), 3.4)

    y += 62
    draw.text((x, y), "Muhammad", font=f_name, fill=(190, 196, 208))
    y += 86
    draw.text((x, y), "Usman Farhan", font=f_name, fill=(255, 255, 255))

    y += 116
    draw.text((x, y), "Software Engineer", font=f_role, fill=(226, 232, 240))

    y += 60
    draw.line((x, y, x + 54, y), fill=(255, 255, 255, 70), width=2)

    y += 26
    draw.text(
        (x, y),
        "Full-Stack  ·  AI-Driven Development  ·  Data Science",
        font=f_sub,
        fill=(138, 143, 153),
    )

    # Hairline frame, echoing the site's bordered glass panels.
    draw.rectangle((0, 0, W - 1, H - 1), outline=(255, 255, 255, 20), width=1)

    out = PUBLIC / "og-image.jpg"
    img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {out.relative_to(ROOT)}  {out.stat().st_size / 1024:.1f} KB  {W}x{H}")


if __name__ == "__main__":
    main()
