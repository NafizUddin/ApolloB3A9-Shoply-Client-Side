const Banner = () => {
  return (
    <div className="relative flex items-center justify-center lg:h-[500px]">
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center px-6 md:px-12">
        {/* Text Section */}
        <div className="flex-1">
          <div className="text-primary font-medium text-sm mb-2 text-center lg:text-left">
            ★ BEST FOR YOUR CATEGORIES ★
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Get <span className="text-primary">20% Off</span> Women Cloth
            Collections
          </h1>
          <p className="text-white text-lg mb-6">
            Enjoy 20% off on our entire Women&apos;s Clothing Collection!
            Discover stylish outfits for every occasion and save on your
            favorite pieces.
          </p>
          <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
            Shop now
          </button>
        </div>

        {/* Image Section */}
        <div className="relative flex-1">
          <div className="absolute right-1/2 -top-[260px] lg:left-0 lg:top-0">
            <img
              src="https://i.postimg.cc/3wxFSz6R/image.png"
              alt="Women Clothing"
              className="lg:h-[500px] rotate-90 lg:rotate-0 lg:w-auto"
            />
          </div>
          {/* Unique Shape */}
          <img
            src="https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Women Clothing"
            className="w-full object-cover object-bottom rounded-lg h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
