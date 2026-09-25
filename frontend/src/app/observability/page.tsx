'use client';
import MetricCard from './components/MetricCard';



import { useEffect, useState } from 'react';
import SystemMetricsChart from './components/SystemMetricsChart';
import ContainerList from './components/ContainerList';

type SystemMetric = {
    timestamp: string;
    cpuUsage: number;
    memoryUsage: number;

    diskUsage: number;
};

export default function ObservabilityPage() {
    const [metrics, setMetrics] = useState<SystemMetric[]>([]);

    useEffect(() => {
        async function fetchMetrics() {
            const response = await fetch(


                'http://localhost:3000/metrics/system',
            );

            if (!response.ok) {
                throw new Error('Failed to fetch system metrics');
            }

            const data = await response.json();



            setMetrics(data);
        }

        fetchMetrics();
    }, []);






    const latest = metrics.at(-1);

    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Observability
                    </h1>


                    <p className="mt-2 text-gray-500">
                        VPS system overview
                    </p>
                </header>


                <section className="grid gap-4 md:grid-cols-3">
                    <MetricCard
                        title="CPU"
                        value={latest?.cpuUsagePercent ?? 0}
                        unit="%"
                    />


                    <MetricCard

                        title="Memory"
                        value={latest?.memoryUsagePercent ?? 0}

                        unit="%"
                    />

                    <MetricCard
                        title="Disk"
                        value={latest?.diskUsagePercent ?? 0}


                        unit="%"
                    />
                </section>

                <section className="mt-6">
                    <SystemMetricsChart data={metrics} />
                </section>



                <ContainerList />

            </div>
        </main>
    );


}