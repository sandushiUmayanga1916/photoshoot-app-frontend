// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { Camera, Download, ImagePlus, Sun, Moon, Film, Baby, ChartPie, Shirt, HandMetal, Users, SunMoon } from 'lucide-react';

function App() {
  const [shootType, setShootType] = useState('person');
  const [formData, setFormData] = useState({
    type: 'person',
    location: '',
    style: '',
    mood: '',
    personGender: '',
    personAge: '',
    personEthnicity: '',
    personHairstyle: '',
    personClothing: '',
    productType: '',
    productColor: '',
    productMaterial: '',
    productBrand: '',
    numberOfItems: 1,
    additionalDetails: '',
    timeOfDay: ''
  });
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShootTypeChange = (type) => {
    setShootType(type);
    setFormData(prev => ({
      ...prev,
      type: type
    }));
  };

  const handleGeneratePhotoshoot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/generate-photoshoot', formData);
      setGeneratedImages(response.data.images);
    } catch (err) {
      setError('Failed to generate photoshoot. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `photoshoot_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white">
          <h1 className="text-4xl font-extrabold text-center flex items-center justify-center gap-4">
            <Camera className="w-12 h-12" />
            Professional Photoshoot AI Generator
            <ImagePlus className="w-12 h-12" />
          </h1>
        </div>

        {/* Shoot Type Selector with Better Visual Feedback */}
        <div className="flex justify-center p-6 bg-zinc-50">
          <div className="inline-flex rounded-lg shadow-md overflow-hidden">
            <button 
              className={`px-6 py-3 transition-all duration-300 flex items-center gap-2 ${
                shootType === 'person' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
              onClick={() => handleShootTypeChange('person')}
            >
              <Film className="w-5 h-5" />
              Person Photoshoot
            </button>
            <button 
              className={`px-6 py-3 transition-all duration-300 flex items-center gap-2 ${
                shootType === 'product' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
              onClick={() => handleShootTypeChange('product')}
            >
              <Camera className="w-5 h-5" />
              Product Photoshoot
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <form onSubmit={handleGeneratePhotoshoot} className="space-y-6">
            {/* Form layout remains similar, with enhanced Tailwind styling */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className=" text-zinc-700 font-semibold mb-2 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-500" /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={shootType === 'person' 
                    ? "Urban Street, Studio, Beach" 
                    : "White Studio, Marble Surface, Outdoor Setting"}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-zinc-700 font-semibold mb-2 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-indigo-500" /> Photography Style
                </label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                <option value="">Select Style</option>
                {shootType === 'person' ? (
                  <>
                    <option value="portrait">Portrait</option>
                    <option value="fashion">Fashion</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="editorial">Editorial</option>
                  </>
                ) : (
                  <>
                    <option value="product">Product Photography</option>
                    <option value="studio">Studio Lighting</option>
                    <option value="lifestyle">Lifestyle Placement</option>
                    <option value="minimalist">Minimalist</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Person-specific Inputs */}
          {shootType === 'person' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className="text-zinc-700 font-semibold mb-2 flex items-center gap-2">
                <Baby className="w-5 h-5 text-indigo-500" /> Gender</label>
                  <select
                    name="personGender"
                    value={formData.personGender}
                    onChange={handleInputChange}
                    className="select w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-Binary</option>
                  </select>
                </div>
                <div>
                <label className=" text-zinc-700 font-semibold mb-2 flex items-center gap-2">
                <ChartPie className="w-5 h-5 text-orange-500" />Age Range</label>
                  <select
                    name="personAge"
                    value={formData.personAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Age Range</option>
                    <option value="young-adult">18-30</option>
                    <option value="adult">31-45</option>
                    <option value="mature">46-60</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className=" text-zinc-700 font-semibold mb-2 flex items-center gap-2">
                <Shirt className="w-5 h-5 text-orange-500" />Clothing Style</label>
                  <input
                    type="text"
                    name="personClothing"
                    value={formData.personClothing}
                    onChange={handleInputChange}
                    placeholder="Casual, Formal, Bohemian"
                    className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                <label className="text-zinc-700 font-semibold mb-2 flex items-center gap-2">
                <HandMetal className="w-5 h-5 text-indigo-500" />Hairstyle</label>
                  <input
                    type="text"
                    name="personHairstyle"
                    value={formData.personHairstyle}
                    onChange={handleInputChange}
                    placeholder="Long Waves, Short Crop, Curly"
                    className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Product-specific Inputs */}
          {shootType === 'product' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Product Type</label>
                  <input
                    type="text"
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    placeholder="Watch, Perfume, Electronics"
                    className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Product Color</label>
                  <input
                    type="text"
                    name="productColor"
                    value={formData.productColor}
                    onChange={handleInputChange}
                    placeholder="Silver, Matte Black, Metallic"
                    className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Product Material</label>
                  <input
                    type="text"
                    name="productMaterial"
                    value={formData.productMaterial}
                    onChange={handleInputChange}
                    placeholder="Leather, Metal, Glass"
                    className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Brand/Style</label>
                  <input
                    type="text"
                    name="productBrand"
                    value={formData.productBrand}
                    onChange={handleInputChange}
                    placeholder="Luxury, Minimalist, Modern"
                    className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Shared Additional Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
            <label className="text-zinc-700 font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />Number of {shootType === 'person' ? 'People' : 'Items'}</label>
              <input
                type="number"
                name="numberOfItems"
                value={formData.numberOfItems}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="input w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
            <label className="text-zinc-700 font-semibold mb-2 flex items-center gap-2">
            <SunMoon className="w-5 h-5 text-indigo-500" />Lighting/Time of Day</label>
              <select
                name="timeOfDay"
                value={formData.timeOfDay}
                onChange={handleInputChange}
                className="select w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select Lighting</option>
                <option value="golden-hour">Golden Hour</option>
                <option value="soft-morning">Soft Morning Light</option>
                <option value="sunset">Sunset</option>
                <option value="dramatic-studio">Dramatic Studio Lighting</option>
              </select>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Additional Creative Details</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleInputChange}
              placeholder="Extra context or specific creative directions (optional)"
              className="textarea w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Generating Photoshoot...' : 'Create Professional Photoshoot'}
              <Camera className="w-6 h-6" />
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center gap-4 mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Image Display with Enhanced Gallery */}
          {generatedImages.length > 0 && (
            <div className="mt-10 bg-zinc-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-center mb-8 text-zinc-800 flex items-center justify-center gap-4">
                <ImagePlus className="w-10 h-10 text-purple-500" />
                Generated {shootType === 'person' ? 'Person' : 'Product'} Photoshoot
                <ImagePlus className="w-10 h-10 text-purple-500" />
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {generatedImages.map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <img 
                      src={imageUrl} 
                      alt={`Photoshoot ${index + 1}`} 
                      className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => handleDownloadImage(imageUrl)}
                        className="opacity-0 group-hover:opacity-100 bg-white text-purple-600 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:bg-purple-50"
                      >
                        <Download className="w-6 h-6" />
                        Download Image
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default App
