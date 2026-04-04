# Shreeti's Portfolio — Maximalist Scrapbook Enhancement

## Current State

The site is a folder-grid SPA (App.tsx) with five folder components (ProjectsContent, FilmContent, AboutContent, ContactContent, ResearchContent). Each folder opens into a full-screen overlay containing its junk-journal content. The site already has:
- Paper grain texture, tape strips, sticky notes, polaroid, torn edges, binder rings
- Clickable stamps (reveal text), clickable tape (lift anim), clickable polaroid (zoom)
- Music archive, Reddit stories panel, Letterboxd block, flip-card for Museum
- Fonts: PrettyOnTheInside (name only), Hipnotik (headings), Parisienne/JheriCurls (handwritten), PinyonScript (script), Inter (body)
- Color palette: soft pinks, sage green, warm beige/cream

The user says it still feels too clean and wants it pushed significantly further into maximalist, mixed-media, junk-journal territory — more layering, more paper fragments, more scattered text, more interactive Easter eggs, more vintage objects and mark-making across EVERY page.

## Requested Changes (Diff)

### Add

**Global / All Pages:**
- Layered paper texture backgrounds inside each folder: add CSS classes for aged parchment, coffee-stained paper, ledger lines, graph paper, newspaper columns — used as semi-transparent overlay layers in folder backgrounds
- Torn paper scrap SVG fragments scattered at edges/corners of each page (not blocking content)
- Envelope fragments, old book page corners, and ledger sheet strips as decorative layered elements
- Scattered handwritten annotation text (small, rotated, low-opacity): dictionary-style definitions, journal date entries, poetic phrases, margin notes — placed around edges and between cards
- Ink blot SVG shapes (irregular dark spots, very low opacity) in corners
- Watercolor wash pseudo-element backgrounds (warm amber/pink/sage CSS gradients with blur) behind section areas
- Gold foil accent SVGs (thin lines, asterisks, corner ornaments) — very subtle, low opacity
- Cross-hatching SVG patterns in some backgrounds/borders
- Doodle SVG elements: small eye doodles, curvy arrows, abstract scribbles, sketchy borders around cards
- Lace-pattern SVG border dividers between sections
- Typewriter text strips (horizontal bands of monospace text, very low opacity) as background decoration
- Library card style element (mini card with "checked out", date, Dewey number) on at least one page
- Ticket stub decorative element (perforated edge, number, faded text)
- Film strip fragments used more widely (not just Film page)
- Botanical sketch SVG (leaf/flower line art) on About and Research pages
- Antique-style frame SVG ornament around key content blocks
- Polaroid frames reused more widely across pages
- Interactive folded paper flap: a corner or side flap element that opens on click to reveal a short hidden note
- Pressed leaf/organic texture SVG shapes on About page
- Charcoal smudge pseudo-element (blurred dark oval, very low opacity) as background decoration
- Magazine cutout style text elements (bold block text fragments, slightly tilted) as decorative collage pieces
- Receipt-style strip decorative elements (narrow vertical strip with faded text, perforated top)
- Tag/label elements (luggage tag shape with string, small descriptive text)

**Homepage (App.tsx):**
- Additional scattered paper scraps in the background (torn fragment shapes as absolutely-positioned elements)
- Faint typewriter text overlay strip across the background
- A very subtle aged paper vignette
- Small floating ink blot dots in corners
- A tiny ticket stub or library card peeking behind one of the folder icons
- Handwritten annotation near the subtitle ("circa 2025", a small arrow, a star)

**Projects page:**
- More torn paper layers at page background
- Magazine cutout label fragments overlapping card edges
- Cross-hatched border on the main Museum card
- More scattered annotation text (star ratings, circled words, "!!" marks)
- A library card easter egg — clickable to reveal a book check-out stamp
- Tag/label element hanging off a project card
- Folded corner flap on a side project card that opens to show a hidden note
- Lace divider between the Museum card and side cards

**Film page:**
- Aged parchment / coffee-stained layer behind video area
- Ticket stub element (film screening ticket)
- Botanical sketch in corner (film reel as organic sketch style)
- Receipt-style annotation strip on side
- More scattered handwritten margin notes ("2025", "Varanasi", "shot on...", "notes:")
- Antique frame SVG ornament around the Letterboxd block
- More cross-hatching in film strip areas

