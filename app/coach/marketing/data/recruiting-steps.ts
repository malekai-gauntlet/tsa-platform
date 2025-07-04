import {
  PlayIcon,
  BookOpenIcon,
  PresentationChartBarIcon,
  NewspaperIcon,
  PhotoIcon,
  UserGroupIcon,
  MegaphoneIcon,
  DocumentTextIcon,
} from '@heroicons/react/20/solid';

import type { RecruitingStep } from '../types';

export const recruitingSteps: RecruitingStep[] = [
  {
    id: 'how-to-pitch-parents',
    stepNumber: 1,
    title: 'How to Pitch Parents',
    description:
      'Master your parent presentation with proven examples and templates. Watch real successful pitches and get your customizable presentation ready.',
    estimatedTime: '30-45 minutes',
    difficulty: 'Easy',
    resources: [
      {
        id: 'jamal-pitch-video',
        title: 'Jamal Pitch Example',
        description: 'Watch this example pitch delivery to see exactly how to present to parents',
        type: 'video',
        url: 'https://vimeo.com/1094884413?p=1s',
        icon: PlayIcon,
        color: '#dc2626',
      },
      {
        id: 'template-deck',
        title: 'Customizable Presentation Template',
        description: 'Your starting point - customize this template with your specific credentials',
        type: 'template',
        url: 'https://docs.google.com/presentation/d/1nmcfr_V3TTnKEfmsIXl06fvir7CTK5cjZyId34G3_XI/copy',
        icon: PresentationChartBarIcon,
        color: '#7c3aed',
      },
      {
        id: 'webinar-example',
        title: 'Live Parent Pitch Webinar',
        description: 'See a live parent pitch in action (AIE Elite example)',
        type: 'video',
        url: 'https://drive.google.com/file/d/1UIhoCL7Vin-2Js05m4YPoIaNHIQP9V_C/view',
        icon: PlayIcon,
        color: '#059669',
      },
    ],
  },
  {
    id: 'information-about-2hl',
    stepNumber: 2,
    title: 'Information about 2 Hour Learning',
    description:
      'Understand the academic methodology you\'re offering parents. These are the proof points and explanations you\'ll need when parents ask about academics.',
    estimatedTime: '45-60 minutes',
    difficulty: 'Medium',
    resources: [
      {
        id: 'white-paper',
        title: '2 Hour Learning White Paper',
        description: 'The academic methodology you\'re offering - essential reading for understanding the system',
        type: 'guide',
        url: 'https://heyzine.com/flip-book/2hourlearning.html',
        icon: BookOpenIcon,
        color: '#059669',
      },
      {
        id: 'deep-dive-video',
        title: '2HL Deep Dive Video', 
        description: 'Detailed explanation of the learning system you can reference with parents',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Qm6M7_TAVR0',
        icon: PlayIcon,
        color: '#dc2626',
      },
      {
        id: '2hl-results',
        title: '2HL Results & Proof Points',
        description: 'The academic success data and results you can share with parents',
        type: 'guide',
        url: 'https://2hourlearning.com/results/',
        icon: DocumentTextIcon,
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'testimonials',
    stepNumber: 3,
    title: 'Testimonials to Show Parents',
    description:
      'Parent and student testimonials that you can show prospects to build trust and demonstrate real results from families just like them.',
    estimatedTime: '15-20 minutes',
    difficulty: 'Easy',
    resources: [
      {
        id: 'testimonial-video-1',
        title: 'Parent Testimonial Video 1',
        description: 'Real parent testimonial to show prospects',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=hFK-0325LP0',
        icon: UserGroupIcon,
        color: '#059669',
      },
      {
        id: 'testimonial-video-2',
        title: 'Parent Testimonial Video 2',
        description: 'Additional parent testimonial for credibility',
        type: 'video',
        url: 'https://drive.google.com/file/d/1Nb-gKK0XGf2_sKzPlrgDCXt023LNiGWE/view?usp=sharing',
        icon: UserGroupIcon,
        color: '#059669',
      },
      {
        id: 'testimonial-video-3',
        title: 'Parent Testimonial Video 3',
        description: 'Third parent testimonial for additional social proof',
        type: 'video',
        url: 'https://drive.google.com/file/d/1BlNO97aKEHFj7YF6UU-AmFIAhsZwgKN1/view?usp=sharing',
        icon: UserGroupIcon,
        color: '#059669',
      },
    ],
  },
  {
    id: 'press-coverage',
    stepNumber: 4,
    title: 'Press Coverage',
    description:
      'Third-party validation from major news outlets that you can reference when talking to parents. This builds credibility and shows the program has been recognized by the media.',
    estimatedTime: '10 minutes',
    difficulty: 'Easy',
    resources: [
      {
        id: 'fox-news-article',
        title: 'Fox News Article',
        description: 'Major news coverage showing students\' success - powerful third-party validation',
        type: 'guide',
        url: 'https://www.foxnews.com/media/texas-private-schools-use-ai-tutor-rockets-student-test-scores-top-2-country',
        icon: NewspaperIcon,
        color: '#dc2626',
      },
    ],
  },
  {
    id: 'marketing-materials',
    stepNumber: 5,
    title: 'Ready-to-Use Marketing Materials',
    description:
      'Professional graphics and marketing materials you can download and use immediately for social media, flyers, presentations, and parent communications.',
    estimatedTime: '15 minutes',
    difficulty: 'Easy',
    resources: [
      {
        id: 'canva-asset-1',
        title: 'Marketing Graphic Set 1',
        description: 'Professional marketing graphics ready for download',
        type: 'template',
        url: 'https://www.canva.com/design/DAGRx1c0010/Xh7G6HvX97koWIGmMW-Xuw/view?utm_content=DAGRx1c0010&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview',
        icon: PhotoIcon,
        color: '#7c3aed',
      },
      {
        id: 'canva-asset-2',
        title: 'Marketing Graphic Set 2',
        description: 'Additional marketing graphics for social media and print',
        type: 'template',
        url: 'https://www.canva.com/design/DAGRkw3XniA/OgEWOFl1qkilRhWe79PhtQ/view?utm_content=DAGRkw3XniA&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview',
        icon: PhotoIcon,
        color: '#7c3aed',
      },
      {
        id: 'canva-asset-3',
        title: 'Marketing Graphic Set 3',
        description: 'More professional marketing materials for your campaigns',
        type: 'template',
        url: 'https://www.canva.com/design/DAGjTIvKW_U/60BXiLVxqHJ4tuPxZTy_Nw/view?utm_content=DAGjTIvKW_U&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview',
        icon: PhotoIcon,
        color: '#7c3aed',
      },
      {
        id: 'canva-asset-4',
        title: 'Marketing Graphic Set 4',
        description: 'Professional graphics for presentations and events',
        type: 'template',
        url: 'https://www.canva.com/design/DAGOkC-SWlI/9Z3xbe5qBNwYeERBG2Ezfw/view?utm_content=DAGOkC-SWlI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview',
        icon: PhotoIcon,
        color: '#7c3aed',
      },
      {
        id: 'canva-asset-5',
        title: 'Marketing Graphic Set 5',
        description: 'Final set of marketing materials for comprehensive coverage',
        type: 'template',
        url: 'https://www.canva.com/design/DAGPDwnwTcc/Nl8MoOQblknHMzHZy0oNJg/view?utm_content=DAGPDwnwTcc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview',
        icon: PhotoIcon,
        color: '#7c3aed',
      },
    ],
  },
];
