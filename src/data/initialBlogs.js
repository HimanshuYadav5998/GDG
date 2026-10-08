export const INITIAL_BLOGS = [
  {
    id: "post-1",
    title: "The Architecture of Calm: Designing Interfaces for Deep Human Attention",
    slug: "architecture-of-calm-designing-interfaces",
    excerpt: "In an age of hyper-optimized engagement loops, the most audacious product decision is choosing not to scream at your user. How quiet interfaces cultivate lasting trust.",
    coverImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80",
    category: "Design",
    tags: ["ProductDesign", "Minimalism", "UX", "DigitalWellbeing"],
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Staff Product Designer & essayist based in Berlin. Writing about humane computing and spatial interfaces.",
      role: "Staff Product Designer"
    },
    publishedAt: "2026-10-02T09:30:00.000Z",
    readingTime: "7 min read",
    likes: 184,
    views: 3420,
    status: "published",
    featured: true,
    content: `## The Noise Paradox

Every morning, the modern screen wakes up hungry for our cognitive reserves. Badges pulsate in vibrant alarms of amber and red. Ephemeral banners slide into view, desperately declaring limited-time notifications. We designed an ecosystem where the loudest signal wins the millisecond—at the cost of the entire human hour.

Yet when we study the tools that creators and thinkers revere over decades—the Leica M-series rangefinder, the Dieter Rams Braun audio receivers, the Moleskine notebook—none of them attempt to monopolize peripheral vision. They recede into the environment until summoned.

> "A tool should feel like an extension of the nervous system, not a carnival barker competing for its attention."

### 1. The Anatomy of Restraint

To build a calm interface is not merely to remove color or embrace empty white space. Restraint is an architectural commitment to hierarchy:

* **Subtle state changes:** Replace high-contrast popovers with graceful opacity shifts.
* **Respect for stillness:** Avoid animating elements that did not originate from direct user intent.
* **Spatial cadence:** Allow generous margin rhythm (48px to 96px) to let optical tension resolve.

\`\`\`css
/* The philosophy of quiet transition */
.calm-card {
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}
\`\`\`

### 2. Information as Material

When typography is treated with editorial seriousness, you no longer require decorative borders or heavy card containers. A sharp serif heading paired with high-contrast neutral scales communicates priority naturally. The text itself becomes the architecture.

In our experiments building focused writing software, reducing chromatic accents from four colors down to a single terracotta anchor increased task completion time without user fatigue by 42%.

### Looking Ahead

As ambient computing and intelligence layers weave deeper into our daily instruments, our obligation as engineers and designers is clear: build spaces where thought can breathe.`
  },
  {
    id: "post-2",
    title: "Building Modern React Applications with Resilient Architecture",
    slug: "building-modern-react-applications-resilient-architecture",
    excerpt: "A pragmatic guide to structuring scalable, maintainable React web applications that survive library churn, scale smoothly, and maintain delightful developer velocity.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
    category: "Technology",
    tags: ["React", "Architecture", "JavaScript", "WebDev"],
    author: {
      name: "Himanshu Yadav",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      bio: "Full-stack engineer & writer. Passionate about component systems, compile-time optimizers, and web craftsmanship.",
      role: "Lead Systems Architect"
    },
    publishedAt: "2026-09-28T14:15:00.000Z",
    readingTime: "8 min read",
    likes: 246,
    views: 4890,
    status: "published",
    featured: true,
    content: `## Beyond The Tutorial Paradigm

Most web engineering tutorials showcase how to initialize a project or wire up a single API call. But how do you write code that remains readable when your application grows to 140 routes, thirty developers, and three redesign cycles?

Resilience in frontend code does not come from adopting every new state management library. It comes from establishing clear boundaries between presentation, business state, and data synchronization.

### 1. Colocation over Premature Abstraction

One of the most persistent anti-patterns in React codebases is scattering related components across deep directory trees. When modifying a feature requires jumping across five distant folders, cognitive overhead explodes.

\`\`\`javascript
// Structure by feature domain
features/
└── articles/
    ├── api/useArticles.js
    ├── components/ArticleCard.jsx
    ├── components/ArticleReader.jsx
    └── hooks/useReadingTimer.js
\`\`\`

### 2. Single Source of Truth with Deterministic Fallbacks

When working with local storage, asynchronous APIs, or network state, always encapsulate fallbacks cleanly:

\`\`\`javascript
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading \${key}: \`, error);
      return initialValue;
    }
  });

  return [storedValue, setStoredValue];
}
\`\`\`

### 3. Graceful Degradation & Perceived Performance

A truly resilient frontend feels fast even over slow connections. Use layout skeletons that mirror actual typography bounds, avoid layout shifts (CLS), and decouple non-critical background synchronization from user-initiated interactions.`
  },
  {
    id: "post-3",
    title: "The Renaissance of Independent Editorial Journalism",
    slug: "renaissance-independent-editorial-journalism",
    excerpt: "Why discerning readers are leaving algorithmic feeds behind in search of deliberate publications, long-form craft, and distinctive editorial perspectives.",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80",
    category: "Innovation",
    tags: ["Journalism", "Publishing", "Writing", "Culture"],
    author: {
      name: "Julian Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Editorial Director at The Meridian Review. Former foreign correspondent and author.",
      role: "Editor-in-Chief"
    },
    publishedAt: "2026-09-24T11:00:00.000Z",
    readingTime: "5 min read",
    likes: 129,
    views: 2150,
    status: "published",
    featured: false,
    content: `## The Algorithmic Hangover

For more than a decade, digital media chased the fickle winds of platform algorithms. Articles were optimized for search indexing crawlers, headlines designed for split-second emotional triggers, and thoughtful essays chopped into digestible listicles.

Then something remarkable occurred: readers grew weary.

> "When everything is optimized to be consumed in three seconds, the human mind craves the dignity of a fifteen-minute journey."

### The Rise of the Bespoke Publication

Across the independent web, independent magazines and focused newsletters are proving that quality commands loyalty. Readers do not want endless infinite scrolling; they want curated finales. They want the satisfaction of turning the final page, shutting the laptop, and feeling genuinely informed.`
  },
  {
    id: "post-4",
    title: "AI as a Cognitive Canvas: Reimagining the Engineering Workflow",
    slug: "ai-cognitive-canvas-reimagining-engineering-workflow",
    excerpt: "Exploring how generative models shift developers from syntax typists to system composers, amplifying high-level conceptual clarity and rapid iteration.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    category: "AI",
    tags: ["ArtificialIntelligence", "Productivity", "MachineLearning", "FutureOfWork"],
    author: {
      name: "Dr. Maya Lin",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Research scientist specializing in human-AI collaboration systems and cognitive tools.",
      role: "AI Research Lead"
    },
    publishedAt: "2026-09-20T16:40:00.000Z",
    readingTime: "9 min read",
    likes: 312,
    views: 6100,
    status: "published",
    featured: true,
    content: `## From Autocomplete to Thought Partner

The narrative around software automation often alternates between utopian wonder and replacement dread. Both perspectives miss the actual transformation happening on engineering desks today.

Machine learning is not replacing the taste, architectural discretion, or empathy of the engineer. Rather, it collapses the latency between conceptual imagination and working prototype.

### The Symphony of Prompt and Verification

Writing software with advanced models is closer to conducting an orchestra than laying bricks:

1. **High-level intent specification:** Defining contracts, edge cases, and architectural principles.
2. **Rapid parallel exploration:** Testing three distinct API surfaces in five minutes instead of two days.
3. **Rigorous validation:** Verifying invariant guarantees, performance boundaries, and security audits.

When mechanical friction dissolves, the true leverage of the programmer becomes clear: taste, judgment, and systems thinking.`
  },
  {
    id: "post-5",
    title: "Mastering TypeScript Generics: Patterns for Enterprise Codebases",
    slug: "mastering-typescript-generics-patterns-enterprise",
    excerpt: "Demystifying advanced conditional types, mapped types, and inference mechanisms to build bulletproof type-safe libraries and application layers.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    category: "Programming",
    tags: ["TypeScript", "Programming", "WebDev", "Architecture"],
    author: {
      name: "Alex Mercer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Open-source contributor and compiler enthusiast. Creator of several high-performance utility libraries.",
      role: "Principal Software Engineer"
    },
    publishedAt: "2026-09-15T08:20:00.000Z",
    readingTime: "11 min read",
    likes: 198,
    views: 3820,
    status: "published",
    featured: false,
    content: `## The True Power of Type Systems

Many developers treat TypeScript merely as a linter with extra brackets. They annotate basic primitives and sprinkle \`any\` when things get complicated. But when harnessed deliberately, TypeScript's type system is a compile-time theorem prover.

### Conditional Types and the \`infer\` Keyword

Consider extracting the unpacked promise return type:

\`\`\`typescript
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T;

// Type-safe API response unwrapping
type UserProfileResponse = Promise<{ id: string; name: string }>;
type UnwrappedUser = Awaited<UserProfileResponse>; // { id: string; name: string }
\`\`\`

### Enforcing Invariants at Zero Runtime Cost

By leveraging brand types and phantom parameters, we can eliminate entire classes of production bugs—such as mixing up raw database IDs with sanitized slugs—completely during static analysis.`
  },
  {
    id: "post-6",
    title: "The Craft of Micro-Interactions: Elevating Functional to Memorable",
    slug: "craft-of-micro-interactions-elevating-functional",
    excerpt: "Why the finest digital products feel tactile and alive. Deconstructing physics curves, spring animations, and tactile feedback in modern web design.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    category: "Design",
    tags: ["MicroInteractions", "Animation", "UI", "CSS"],
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Staff Product Designer & essayist based in Berlin. Writing about humane computing and spatial interfaces.",
      role: "Staff Product Designer"
    },
    publishedAt: "2026-09-10T12:00:00.000Z",
    readingTime: "6 min read",
    likes: 215,
    views: 4100,
    status: "published",
    featured: false,
    content: `## Digital Weight and Tactile Delight

When you flick a physical switch on an analog amplifier, you experience the weighted snap of copper contact and precision damping. The object confers confidence.

In contrast, an instantaneous binary pixel change feels hollow. Great micro-interactions bridge the gap between abstract software code and physical human intuition.

### The Mathematics of Natural Motion

Linear interpolation feels robotic because the physical universe never moves with constant velocity. Real objects have mass, friction, and inertia.

\`\`\`javascript
// Spring physics that mimic physical tension
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.8
};
\`\`\`

When a user bookmarks a story or triggers a heart like, a subtle overshoot of 1.15x scaling before settling creates an emotional sense of acknowledgement.`
  },
  {
    id: "post-7",
    title: "Navigating Technical Leadership: From Individual Contributor to Anchor",
    slug: "navigating-technical-leadership-individual-contributor-anchor",
    excerpt: "Transitioning into engineering leadership requires shifting your metric of success from lines of code delivered to team clarity multiplied.",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    category: "Career",
    tags: ["Leadership", "Management", "CareerGrowth", "Engineering"],
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "VP of Engineering, advisor, and mentor. Helping engineering organizations scale with empathy.",
      role: "VP of Engineering"
    },
    publishedAt: "2026-09-04T10:15:00.000Z",
    readingTime: "7 min read",
    likes: 167,
    views: 2980,
    status: "published",
    featured: false,
    content: `## The Mirage of Solo Brilliance

In early career phases, our agency feels directly tied to our keyboard throughput. You solve the algorithm, you submit the pull request, you close the Jira ticket. The feedback loop is clean, rapid, and intoxicating.

Then you step into staff engineering or team leadership, and suddenly your days are filled with architectural reviews, unblocking junior peers, and aligning divergent product visions.

### The Three Pillars of Technical Anchor Leadership

1. **Context over Command:** Your role is not to dictate every function signature, but to clarify the overarching constraints and business objectives.
2. **Psychological Safety:** When team members know that honest mistakes are analyzed without blame, innovation flourishes.
3. **Praise in Public, Critique in Private:** High-leverage leaders amplify their teammates' triumphs while offering constructive guidance privately.`
  },
  {
    id: "post-8",
    title: "The Zero-Distraction Workspace: Rituals for Deep Knowledge Work",
    slug: "zero-distraction-workspace-rituals-deep-work",
    excerpt: "Designing physical environments and cognitive boundaries that protect intense focus, creative endurance, and mental rejuvenation.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    category: "Productivity",
    tags: ["Productivity", "Focus", "Habits", "RemoteWork"],
    author: {
      name: "Marcus Aurel",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      bio: "Productivity researcher, author of 'The Focused Hours', and minimalist living advocate.",
      role: "Author & Researcher"
    },
    publishedAt: "2026-08-30T07:45:00.000Z",
    readingTime: "6 min read",
    likes: 278,
    views: 5210,
    status: "published",
    featured: false,
    content: `## The High Cost of Context Switching

Every notification, notification badge, and browser tab is a tiny tax on your prefrontal cortex. Neuroscience reveals that resuming deep analytical focus after a 30-second interruption takes an average of twenty-three minutes.

If you are interrupted three times in a morning, your deep work window has effectively evaporated before lunch.

### Building Your Fortress of Focus

* **Dedicated Deep Work Blocks:** Schedule uninterrupted 90-minute sprints where email, Slack, and phone are physically isolated.
* **Analog Preparation:** Outline problems on paper before opening IDEs or compilers.
* **Sensory Cues:** Anchor your focus state with consistent environmental triggers: a specific instrumental playlist, a clear desk, and single-origin tea.`
  },
  {
    id: "post-9",
    title: "Web Performance at Scale: Diagnosing and Eliminating Main Thread Bottlenecks",
    slug: "web-performance-scale-diagnosing-main-thread-bottlenecks",
    excerpt: "An in-depth investigation into browser rendering pipelines, long tasks, memory profiling, and achieving sub-100ms interaction latency.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    category: "Web Development",
    tags: ["Performance", "CoreWebVitals", "JavaScript", "Optimization"],
    author: {
      name: "Himanshu Yadav",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      bio: "Full-stack engineer & writer. Passionate about component systems, compile-time optimizers, and web craftsmanship.",
      role: "Lead Systems Architect"
    },
    publishedAt: "2026-08-22T13:30:00.000Z",
    readingTime: "10 min read",
    likes: 195,
    views: 3670,
    status: "published",
    featured: false,
    content: `## The 60 Frames Per Second Promise

The modern web platform provides extraordinary capabilities, but with great power comes the peril of bloated bundle sizes and bloated JavaScript execution times.

When a user taps an input field or opens a menu, anything exceeding 50ms feels perceptible and sluggish.

### Auditing the Event Loop

Browsers operate on a single main thread that coordinates JavaScript evaluation, style recalculation, layout layout passes, and composite rasterization.

\`\`\`javascript
// Yielding to the main thread during heavy computation
async function yieldToMain() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}
\`\`\`

By breaking monolithic array loops into chunked tasks scheduled via \`requestIdleCallback\` or microtask yields, we prevent frame drops and keep user interactions snappy.`
  },
  {
    id: "post-10",
    title: "The Ethics of Predictive Interfaces: Preserving Human Autonomy",
    slug: "ethics-of-predictive-interfaces-human-autonomy",
    excerpt: "When software anticipates our needs before we articulate them, where does assistance end and subtle coercion begin? An essay on ethical design boundaries.",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    category: "Innovation",
    tags: ["Ethics", "AI", "Philosophy", "DesignPrinciples"],
    author: {
      name: "Julian Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Editorial Director at The Meridian Review. Former foreign correspondent and author.",
      role: "Editor-in-Chief"
    },
    publishedAt: "2026-08-16T15:00:00.000Z",
    readingTime: "8 min read",
    likes: 154,
    views: 2480,
    status: "published",
    featured: false,
    content: `## The Invisible Nudge

Smart defaults are among the most helpful features in modern software. They save time, reduce configuration fatigue, and guide users effortlessly toward successful outcomes.

However, as predictive models become capable of inferring intent with eerie precision, the border between helpful prediction and behavioural manipulation becomes perilous.

> "A humane tool does not nudge you toward its own metrics; it provides a neutral mirror for your own will."

### Designing for Transparency

Users must always retain the power to inspect why an interface made an assumption, disable automated suggestions with a single click, and freely choose alternative paths without penalizing friction.`
  },
  {
    id: "post-11",
    title: "State Machines in Frontend Engineering: Eliminating Impossible States",
    slug: "state-machines-frontend-engineering-impossible-states",
    excerpt: "How modeling user interfaces with formal finite state automata eliminates subtle race conditions, improves testability, and transforms code clarity.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    category: "Programming",
    tags: ["StateMachines", "XState", "Frontend", "SoftwareDesign"],
    author: {
      name: "Alex Mercer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Open-source contributor and compiler enthusiast. Creator of several high-performance utility libraries.",
      role: "Principal Software Engineer"
    },
    publishedAt: "2026-08-08T10:00:00.000Z",
    readingTime: "7 min read",
    likes: 189,
    views: 3150,
    status: "published",
    featured: false,
    content: `## The Boolean Explosion

How often have you seen a component state defined like this?

\`\`\`javascript
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
\`\`\`

With three booleans, you have eight potential state combinations—including the nonsensical state where \`isLoading\` and \`isError\` and \`isSuccess\` are all simultaneously \`true\`.

### Finite States as Mathematical Guarantees

By defining explicit transitions between states (\`idle -> loading -> success | error\`), you render impossible UI states unreachable by definition:

\`\`\`javascript
const stateMachine = {
  idle: { FETCH: "loading" },
  loading: { RESOLVE: "success", REJECT: "error" },
  success: { RESET: "idle" },
  error: { RETRY: "loading" }
};
\`\`\`

This mathematical rigor makes component behavior deterministic, predictable, and remarkably easy to test.`
  },
  {
    id: "post-12",
    title: "From CSS to Design Systems: Cultivating Cohesive Visual Languages",
    slug: "css-to-design-systems-cohesive-visual-languages",
    excerpt: "A comprehensive look at design tokens, component primitives, semantic variables, and governance models for multi-brand engineering teams.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    category: "Design",
    tags: ["DesignSystems", "CSS", "Tailwind", "DesignTokens"],
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Staff Product Designer & essayist based in Berlin. Writing about humane computing and spatial interfaces.",
      role: "Staff Product Designer"
    },
    publishedAt: "2026-07-29T14:20:00.000Z",
    readingTime: "9 min read",
    likes: 221,
    views: 4320,
    status: "published",
    featured: false,
    content: `## Tokens as the Lingua Franca

A true design system is not a static Figma document or a disparate collection of buttons. It is a shared living vocabulary that bridges the mental models of designers and software engineers.

Design tokens represent the smallest indivisible atoms of decision: spacing scales, typographic scales, border radii, and color semantics.

### Semantic Layers over Raw Hex Codes

Never bind component surfaces directly to raw hex values. Instead, tier your architecture into:

1. **Global Tokens:** \`color-neutral-900: #171717\`
2. **Semantic Tokens:** \`color-text-primary: var(--color-neutral-900)\`
3. **Component Tokens:** \`card-header-color: var(--color-text-primary)\`

When you decide to refine the warmth of your primary typography, a single semantic update propagates cleanly across two hundred components without breaking optical rhythm.`
  }
];

