# Portrait sources

The three exhibit murals are deterministic paper-and-ink transformations of the locally stored source photographs. Install the pinned preprocessing dependency with `python -m pip install -r scripts/requirements-portraits.txt`, then run `python scripts/process-portraits.py` to regenerate the PNG assets in `public/portraits/`.

| Portrait | Source and author | License | Transformation |
| --- | --- | --- | --- |
| Douglas Engelbart | [SRI Douglas Engelbart 1968](https://commons.wikimedia.org/wiki/File:SRI_Douglas_Engelbart_1968.jpg), SRI International | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) / GFDL | Cropped, grayscale, posterized, edge traced, halftone textured, and edge faded. The derivative remains available under CC BY-SA 3.0. |
| Alan Kay | [Alan Kay (3097597186)](https://commons.wikimedia.org/wiki/File:Alan_Kay_(3097597186).jpg), Marcin Wichary | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | Cropped, grayscale, posterized, edge traced, halftone textured, and edge faded. |
| Bret Victor | [Bret Victor](https://commons.wikimedia.org/wiki/File:Bret_Victor.png), Bret Victor | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | Cropped, grayscale, posterized, edge traced, halftone textured, and edge faded. |

The source files are kept in `assets/portrait-sources/`; the application serves only the transformed local PNG files and makes no runtime requests to Wikimedia Commons.
