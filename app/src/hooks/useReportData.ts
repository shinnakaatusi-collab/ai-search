import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config';
import { DailyReport, ReportIndex } from '../types/report';

export function useReportData(date?: string) {
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let targetFile: string;
      if (date) {
        targetFile = `${date}_ai-daily-report.json`;
      } else {
        const indexRes = await fetch(`${API_BASE_URL}/index.json`);
        const index: ReportIndex = await indexRes.json();
        if (index.reports.length === 0) {
          throw new Error('レポートがありません');
        }
        targetFile = index.reports[index.reports.length - 1].file;
      }

      const res = await fetch(`${API_BASE_URL}/${targetFile}`);
      if (!res.ok) throw new Error(`レポート取得失敗: ${res.status}`);
      const data: DailyReport = await res.json();
      setReport(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '不明なエラー');
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { report, loading, error, refresh: fetchReport };
}
