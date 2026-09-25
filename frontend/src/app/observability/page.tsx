'use client';
import MetricCard from './components/MetricCard';



import { useEffect, useState } from 'react';
import SystemMetricsChart from './components/SystemMetricsChart';
import ContainerList from './components/ContainerList';

type SystemMetric = {
    timestamp: string;
    cpuUsagePercent: number;
    memoryUsagePercent: number;

    diskUsagePercent: number;
};


export default function ObservabilityPage() {
    const [metrics, setMetrics] = useState<SystemMetric[]>([]);

    const [ containers, setContainers ] = useState<Container[]>([]);


    useEffect(() => {
        async function fetchDashboardData() {
            try {


                const [systemResponse, dockerResponse] =
                    await Promise.all([
                        fetch('http://localhost:3000/metrics/system'),
                        fetch('http://localhost:3000/docker/containers/metrics'),
                    ]);


                if (!systemResponse.ok) {
                    throw new Error('Failed to fetch system metrics');
                }

                if (!dockerResponse.ok) {
                    throw new Error('Failed to fetch Docker metrics');
                }

                const [systemData, dockerData] =

                    await Promise.all([
                        systemResponse.json(),
                        dockerResponse.json(),
                    ]);

                setMetrics(systemData);
                setContainers(dockerData);
            } catch (error) {
                console.error(
                    'Failed to fetch dashboard data:',

                    error,
                );
            }
        }


        fetchDashboardData();

        const interval = setInterval(
            fetchDashboardData,
            10000,
        );


        return () => clearInterval(interval);
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



                <ContainerList containers={containers} />

            </div>
        </main>
    );


}