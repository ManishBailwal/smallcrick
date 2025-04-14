'use client';
import Image from 'next/image';

const Gallary = () => {
  return (
    <section className="px-4 py-12 bg-[#00141b] text-white">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#F77F00]">Moments from the Game</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First column: Two vertically stacked images */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/gallery1.jpg"
                alt="Cricket batting closeup"
                width={400}
                height={300}
                className="w-full h-auto object-cover transform transition duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/gallery5.webp"
                alt="Cricket moment"
                width={400}
                height={300}
                className="w-full h-auto object-cover transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Second column: Grid of 3 images, layout unchanged */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 md:col-span-2">
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/gallery2.jpg"
                alt="User celebrating"
                width={400}
                height={300}
                className="w-full h-auto object-cover transform transition duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/gallery3.jpg"
                alt="Friends checking scores"
                width={400}
                height={300}
                className="w-full h-auto object-cover transform transition duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/gallery4.jpg"
                alt="Empty stadium"
                width={800}
                height={300}
                className="w-full h-auto object-cover transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallary;
