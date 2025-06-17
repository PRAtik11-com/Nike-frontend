import React, { useState, useEffect } from 'react';

const ShopByIconsSlider = () => {
    const shopByIconsData = [
    {
      "title": "Vomero 18",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_435,c_limit/0ce83fe0-a838-4a6d-88c0-b038b1f3adbd/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/zoom-vomero-running-shoes-37v7jz7gee1zy7ok"
    },
    {
      "title": "V2K",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/9a1898f3-e10d-4df8-b2cf-e2b0735f7742/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/nike-v2k-shoes-3picezy7ok"
    },
    {
      "title": "Pegasus 41",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/c6ce0b87-cc23-4113-9d19-48248900eb0c/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/pegasus-shoes-8nexhzy7ok"
    },
    {
      "title": "Zoom Vomero Lifestyle",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/c05dfab5-2d0e-48e3-8ca0-f04c21ccee2c/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/zoom-vomero-lifestyle-shoes-13jrmz7gee1zy7ok"
    },
    {
      "title": "Metcon",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/1892aab6-5b81-422f-b7e5-d5072294a299/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/metcon-shoes-3yxqszy7ok"
    },
    {
      "title": "Blazer",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/2ea8fe0a-b92c-4eb0-8ae5-b80ffc95a7d2/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/blazer-shoes-9gw3azy7ok"
    },
    {
      "title": "Dunk",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/b9c593b6-f789-4459-abb3-4708eb84d047/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/dunk-shoes-90aohzy7ok"
    },
    {
      "title": "Cortez",
      "image": "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/f520c30b-5385-4f77-bdc3-40d4878d0d55/nike-just-do-it.png",
      "link": "https://www.nike.com/in/w/cortez-shoes-byfxzy7ok"
    }
  ];

  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

 
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); 
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); 
      } else {
        setItemsPerPage(3); 
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex(prev =>
        prev >= shopByIconsData.length - itemsPerPage ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(iconInterval);
  }, [itemsPerPage]);

  const goToPrevIcon = () => {
    setCurrentIconIndex(prev =>
      prev === 0 ? shopByIconsData.length - itemsPerPage : prev - 1
    );
  };

  const goToNextIcon = () => {
    setCurrentIconIndex(prev =>
      prev >= shopByIconsData.length - itemsPerPage ? 0 : prev + 1
    );
  };

  const visibleItems = shopByIconsData.slice(
    currentIconIndex,
    currentIconIndex + itemsPerPage
  );

  if (visibleItems.length < itemsPerPage) {
    visibleItems.push(
      ...shopByIconsData.slice(0, itemsPerPage - visibleItems.length)
    );
  }

  return (
    <div className="w-full py-10 px-4 sm:px-6 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Shop by Icons
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex justify-center gap-4">
              {visibleItems.map((item, index) => (
                <div
                  key={`${currentIconIndex}-${index}`}
                  className="w-full sm:w-1/2 lg:w-1/3 max-w-xs flex-shrink-0"
                >
                  <a href="/productListpage" className="block">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-64 w-full object-contain mb-2 sm:mb-4"
                    />
                    <p className="text-center font-medium text-sm sm:text-base">
                      {item.title}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {shopByIconsData.length > itemsPerPage && (
            <>
              <button
                onClick={goToPrevIcon}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
                aria-label="Previous"
              >
                &lt;
              </button>
              <button
                onClick={goToNextIcon}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
                aria-label="Next"
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopByIconsSlider;
