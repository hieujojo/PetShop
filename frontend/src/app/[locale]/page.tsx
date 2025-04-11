// app/[locale]/home/page.tsx
import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <div>
      <Header /> 
      <main>
        <h1>{t('welcome')}</h1>
        <p>{t('description')}</p>
      </main>
    </div>
  );
}