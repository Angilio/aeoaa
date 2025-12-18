import ApplicationLogo from '@/Components/ApplicationLogo';
import Navbar from '@/Components/Navbar';
// import Footer from '@/Components/Footer';

export default function GuestLayout({ children }) {
    return (
        <div>
            {/* NAVBAR FIXE */}
            <Navbar />

            {/* CONTENU AVEC MARGE POUR NE PAS PASSER SOUS LA NAVBAR */}
            <div className="pt-24 pb-16 flex flex-col items-center">
                <div>
                    <ApplicationLogo className="w-20 fill-current text-gray-500" />
                </div>

                <div className="">
                    {children}
                </div>
            </div>

            {/* FOOTER FIXE
            <Footer /> */}

        </div>
    );
}
