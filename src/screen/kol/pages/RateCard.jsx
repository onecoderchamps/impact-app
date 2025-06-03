import { useState } from "react";
import DraggableCard from "./ratecard/DraggableCard";
import SocialMediaModal from "./ratecard/SocialMediaModal";
import BioModal from "./ratecard/BioModal";
import TopContentModal from "./ratecard/TopContentModal";
import RateCardModal from "./ratecard/RateCardModal";

// EditAccountModal langsung ditulis di sini
function EditAccountModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Account Information</h2>
        <form className="space-y-4">
          <input type="text" defaultValue="Hilyathul Wahid" className="input w-full" />
          <input type="email" defaultValue="hilmanzutech@gmail.com" className="input w-full" />
          <input type="text" defaultValue="+6281310531713" className="input w-full" />
          <button type="submit" className="btn btn-primary w-full">Save</button>
        </form>
      </div>
    </div>
  );
}

const initialItems = [
  { id: "social", title: "Social Media Accounts" },
  { id: "bio", title: "Bio" },
  { id: "rate", title: "Rate Card (IDR)" },
  { id: "top", title: "Top Performing Content" },
];

export default function RateCardPage() {
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(null);

  const handleProfileClick = () => {
    setModal("account");
  };

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">Campaigns &gt; Rate Card</div>

      {/* Profile Card */}
      <div
        className="bg-indigo-100 p-4 rounded-lg cursor-pointer hover:shadow-md"
        onClick={handleProfileClick}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-200 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
            HW
          </div>
          <div>
            <h2 className="text-lg font-semibold">Hilyathul Wahid</h2>
            <p className="text-sm text-gray-600">Tech</p>
            <p className="text-sm text-gray-600">hilmanzutech@gmail.com</p>
            <p className="text-sm text-gray-600">+6281310531713</p>
          </div>
        </div>
      </div>

      {/* Draggable Cards */}
      <h2 className="text-xl font-bold mb-4">Info Visible in Your Public Rate Card</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <DraggableCard key={item.id} title={item.title} onClick={() => setModal(item.id)} />
        ))}
      </div>

      {/* Modals */}
      {modal === "social" && <SocialMediaModal onClose={() => setModal(null)} />}
      {modal === "bio" && <BioModal onClose={() => setModal(null)} />}
      {modal === "rate" && <RateCardModal onClose={() => setModal(null)} />}
      {modal === "top" && <TopContentModal onClose={() => setModal(null)} />}
      {modal === "account" && <EditAccountModal onClose={() => setModal(null)} />}
    </div>
  );
}
