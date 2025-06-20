import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { postData } from "../../../api/service";

const jobTypes = [
  "Instagram Image Post",
  "Instagram Story",
  "Instagram Video Post/Reels",
  "TikTok Video Post",
  "YouTube Product Review",
  "Follow, Komentar & Like",
  "Linkedin Follow, Komentar & Like",
  "Pembelian Produk",
];

const contentTypes = ["Repost", "Simple", "Product", "Attendance"];

const promoTypes = [
  "Produk",
  "Event",
  "Aplikasi",
  "Website",
  "Layanan",
  "Kampanye Sosial",
];

export default function JobForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jobType, setJobType] = useState("");
  const [price, setPrice] = useState(100000);
  const [contentType, setContentType] = useState("");
  const [referensiVisual, setreferensiVisual] = useState("");
  const [contentInstruction, setContentInstruction] = useState("");
  const [captionInstruction, setCaptionInstruction] = useState("");
  const [influencerNote, setInfluencerNote] = useState("");
  const [captionWebsite, setCaptionWebsite] = useState("");
  const [captionHashtags, setCaptionHashtags] = useState("");
  const [captionMentions, setCaptionMentions] = useState("");
  const [projectName, setProjectName] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [coverPreview, setCoverPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPrice(Number(raw || 0));
  };

  const handleCoverChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setCoverPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return "";

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);  

      const response =  await postData('file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCoverUrl(response.path);
      return response.path; // Return the URL so it can be used in handleSubmit
    } catch (error) {
      alert("Upload gagal: " + error.message);
      return "";
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await handleUpload();
    if (!imageUrl && file) { // If there's a file but upload failed, stop submission
      return;
    }

    const formData = {
      jenisPekerjaan: jobType,
      hargaPekerjaan: price,
      tipeKonten: contentType,
      referensiVisual,
      arahanKonten: contentInstruction,
      arahanCaption: captionInstruction,
      catatan: influencerNote,
      website: captionWebsite,
      hashtag: captionHashtags,
      mentionAccount: captionMentions,
      namaProyek: projectName,
      tipeProyek: promotionType,
      coverProyek: imageUrl,
      startDate,
      endDate,
    };

    try {
      await postData("Campaign", formData);
      alert("Berhasil mengirim campaign!");
      // Optionally reset form fields here
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim data: " + err.message);
    }
  };

  return (
    <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Detail Pekerjaan</h2>

        {/* Tanggal */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Tanggal Pekerjaan
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-600 mb-1">Mulai</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-600 mb-1">Berakhir</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                required
              />
            </div>
          </div>
        </div>

        {/* Jenis Pekerjaan */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Jenis Pekerjaan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {jobTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 has-checked:bg-blue-100 has-checked:border-blue-500 transition duration-150 ease-in-out"
              >
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={jobType === type}
                  onChange={() => setJobType(type)}
                  className="form-radio text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="text-gray-800">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Harga */}
        <div>
          <label htmlFor="price" className="block font-semibold text-gray-700 mb-2">
            Harga Pekerjaan (IDR)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
            <input
              type="text"
              id="price"
              value={formatPrice(price)}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              inputMode="numeric"
              pattern="[0-9.,]*"
            />
          </div>
        </div>

        {/* Tipe Konten dan Referensi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tipe Konten
            </label>
            <div className="flex flex-wrap gap-3">
              {contentTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 has-checked:bg-blue-100 has-checked:border-blue-500 transition duration-150 ease-in-out"
                >
                  <input
                    type="radio"
                    name="contentType"
                    value={type}
                    checked={contentType === type}
                    onChange={() => setContentType(type)}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="text-gray-800">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="referensiVisual" className="block font-semibold text-gray-700 mb-2">
              Referensi Visual
            </label>
            <textarea
              id="referensiVisual"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out min-h-[100px]"
              rows="3"
              value={referensiVisual}
              onChange={(e) => setreferensiVisual(e.target.value)}
              placeholder="Isi link URL, contoh: https://example.com/visual-guide"
              required
            ></textarea>
          </div>
        </div>

        {/* Arahan Konten dan Caption */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contentInstruction" className="block font-semibold text-gray-700 mb-2">
              Arahan Konten
            </label>
            <textarea
              id="contentInstruction"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out min-h-[120px]"
              rows="3"
              value={contentInstruction}
              onChange={(e) => setContentInstruction(e.target.value)}
              placeholder="Berikan arahan detail untuk konten yang akan dibuat"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="captionInstruction" className="block font-semibold text-gray-700 mb-2">
              Arahan Caption
            </label>
            <textarea
              id="captionInstruction"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out min-h-[120px]"
              rows="3"
              value={captionInstruction}
              onChange={(e) => setCaptionInstruction(e.target.value)}
              placeholder="Jelaskan arahan untuk caption postingan"
              required
            ></textarea>
          </div>
        </div>

        <hr className="border-t border-gray-200 my-8" />

        {/* Catatan & Caption Details */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Detail Caption & Catatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="influencerNote" className="block font-semibold text-gray-700 mb-2">
              Catatan Untuk Influencer
            </label>
            <textarea
              id="influencerNote"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out min-h-[80px]"
              rows="2"
              value={influencerNote}
              onChange={(e) => setInfluencerNote(e.target.value)}
              placeholder="Tambahkan catatan khusus untuk influencer jika ada"
            ></textarea>
          </div>

          <div>
            <label htmlFor="captionWebsite" className="block font-semibold text-gray-700 mb-2">
              Alamat Website pada Caption
            </label>
            <input
              type="url"
              id="captionWebsite"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Contoh: https://www.yourwebsite.com"
              value={captionWebsite}
              onChange={(e) => setCaptionWebsite(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="captionHashtags" className="block font-semibold text-gray-700 mb-2">
              Hashtag Wajib
            </label>
            <input
              type="text"
              id="captionHashtags"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="#promo #produkbaru #namacampaign"
              value={captionHashtags}
              onChange={(e) => setCaptionHashtags(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="captionMentions" className="block font-semibold text-gray-700 mb-2">
              Akun Instagram yang Wajib di Mention
            </label>
            <input
              type="text"
              id="captionMentions"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="@brandresmi @kolaborator"
              value={captionMentions}
              onChange={(e) => setCaptionMentions(e.target.value)}
            />
          </div>
        </div>

        <hr className="border-t border-gray-200 my-8" />

        {/* Campaign Info */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Tampilan Campaign</h2>
        <div>
          <label htmlFor="projectName" className="block font-semibold text-gray-700 mb-2">
            Nama Proyek
          </label>
          <input
            type="text"
            id="projectName"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Contoh: Kampanye Peluncuran Produk Baru"
            required
          />
        </div>

        <div>
          <label htmlFor="promotionType" className="block font-semibold text-gray-700 mb-2">
            Apa yang Dipromosikan
          </label>
          <select
            id="promotionType"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={promotionType}
            onChange={(e) => setPromotionType(e.target.value)}
            required
          >
            <option value="">Pilih salah satu</option>
            {promoTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Cover */}
        <div>
          <label htmlFor="cover-upload" className="block font-semibold text-gray-700 mb-2">
            Upload Cover Kampanye
          </label>
          <div className="flex items-center gap-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center w-56 h-40 bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out shadow-sm"
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <span className="text-sm font-medium">Klik untuk upload</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                </div>
              )}
            </label>
            {file && (
              <div className="flex flex-col">
                <p className="text-sm text-gray-700 font-medium">
                  File dipilih: <span className="font-normal">{file.name}</span>
                </p>
                {coverUrl && (
                  <p className="text-xs text-green-600 mt-1">
                    Uploaded successfully: <a href={coverUrl} target="_blank" rel="noopener noreferrer" className="underline">{coverUrl.substring(0, 30)}...</a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="text-right pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading}
          >
            {uploading ? "Mengunggah..." : "Kirim Campaign"}
          </button>
        </div>
      </form>
    </main>
  );
}