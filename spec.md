# Shreeti Agrawal Portfolio — Section Enhancement Pass

## Current State

The portfolio is a folder-grid SPA with 5 folders (Projects, Film, Research & Writing, About, Contact) on a soft beige homepage. Each folder zooms open into a junk journal page. The base is working and has clickable interactions (stamps, tape, photos, sticky notes). Fonts: PrettyOnTheInside (name only), Hipnotik (headings), JheriCurls/Parisienne (script), PinyonScript, Inter (body). All 5 section components are at `src/frontend/src/components/`.

## Requested Changes (Diff)

### Add
- **Projects**: Double-sided junk journal flip for the "Museum of Ordinary Things" project card — click/flip to reveal a second spread with layered textures, handwriting placeholders, annotations, labels, stamps, small notes. More annotations, labels, stamps, and small notes across all three project cards.
- **Film**: Film rolls/strips (actual filmstrip frame dividers), Letterboxd-inspired section (star rating display, review snippet quote, tags like "documentary", "craft", "culture"), academic annotation sticky notes ("shot composition", "cultural context", "visual study"), more handwritten-style notes around the video.
- **Research**: Visual split into TWO separate notebook widgets side by side — (1) Research Journal (academic, lined paper, structured notes, typed+handwritten mix, diagram arrows) and (2) Essays/Poems Journal (softer, cream pages, more handwritten, emotional layout). Each looks like a separate notebook with different textures and binder rings.
- **About**: Life stories narrative fragments section (short poetic lines about manhwa influence, Heath Ledger film inspiration). Music archive section with album stickers/mini covers for: In Rainbows, OK Computer, Bewitched, AM, Favourite Worst Nightmare, Humbug — plus similar vibe suggestions.
- **Contact**: Envelope/letter aesthetic — envelope SVG background shape, wax seal stamp, tilted paper card, handwritten greeting line, postage stamp corners.

### Modify
- **Projects**: Improve layout alignment — cards should be structurally placed (not randomly floating off-screen) but still feel scrapbook/pinned. Each card gets more stamps, labels, and annotations at edges.
- **Film**: Make the section feel more academic and archival overall — add annotation layer over the video area (not covering it), more film strip elements.
- **Contact**: Enhance from current plaque/card style to a full personal letter feel.

### Remove
- Nothing to remove; all existing content is retained and enhanced.

## Implementation Plan

1. **ProjectsContent.tsx** — Add `JournalFlip` sub-component for Museum of Ordinary Things (front/back state toggle with CSS 3D flip or simple swap animation, 2 spreads of layered content). Add more annotation overlays, rubber stamp SVGs, tiny labels, and sticky note elements to all 3 cards. Fix card positioning so all 3 are visible and properly placed.
2. **FilmContent.tsx** — Add filmstrip divider rows (SVG perforations). Add Letterboxd-style review block (stars, quote, tags). Add academic annotation sticky notes. More handwritten arrows and notes around the video embed.
3. **ResearchContent.tsx** — Replace single notebook with a two-column or stacked layout of two distinct notebook widgets: Research Journal (ivory/grey, ruled lines, black typewriter text, diagram annotations) and Essays/Poems Journal (warm cream, softer ruling, pink/rose accent, script-font placeholders).
4. **AboutContent.tsx** — Add a "life stories" narrative fragment block (2–3 poetic micro-lines referencing manhwa visual storytelling + Heath Ledger). Add music archive section with 6+ album sticker nodes displayed as mini vinyl/cover labels scattered like stickers.
5. **ContactContent.tsx** — Redesign as personal letter: envelope SVG as background container, wax seal / stamp in corner, tilted inner letter card, handwritten-style greeting, postage stamp elements, slightly uneven layout.
