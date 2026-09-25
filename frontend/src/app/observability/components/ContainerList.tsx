

'use client';


import { useEffect, useState } from 'react';

type Container = {
    id: string;
    name: string;
    image: string;
    state: string;


    status: string;
}



export default function ContainerList() {

    const [containers, setContainers] = useState<Container[]>([]);



    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContainers() {
            try {
                const response = await fetch(
                    'http://localhost:3000/docker/containers',
                );


                if (!response.ok) {
                    throw new Error('Failed to fetch containers');
                }


                const data = await response.json();




                setContainers(data);
            } catch (error) {
                console.error('Failed to fetch containers:', error);
            } finally {
                setLoading(false);
            }
        }





        fetchContainers();
    }, []);


    return (



        <section className="mt-6 rounded-xl border p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">
                    Docker Containers
                </h2>

                <p className="text-sm text-gray-500">




                    Container status and runtime information
                </p>
            </div>


            {loading ? (
                <p className="text-sm text-gray-500">

                    Loading containers...
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="pb-3">Container</th>
                                <th className="pb-3">Image</th>

                                <th className="pb-3">State</th>
                                <th className="pb-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                        {containers.map((container) => (

                            <tr

                                key={container.id}
                                className=" border-b last:border-0"
                            >
                                <td className="py-4 font-medium">
                                    {container.name}
                                </td>

                                <td className="py-4 text-gray-500">



                                    {container.image}
                                </td>


                                <td className="py-4">
                                    <span
                                        className={


                                            container.state === 'running'
                                                ? 'font-medium'
                                                : 'text-gray-500'
                                        }
                                    >
                                        {container.state}
                                    </span>
                                </td>




                                <td className="py-4 text-gray-500">
                                    {container.status}
                                </td>

                            </tr>
                        ))}







                        </tbody>
                    </table>
                </div>



            )}

        </section>
    );
}