import { useEffect, useState } from "react";

const URL = "https://dragonball-api.com/api/planets?limit=100";

const usePlanetas = () => {
  const [planetas, setPlanetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setCargando(true);
    setError("");

    const cargar = async () => {
      try {
        const res = await fetch(URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.items ?? []);
        // Solo guardamos los campos que se van a mostrar (sin image ni deletedAt)
        setPlanetas(
          lista.map(({ id, name, isDestroyed, description }) => ({
            id: String(id),
            name,
            isDestroyed,
            description,
          })),
        );
      } catch (e) {
        if (e.name === "AbortError") return;
        setError("No se pudieron cargar los planetas.");
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    };

    cargar();
    return () => controller.abort();
  }, [intento]);

  return {
    planetas,
    cargando,
    error,
    reintentar: () => setIntento((prev) => prev + 1),
  };
};

export default usePlanetas;