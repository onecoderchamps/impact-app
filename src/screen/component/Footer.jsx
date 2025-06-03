import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Youtube, Linkedin, Music2 } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white p-8 border-t shadow-sm mt-10">
            <div className="max-w-7xl mx-auto text-center md:text-left grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-700 justify-center">

                {/* Logo & Description */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold text-blue-600">Impact</h2>
                    <p className="mt-2">
                        Impact simplifies payments, taxes, and reporting for influencer marketing. Try{' '}
                        <span className="font-semibold text-blue-600">Impact</span> for free.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4 mt-4 text-xl text-gray-600">
                        <a href="#" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                        <a href="#" aria-label="TikTok"><Music2 className="w-5 h-5" /></a>
                        <a href="#" aria-label="YouTube"><Youtube className="w-5 h-5" /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row md:space-x-16">
                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-2">Resources</h3>
                        <ul className="space-y-1">
                            <li><Link to="#">Blog</Link></li>
                            <li><Link to="#">Help & Support</Link></li>
                            <li><Link to="#">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="mt-4 md:mt-0">
                        <h3 className="font-semibold mb-2">Company</h3>
                        <ul className="space-y-1">
                            <li><Link to="#">About Us</Link></li>
                            <li><Link to="#">Careers</Link></li>
                            <li><Link to="#">Terms of Service</Link></li>
                            <li><Link to="#">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="flex justify-center md:justify-start items-center space-x-2 mb-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:hello@Impact.id" className="text-blue-600">hello@impact.id</a>
                    </p>
                    <p className="flex justify-center md:justify-start items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <a href="https://wa.me/6285213554954" className="text-blue-600">+62 852 1355 4954</a>
                    </p>
                </div>

            </div>
        </footer>
    );
}
