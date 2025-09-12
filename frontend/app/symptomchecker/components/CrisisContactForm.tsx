import { useState } from 'react';
import type { CrisisFormData } from '../page';

export const CrisisContactForm = ({ empatheticMessage, onFormSubmit, onCancel }: { empatheticMessage: string; onFormSubmit: (data: CrisisFormData) => void; onCancel: () => void; }) => {
    const [formData, setFormData] = useState<CrisisFormData>({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFormSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Support is Available</h2>
                <p className="text-gray-700 mb-6">{empatheticMessage}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Name (Optional)</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            placeholder="Enter your name"
                            title="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Email (Optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            placeholder="Enter your email"
                            title="Contact Email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message for the Counselor (Optional)</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            rows={3}
                            placeholder="Type your message for the counselor here"
                            title="Message for the Counselor"
                        ></textarea>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md">Connect Me with Help</button>
                    </div>
                </form>
            </div>
        </div>
    );
};