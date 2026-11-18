# ProjectsCarouselTimeline (archived working carousel)

`ProjectsCarouselTimeline.tsx` is the exact working Projects carousel as of 2026-11-17: card carousel with
content left and screenshot right, a Web Animations timeline per cycle (about 3000ms hold, about 1000ms
transform and opacity transition), hover and focus pause, 12 navigation dots, touch swipe, and the enlarged
screenshot dialog. It is identical to the live `components/Projects.tsx` at the time of archiving, apart from the
exported function name (`ProjectsCarouselTimeline` instead of `Projects`). It is not imported anywhere.

## Restore it

1. Copy `components/archive/ProjectsCarouselTimeline.tsx` over `components/Projects.tsx`.
2. In that file change `export default function ProjectsCarouselTimeline()` back to `export default function Projects()`.
3. Keep this block in `app/globals.css` (it is still there, untouched):

   ```css
   /* Projects showcase: the card carousel is driven by Web Animations (see Projects.tsx);
      only the navigation dots need styling here. */
   .showcase-dot {
     position: relative; display: inline-flex; align-items: center; justify-content: center;
     width: 24px; height: 36px; background: none; border: 0; padding: 0;
   }
   .showcase-dot:focus-visible { outline: 2px solid #a5b4fc; outline-offset: -2px; border-radius: 9999px; }
   ```

4. Nothing else is needed. The file is self contained (React, `next/image`, `lucide-react`; the preview dialog and
   all 12 project records are inside it). `app/page.tsx` already imports `@/components/Projects`.
5. Project assets in `public/` (screenshots, `graboqs.png`, `tcgtelegraph.png`) are unchanged.

Older archives: `ProjectsEditorial.tsx`, `ProjectsShowcaseCarousel.tsx` (earlier versions, not related to this one).
