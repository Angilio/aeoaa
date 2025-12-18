import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth }) {
    return (
        <GuestLayout>
            <Head title="Accueil" />
            <div>                   
                <div className="flex items-center justify-center">
                    <h1 className="text-dark-200 text-4xl">
                        Hello word!
                    </h1>
                </div>
            </div>
        </GuestLayout>
    );
}
