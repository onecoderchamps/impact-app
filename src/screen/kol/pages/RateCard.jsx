import { useEffect, useState } from "react";
import DraggableCard from "./ratecard/DraggableCard";
import SocialMediaModal from "./ratecard/SocialMediaModal";
import BioModal from "./ratecard/BioModal";
import TopContentModal from "./ratecard/TopContentModal";
import RateCardModal from "./ratecard/RateCardModal";
import { getData,postData } from "../../../api/service";
import EditAccountModal from "./ratecard/EditModa";

const initialItems = [
  { id: "social", title: "Social Media Accounts" },
  { id: "bio", title: "Bio" },
  { id: "rate", title: "Rate Card (IDR)" },
  { id: "top", title: "Top Performing Content" },
];

export default function RateCardPage() {
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);

  const handleProfileClick = () => {
    setModal("account");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getData("Scraper");
        if (response && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="text-sm text-gray-500">Campaigns &gt; Rate Card</div>

      {user && (
        <div
          className="bg-indigo-100 p-4 rounded-lg cursor-pointer hover:shadow-md"
          onClick={handleProfileClick}
        >
          <div className="flex items-center space-x-4">
            <img
              src={user.image}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.fullName}</h2>
              <p className="text-sm text-gray-600">{user.categories || "N/A"}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Info Visible in Your Public Rate Card</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <DraggableCard key={item.id} title={item.title} onClick={() => setModal(item.id)} />
        ))}
      </div>

      {modal === "social" && <SocialMediaModal onClose={() => setModal(null)} />}
      {modal === "bio" && <BioModal onClose={() => setModal(null)} />}
      {modal === "rate" && <RateCardModal onClose={() => setModal(null)} />}
      {modal === "top" && <TopContentModal onClose={() => setModal(null)} />}
      {modal === "account" && <EditAccountModal onClose={() => setModal(null)} user={user} />}
    </div>
  );
}
