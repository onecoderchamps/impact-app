import { useEffect, useState } from "react";
import { getData, postData } from "../../../../api/service";

function EditAccountModal({ onClose }) {
  const categoryOptions = [
    "Fashion", "Beauty", "Lifestyle", "Travel", "Food",
    "Health", "Fitness", "Parenting", "Technology", "Gaming",
    "Music", "Education", "Finance", "Automotive", "Pets",
    "Photography", "Film", "Comedy", "Professional", "Books"
  ];

  const [formData, setFormData] = useState({
    image: "",
    categories: [],
    youtube: "",
    tiktok: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    bio: "",
    fullName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getData("Scraper");
      if (res?.user) {
        setFormData({
          image: res.user.image || "",
          categories: res.user.categories ? res.user.categories.split(",").map(cat => cat.trim()) : [],
          youtube: res.user.youtube || "",
          tiktok: res.user.tikTok || "",
          instagram: res.user.instagram || "",
          facebook: res.user.facebook || "",
          linkedin: res.user.linkedin || "",
          bio: res.user.bio || "",
          fullName: res.user.fullName || "",
        });
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => {
      const alreadySelected = prev.categories.includes(category);
      const updated = alreadySelected
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category];
      return { ...prev, categories: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await postData("auth/UpdateProfileSosmed", {
        ...formData,
        categories: formData.categories.join(", "),
      });
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Social Media Information</h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Biografi</label>
              <textarea
                name="bio"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Image Profile URL</label>
              <input
                type="text"
                name="image"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Channel YouTube</label>
              <input
                type="text"
                name="youtube"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.youtube}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama TikTok</label>
              <input
                type="text"
                name="tiktok"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.tiktok}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Instagram</label>
              <input
                type="text"
                name="instagram"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Facebook</label>
              <input
                type="text"
                name="facebook"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">URL LinkedIn Profile</label>
              <input
                type="text"
                name="linkedin"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Kategori Influencer</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categoryOptions.map((cat) => (
                <label key={cat} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="form-checkbox"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAccountModal;