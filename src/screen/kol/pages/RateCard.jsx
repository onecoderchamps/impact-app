import { useEffect, useState } from "react";
import DraggableCard from "./ratecard/DraggableCard";
import TopContentModal from "./ratecard/TopContentModal";
import EditAccountModal from "./ratecard/EditModa";
import SyncStatusModal from "./ratecard/SyncStatusModal";
import { getData, postData } from "../../../api/service";
import RateCardEditor from "./ratecard/RateCardModal";

const initialItems = [
  { id: "top", title: "Top Performing Content" },
];

export default function RateCardPage() {
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [syncStatus, setSyncStatus] = useState("");
  const [syncDone, setSyncDone] = useState(false);
  const [syncModalVisible, setSyncModalVisible] = useState(false);

  const handleProfileClick = () => {
    setModal("account");
  };

  const handleSyncAccounts = async () => {
    if (!user) return;
    setSyncModalVisible(true);
    setSyncStatus("Starting synchronization...");
    setSyncDone(false);

    const results = [];

    const syncTasks = [
      { platform: "TikTok", field: "tikTok", endpoint: "Scraper/scraperTiktok" },
      { platform: "YouTube", field: "youtube", endpoint: "Scraper/scraperYoutube" },
      { platform: "Instagram", field: "instagram", endpoint: "Scraper/scraperInstagram" },
      { platform: "LinkedIn", field: "linkedin", endpoint: "Scraper/scraperLinkin" },
    ];

    for (const task of syncTasks) {
      const username = user[task.field];
      if (username && username.trim() !== "") {
        setSyncStatus(prev => prev + `\n🔄 Syncing ${task.platform}...`);
        try {
          await postData(task.endpoint, { username });
          results.push(`✅ ${task.platform} synced successfully.`);
        } catch (err) {
          results.push(`❌ Failed to sync ${task.platform}.`);
        }
      } else {
        results.push(`⏭️ ${task.platform} skipped (no username).`);
      }
    }

    setSyncStatus(results.join("\n"));
    setSyncDone(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getData("Scraper");
        if (response) {
          setUser(response.user);
          console.log(response.data)
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = (data) => {
    console.log("Saved data:", data);
    // Kirim ke backend di sini
  };

  const renderSocialCards = () => {
    return data.map((item) => {
      let platform = null;
      let avatar = "";
      let followers = 0;
      let totalContent = 0;
      let lastLike = 0;

      switch (item.type) {
        case "Youtube":
          platform = item.youtube;
          avatar = user?.image;
          followers = platform?.numberOfSubscribers || 0;
          totalContent = 1;
          lastLike = platform?.viewCount || 0;
          break;
        case "Instagram":
          platform = item.instagram;
          avatar = platform?.profilePicUrl;
          followers = platform?.followersCount || 0;
          totalContent = platform?.postsCount || 0;
          break;
        case "Linkedin":
          platform = item.linkedin;
          avatar = platform?.profilePic;
          followers = platform?.followers || 0;
          totalContent = 1;
          break;
        case "TikTok":
          platform = item.tiktok?.authorMeta;
          avatar = platform?.avatar;
          followers = platform?.fans || 0;
          totalContent = platform?.video || 0;
          lastLike = platform?.heart || 0;
          break;
        default:
          return null;
      }

      return (
        <div
          key={item.id}
          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow border"
        >
          <img
            src={avatar}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="text-lg font-semibold">{item.type}</div>
            <div className="text-sm text-gray-600">Followers: {followers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Content: {totalContent}</div>
            <div className="text-sm text-gray-600">Last Like/Views: {lastLike.toLocaleString()}</div>
          </div>
        </div>
      );
    });
  };

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
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold">{user.fullName}</h2>
                {user.isVerification && (
                  <span className="text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                    ✔️ Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{user.categories || "N/A"}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>
      )}

      <button
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={handleSyncAccounts}
      >
        🔄 Sync Account
      </button>

      <h2 className="text-xl font-bold mb-4">Your Social Media Performance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderSocialCards()}
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Info Visible in Your Public Rate Card</h2>
      <RateCardEditor onSave={handleSave} />
      <div className="space-y-4">
        {items.map((item) => (
          <DraggableCard key={item.id} title={item.title} onClick={() => setModal(item.id)} />
        ))}
      </div>
      {modal === "top" && <TopContentModal onClose={() => setModal(null)} />}
      {modal === "account" && <EditAccountModal onClose={() => setModal(null)} user={user} />}

      {syncModalVisible && (
        <SyncStatusModal
          status={syncStatus}
          onClose={() => setSyncModalVisible(false)}
          isFinished={syncDone}
        />
      )}
    </div>
  );
}
