from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "pdfs" / "hires"
OUTPUT = ROOT / "src" / "assets" / "portfolio"


def crop(page: int, box: tuple[int, int, int, int], name: str, quality: int = 88) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE / f"page-{page}.png") as image:
        scale = image.width / 2000
        scaled = tuple(round(value * scale) for value in box)
        art = image.crop(scaled)
        art.save(OUTPUT / f"{name}.webp", "WEBP", quality=quality, method=6)


# About portrait and original cover.
crop(1, (0, 0, 2000, 1125), "brand-cover", 90)
crop(2, (112, 138, 740, 985), "suya-portrait", 90)

# Social Media — Drinks
for index, box in enumerate([
    (445, 70, 830, 552), (1170, 60, 1555, 541),
    (445, 584, 830, 1064), (1170, 584, 1555, 1064),
], 1):
    crop(3, box, f"drinks-{index}")

# Editorial — Futebol
for index, box in enumerate([
    (488, 136, 829, 563), (829, 136, 1171, 563), (1171, 136, 1513, 563),
    (488, 563, 829, 990), (829, 563, 1171, 990), (1171, 563, 1513, 990),
], 1):
    crop(4, box, f"futebol-{index}")

# Social Media — Padaria
for index, box in enumerate([
    (455, 112, 840, 593), (1089, 112, 1474, 593),
    (455, 615, 840, 1097), (1089, 615, 1474, 1097),
], 1):
    crop(5, box, f"padaria-{index}")

# Editorial — Hair Care
for index, box in enumerate([
    (455, 72, 815, 553), (1181, 57, 1545, 543),
    (455, 588, 815, 1068), (1181, 587, 1545, 1068),
], 1):
    crop(6, box, f"haircare-{index}")

# Conteúdo — Design (the upper-right tile is decorative, so it is omitted).
for index, box in enumerate([
    (425, 84, 808, 562), (808, 84, 1191, 562),
    (425, 562, 808, 1043), (808, 562, 1191, 1043), (1191, 562, 1575, 1043),
], 1):
    crop(7, box, f"design-{index}")

# Social Media — Sushi
for index, box in enumerate([
    (418, 79, 802, 559), (1143, 78, 1534, 563),
    (418, 597, 802, 1079), (1146, 597, 1530, 1079),
], 1):
    crop(8, box, f"sushi-{index}")

# Social Media — Odontologia
for index, box in enumerate([
    (417, 78, 802, 559), (1143, 78, 1534, 563),
    (417, 597, 802, 1079), (1146, 597, 1530, 1079),
], 1):
    crop(9, box, f"odontologia-{index}")

print(f"Exported {len(list(OUTPUT.glob('*.webp')))} optimized portfolio assets to {OUTPUT}")
