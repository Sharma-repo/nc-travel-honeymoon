# NC Travel Honeymoon Collection

Vercel-ready static website for the proposed **Honeymoon** menu item on NC Travel.

## Pages
- `index.html` — premium honeymoon landing page, Nikki/NC Travel value proposition, full planning journey, gift list, popular destinations and enquiry form.
- `when-to-go.html` — interactive January-to-December guide containing the full month-by-month client content.
- `destinations.html` — full Europe, Asia, Indian Ocean, Caribbean and Adventure/Twist client guides.

## Deploy to Vercel
1. Upload this folder to a GitHub/GitLab/Bitbucket repository, or use the Vercel CLI.
2. Import the repository into Vercel.
3. Framework preset: **Other** (no build command required).
4. Output directory: leave blank / root.
5. Deploy.

`vercel.json` adds clean routes for `/when-to-go` and `/destinations`.

## Connect from the existing NC Travel website
Add a **Honeymoon** menu item on `nctravel.co.uk` and link it to the deployed Vercel root URL.

## Contact form
The demo form is intentionally backend-free. On submit it opens a pre-filled email to `nctravel@travel-pa.com`. This keeps the prototype deployable without API keys. If the client approves the design, it can later be connected to the existing CRM/email workflow.

## Images
- NC Travel logo is included locally in `assets/img/`.
- Nikki/current NC Travel imagery is referenced from the client’s existing Wix media library.
- A few destination visuals use remote Unsplash image URLs for the prototype. Replace these with approved client/supplier photography before final production if desired.

## Source-content rule used
The build keeps the unique client-supplied honeymoon information and avoids intentionally repeating near-duplicate marketing passages. Only testimonials already published on the existing NC Travel website are used; no testimonials, prices or offers were invented.


## Homepage hero video
The homepage uses `assets/video/honeymoon-hero.mp4` as an autoplaying, muted, looping background video. A custom sound toggle appears at the bottom-right of the hero. The video is optimized for web delivery and retains its audio track for user-controlled unmuting.
