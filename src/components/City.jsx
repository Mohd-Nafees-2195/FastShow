import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const City=({ isOpen, onCitySelect })=>{


    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:8080/cities') // replace with your API endpoint
        .then((res) => res.json())
        .then((data) => {
          setCities(data.cities);
          console.log(data.cities);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen]);

  const handleSelect = () => {
    if (selectedCity) {
     console.log(selectedCity+' second')
      onCitySelect(selectedCity);
    //   isOpen(selectedCity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Select a City</h2>

              {loading ? (
                <p className="text-gray-600 animate-pulse">Loading cities...</p>
              ) : (
                <>
                  <select
                   value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                   <option value="">-- Choose a city --</option>
                    {cities.map((city) => (
                     <option key={city.id} value={city.id} className="bg-white text-gray-800">
                     {city.name}
                    </option>
                    ))}
                 </select>


                  <button
                    onClick={handleSelect}
                    disabled={!selectedCity}
                    className={`mt-4 w-full py-2 rounded text-white font-medium ${
                      selectedCity
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default City