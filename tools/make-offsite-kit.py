#!/usr/bin/env python3
"""Render the off-site assets.

    python3 tools/make-offsite-kit.py

    offsite/linkedin-banner.html  →  offsite/linkedin-banner.png  (3168 × 792)
    offsite/rate-card.html        →  offsite/rate-card.pdf        (A4, one page)

Requires Playwright with Chromium:
    pip install playwright && python3 -m playwright install chromium

Everything renders in a headless browser, so the PNG and PDF match what you
see in the HTML exactly — no separate design tool involved.
"""
import pathlib
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OFFSITE = ROOT / "offsite"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # ---- LinkedIn banner: 1584 × 396 CSS px at 2× for a sharp upload ----
        page = browser.new_page(viewport={"width": 1584, "height": 396}, device_scale_factor=2)
        page.goto((OFFSITE / "linkedin-banner.html").as_uri(), wait_until="networkidle")
        page.wait_for_timeout(400)
        page.screenshot(
            path=str(OFFSITE / "linkedin-banner.png"),
            clip={"x": 0, "y": 0, "width": 1584, "height": 396},
        )
        print("wrote offsite/linkedin-banner.png (3168 × 792)")

        # ---- Rate card: A4, backgrounds included ----
        page = browser.new_page()
        page.goto((OFFSITE / "rate-card.html").as_uri(), wait_until="networkidle")
        page.wait_for_timeout(400)
        page.pdf(
            path=str(OFFSITE / "rate-card.pdf"),
            format="A4",
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        )
        print("wrote offsite/rate-card.pdf")

        browser.close()

    return 0


if __name__ == "__main__":
    sys.exit(main())
