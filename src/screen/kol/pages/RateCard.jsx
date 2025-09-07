import { useEffect, useState } from "react";
import TopContentModal from "./ratecard/TopContentModal";
import EditAccountModal from "./ratecard/EditModa";
import SyncStatusModal from "./ratecard/SyncStatusModal";
import { getData, postData } from "../../../api/service";
import { Pencil } from 'lucide-react'; // Icon edit
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

  const syncAccount = async (platform, endpoint, usernameField) => {
    if (!user) return;
    const username = user[usernameField];
    if (!username || username.trim() === "") {
      setSyncStatus(`❌ ${platform} synchronization skipped. No username found.`);
      setSyncDone(true);
      return;
    }

    setSyncModalVisible(true);
    setSyncStatus(`🔄 Starting ${platform} synchronization...`);
    setSyncDone(false);

    try {
      await postData(endpoint, { username });
      setSyncStatus(`✅ ${platform} synced successfully.`);
    } catch (err) {
      setSyncStatus(`❌ Failed to sync ${platform}. Please try again.`);
      console.error(err);
    } finally {
      setSyncDone(true);
    }
  };

  // const handleSyncTikTok = () => syncAccount("TikTok", "Scraper/scraperTiktok", "tikTok");
  const handleTikTokLogin = () => {
    const TIKTOK_CLIENT_KEY = 'awgarpn9l04je0io';
    const REDIRECT_URI = 'https://your-backend-api.com/api/auth/tiktok/callback';
    const scope = "user.info.basic,video.list,video.display.list"; // Scope yang diminta
    const state = Math.random().toString(36).substring(2, 15); // State token untuk keamanan

    const authUrl = `https://www.tiktok.com/v2/auth/authorize/` +
      `?client_key=${TIKTOK_CLIENT_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=code` +
      `&state=${state}`;

    // Simpan state di localStorage atau session storage untuk verifikasi nanti
    localStorage.setItem('tiktok_auth_state', state);
    console.log(state);

    // Alihkan pengguna ke URL otorisasi TikTok
    window.location.href = authUrl;
  };
  const handleSyncYouTube = () => syncAccount("YouTube", "Scraper/scraperYoutube", "youtube");
  const handleSyncInstagram = () => syncAccount("Instagram", "Scraper/scraperInstagram", "instagram");
  // const handleSyncFacebook = () => {
  //   syncAccount("Facebook", "Scraper/scraperFacebook", "facebook");
  // };
  const handleSyncLinkedIn = () => syncAccount("LinkedIn", "Scraper/scraperLinkin", "linkedin");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getData("Scraper");
        if (response) {
          setUser(response.user);
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
    // Send to backend here
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
    <div className="ml-64 mt-20 p-6 bg-gray-50 min-h-screen space-y-6">

      {user && (
        <div
          className="relative bg-indigo-100 p-4 rounded-lg"
        >
          <div className="absolute top-2 right-2">
            <Pencil
              className="w-5 h-5 text-gray-500 hover:text-blue-600"
              onClick={handleProfileClick}
            />
          </div>

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

      <div className="flex space-x-4 mt-2">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          onClick={handleSyncYouTube}
        >
          Sync YouTube
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
          onClick={handleSyncInstagram}
        >
          Sync Instagram
        </button>
        {/* <button
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
          onClick={handleSyncTikTok}
        >
          Sync TikTok
        </button> */}
        <div className="flex space-x-4 mt-2">
          {/* ... tombol-tombol lainnya */}
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            onClick={handleTikTokLogin} // Ini adalah tombol sync manual
          >
            Login with TikTok
          </button>
        </div>
        {/* <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleSyncFacebook}
        >
          Sync Facebook
        </button> */}
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-[#0077B5] rounded-md hover:bg-[#006699]"
          onClick={handleSyncLinkedIn}
        >
          Sync LinkedIn
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Social Media Performance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderSocialCards()}
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Info Visible in Your Public Rate Card</h2>
      <RateCardEditor onSave={handleSave} />
      {modal === "top" && <TopContentModal onClose={() => setModal(null)} />}
      {modal === "account" && <EditAccountModal onClose={() => { setModal(null) }} user={user} />}

      {syncModalVisible && (
        <SyncStatusModal
          status={syncStatus}
          onClose={() => { setSyncModalVisible(false); window.location.reload() }}
          isFinished={syncDone}
        />
      )}
    </div>
  );
}