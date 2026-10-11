'use client';

import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import {
  ArrowRight,
  BarChart3,
  Droplets,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Sprout,
  Users,
  Wheat,
} from 'lucide-react';

const evidenceCards = [
  { label: 'Agriculture growth, FY2024–25', value: '0.56%', detail: 'Overall growth can conceal major differences between subsectors.' },
  { label: 'Crop-sector growth', value: '-6.82%', detail: 'Crop production remains highly exposed to changing production conditions.' },
  { label: 'Livestock growth', value: '+4.72%', detail: 'Livestock remains an important contributor to rural livelihoods and agricultural value.' },
  { label: 'Cotton production', value: '7.08M bales', detail: 'Down 30.7%, affecting farmers, textile supply chains and rural incomes.' },
  { label: 'Wheat production', value: '28.98M tonnes', detail: 'Down 8.9%, with direct implications for national food security.' },
  { label: 'Surface water availability', value: '89.9 MAF', detail: 'National availability does not reflect what individual farms actually receive.' },
];

const ambitions = [
  {
    title: 'Productive and Economically Viable Agriculture',
    description: 'Improve output, resource efficiency and farm profitability while ensuring farming remains viable for the people who depend on it.',
    icon: BarChart3,
  },
  {
    title: 'Climate Adaptation and Responsible Resource Management',
    description: 'Build resilience against heat, drought, flooding and irregular rainfall through better irrigation, soil health and resource stewardship.',
    icon: Droplets,
  },
  {
    title: 'Innovation That Serves Farmers',
    description: 'Use improved seed, machinery, digital advisory tools and data that are affordable, accessible and useful in real farm conditions.',
    icon: Lightbulb,
  },
  {
    title: 'Inclusive Opportunities and Stronger Livelihoods',
    description: 'Create opportunities for smallholders, tenants, women, young people, livestock keepers, farm workers and rural entrepreneurs.',
    icon: Users,
  },
  {
    title: 'Stronger Food Systems and Evidence-Led Decisions',
    description: 'Support nutritious and affordable food, reduce avoidable losses and turn evidence into practical action across the value chain.',
    icon: Wheat,
  },
];

const priorities = [
  {
    title: 'Water Security and Efficient Irrigation',
    description: 'Explore better scheduling, water management and technologies that raise productivity while protecting smallholders in water-stressed areas.',
    icon: Droplets,
  },
  {
    title: 'Climate Adaptation in Agriculture',
    description: 'Identify local adaptations that strengthen resilience across crops, livestock and rural incomes under changing seasonal conditions.',
    icon: ShieldCheck,
  },
  {
    title: 'Higher and More Reliable Productivity',
    description: 'Improve seed quality, soil health, agronomy, machinery and farm management so gains are more consistent and sustainable.',
    icon: Sprout,
  },
  {
    title: 'Soil Health and Salinity Management',
    description: 'Understand how soil conditions, salinity and waterlogging affect long-term agricultural performance and natural resource protection.',
    icon: Leaf,
  },
  {
    title: 'Farmer-Centred Technology and Innovation',
    description: 'Assess whether digital tools, satellite information and AI are affordable, accessible and actually delivering value to farmers.',
    icon: Lightbulb,
  },
  {
    title: 'Profitable Farms and Sustainable Rural Livelihoods',
    description: 'Examine the economics of farming across farm sizes, production systems and local market conditions to strengthen viability.',
    icon: BarChart3,
  },
  {
    title: 'Stronger Markets and Affordable Nutritious Food',
    description: 'Improve storage, transport, processing and market linkages so food is more available, affordable and of better quality.',
    icon: Wheat,
  },
  {
    title: 'Better Agricultural Data and Decision-Making',
    description: 'Strengthen agricultural information systems so policy and planning are based on timely, comparable and transparent evidence.',
    icon: BarChart3,
  },
];

const stakeholderGroups = [
  'Farmers, including smallholders and tenants',
  'Women working across agriculture and livestock',
  'Young people, students and emerging agricultural entrepreneurs',
  'Livestock keepers and agricultural workers',
  'Researchers, universities and extension professionals',
  'Agribusinesses, technology providers and service companies',
  'Financial institutions, policymakers and development organisations',
];

const nextSteps = [
  'Publishing a summary of the baseline evidence and key findings.',
  'Identifying gaps where additional research or field-level evidence is needed.',
  'Reviewing existing initiatives across public institutions, universities and private organisations.',
  'Exploring opportunities for practical collaboration and future pilot initiatives.',
];

