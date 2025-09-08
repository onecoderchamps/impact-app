import { useEffect, useState } from "react";
import TopContentModal from "./ratecard/TopContentModal";
import EditAccountModal from "./ratecard/EditModa";
import SyncStatusModal from "./ratecard/SyncStatusModal";
import { getData, postData } from "../../../api/service";
import { Pencil } from 'lucide-react'; // Icon edit
import RateCardEditor from "./ratecard/RateCardModal";
import { useLocation } from "react-router-dom";
  import {
  Users,
  Film,
  Heart,
  Eye,
  MessageCircle,
  Repeat2,
} from 'lucide-react';

const initialItems = [
  { id: "top", title: "Top Performing Content" },
];

export default function RateCardPage() {
  const location = useLocation();
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(null);

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
      await getData(endpoint);
      setSyncStatus(`✅ ${platform} synced successfully.`);
    } catch (err) {
      setSyncStatus(`❌ Failed to sync ${platform}. Please try again.`);
      console.error(err);
    } finally {
      setSyncDone(true);
    }
  };


  async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64Digest;
  }

  function generateCodeVerifier() {
    const array = new Uint32Array(56); // panjang 43–128
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ("0" + dec.toString(16)).substr(-2)).join("");
  }

  const handleTikTokLogin = async () => {
    const TIKTOK_CLIENT_KEY = "sbawgaidkbothlgvz9";
    const REDIRECT_URI = "https://impact.id/appimpact/rate-card";
    const scope = "user.info.basic,video.list,user.info.profile,user.info.stats";
    const state = Math.random().toString(36).substring(2, 15);

    // 1. generate PKCE
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // 2. simpan ke localStorage supaya dipakai saat exchange token
    localStorage.setItem("tiktok_auth_state", state);
    localStorage.setItem("tiktok_code_verifier", codeVerifier);

    // 3. bikin URL auth
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/` +
      `?client_key=${TIKTOK_CLIENT_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=code` +
      `&state=${state}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;

    // 4. redirect ke TikTok
    window.location.href = authUrl;
  };

  const handleSyncYouTube = () => syncAccount("YouTube", "Scraper/scraperYoutube", "youtube");
  const handleSyncInstagram = () => syncAccount("Instagram", "Scraper/scraperInstagram", "instagram");
  const handleSyncTikTok = () => syncAccount("TikTok", "Scraper/scraperTiktok", "tikTok");
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
    const fetchUser = async () => {
      const response = await getData("auth/verifySessions");
      setVerify(response.data);
      if (response.data.tikTokAccessToken === null) {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const state = params.get("state");

        if (code) {
          console.log("TikTok Auth Code:", code);
          console.log("TikTok State:", state);
          // 2. ambil code_verifier dari localStorage
          const codeVerifier = localStorage.getItem("tiktok_code_verifier");

          // 3. kirim ke backend untuk exchange token
          postData("auth/tiktok/exchange", {
            code,
            codeVerifier,
            redirectUri: "https://impact.id/appimpact/rate-card",
          })
            .then((res) => {
              window.location.href = "/appimpact/rate-card"; // bersihkan URL
            })
            .catch((err) => {
              console.error("Token exchange failed:", err);
            });
        }
      }
    }
    fetchUser();
    fetchUserData();
  }, [location.search]);

  const handleSave = (data) => {
    console.log("Saved data:", data);
    // Send to backend here
  };



const CPV = 50;

