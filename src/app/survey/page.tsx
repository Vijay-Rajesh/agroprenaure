import { permanentRedirect } from 'next/navigation';

export default function SurveyOverviewPage() {
  permanentRedirect('/survey-form');
}