export default function VisionPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f5f8f2] text-slate-800">
        <section className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center text-white">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-emerald-100">
              An initiative by The Agropreneurs
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              VISION 2040
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-emerald-50 sm:text-xl">
              Securing the Future of Agriculture in Pakistan
            </p>
            <p className="mx-auto mt-4 max-w-4xl text-base text-emerald-100 sm:text-lg">
              Building a productive, adaptable, sustainable and inclusive agricultural future.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-green-100 md:p-12">
            <div className="mb-8 flex items-start gap-4">
              <div className="rounded-full bg-green-100 p-3 text-green-700">
                <Sprout className="h-7 w-7" />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Our vision</p>
                <h2 className="text-3xl font-bold text-green-900">A shared future for Pakistan&apos;s agriculture</h2>
              </div>
            </div>
            <p className="text-lg leading-8 text-slate-700">
              By 2040, we envision a Pakistan where agriculture provides farmers with dignified and sustainable livelihoods,
              uses water and natural resources responsibly, produces nutritious and affordable food, and embraces innovation to improve
              productivity and adaptability.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              We believe Pakistan&apos;s agricultural future depends not on a single technology, policy or intervention, but on the combined
              strength of its farmers, researchers, entrepreneurs, businesses, institutions and communities.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              VISION 2040 is an initiative by The Agropreneurs to help shape that future. Through research, public engagement and
              collaboration, we aim to understand the challenges facing Pakistan&apos;s agriculture, identify opportunities for meaningful
              transformation and encourage evidence-based action towards a stronger agricultural and food system.
            </p>
          </div>
        </section>

        <section className="bg-green-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Why this matters</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">Why Pakistan needs an agricultural transformation</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-green-100">
                <p className="text-lg leading-8 text-slate-700">
                  Agriculture is central to Pakistan&apos;s economy, rural livelihoods and food security. It supports millions of people,
                  supplies raw materials to industry and contributes to the availability and affordability of food.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-green-100">
                <p className="text-lg leading-8 text-slate-700">
                  Yet the sector faces growing pressures. Water resources are under strain, climate variability is increasing uncertainty,
                  production costs remain a concern, and access to finance, reliable advice, improved inputs and appropriate technology is uneven.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                'Soil degradation and nutrient loss threaten long-term productivity.',
                'Water shortages affect yields, irrigation efficiency and farm viability.',
                'Market inefficiencies and limited finance prevent farmers from benefiting from innovation.',
                'Pakistan has major opportunities in better water management, digital advisory services and climate adaptation.',
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-green-200 bg-white p-5 text-base leading-7 text-slate-700 shadow-sm">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Evidence</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">What the evidence tells us</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {evidenceCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">{card.label}</p>
                  <p className="mt-4 text-3xl font-black text-green-800">{card.value}</p>
                  <p className="mt-3 text-base leading-7 text-slate-600">{card.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-slate-200 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Source note</p>
              <p className="mt-3 text-base leading-7">
                These figures are drawn from the Pakistan Economic Survey 2024–25 and should be interpreted according to the reporting period,
                definitions and provisional status stated in the original source. National averages can hide major differences between provinces,
                districts, farming systems and individual farms.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-green-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Ambition</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">What we want to achieve by 2040</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {ambitions.map(({ title, description, icon: Icon }) => (
                <article key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-green-100">
                  <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Priority areas</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">Eight strategic priorities for agricultural transformation</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {priorities.map(({ title, description, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-emerald-900 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Two principles across every priority</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">Inclusion</h3>
                  <p className="mt-2 text-base leading-7 text-emerald-50">
                    We will consider how agricultural challenges and opportunities differ for small farmers, tenants, women, young people,
                    livestock keepers and farm workers across provinces and farming systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Accountability and collaboration</h3>
                  <p className="mt-2 text-base leading-7 text-emerald-50">
                    Agricultural development requires coordination among federal and provincial institutions, research organizations, businesses,
                    service providers and farming communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Participation</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">A vision shaped by Pakistan&apos;s agricultural community</h2>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-green-100 md:p-10">
              <p className="text-lg leading-8 text-slate-700">
                No single organisation can understand or address all the challenges facing Pakistan&apos;s agriculture. Farmers experience local
                realities directly, researchers contribute evidence, entrepreneurs develop solutions, businesses connect markets and public
                institutions shape policies and services.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {stakeholderGroups.map((group) => (
                  <div key={group} className="rounded-2xl border border-green-100 bg-green-50 p-4 text-base font-medium text-slate-700">
                    {group}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Research approach</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">Research and public participation: turning vision into evidence</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-300">Evidence review</h3>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  We will examine official statistics, published research and relevant reports to establish a dated baseline, understand existing
                  knowledge and identify important evidence gaps.
                </p>
              </article>
              <article className="rounded-3xl bg-green-700 p-8 text-white shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-100">Stakeholder survey</h3>
                <p className="mt-4 text-base leading-7 text-emerald-50">
                  We will invite farmers and other stakeholders to share their experiences, challenges, priorities and expectations through an
                  exploratory survey designed to capture practical realities from the ground.
                </p>
              </article>
            </div>
            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-green-100">
              <p className="text-lg leading-8 text-slate-700">
                The survey is intended to identify perspectives, patterns and questions for further investigation. It is not designed to be a
                statistically representative survey of all Pakistani farmers. We will report who participated, explain the limitations of the findings
                and avoid generalising beyond what the evidence supports.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-green-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-green-100 md:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-full bg-green-100 p-3 text-green-700">
                <Lightbulb className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Technology</p>
                <h2 className="mt-2 text-3xl font-bold text-green-900">Technology that serves people</h2>
              </div>
            </div>
            <p className="text-lg leading-8 text-slate-700">
              Technology can support agricultural transformation, but its value should be judged by the problems it solves and the benefits it delivers.
              Digital advisory services may help farmers make better decisions about crops, irrigation, pests and weather; improved machinery can reduce
              labour constraints; better information can support risk management and market access.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              However, access to a tool does not guarantee meaningful results. Cost, skills, infrastructure, language, trust and local conditions
              influence whether farmers can use it effectively. VISION 2040 therefore looks beyond the availability of technology to consider
              affordability, actual use and measurable benefits.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-green-100">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Why 2040?</p>
              <h2 className="mt-3 text-3xl font-bold text-green-900">A planning horizon for the future we want</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Transforming agriculture takes time. Improvements in soil health, irrigation infrastructure, research capacity, farm machinery,
                storage, skills and digital systems require sustained investment and long-term cooperation. The year 2040 provides a horizon for
                thinking beyond immediate production challenges and considering the agricultural systems future generations will inherit.
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-900 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">What happens next</p>
              <ul className="mt-5 space-y-4 text-base leading-7 text-emerald-50">
                {nextSteps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/5 p-8 text-center text-white backdrop-blur-sm md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Take part</p>
            <h2 className="mt-3 text-3xl font-bold">Help shape Pakistan&apos;s agricultural future</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-emerald-50">
              Whether you grow crops, raise livestock, conduct research, provide advice, develop technology or work in agricultural markets,
              your experience can contribute to a better understanding of the challenges and opportunities ahead.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/survey-form" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-green-900 transition hover:bg-emerald-50">
                Participate in the research survey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
                Learn more about The Agropreneurs
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-green-100 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Our commitment</p>
            <h2 className="mt-3 text-3xl font-bold text-green-900">A long-term vision built on evidence, innovation and collaboration</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The Agropreneurs believes that Pakistan&apos;s agricultural future can be strengthened through evidence, innovation, collaboration and a
              clear commitment to the people who depend on the sector. VISION 2040 is our contribution to that effort: a long-term vision supported
              by research, informed by public participation and focused on identifying practical pathways towards agricultural transformation.
            </p>
          </div>
        </section>

        <section className="bg-green-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">References</p>
            <h2 className="mt-3 text-3xl font-bold text-green-900">Further reading</h2>
            <ul className="mt-8 space-y-3 text-base leading-7 text-slate-700">
              {[
                'FAO, WFP and Global Network Against Food Crises (2026). Global Report on Food Crises 2026. World Food Programme.',
                'FAO, IFAD, UNICEF, WFP and WHO (2026). The State of Food Security and Nutrition in the World 2026. Food and Agriculture Organization.',
                'World Health Organization (2024). Malnutrition: Fact Sheet. WHO.',
                'Government of Pakistan, Finance Division. Pakistan Economic Survey 2024–25, Agriculture chapter. Finance Division.',
                'World Bank. Groundwater in Pakistan&apos;s Indus Basin: Present and Future Prospects. World Bank.',
                'Pakistan Bureau of Statistics. Integrated Agriculture Census 2024 and related publication announcements. PBS.',
                'World Bank (2022). Pakistan Country Climate and Development Report. World Bank.',
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-green-100 bg-white p-4">{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
