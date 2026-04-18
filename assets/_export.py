#!/usr/bin/env python3
"""Generate PNG exports of the SMC Engine logo SVGs in multiple resolutions."""
import cairosvg
import re
from pathlib import Path

src_dir = Path("/home/claude/smc-engine-logo")

# Map of source SVG -> list of output (filename_suffix, target_width)
exports = {
    "smc-engine_01_primary-vertical_dark.svg": [
        ("@1x", 600),
        ("@2x", 1200),
        ("@4x", 2400),
    ],
    "smc-engine_02_horizontal-lockup_dark.svg": [
        ("@1x", 600),
        ("@2x", 1200),
        ("@4x", 2400),
    ],
    "smc-engine_03_icon-mark_dark.svg": [
        ("_256", 256),
        ("_512", 512),
        ("_1024", 1024),
    ],
    "smc-engine_04_primary-vertical_light.svg": [
        ("@1x", 600),
        ("@2x", 1200),
        ("@4x", 2400),
    ],
}

# Substitute font families for cairo rendering (cairo doesn't know "ui-sans-serif")
# and inject a background rect so the PNG has a usable preview surface
def prep_for_render(svg_text: str, bg_color: str) -> str:
    svg_text = re.sub(
        r'font-family="ui-sans-serif[^"]*"',
        'font-family="DejaVu Sans"',
        svg_text,
    )
    svg_text = re.sub(
        r'font-family="ui-monospace[^"]*"',
        'font-family="DejaVu Sans Mono"',
        svg_text,
    )
    vb_match = re.search(r'viewBox="0 0 (\d+) (\d+)"', svg_text)
    w, h = vb_match.group(1), vb_match.group(2)
    bg_rect = f'<rect width="{w}" height="{h}" fill="{bg_color}"/>'
    svg_text = re.sub(
        r'(<desc>[^<]*</desc>)',
        r'\1' + bg_rect,
        svg_text,
    )
    return svg_text

for src_name, variants in exports.items():
    src_path = src_dir / src_name
    svg_text = src_path.read_text()
    bg = "#030a06" if "_dark" in src_name else "#f4f4f0"
    render_text = prep_for_render(svg_text, bg)
    # Compensate DejaVu Sans baseline metric for icon mark only (SVG stays clean)
    if "icon-mark" in src_name:
        render_text = render_text.replace('x="68" y="84"', 'x="68" y="87"')
    base = src_name.replace(".svg", "")
    for suffix, width in variants:
        out_path = src_dir / f"{base}{suffix}.png"
        cairosvg.svg2png(
            bytestring=render_text.encode("utf-8"),
            write_to=str(out_path),
            output_width=width,
        )
        print(f"  -> {out_path.name} ({width}px wide)")

print("Done.")
