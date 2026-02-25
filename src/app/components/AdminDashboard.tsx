import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Mail, Users, KeyRound, Loader2 } from 'lucide-react';

export function AdminDashboard() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'registrations' | 'contacts'>('registrations');

    const isConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

    useEffect(() => {
        if (!isConfigured) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const [regResponse, contactResponse] = await Promise.all([
                    supabase.from('registrations').select('*').order('created_at', { ascending: false }),
                    supabase.from('contacts').select('*').order('created_at', { ascending: false })
                ]);

                if (regResponse.error) throw regResponse.error;
                if (contactResponse.error) throw contactResponse.error;

                setRegistrations(regResponse.data || []);
                setContacts(contactResponse.data || []);
            } catch (err: any) {
                console.error('Error fetching admin data:', err);
                setError(err.message || 'Failed to fetch data. Make sure your RLS policies allow reading.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isConfigured]);

    if (!isConfigured) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <KeyRound className="size-16 text-amber-500 mx-auto mb-6" />
                <h1 className="text-3xl text-slate-50 mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>Supabase Not Configured</h1>
                <p className="text-slate-300 max-w-xl mx-auto">
                    You need to add <code className="bg-slate-800 px-2 py-1 rounded">VITE_SUPABASE_URL</code> and <code className="bg-slate-800 px-2 py-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your environment variables (in Cloudflare Pages settings or a local .env file) to view the admin dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl text-slate-50 mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>Admin Dashboard</h1>
                <p className="text-slate-400">Review your website form submissions.</p>
            </div>

            <div className="flex space-x-4 mb-8">
                <button
                    onClick={() => setActiveTab('registrations')}
                    className={`px-6 py-3 rounded-t-lg transition-colors flex items-center font-medium ${activeTab === 'registrations' ? 'bg-amber-600/20 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                >
                    <Users className="size-5 mr-2" />
                    Registrations ({registrations.length})
                </button>
                <button
                    onClick={() => setActiveTab('contacts')}
                    className={`px-6 py-3 rounded-t-lg transition-colors flex items-center font-medium ${activeTab === 'contacts' ? 'bg-amber-600/20 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                >
                    <Mail className="size-5 mr-2" />
                    Contact Messages ({contacts.length})
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <Loader2 className="size-8 text-amber-500 animate-spin" />
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-lg text-center">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-lg overflow-hidden">
                    {activeTab === 'registrations' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800/80 border-b border-slate-700 text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Company</th>
                                        <th className="px-6 py-4 font-medium">Contact</th>
                                        <th className="px-6 py-4 font-medium">Email</th>
                                        <th className="px-6 py-4 font-medium">Asset Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No registrations found.</td>
                                        </tr>
                                    ) : (
                                        registrations.map((reg) => (
                                            <tr key={reg.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4 text-slate-400 text-sm whitespace-nowrap">{new Date(reg.created_at).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-slate-100 font-medium">{reg.company_name}</td>
                                                <td className="px-6 py-4 text-slate-300">{reg.contact_name}<br /><span className="text-sm text-slate-500">{reg.title}</span></td>
                                                <td className="px-6 py-4 text-amber-400/90">{reg.email}</td>
                                                <td className="px-6 py-4 text-slate-300">{reg.asset_type}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'contacts' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800/80 border-b border-slate-700 text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Email</th>
                                        <th className="px-6 py-4 font-medium">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {contacts.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No contact messages found.</td>
                                        </tr>
                                    ) : (
                                        contacts.map((msg) => (
                                            <tr key={msg.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4 text-slate-400 text-sm whitespace-nowrap align-top">{new Date(msg.created_at).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-slate-100 font-medium align-top">{msg.name}</td>
                                                <td className="px-6 py-4 text-amber-400/90 align-top">{msg.email}</td>
                                                <td className="px-6 py-4 text-slate-300 max-w-md"><p className="whitespace-pre-wrap">{msg.message}</p></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
