export default function SocialStatCard({ platform, profilePic, followers, totalContent, lastLike }) {
  const shouldShowFollowers = followers > 1;
  const shouldShowTotalContent = totalContent > 1;
  const shouldShowLastLike = lastLike > 1;

  // Jika semua data tidak layak tampil, sembunyikan seluruh card
  if (!shouldShowFollowers && !shouldShowTotalContent && !shouldShowLastLike) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full sm:w-64">
      <div className="flex items-center space-x-4">
        <img src={profilePic} alt={`${platform} profile`} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="text-md font-semibold">{platform}</h3>
          {shouldShowFollowers && (
            <p className="text-sm text-gray-500">{followers.toLocaleString()} followers</p>
          )}
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-700">
        {shouldShowTotalContent && (
          <p>Total Content: <span className="font-medium">{totalContent}</span></p>
        )}
        {shouldShowLastLike && (
          <p>Last Like: <span className="font-medium">{lastLike}</span></p>
        )}
      </div>
    </div>
  );
}
