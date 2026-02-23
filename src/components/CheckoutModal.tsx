import React, { useState } from 'react';
import { X, Lock, CreditCard, ShieldCheck, CheckCircle2, Loader2, Building, Smartphone } from 'lucide-react';
import { useSound } from '../lib/soundUtils';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    price: string;
    billingCycle: 'monthly' | 'yearly';
    onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, planName, price, billingCycle, onSuccess }: CheckoutModalProps) {
    const { playClick, playSuccess } = useSound();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setIsProcessing(true);

        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            playSuccess();

            // Auto close and trigger success after animation
            setTimeout(() => {
                onSuccess();
                setTimeout(() => {
                    setIsSuccess(false); // Reset state quietly
                }, 500);
            }, 2000);
        }, 2500);
    };

    const currentPriceNum = parseInt(price.replace(/\D/g, ''), 10);
    const tax = Math.round(currentPriceNum * 0.18); // 18% GST (standard in India)
    const total = currentPriceNum + tax;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-scale-in">

                {/* Close Button */}
                {!isProcessing && !isSuccess && (
                    <button
                        onClick={() => { playClick(); onClose(); }}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                )}

                {/* Left Side: Order Summary */}
                <div className="w-full md:w-1/3 bg-gray-50 p-8 border-r border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{planName}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{billingCycle} billing</p>
                                </div>
                                <span className="font-bold text-gray-900">{price}</span>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">{price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%)</span>
                                <span className="font-medium text-gray-900">{tax} Rs</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total Due</span>
                            <span className="text-2xl font-black text-blue-600">{total} Rs</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            Secure 256-bit encryption
                        </div>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="w-full md:w-2/3 p-8">

                    {isSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-12 h-12 text-green-600 animate-scale-in" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                            <p className="text-gray-500">Welcome to StartEarn Premium. Redirecting you...</p>
                        </div>
                    ) : isProcessing ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
                            <p className="text-gray-500">Please do not close this window or go back.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

                            {/* Payment Methods */}
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                <button
                                    type="button"
                                    onClick={() => { playClick(); setPaymentMethod('card'); }}
                                    className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <CreditCard className="w-6 h-6 mb-2" />
                                    <span className="text-sm cursor-pointer">Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { playClick(); setPaymentMethod('upi'); }}
                                    className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <Smartphone className="w-6 h-6 mb-2" />
                                    <span className="text-sm cursor-pointer">UPI</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { playClick(); setPaymentMethod('netbanking'); }}
                                    className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <Building className="w-6 h-6 mb-2" />
                                    <span className="text-sm cursor-pointer">Net Banking</span>
                                </button>
                            </div>

                            <form onSubmit={handlePay} className="space-y-6">
                                {paymentMethod === 'card' && (
                                    <div className="space-y-5 animate-fade-in">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="0000 0000 0000 0000"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-mono"
                                                />
                                                <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-mono"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVC</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="123"
                                                        maxLength={4}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-mono"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cardholder Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div className="space-y-5 animate-fade-in py-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Enter UPI ID</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="username@okbank"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                                                />
                                                <Smartphone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">A payment request will be sent to this UPI ID.</p>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'netbanking' && (
                                    <div className="space-y-5 animate-fade-in py-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Bank</label>
                                            <select required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                                                <option value="" disabled selected>Choose your bank</option>
                                                <option value="sbi">State Bank of India</option>
                                                <option value="hdfc">HDFC Bank</option>
                                                <option value="icici">ICICI Bank</option>
                                                <option value="axis">Axis Bank</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                                    >
                                        <Lock className="w-5 h-5" />
                                        Pay {total} Rs
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
