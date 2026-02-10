import PresidentSidebar from '@/Components/Sidebars/PresidentSidebar';
// import AncienPresidentSidebar from '@/Components/Sidebars/AncienPresidentSidebar';
// import TresorierSidebar from '@/Components/Sidebars/TresorierSidebar';
// import SecretaireSidebar from '@/Components/Sidebars/SecretaireSidebar';
import CommissionLogementSidebar from '@/Components/Sidebars/CommissionLogementSidebar';
// import MembreSidebar from '@/Components/Sidebars/MembreSidebar';
// import NoviceSidebar from '@/Components/Sidebars/NoviceSidebar';

export const roleSidebarMap = {
    'Président': PresidentSidebar,
    // 'Ancien président': AncienPresidentSidebar,
    // 'Trésorier(ère)': TresorierSidebar,
    // 'Secrétaire': SecretaireSidebar,
    'Commission de logement': CommissionLogementSidebar,
    // 'Membres': MembreSidebar,
    // 'Novices': NoviceSidebar,
};
