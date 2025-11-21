
import React, { useState } from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard, CheckCircle, Lock, ChevronLeft, ShieldCheck, Truck, MapPin, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CartProps {
    cart: CartItem[];
    updateQuantity: (id: string, delta: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 15;
    const total = subtotal + shipping;
    const navigate = useNavigate();

    // Checkout State
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');

    // Form State
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: 'shipping' | 'card') => {
        const { name, value } = e.target;
        if (section === 'shipping') {
            setShippingDetails(prev => ({ ...prev, [name]: value }));
        } else {
            // Basic formatting for card number
            if (name === 'number') {
                const formatted = value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
                setCardDetails(prev => ({ ...prev, [name]: formatted }));
            } else if (name === 'expiry') {
                let formatted = value.replace(/\D/g, '');
                if (formatted.length >= 2) {
                    formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
                }
                setCardDetails(prev => ({ ...prev, [name]: formatted }));
            } else {
                setCardDetails(prev => ({ ...prev, [name]: value }));
            }
        }
    };

    const proceedToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStep('payment');
    };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStep('processing');

        // Simulate API call
        setTimeout(() => {
            setCheckoutStep('success');
            clearCart();
        }, 2500);
    };

    const closeCheckout = () => {
        setIsCheckoutOpen(false);
        setCheckoutStep('shipping'); // Reset
        if (checkoutStep === 'success') {
            navigate('/store');
        }
    };

    // Reusable professional input styles - Crisp White
    const inputClasses = "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-heritage-green focus:ring-1 focus:ring-heritage-green outline-none transition-all shadow-sm text-sm font-medium";
    const labelClasses = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5";

    if (cart.length === 0 && !isCheckoutOpen && checkoutStep !== 'success') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="text-center max-w-md opacity-0 animate-popIn">
                    <div className="bg-gray-50 p-8 rounded-full inline-block mb-6 shadow-sm">
                        <ShoppingBag size={48} className="text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven't added any natural goodies yet.</p>
                    <Link to="/store" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-bold rounded-full text-white bg-heritage-green hover:bg-heritage-green/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-heritage-cream/50 py-12 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {cart.length > 0 && (
                    <>
                        <div className="flex items-center gap-3 mb-8 opacity-0 animate-slideUp">
                            <ShoppingBag className="text-heritage-green" size={32} />
                            <h1 className="text-3xl font-serif font-bold text-gray-900">Shopping Cart</h1>
                            <span className="bg-gray-100 text-gray-600 text-sm font-bold px-3 py-1 rounded-full">{cart.length} Items</span>
                        </div>

                        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                            <div className="lg:col-span-8">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden opacity-0 animate-slideUp delay-100">
                                    <ul className="divide-y divide-gray-100">
                                        {cart.map((item, index) => (
                                            <li key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-24 h-24 rounded-xl object-center object-contain border border-gray-100 bg-white p-2"
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-xs font-bold text-heritage-accent uppercase mb-1">{item.category}</p>
                                                            <h3 className="text-lg font-serif font-bold text-gray-900">
                                                                <Link to={`/store?product=${item.id}`} className="hover:text-heritage-green transition-colors">
                                                                    {item.name}
                                                                </Link>
                                                            </h3>
                                                            <p className="text-sm text-gray-500 mt-1">{item.details.weight}</p>
                                                        </div>
                                                        <p className="text-lg font-bold text-heritage-green">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="p-2 hover:bg-gray-50 text-gray-600 transition-colors rounded-l-lg disabled:opacity-50"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="px-4 py-1 text-sm font-bold text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="p-2 hover:bg-gray-50 text-gray-600 transition-colors rounded-r-lg"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                                                        >
                                                            <Trash2 size={16} /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-4 mt-8 lg:mt-0 opacity-0 animate-slideUp delay-200">
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 sticky top-28">
                                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <span>Shipping</span>
                                                <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Standard</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg flex items-center gap-2">
                                                <Truck size={14} className="text-blue-500" />
                                                <span>Add ${(50 - subtotal).toFixed(2)} more for free shipping</span>
                                            </div>
                                        )}

                                        <div className="border-t border-dashed border-gray-200 my-4"></div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-serif font-bold text-heritage-green">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsCheckoutOpen(true)}
                                        className="w-full mt-8 bg-heritage-green text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-900 transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1"
                                    >
                                        Proceed to Checkout <ArrowRight size={20} />
                                    </button>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <Lock size={12} />
                                        <span>Guaranteed Safe & Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* CHECKOUT MODAL */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fadeIn" onClick={checkoutStep === 'success' ? closeCheckout : undefined}></div>

                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex overflow-hidden animate-slideUp">

                        {/* Left Panel: Form */}
                        <div className="w-full lg:w-2/3 flex flex-col h-full">
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="bg-heritage-light p-2 rounded-lg">
                                        <ShieldCheck className="text-heritage-green" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
                                        <p className="text-xs text-gray-500">Heritage Nature Organics</p>
                                    </div>
                                </div>

                                {checkoutStep !== 'success' && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className={`font-bold ${checkoutStep === 'shipping' ? 'text-heritage-green' : 'text-gray-400'}`}>Shipping</span>
                                        <span className="text-gray-300">/</span>
                                        <span className={`font-bold ${checkoutStep === 'payment' ? 'text-heritage-green' : 'text-gray-400'}`}>Payment</span>
                                    </div>
                                )}

                                <button onClick={closeCheckout} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
                                {checkoutStep === 'shipping' && (
                                    <form id="shipping-form" onSubmit={proceedToPayment} className="max-w-xl mx-auto space-y-6 animate-fadeIn">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-heritage-green text-white flex items-center justify-center font-bold text-sm">1</div>
                                            <h3 className="text-lg font-serif font-bold text-gray-900">Shipping Information</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1">
                                                <label className={labelClasses}>First Name</label>
                                                <input required type="text" name="fullName" value={shippingDetails.fullName} onChange={(e) => handleInputChange(e, 'shipping')} className={inputClasses} placeholder="Jane Doe" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className={labelClasses}>Email Address</label>
                                                <input required type="email" name="email" value={shippingDetails.email} onChange={(e) => handleInputChange(e, 'shipping')} className={inputClasses} placeholder="jane@example.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className={labelClasses}>Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input required type="text" name="address" value={shippingDetails.address} onChange={(e) => handleInputChange(e, 'shipping')} className={`${inputClasses} pl-10`} placeholder="123 Organic Lane" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="space-y-1">
                                                <label className={labelClasses}>City</label>
                                                <input required type="text" name="city" value={shippingDetails.city} onChange={(e) => handleInputChange(e, 'shipping')} className={inputClasses} placeholder="Dubai" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className={labelClasses}>ZIP Code</label>
                                                <input required type="text" name="zip" value={shippingDetails.zip} onChange={(e) => handleInputChange(e, 'shipping')} className={inputClasses} placeholder="00000" />
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
                                            <Truck className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h4 className="text-sm font-bold text-blue-900">Standard Delivery</h4>
                                                <p className="text-xs text-blue-700 mt-1">Delivery within 2-3 business days.</p>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {checkoutStep === 'payment' && (
                                    <form id="payment-form" onSubmit={handlePayment} className="max-w-xl mx-auto space-y-8 animate-fadeIn">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-heritage-green text-white flex items-center justify-center font-bold text-sm">2</div>
                                            <h3 className="text-lg font-serif font-bold text-gray-900">Payment Method</h3>
                                        </div>

                                        {/* Credit Card Visual */}
                                        <div className="relative w-full h-56 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden text-white p-8 transition-transform hover:scale-[1.02] duration-500">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-heritage-green/30 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                                            <div className="relative z-10 flex flex-col justify-between h-full">
                                                <div className="flex justify-between items-start">
                                                    <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm border border-white/10"></div>
                                                    <span className="font-serif font-bold tracking-wider">Heritage Pay</span>
                                                </div>
                                                <div className="font-mono text-2xl tracking-widest drop-shadow-md">
                                                    {cardDetails.number || '•••• •••• •••• ••••'}
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Card Holder</p>
                                                        <p className="font-bold tracking-wider text-sm uppercase truncate max-w-[200px]">
                                                            {cardDetails.name || 'YOUR NAME'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Expires</p>
                                                        <p className="font-mono font-bold">{cardDetails.expiry || 'MM/YY'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <div className="space-y-1">
                                                <label className={labelClasses}>Card Number</label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                                                    <input required type="text" name="number" value={cardDetails.number} onChange={(e) => handleInputChange(e, 'card')} maxLength={19} className={`${inputClasses} pl-10 font-mono`} placeholder="0000 0000 0000 0000" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-5">
                                                <div className="space-y-1">
                                                    <label className={labelClasses}>Expiry Date</label>
                                                    <input required type="text" name="expiry" value={cardDetails.expiry} onChange={(e) => handleInputChange(e, 'card')} maxLength={5} className={inputClasses} placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className={labelClasses}>CVC / CVV</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                                                        <input required type="password" name="cvc" value={cardDetails.cvc} onChange={(e) => handleInputChange(e, 'card')} maxLength={3} className={`${inputClasses} pl-10`} placeholder="123" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className={labelClasses}>Cardholder Name</label>
                                                <input required type="text" name="name" value={cardDetails.name} onChange={(e) => handleInputChange(e, 'card')} className={inputClasses} placeholder="NAME ON CARD" />
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {checkoutStep === 'processing' && (
                                    <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
                                        <div className="relative w-24 h-24 mb-8">
                                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-heritage-green rounded-full border-t-transparent animate-spin"></div>
                                            <ShieldCheck className="absolute inset-0 m-auto text-heritage-green" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-gray-900">Processing Secure Payment</h3>
                                        <p className="text-gray-500 mt-2">Please wait while we confirm your transaction...</p>
                                    </div>
                                )}

                                {checkoutStep === 'success' && (
                                    <div className="flex flex-col items-center justify-center h-full text-center animate-popIn">
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-sm">
                                            <CheckCircle size={48} strokeWidth={3} />
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Payment Successful!</h2>
                                        <p className="text-gray-500 mb-8 max-w-xs">Your order #HNO-{Math.floor(10000 + Math.random() * 90000)} has been confirmed and will be shipped shortly.</p>
                                        <button onClick={() => navigate('/store')} className="bg-heritage-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-900 transition-colors shadow-lg">
                                            Continue Shopping
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            {checkoutStep !== 'success' && checkoutStep !== 'processing' && (
                                <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between sticky bottom-0 z-10">
                                    {checkoutStep === 'payment' ? (
                                        <button onClick={() => setCheckoutStep('shipping')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50">
                                            <ChevronLeft size={18} /> Back to Shipping
                                        </button>
                                    ) : (
                                        <button onClick={closeCheckout} className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2">
                                            Cancel
                                        </button>
                                    )}

                                    <button
                                        onClick={checkoutStep === 'shipping' ? proceedToPayment : handlePayment}
                                        className="bg-heritage-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-900 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                    >
                                        {checkoutStep === 'shipping' ? (
                                            <>Continue to Payment <ArrowRight size={18} /></>
                                        ) : (
                                            <>Pay Securely ${total.toFixed(2)}</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Panel: Summary (Desktop Only) */}
                        <div className="hidden lg:block w-1/3 bg-gray-50 border-l border-gray-200 p-8 overflow-y-auto">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Review</h3>
                            <div className="space-y-4 mb-8">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 p-1 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-6 space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200 mt-4">
                                    <span>Total</span>
                                    <span className="text-heritage-green">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Lock className="text-heritage-green mt-1" size={16} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">SSL Secured Payment</p>
                                        <p className="text-xs text-gray-500 mt-1">Your personal and payment information is securely transmitted.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
