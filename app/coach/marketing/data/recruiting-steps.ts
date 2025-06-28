import {
  PlayIcon,
  BookOpenIcon,
  GlobeAltIcon,
  BoltIcon,
  PresentationChartBarIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
} from '@heroicons/react/20/solid';

import type { RecruitingStep } from '../types';

export const recruitingSteps: RecruitingStep[] = [
  {
    id: 'foundation',
    stepNumber: 1,
    title: 'Master Your Academic Story',
    description:
      'Before you can confidently recruit parents, you need to fully understand what makes your academic program special. Parents will ask tough questions about academics, and you need to be able to explain how your students achieve top 2% test scores.',
    estimatedTime: '2-3 hours',
    difficulty: 'Easy',
    resources: [
      {
        id: 'learning-videos',
        title: '2 Hour Learning Resource Videos',
        description:
          'Watch these to understand the learning system that gives your students a competitive edge',
        type: 'video',
        url: 'https://texassportsacademy.com/resources',
        icon: PlayIcon,
        color: '#dc2626',
      },
      {
        id: 'learning-whitepaper',
        title: '2 Hour Learning Whitepaper',
        description:
          'Deep dive into the methodology - this is your academic credibility foundation',
        type: 'guide',
        url: 'https://heyzine.com/flip-book/2hourlearning.html#page/1',
        icon: BookOpenIcon,
        color: '#059669',
      },
    ],
  },
  {
    id: 'website-marketing',
    stepNumber: 2,
    title: 'Set Up Your Digital Presence',
    description:
      'Your website is often the first impression parents get. You need compelling copy that positions your school as the premium academic-athletic option. Most coaches underestimate how much parents research online before ever contacting you.',
    estimatedTime: '1-2 hours',
    difficulty: 'Easy',
    resources: [
      {
        id: 'website-copy',
        title: 'Proven Website Copy Templates',
        description:
          'Copy-paste headlines and body text that convert visitors into enrolled families',
        type: 'copy',
        icon: GlobeAltIcon,
        color: '#059669',
      },
      {
        id: 'marketing-strategy',
        title: 'Parent Targeting Strategy',
        description: 'Focus your efforts on the right families to maximize your enrollment success',
        type: 'guide',
        icon: BoltIcon,
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'content-creation',
    stepNumber: 3,
    title: 'Build Your Winning Presentation',
    description:
      "This is where most coaches either win or lose parents. Your presentation needs to tell a compelling story that addresses parents' biggest concerns: academics, safety, and results. We'll show you exactly what works.",
    estimatedTime: '3-4 hours',
    difficulty: 'Medium',
    resources: [
      {
        id: 'example-presentation',
        title: 'Winning Presentation Example',
        description:
          'See exactly how Texas Sports Academy Lake Travis converts parents (real recording)',
        type: 'video',
        url: 'https://drive.google.com/file/d/1ny0WuA-xLNywtQjWNkMETyAQEyAR4nUT/view',
        icon: PresentationChartBarIcon,
        color: '#7c3aed',
      },
      {
        id: 'template-deck',
        title: 'Customizable Presentation Template',
        description:
          'Your starting point - but you MUST customize it with your specific credibility markers',
        type: 'template',
        url: 'https://docs.google.com/presentation/d/1nmcfr_V3TTnKEfmsIXl06fvir7CTK5cjZyId34G3_XI/edit?usp=sharing',
        icon: ArrowDownTrayIcon,
        color: '#7c3aed',
      },
    ],
  },
  {
    id: 'event-planning',
    stepNumber: 4,
    title: 'Plan High-Converting Events',
    description:
      "The best enrollment happens when parents see your program in action. But the format matters - you need to end with your pitch when parents are most engaged, not when they're walking out the door.",
    estimatedTime: '2-3 hours',
    difficulty: 'Medium',
    resources: [
      {
        id: 'event-marketing',
        title: 'Event Format Playbook',
        description:
          'Three proven event structures that consistently convert interested parents into enrolled families',
        type: 'guide',
        icon: CalendarDaysIcon,
        color: '#059669',
      },
    ],
  },
  {
    id: 'sales-conversion',
    stepNumber: 5,
    title: 'Master Your Closing Conversation',
    description:
      'This is where preparation pays off. Parents who attend your events are already interested - but they need specific talking points about academics, training advantages, and pricing to feel confident saying yes.',
    estimatedTime: '1-2 hours',
    difficulty: 'Hard',
    resources: [
      {
        id: 'pitch-delivery',
        title: 'Closing Conversation Scripts',
        description:
          'Exact phrases and responses for the most common parent questions and objections',
        type: 'guide',
        icon: MegaphoneIcon,
        color: '#dc2626',
      },
    ],
  },
];
