"""Create paper-and-ink portrait murals from the licensed source photographs."""

from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "portrait-sources"
OUTPUT_DIR = ROOT / "public" / "portraits"
CANVAS_SIZE = (720, 900)

PORTRAITS = {
    "douglas-engelbart": {"file": "douglas-engelbart.jpg", "crop": (35, 35, 565, 820)},
    "alan-kay": {"file": "alan-kay.jpg", "crop": (55, 40, 800, 1165)},
    "bret-victor": {"file": "bret-victor.png", "crop": (35, 45, 680, 950)},
}


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def make_mural(source: Path, crop: tuple[int, int, int, int]) -> Image.Image:
    original = Image.open(source).convert("RGB").crop(crop)
    gray = ImageOps.autocontrast(cover(original, CANVAS_SIZE).convert("L"), cutoff=1)
    softened = gray.filter(ImageFilter.MedianFilter(3))

    # Four broad graphite values keep the image legible from a distance.
    poster = softened.point(lambda value: 48 if value < 62 else 98 if value < 122 else 174 if value < 188 else 232)
    poster = ImageEnhance.Contrast(poster).enhance(0.82)

    # Pull a second, slightly offset edge pass over the tonal drawing for an imperfect ink contour.
    edges = ImageOps.autocontrast(softened.filter(ImageFilter.FIND_EDGES))
    ink = edges.point(lambda value: 255 if value > 34 else 0).convert("L").filter(ImageFilter.MaxFilter(3))
    offset_ink = ImageChops.offset(ink, 1, 0)
    ink = ImageChops.lighter(ink, offset_ink)
    drawing = Image.composite(Image.new("L", CANVAS_SIZE, 35), poster, ink)

    # Sparse halftone marks add printed texture only to the darker planes.
    pixels = drawing.load()
    for y in range(4, CANVAS_SIZE[1], 8):
        for x in range(4, CANVAS_SIZE[0], 8):
            if pixels[x, y] < 150:
                pixels[x, y] = max(25, pixels[x, y] - 42)

    # Fade every outer edge so the portrait reads as a wall mural, never a pasted rectangle.
    alpha = Image.new("L", CANVAS_SIZE, 0)
    alpha_pixels = alpha.load()
    for y in range(CANVAS_SIZE[1]):
        ny = (y - CANVAS_SIZE[1] * 0.49) / (CANVAS_SIZE[1] * 0.54)
        for x in range(CANVAS_SIZE[0]):
            nx = (x - CANVAS_SIZE[0] * 0.5) / (CANVAS_SIZE[0] * 0.56)
            distance = nx * nx + ny * ny
            alpha_pixels[x, y] = round(205 * max(0.0, min(1.0, (1.12 - distance) / 0.34)))

    paper_toned = ImageOps.colorize(drawing, black="#292a27", white="#efede5").convert("RGBA")
    paper_toned.putalpha(alpha.filter(ImageFilter.GaussianBlur(6)))
    return paper_toned


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, config in PORTRAITS.items():
        mural = make_mural(SOURCE_DIR / config["file"], config["crop"])
        mural.save(OUTPUT_DIR / f"{name}-ink.png", optimize=True)


if __name__ == "__main__":
    main()