const renderSocialCards = () => {
  return data.map((item) => {
    let platformName = null;
    let avatar = "";
    let followers = 0;
    let totalContent = 0;
    let lastLike = 0;

    let totalLike = 0;
    let totalComment = 0;
    let totalShare = 0;
    let totalView = 0;

    if (item.video && item.video.length > 0) {
      totalLike = item.video.reduce((sum, v) => sum + (v.likeCount || 0), 0);
      totalComment = item.video.reduce((sum, v) => sum + (v.commentCount || 0), 0);
      totalShare = item.video.reduce((sum, v) => sum + (v.shareCount || 0), 0);
      totalView = item.video.reduce((sum, v) => sum + (v.viewCount || 0), 0);
    }

    switch (item.type) {
      case "TikTok":
        platformName = item.tiktok?.displayName;
        avatar = item?.tiktok?.avatarUrl;
        followers = item.tiktok?.followerCount || 0;
        totalContent = item.tiktok?.videoCount || 0;
        lastLike = item?.tiktok?.likesCount || 0;
        break;
      default:
        return null;
    }

    const avgViews = totalContent > 0 ? Math.round(totalView / totalContent) : 0;
    const rateByViews = avgViews * CPV;
    const rateByFollowers = followers * 50;

    return (
      <div
        key={item.id}
        className="bg-black p-6 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Header & Main Stats */}
        <div className="flex flex-col sm:flex-row sm:space-x-8 mb-6">
          <div className="flex-shrink-0 flex items-center mb-4 sm:mb-0">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{platformName}</h2>
              <div className="flex items-center text-sm text-white mt-1">
                <Users size={16} className="text-blue-500 mr-2" />
                <span>{followers.toLocaleString()} Followers</span>
              </div>
              <div className="flex items-center text-sm text-white mt-1">
                <Film size={16} className="text-purple-500 mr-2" />
                <span>{totalContent} Videos</span>
              </div>
            </div>
          </div>

          <div className="flex-grow grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner flex items-center space-x-3">
              <div className="p-2 rounded-full bg-red-100">
                <Heart size={20} className="text-red-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{totalLike.toLocaleString()}</div>
                {/* <div className="text-sm text-gray-600">Likes</div> */}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-100">
                <MessageCircle size={20} className="text-green-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{totalComment.toLocaleString()}</div>
                {/* <div className="text-sm text-gray-600">Comments</div> */}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner flex items-center space-x-3">
              <div className="p-2 rounded-full bg-orange-100">
                <Repeat2 size={20} className="text-orange-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{totalShare.toLocaleString()}</div>
                {/* <div className="text-sm text-gray-600">Shares</div> */}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Eye size={20} className="text-blue-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{totalView.toLocaleString()}</div>
                {/* <div className="text-sm text-gray-600">Views</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Ratecard Section */}
        <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl font-bold text-indigo-700">💰</span>
            <h3 className="text-lg font-semibold text-indigo-700">Ratecard Estimation</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-100 p-3 rounded-md">
              <div className="text-sm font-medium text-indigo-800">Berbasis Views (CPV {CPV}):</div>
              <div className="text-lg font-bold text-indigo-900 mt-1">
                Rp{rateByViews.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-indigo-100 p-3 rounded-md">
              <div className="text-sm font-medium text-indigo-800">Berbasis Followers (Rp50/follower):</div>
              <div className="text-lg font-bold text-indigo-900 mt-1">
                Rp{rateByFollowers.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            *Nilai estimasi, dapat disesuaikan dengan engagement rate, jenis konten, platform, dan eksklusivitas.
          </p>
        </div>

        {/* Video Preview Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Latest Videos</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-2 px-2">
            {item.video?.map((vid) => (
              <div
                key={vid.id}
                className="flex-shrink-0 w-44 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => window.open(vid.embedLink, "_blank")}
              >
                <img
                  src={vid.coverImageUrl}
                  alt={vid.title}
                  className="w-44 h-64 object-cover rounded-xl shadow-lg border-2 border-gray-200"
                />
                <div className="mt-2 text-sm text-white font-medium truncate w-44">
                  {vid.title}
                </div>
                <div className="flex text-xs text-white space-x-2 mt-1">
                  <span>❤️ {vid.likeCount}</span>
                  <span>💬 {vid.commentCount}</span>
                  <span>👁️ {vid.viewCount}</span>
                </div>
              </div>
            ))}
          </div>
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
        {/* <button
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
        </button> */}
        {verify && verify.tikTokAccessToken !== null &&
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            onClick={handleSyncTikTok}
          >
            Sync TikTok
          </button>
        }
        {verify && verify.tikTokAccessToken === null &&
          <div className="flex space-x-4 mt-2">
            {/* ... tombol-tombol lainnya */}
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              onClick={handleTikTokLogin} // Ini adalah tombol sync manual
            >
              Connect To TikTok
            </button>
          </div>
        }
        {/* <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleSyncFacebook}
        >
          Sync Facebook
        </button> */}
        {/* <button
          className="px-4 py-2 text-sm font-medium text-white bg-[#0077B5] rounded-md hover:bg-[#006699]"
          onClick={handleSyncLinkedIn}
        >
          Sync LinkedIn
        </button> */}
      </div>

      <h2 className="text-xl font-bold mb-4">Your Social Media Performance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
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