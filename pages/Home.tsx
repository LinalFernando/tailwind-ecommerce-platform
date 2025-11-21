
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ArrowRight, Leaf, ShieldCheck, Star, ChevronDown, Sprout, Droplets, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#e4edc2] via-white to-[#e8f0e0] overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[80vw] h-[80vw] rounded-full bg-[#dbe6cc] opacity-30 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[60vw] h-[60vw] rounded-full bg-[#eff5e6] opacity-50 blur-3xl z-0"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left pt-8 lg:pt-0">
              
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6 animate-slideUp">
                <span className="h-px w-12 bg-heritage-green hidden lg:block"></span>
                <span className="text-heritage-green font-bold tracking-[0.3em] uppercase text-sm md:text-base">10 Years of Trust</span>
                <span className="h-px w-12 bg-heritage-green hidden lg:block"></span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif font-bold leading-[0.95] text-gray-900 mb-8 tracking-tight animate-slideUp delay-100">
                Nurturing <br className="hidden lg:block" />
               
                   Nations
                
                <br/> With <span className="relative inline-block text-heritage-green">  Care </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light animate-slideUp delay-200">
                Experience the purest organic products from the lush landscapes of Sri Lanka. We bring nature's finest superfoods directly to your home in the UAE.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slideUp delay-300">
                <Link to="/store" className="w-full sm:w-auto px-10 py-4 bg-heritage-green text-white rounded-full font-bold text-lg shadow-lg hover:shadow-heritage-green/30 hover:bg-[#015529] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link to="/assistant" className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-heritage-green text-heritage-green rounded-full font-bold text-lg hover:bg-heritage-light transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                   <Sparkles size={18}/> Ask AI Assistant
                </Link>
              </div>

              {/* Stats / Trust */}
              <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 sm:gap-12 animate-fadeIn delay-500 border-t border-gray-200/50 pt-8">
                <div className="text-center lg:text-left">
                   <p className="text-3xl font-serif font-bold text-heritage-green">10k+</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wider">Happy Customers</p>
                </div>
                <div className="w-px h-10 bg-gray-300"></div>
                <div className="text-center lg:text-left">
                   <p className="text-3xl font-serif font-bold text-heritage-green">100%</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wider">Organic Certified</p>
                </div>
                <div className="w-px h-10 bg-gray-300"></div>
                 <div className="text-center lg:text-left">
                   <p className="text-3xl font-serif font-bold text-heritage-green">UAE</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wider">Fast Delivery</p>
                </div>
              </div>
            </div>

            {/* Right Image Composition */}
            <div className="lg:col-span-6 relative h-full flex items-center justify-center animate-slideRight delay-300 perspective-1000">
               {/* Abstract Shapes behind */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-contain bg-no-repeat bg-center opacity-10 z-0" style={{ backgroundImage: 'url("https://heritageorganic.ae/wp-content/uploads/2022/01/logo.png")' }}></div>
               
               <div className="relative z-10 w-full max-w-lg lg:max-w-full mx-auto">
                 <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 ease-out-expo group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <img 
                      src="https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/480711422_1045448434277593_8271696885729571569_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeHkgDM7kczDu8Kk3MXhHwrdk-N_o_kfTk-T43-j-R9OT8OhxU-NfVs4iUe9n5bKeHrF6d_f2SKJ53Hve2O40HJa&_nc_ohc=jx8xty42jp8Q7kNvwFu2hTX&_nc_oc=AdlKR7JeIEVkOY5BoakFbrvFxzEsDK5qrlK6851-F8L-Hn2WHiLGvWJIY-IqPHZP55Y&_nc_zt=23&_nc_ht=scontent-sin6-2.xx&_nc_gid=EL636lY7nlYTV00OeAKWOQ&oh=00_AfhNBCN-b4Qxnrp_d_eMXtuatQiGj_3-Sp4DQSLJEYlG4w&oe=69266CC9"
                      alt="Premium Organic Products" 
                      className="w-full h-auto object-cover scale-110 group-hover:scale-110 transition-transform duration-700"
                    />
                 </div>

                 {/* Decorative floaters */}
                 <div className="absolute -top-6 -right-6 w-24 h-24 bg-heritage-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-float z-30">
                    <div className="text-center leading-tight text-sm">
                      <span className="text-xl block">100%</span>
                      Natural
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-heritage-green/50 hidden lg:block">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* FEATURES SECTION (Clean & Minimal) */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="font-bold tracking-wider uppercase text-sm block mb-3">Our Promise</span>
             <h2 className="text-4xl lg:text-5xl font-serif font-bold text-heritage-green mb-6">Why Choose Heritage?</h2>
             <p className="text-gray-600 text-lg">We believe in transparency and purity. Every product is a testament to the rich soil of Sri Lanka and our commitment to your health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Sprout size={40} />,
                title: "Sustainably Sourced",
                desc: "Directly from certified organic farms that practice regenerative agriculture."
              },
              {
                icon: <ShieldCheck size={40} />,
                title: "Lab Tested Quality",
                desc: "Rigorous testing ensures 0% chemicals, pesticides, or artificial additives."
              },
              {
                icon: <Droplets size={40} />,
                title: "Pure & Potent",
                desc: "Minimal processing retains maximum nutrients, flavor, and health benefits."
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-transparent hover:border-gray-100 transition-all duration-500 text-center">
                <div className="w-20 h-20 mx-auto bg-heritage-light rounded-2xl flex items-center justify-center text-heritage-green mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS CAROUSEL PREVIEW */}
      <section className="py-24 bg-[#f8faf6] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#016933 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="max-w-2xl">
               <h2 className="text-4xl lg:text-5xl font-serif font-bold text-heritage-green mb-4">Curated for You</h2>
               <p className="text-gray-600 text-lg">Our most loved products, handpicked for their exceptional quality and benefits.</p>
             </div>
             <Link to="/store" className="hidden md:inline-flex items-center font-bold text-heritage-green hover:text-heritage-accent transition-colors text-lg group">
               View Full Collection <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product, index) => (
              <Link 
                key={product.id} 
                to={`/store?product=${product.id}`} 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full border border-gray-100"
              >
                <div className="relative aspect-square p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                   <img 
                     src={product.image} 
                     alt={product.name} 
                     className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-2xl transition-all duration-700 ease-in-out"
                   />
                   {product.badges[0] && (
                     <span className="absolute top-6 left-6 bg-white/80 backdrop-blur text-heritage-green text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                       {product.badges[0]}
                     </span>
                   )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-heritage-accent uppercase tracking-wider">{product.category}</p>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <Star size={14} fill="currentColor" />
                      <span className="font-bold text-gray-900">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-heritage-green transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 mb-6 text-sm flex-grow">{product.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-2xl font-bold text-heritage-green">${product.price.toFixed(2)}</span>
                    <span className="w-12 h-12 rounded-full bg-heritage-green text-white flex items-center justify-center shadow-lg group-hover:bg-[#015529] transition-colors transform group-hover:scale-110">
                       <ArrowRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/store" className="inline-block px-8 py-4 bg-heritage-green text-white font-bold rounded-full shadow-lg hover:bg-[#015529] transition-colors">
              Browse Shop
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="py-20 bg-heritage-green relative overflow-hidden">
         <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-r from-white/10 to-transparent rotate-12 blur-3xl pointer-events-none"></div>

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">Join the Organic Movement</h2>
            <p className="text-green-50 text-lg mb-10 max-w-2xl mx-auto">Subscribe for exclusive offers, health tips, and new product arrivals.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-green-100 focus:bg-white focus:text-gray-900 focus:outline-none transition-all"
               />
               <button className="px-8 py-4 bg-heritage-accent text-heritage-green font-bold rounded-full hover:bg-white hover:shadow-xl transition-all duration-300">
                 Subscribe
               </button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default Home;
