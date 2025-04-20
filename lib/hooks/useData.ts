import { useState, useEffect } from "react";
import type { Work, Insight } from "@/types";

export function useData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export function useDataBySlug<T>(endpoint: string, slug: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${endpoint}/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, slug]);

  return { data, loading, error };
}

export function useFeaturedWorks() {
  const [data, setData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedWorks() {
      try {
        const response = await fetch("/api/works?limit=2");

        if (!response.ok) {
          throw new Error("Failed to fetch featured works");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedWorks();
  }, []);

  return { data, loading, error };
}

export function useFeaturedInsights() {
  const [data, setData] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedInsights() {
      try {
        const response = await fetch("/api/insights?limit=2");
        if (!response.ok) {
          throw new Error("Failed to fetch featured insights");
        }
        const result = await response.json();
        setData(result.insights);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedInsights();
  }, []);

  return { data, loading, error };
}