**Research page:**
- Graph paper scraps and ledger sheet fragments as background layers
- A library card attached to one book
- Exam-sheet style element (ruled lines, faint printed text, "name:" field)
- Philosophical quote fragment in margin
- Pressed leaf botanical sketch near one book
- Folded paper flap that opens to reveal a reading list

**About page:**
- Coffee stain SVG (circular faded ring) — decorative, near edge
- Old book page corner fragment at a background corner
- Small pressed leaf doodles
- A folded paper note in the corner that opens to reveal a personal fragment ("things I love:" list style)
- Journal entry date header above one text block
- Charcoal smudge behind the portrait area
- Receipt strip Easter egg near music archive

**Contact page:**
- Map fragment (hand-drawn SVG style lines) as background decor
- Aged parchment overlay on letter background
- More scattered postmarks and stamps
- Tag/label with "reply to:" hanging near envelope
- Antique ornamental frame around the letter card

### Modify

- **index.css:** Add new CSS classes for all new texture/pattern layers (aged-parchment, coffee-stain, ledger-lines, graph-paper, lace-border, ink-blot, watercolor-wash, charcoal-smudge, crosshatch, typewriter-strip-bg)
- **Folder overlay (App.tsx):** Add deeper layered background inside each folder — multiple stacked pseudo-element textures instead of single paper grain
- **All pages:** Increase density of existing scatter elements (more sticky notes, more tape pieces, more stamps) without blocking main content
- **Torn edges:** Make them more varied — different heights, more irregular shapes

### Remove
- Nothing should be removed. Only additions and enhancements.

## Implementation Plan

1. **index.css additions:** Add CSS classes for all new texture layers (aged-parchment overlay, coffee stain ring, graph paper pattern, ledger lines pattern, lace SVG border, ink blot, watercolor wash, charcoal smudge, crosshatch, typewriter-strip background). Add new animations: fold-open (for paper flap), ink-blot-pulse.

2. **Shared decorative micro-components (new file `ScrapbookDecorations.tsx`):** Create reusable components:
   - `InkBlot` — irregular SVG blob shape, low opacity
   - `WatercolorWash` — blurred color div
   - `HandwrittenAnnotation` — small rotated text span
   - `TornPaperScrap` — irregular SVG torn fragment
   - `LibraryCard` — mini card SVG/div with clickable stamp easter egg
   - `TicketStub` — perforated strip with faded text
   - `BotanicalSketch` — line art SVG leaf/flower
   - `AntiquePaperFrame` — ornamental SVG corner brackets
   - `FoldedFlap` — clickable folded corner that opens to reveal note
   - `MagazineCutout` — bold tilted text fragment
   - `ReceiptStrip` — narrow vertical text strip
   - `PaperTag` — luggage tag SVG with string
   - `CrosshatchBorder` — SVG crosshatch pattern fill
   - `TypewriterStripBg` — horizontal band of faint monospace text
   - `LaceDivider` — SVG lace border strip
   - `GoldFoilAccent` — thin gold SVG ornament
   - `CharcoalSmudge` — blurred dark oval div
   - `CoffeeStainRing` — SVG ellipse ring
   - `PressedLeaf` — simple SVG organic leaf shape

3. **App.tsx:** Add scattered paper scraps, annotation near subtitle, faint typewriter background band, ink blot corners to the homepage background layers. Keep all existing structure.

4. **ProjectsContent.tsx:** Add library card easter egg, tag on card, folded flap on side card, magazine cutout fragments, cross-hatched border on Museum card, lace divider, more annotations and scatter.

5. **FilmContent.tsx:** Add ticket stub, botanical corner sketch, receipt strip, aged parchment layer behind video, more margin notes, antique frame around Letterboxd block.

6. **ResearchContent.tsx:** Add graph paper scrap overlays, library card on book, exam-sheet element, philosophical quote margin note, pressed leaf sketch, folded flap reading list.

7. **AboutContent.tsx:** Add coffee stain ring, old book corner, pressed leaves, folded flap corner note, journal date header, charcoal smudge behind portrait, receipt strip near music.

8. **ContactContent.tsx:** Add map fragment SVG background, more postmarks/stamps, tag label element, antique ornamental frame around letter card, aged parchment layer.

9. **Validate:** Run typecheck and build, fix any errors.
