export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  background: string;
  prediction_short: string;
  prediction_long: string;
  impact_level: 'high' | 'medium' | 'low';
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items: NewsItem[];
}

export interface DailyReport {
  date: string;
  generated_at: string;
  highlight: string;
  categories: Category[];
}

export interface ReportIndex {
  reports: { date: string; file: string }[];
  last_updated: string;
}