export const INITIAL_COMMENTS = {
  "post-1": [
    {
      id: "comm-101",
      author: {
        name: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      content: "This resonated deeply. As product builders we often forget that white space and stillness are not empty voids, but active design choices.",
      createdAt: "2026-10-03T14:32:00.000Z",
      likes: 14,
      liked: false,
      replies: [
        {
          id: "rep-101",
          author: {
            name: "Elena Rostova",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
          },
          content: "Thank you Marcus! Dieter Rams phrased it best: 'Less, but better.' Honored that you felt that intention here.",
          createdAt: "2026-10-03T16:05:00.000Z",
          likes: 6,
          liked: false
        }
      ]
    },
    {
      id: "comm-102",
      author: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
      },
      content: "The section about using typography itself as the structure rather than card borders was an eye-opener. Redesigning our reader right now!",
      createdAt: "2026-10-04T10:18:00.000Z",
      likes: 9,
      liked: false,
      replies: []
    }
  ],
  "post-2": [
    {
      id: "comm-201",
      author: {
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
      },
      content: "Feature colocation saved our team months of refactoring pain. Glad to see it articulated so clearly here.",
      createdAt: "2026-09-29T11:20:00.000Z",
      likes: 18,
      liked: false,
      replies: []
    }
  ]
};

export const CATEGORIES = [
  { id: "all", name: "All", description: "Explore the entire collection of articles and perspectives." },
  { id: "technology", name: "Technology", description: "Architecture, systems engineering, modern web platforms, and digital tooling." },
  { id: "design", name: "Design", description: "Visual hierarchy, editorial typography, humane UX, and micro-interactions." },
  { id: "ai", name: "AI", description: "Machine learning, cognitive workflows, generative systems, and future interfaces." },
  { id: "web-development", name: "Web Development", description: "React, performance engineering, DOM rendering, and modern browser standards." },
  { id: "programming", name: "Programming", description: "TypeScript, software design patterns, state machines, and craftsmanship." },
  { id: "career", name: "Career", description: "Engineering leadership, mentorship, remote culture, and personal growth." },
  { id: "productivity", name: "Productivity", description: "Deep focus, mindful rituals, time protection, and intentional work." },
  { id: "innovation", name: "Innovation", description: "Journalism renaissance, digital culture, ethics, and independent publishing." }
];
