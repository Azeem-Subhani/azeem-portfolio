import type { ServicePageContent } from "@/types/content";

export const mobileService: ServicePageContent = {
  slug: "mobile-development",
  label: "Mobile",
  metaTitle: "Mobile development",
  metaDescription:
    "Ionic, React Native, and TypeScript apps for iOS, Android, and web from one codebase. Work by Azeem Subhani.",
  kicker: "Services / mobile",
  titleLines: ["one codebase", "every device"],
  lede:
    "iOS, Android, and web from one TypeScript codebase. Oxym's coaches and players see the same live schedule. That is the 60% cut. One roster, not three native teams.",
  proof: [
    { value: "60%", label: "off building native twice" },
    { value: "3×", label: "faster to a store build" },
    { value: "25+", label: "apps shipped, Ionic and React Native" },
  ],
  sections: [
    {
      kind: "capabilities",
      title: "Why one codebase",
      copy: "Native quality without a native dual-track. Ionic and React Native cover the phones. The web client is the same product.",
      items: [
        {
          title: "Ionic, Capacitor, React Native",
          copy: "Web tech when the product is a workflow. React Native when the animation budget is tighter. TypeScript in both.",
        },
        {
          title: "60% off the dual-track",
          copy: "iOS, Android, and web share the screens. Bug fixes land once. Store releases still go through each review.",
        },
        {
          title: "3× to first store build",
          copy: "One design system, one API client, one QA pass against the shared flows.",
        },
        {
          title: "Native where it counts",
          copy: "Push, biometrics, camera, and background location go through the native bridge. Users do not see a webview tell.",
        },
        {
          title: "The same UX, platform details kept",
          copy: "Shared flows, platform chrome. iOS gets the swipe. Android gets the back stack it expects.",
        },
        {
          title: "Updates that land together",
          copy: "A schedule bug is not fixed on iOS and left on Android for a sprint. The shared module ships to both.",
        },
      ],
    },
    {
      kind: "platforms",
      title: "The two stacks I keep reaching for",
      copy: "Ionic when the team already thinks in the web. React Native when the app needs native lists and gestures all day.",
      items: [
        {
          title: "Ionic and Capacitor",
          meta: "15+ apps",
          copy: "Web UI, native shells, device APIs through Capacitor. Oxym's web and mobile clients come from this family.",
        },
        {
          title: "React Native",
          meta: "10+ apps",
          copy: "True native views, React mental model, one TypeScript repo. Used when scroll performance is the product.",
        },
      ],
    },
    {
      kind: "coverage",
      title: "The glass it has to fit",
      copy: "Pick a surface. The shared TypeScript app is the same. The layout is not.",
      groups: [
        {
          title: "Tablet",
          copy: "Split views, tables, and a dashboard a coach can run a session from. I do not stretch a phone layout and call it tablet.",
          items: ["Multi-pane list and detail", "Charts and filters on one screen", "Landscape as a first-class layout"],
        },
        {
          title: "Phone",
          copy: "The daily driver. Offline, push, and 60fps on the interactions people hit a hundred times a day.",
          items: ["Platform scroll and gestures", "Push through APNs and FCM", "Roster still opens offline"],
        },
        {
          title: "Watch",
          copy: "Glanceable state, not a shrunk phone. Complications, haptics, and a few actions that make sense on a wrist.",
          items: ["Live activity on the face", "Confirm, skip, ping", "No forms"],
        },
        {
          title: "Car",
          copy: "The car is not a phone with a bigger screen. Fewer choices, bigger targets, voice first.",
          items: ["Turn-by-turn", "Steering-wheel audio", "Hands-free calling and replies"],
        },
      ],
    },
    {
      kind: "coverage",
      title: "Hardware the app can actually use",
      copy: "The bridge is there so the product can talk to the world around the phone. I wire the ones the brief needs, not a sensor museum.",
      groups: [
        {
          title: "Radios and identity",
          copy: "Talk to devices, tags, and the person holding the phone.",
          items: ["Bluetooth / BLE", "NFC", "Face ID, Touch ID, biometrics"],
        },
        {
          title: "Capture and place",
          copy: "Camera, location, and the sensors that describe motion.",
          items: ["Camera, QR, barcodes", "GPS and geofencing", "Accelerometer and gyro"],
        },
        {
          title: "Voice and network",
          copy: "What the app hears, and whether it can reach a host.",
          items: ["Speech and audio I/O", "Wi-Fi and cellular state", "Background connectivity"],
        },
        {
          title: "Where this lands",
          copy: "The same integrations show up in a few kinds of product.",
          items: [
            "IoT and smart-home control",
            "Fitness and health accessories",
            "Retail scan-and-pay",
          ],
        },
      ],
    },
    {
      kind: "coverage",
      title: "Where the binary runs",
      copy: "Write once. Ship the shell each store expects.",
      groups: [
        {
          title: "iOS",
          copy: "iPhone, iPad, and Watch from the shared TypeScript app.",
          items: ["iPhone", "iPad", "Apple Watch"],
        },
        {
          title: "Android",
          copy: "Phones, tablets, and Wear OS with the same business logic.",
          items: ["Android phone", "Android tablet", "Wear OS"],
        },
        {
          title: "Web",
          copy: "The desktop and mobile browsers, plus an installable PWA when the store is the wrong channel.",
          items: ["Desktop browser", "Mobile browser", "Installable PWA"],
        },
        {
          title: "Desktop",
          copy: "When the product also needs a window on a laptop. PWA or Electron, depending on the OS APIs.",
          items: ["Windows", "macOS", "Linux"],
        },
      ],
    },
  ],
  ctaTitle: "If native dual-track is the budget problem",
  ctaCopy:
    "Tell me the surfaces you need. I will tell you whether Ionic, React Native, or a PWA is the honest cut.",
};
