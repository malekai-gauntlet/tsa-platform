import React from 'react';
import { Button } from '@/components/button';
import { XMarkIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid';
import type { ResourceMaterial } from '../types';

interface ResourceModalProps {
  isOpen: boolean;
  resource: ResourceMaterial | null;
  onClose: () => void;
}

const getResourceContent = (resourceId: string): string => {
  switch (resourceId) {
    case 'website-copy':
      return `═══ WEBSITE COPY THAT CONVERTS PARENTS ═══

🎯 PRO TIP: Most coaches write generic copy about "excellence." Parents want specifics about results and methodology.

═══ HEADLINE ═══
We are partnering with Alpha School to launch Houston's first breaking school!

═══ BODY ═══
Alpha School (alpha.school) is a leading private school based in Austin with students that consistently test in the top 2% in the nation (see press coverage). They are partnering with us to provide top academics at our breaking school, while our team leads the breaking training.

═══ DAY IN THE LIFE ═══
Here's what a typical day looks like:
• 9am - 11:30am: Academics with Alpha School's learning technology
• 12pm - 3:30pm: Professional breaking training

═══ OUR WHY ═══
Traditional education systems aren't setting students up for success. Alpha School has an innovative way to accelerate student learning, and by partnering with them, we can create Houston's first breaking school that helps students succeed in all areas.

═══ CTA ═══
We'll be hosting an event (part breaking training, part information session) in the weeks ahead to share more about our new school. Drop your email to stay updated on event announcements.

⚠️ CUSTOMIZATION REQUIRED:
- Replace "Houston's first breaking school" with your city/sport
- Add your personal education background in the "OUR WHY" section
- Include specific examples of your athletic credentials`;

    case 'event-marketing':
      return `═══ EVENT FORMATS THAT WORK ═══

If you host events to recruit parents, there are a few options. These are general recommendations for event types we've seen work well for Texas Sports Academy and other Alpha Schools:

═══ 2 HOUR EVENT ═══
First hour = Parent pitch 
Second hour = Athletic training

═══ DAY-LONG EVENT ═══
Morning = Athletic training
Afternoon = Competition (parents come in)
Last 30 mins = Parent pitch

═══ FULL SHADOW DAY ═══
Replicate of what a day at your school will be
Morning = Academics with Alpha's Software
Afternoon = Athletic training
Last 30 mins = Parent pitch`;

    case 'marketing-strategy':
      return `🎯 ═══ MARKETING STRATEGY ═══

Goal: 5 students by Fall 2025

1. 🏠 ═══ TARGET HOMESCHOOL FAMILIES ═══
   • Start with kids you already train
   • Ask about other homeschool students they know

2. 💬 ═══ FOCUS ON WORD-OF-MOUTH ═══
   • Personal referrals beat social media
   • Ask families: "Who else might benefit?"

3. 🤝 ═══ MAKE REFERRALS EASY ═══
   • Follow up within 24 hours
   • Consider tuition credit incentives`;

    case 'pitch-delivery':
      return `═══ YOUR CLOSING CONVERSATION TOOLKIT ═══

🎯 REMEMBER: Parents at your events are already interested. Your job is to give them confidence to say yes.

═══ KEY MESSAGE #1: ACADEMIC SUPERIORITY ═══
"Our academics will be best-in-class using the same technology that helps students test in the top 2% nationally. This isn't just tutoring - it's the actual learning system used at Alpha School in Austin." 

📰 Reference: Fox News coverage of Alpha School results

💡 WHY THIS WORKS: Parents' #1 concern is always academics. Lead with strength.

═══ KEY MESSAGE #2: COMPETITIVE ADVANTAGE ═══
"In our program, we train from 11:30am-3:30pm every day while other kids are in traditional classrooms. That's 20 extra hours of focused training per week that gives your child a massive competitive advantage."

💡 WHY THIS WORKS: Quantifies the advantage in terms parents understand.

═══ KEY MESSAGE #3: VALUE PROPOSITION ═══
"Our tuition is $15,000/year, but through our partnership with Alpha School, families receive $10,000 scholarships. So you're paying about $500/month for both elite academics and professional training."

💡 WHY THIS WORKS: Addresses cost concerns upfront with the scholarship benefit.

═══ COMMON OBJECTIONS & RESPONSES ═══

❓ "How do we know the academics really work?"
✅ "The same system is used at Alpha School where students consistently test in the top 2%. Here's the press coverage and test score data..."

❓ "What if my child falls behind socially?"
✅ "Our students actually develop stronger social skills through team training and diverse age interactions, plus they have more time for family and community activities."

❓ "This seems too good to be true."
✅ "I understand the skepticism. That's why we offer shadow days - come see it in action before making any commitment."

🎯 ALWAYS END WITH: "What questions do you have about getting [child's name] started with us?"

⚠️ AVOID: Pressuring for immediate decisions. Give them 48 hours to discuss as a family, then follow up.`;

    case 'template-deck':
      return `═══ PRESENTATION CUSTOMIZATION CHECKLIST ═══

🎯 CRITICAL: Don't just use the template as-is. Parents can tell when presentations are generic.

═══ REQUIRED CUSTOMIZATIONS ═══

1. ═══ YOUR CREDIBILITY SECTION ═══
   Add specific examples of your breaking expertise:
   - Competition wins and rankings
   - Years of experience training students  
   - Student success stories and achievements
   - Reviews from current families (screenshot from your website)

2. ═══ LOCAL RELEVANCE ═══
   - Replace "Houston" with your specific city/area
   - Include local school district comparisons
   - Reference local competition and training opportunities
   - Add photos of your actual training space

3. ═══ SUCCESS STORIES ═══
   Replace generic examples with YOUR student stories:
   - Before/after skill progression videos
   - Academic improvement testimonials
   - College acceptance or scholarship stories
   - Character development examples

4. ═══ PARTNERSHIP DETAILS ═══
   Customize the Alpha School partnership slides:
   - Your specific relationship timeline
   - How you discovered Alpha School methodology
   - Your personal education background/credentials

💡 PRO TIPS:
- Practice the presentation at least 3 times before your first event
- Time it - should be 20-25 minutes max with Q&A
- Have enrollment forms and calendars ready
- End with a clear call-to-action (schedule shadow day)

⚠️ COMMON MISTAKES:
- Reading directly from slides (memorize key points)
- Going over 30 minutes total (parents get restless)
- Forgetting to ask for questions/enrollment
- Not having next steps clearly defined

═══ BEFORE YOUR FIRST PRESENTATION ═══
□ Customize all placeholder content
□ Add your photos and videos
□ Practice timing and transitions
□ Prepare for common questions
□ Set up enrollment process`;

    default:
      return 'Content not available.';
  }
};

export const ResourceModal: React.FC<ResourceModalProps> = ({ isOpen, resource, onClose }) => {
  if (!isOpen || !resource) return null;

  const handleCopyContent = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(getResourceContent(resource.id));
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex h-full max-h-[90vh]">
          <div className="flex-1 overflow-y-auto p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{resource.title}</h2>
                <p className="mt-1 text-gray-600">{resource.description}</p>
              </div>
              <Button
                className="cursor-pointer border border-gray-200 hover:bg-gray-50"
                onClick={onClose}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="prose max-w-none">
              <pre className="rounded-lg border border-gray-200 bg-white p-8 font-sans text-base leading-7 whitespace-pre-wrap text-gray-900 shadow-sm">
                {getResourceContent(resource.id)}
              </pre>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
              <Button
                className="cursor-pointer border border-gray-200 hover:bg-gray-50"
                onClick={handleCopyContent}
              >
                <ClipboardDocumentIcon className="mr-1 h-4 w-4" />
                Copy Content
              </Button>
              <Button
                className="cursor-pointer bg-[#004aad] text-white hover:bg-[#003888]"
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
