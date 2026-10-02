import { agriculturalResearchCenters, agriculturalUniversities, type AgriculturalDirectoryEntry } from '@/lib/agricultural-directories';

export type SiteContentPage = {
  slug: string;
  title: string;
  intro: string;
  sectionTitle: string;
  body: string;
  focus: string[];
  directory?: AgriculturalDirectoryEntry[];
  heroImageUrl?: string;
  urdu?: {
    title: string;
    intro: string;
    sectionTitle: string;
    body: string;
    focus: string[];
  };
};

export type SiteContentGroup = {
  slug: string;
  label: string;
  description: string;
  labelUr?: string;
  descriptionUr?: string;
  pages: SiteContentPage[];
};

export type NavigationItem = {
  label: string;
  href?: string;
};

export type NavigationSection = {
  label: string;
  items: NavigationItem[];
};

const page = (
  slug: string,
  title: string,
  intro: string,
  sectionTitle: string,
  body: string,
  focus: string[],
): SiteContentPage => ({ slug, title, intro, sectionTitle, body, focus });

export const pageGroups: SiteContentGroup[] = [
  {
    slug: 'education',
    label: 'EDUCATION',
    description: 'Learning pathways, institutions, and agricultural knowledge across Pakistan.',
    pages: [
      page('institutes', 'Institutes', 'Explore specialist institutes that support agricultural learning, practical training, and field-based knowledge.', 'A place to learn by doing', 'Agriculture institutes connect classroom learning with the realities of farms, food systems, and rural enterprise. Use this directory as a starting point for exploring specialist subjects and training opportunities.', ['Agricultural sciences and extension', 'Hands-on field and laboratory learning', 'Skills for resilient rural livelihoods']),
      page('colleges', 'Colleges', 'Discover college-level study and practical skills development for Pakistan’s next generation of agriculture professionals.', 'Practical knowledge for a changing sector', 'Agriculture colleges help students build foundational knowledge while developing the practical skills needed across production, livestock, and food systems.', ['Diploma and certificate pathways', 'Applied crop and livestock learning', 'Preparation for further study and work']),
      { ...page('universities', 'Universities', 'Find higher education pathways spanning agriculture, food, environment, and related disciplines.', 'Grow expertise through higher education', 'Universities bring together teaching, research, and collaboration. Their programmes prepare graduates to contribute to farming, agribusiness, public service, and scientific discovery.', ['Undergraduate and postgraduate study', 'Research-led teaching', 'Cross-disciplinary collaboration']), directory: agriculturalUniversities },
      { ...page('research-centres', 'Research Centres', 'Learn about research centres working on the questions shaping agriculture and food security.', 'Research connected to real needs', 'Research centres provide focused expertise, facilities, and partnerships. Their work can help turn local challenges into practical evidence and solutions.', ['Crop, soil, and water research', 'Climate and food-system resilience', 'Partnerships with communities and industry']), directory: agriculturalResearchCenters },
    ],
  },
  {
    slug: 'community',
    label: 'COMMUNITY',
    description: 'Explore the people, practices, and production systems that make up Pakistan’s agricultural community.',
    pages: [
      page('crop-production', 'Crop Production', 'Explore crop production practices that support productive farms and reliable food supplies.', 'Strong crops start with informed decisions', 'Crop production depends on the right combination of seed, soil care, water, timing, and market planning. Sharing experience helps farmers choose practices suited to their land and local conditions.', ['Seed selection and crop planning', 'Soil health and nutrient management', 'Water-wise cultivation and harvesting']),
      page('horticulture', 'Horticulture', 'Discover the cultivation of fruits, vegetables, flowers, and other high-value plants.', 'Cultivating quality and opportunity', 'Horticulture can diversify farm income and improve access to nutritious foods. Good outcomes rely on careful crop selection, healthy planting material, and attention to handling after harvest.', ['Fruit and vegetable production', 'Nursery and protected cultivation', 'Quality, storage, and market readiness']),
      page('animal-husbandry', 'Animal Husbandry', 'Learn about the care, breeding, and management of farm animals in sustainable livestock systems.', 'Healthy animals support healthy livelihoods', 'Animal husbandry combines animal health, suitable nutrition, housing, and responsible breeding. Locally appropriate practices help protect welfare while supporting productive family farms.', ['Animal health and preventive care', 'Feed, housing, and welfare', 'Breeding and herd management']),
      page('dairy-farming', 'Dairy Farming', 'Explore dairy practices that improve animal wellbeing, milk quality, and farm resilience.', 'Better care from farm to milk', 'Dairy farming brings together herd health, balanced feed, clean water, and hygienic milking. Small improvements in daily routines can strengthen quality and reduce avoidable losses.', ['Herd nutrition and comfort', 'Clean milk handling', 'Farm records and productivity']),
      page('poultry-farming', 'Poultry Farming', 'Find practical information on poultry care, housing, biosecurity, and responsible production.', 'A careful approach to poultry', 'Successful poultry systems depend on healthy stock, clean housing, suitable feed, and consistent biosecurity. Planning for local climate and market needs is equally important.', ['Housing, ventilation, and litter', 'Feed and flock health', 'Biosecurity and safe handling']),
      page('aquaculture', 'Aquaculture', 'Explore fish and aquatic food production as part of diverse and resource-aware livelihoods.', 'Making water resources work well', 'Aquaculture can complement farm livelihoods when systems are designed around water availability, species needs, and local ecosystems. Sound management protects both production and water quality.', ['Pond and system preparation', 'Water quality and fish health', 'Responsible production planning']),
      page('forestry', 'Forestry', 'Learn how trees and well-managed forests support landscapes, livelihoods, and climate resilience.', 'Healthy landscapes need healthy forests', 'Forestry connects restoration and stewardship with the needs of people who depend on land and tree resources. Locally led management can strengthen biodiversity and protect soil and water.', ['Tree planting and native species', 'Forest stewardship and restoration', 'Agroforestry for farms and communities']),
      page('apiculture', 'Apiculture', 'Discover beekeeping and the role of pollinators in food production and healthy ecosystems.', 'Small pollinators, wide impact', 'Beekeeping can provide useful products and support pollination. Training, suitable hive placement, and careful colony health management are central to responsible apiculture.', ['Colony care and hive management', 'Pollination and crop relationships', 'Honey quality and safe handling']),
      page('sericulture', 'Sericulture', 'Explore silkworm rearing and the connected skills behind silk production.', 'From host plants to silk', 'Sericulture links mulberry cultivation, silkworm care, and cocoon handling. Reliable practices and access to suitable training can help communities understand the full value chain.', ['Host-plant cultivation', 'Silkworm rearing and hygiene', 'Cocoon handling and value chains']),
    ],
  },
  {
    slug: 'research',
    label: 'RESEARCH',
    description: 'Connect agricultural questions with evidence, facilities, and the people doing the work.',
    pages: [
      page('research-areas', 'Research Areas', 'Browse the themes where agricultural research can contribute to more resilient farms and food systems.', 'Questions that matter on the ground', 'Research priorities are strongest when they reflect the needs of farmers, communities, and the wider food system. These themes offer a framework for collaboration and future study.', ['Climate-smart agriculture and adaptation', 'Water, soil, and natural resources', 'Food security, markets, and rural livelihoods']),
      page('research-projects', 'Research Projects', 'Explore research projects designed to investigate agricultural challenges and test practical approaches.', 'From a useful question to shared learning', 'Research projects bring people and methods together around a defined question. Clear objectives, community participation, and open learning help make findings more useful beyond a single study.', ['Project goals and methods', 'Field trials and community collaboration', 'Findings, learning, and next steps']),
      page('publications', 'Publications', 'Find research outputs and learning materials that support evidence-informed decisions in agriculture.', 'Make knowledge easier to use', 'Publications share evidence, methods, and lessons from agricultural research. Accessible summaries can help connect technical findings with people making decisions in fields and communities.', ['Research papers and reports', 'Briefs and practical guidance', 'Clear summaries for wider audiences']),
      page('research-facilities', 'Research Facilities', 'Learn about the spaces, equipment, and field resources that make agricultural research possible.', 'Facilities that enable better research', 'Well-maintained research facilities support reliable testing, observation, and learning. Shared access and responsible operation can strengthen collaboration across institutions and disciplines.', ['Laboratories and analytical equipment', 'Experimental plots and field sites', 'Safe, responsible facility use']),
      page('researchers', 'Researchers', 'Meet the expertise and collaboration behind agricultural research and innovation.', 'People at the heart of discovery', 'Researchers bring specialist knowledge to questions about crops, livestock, ecosystems, technology, and food systems. Collaboration helps ensure that research is rigorous and relevant to local priorities.', ['Research expertise and disciplines', 'Collaborative and interdisciplinary work', 'Community-engaged research']),
    ],
  },
  {
    slug: 'commercial',
    label: 'COMMERCIAL',
    description: 'Discover products, services, and partnerships that help agriculture move from knowledge to opportunity.',
    pages: [
      page('products', 'Products', 'Explore agricultural products and solutions designed to meet practical needs across the value chain.', 'Useful products, thoughtfully selected', 'Agricultural products can help address everyday needs in production, storage, processing, and farm management. Sound choices consider quality, suitability, cost, and responsible use.', ['Farm inputs and equipment', 'Post-harvest and processing solutions', 'Product quality and informed selection']),
      page('services', 'Services', 'Find services that support farmers, agricultural enterprises, and organisations working across the sector.', 'Support for every stage of the work', 'Agricultural services connect people with practical expertise, from farm advice to market and business support. Responsive services start by understanding local needs and conditions.', ['Technical and advisory support', 'Training and business services', 'Market, logistics, and digital support']),
      page('business-opportunities', 'Business Opportunities', 'Explore ways to build responsible enterprises and strengthen value creation in agriculture.', 'Turn potential into sustainable enterprise', 'Business opportunities emerge across production, processing, logistics, and services. Strong ventures are grounded in real customer needs, responsible practices, and a clear understanding of risk.', ['Value addition and processing', 'Rural enterprise and employment', 'Market research and business planning']),
      page('partnerships', 'Partnerships', 'Learn how collaboration can connect communities, institutions, and businesses around shared agricultural goals.', 'Progress through shared effort', 'Partnerships make it possible to combine knowledge, resources, and local experience. Clear roles and mutual benefit help collaborations create lasting value for the people they serve.', ['Community and institutional collaboration', 'Private-sector engagement', 'Shared goals and accountable action']),
    ],
  },
  {
    slug: 'news-media',
    label: 'NEWS & MEDIA',
    description: 'Updates, announcements, events, and stories from across the agricultural community.',
    pages: [
      page('latest-news', 'Latest News', 'Keep up with recent developments, stories, and ideas from agriculture and rural communities.', 'Stories from a changing sector', 'Timely, clear reporting helps people understand the developments affecting farms and food systems. This space is designed to bring relevant updates and community perspectives together.', ['Agriculture and food-system updates', 'Farmer and community stories', 'Research and innovation highlights']),
      page('events', 'Events', 'Find opportunities to meet, learn, and exchange ideas through agriculture-focused events.', 'Bring the community together', 'Events create space for learning, networking, and practical discussion. Workshops, field days, and forums can connect people facing shared challenges and looking for workable solutions.', ['Workshops and training sessions', 'Field days and demonstrations', 'Forums and community gatherings']),
      page('announcements', 'Announcements', 'Read notices about new initiatives, opportunities, and important updates for the community.', 'Important information, clearly shared', 'Announcements help people act on timely information. Clear dates, eligibility, and contact details make opportunities easier to understand and access.', ['Program and initiative notices', 'Calls for participation', 'Deadlines and contact information']),
      page('press-releases', 'Press Releases', 'Access official statements and updates about organisational news and agricultural initiatives.', 'Verified updates for public audiences', 'Press releases provide concise, attributable information for media and community partners. They help communicate milestones, positions, and new work with clarity.', ['Organisational updates', 'Statements and project milestones', 'Media and information contacts']),
      page('gallery', 'Gallery', 'See moments from agricultural learning, community work, and events across the sector.', 'A visual record of shared work', 'Photographs and visual stories can make agricultural practice and community effort more visible. Captions and context help audiences understand the people, places, and activities shown.', ['Community and field activities', 'Training and event highlights', 'Stories from farms and landscapes']),
    ],
  },
];

export const navigationSections: NavigationSection[] = [
  { label: 'ABOUT US', items: [{ label: 'Introduction', href: '/#about' }, { label: "Founder's Message", href: '/#founder' }] },
  { label: 'VISION 2040', items: [{ label: 'About Vision 2040', href: '/#vision' }, { label: 'Survey', href: '/#survey' }] },
  ...pageGroups.map((group) => ({
    label: group.label,
    items: group.pages.map((contentPage) => ({
      label: contentPage.title,
      href: `/${group.slug}/${contentPage.slug}`,
    })),
  })),
];

export function findSitePage(slugs: string[]) {
  const [groupSlug, pageSlug] = slugs;
  const group = pageGroups.find((candidate) => candidate.slug === groupSlug);
  const contentPage = group?.pages.find((candidate) => candidate.slug === pageSlug);

  return group && contentPage ? { group, page: contentPage } : null;
}