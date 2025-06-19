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
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim data." + err);
    }
  };

  return (
    <main className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen space-y-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white p-6 rounded-xl shadow space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Detail Pekerjaan</h2>

        {/* Tanggal */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Tanggal Pekerjaan
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
        </div>

        {/* Jenis Pekerjaan */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Jenis Pekerjaan
          </label>
          <div className="grid grid-cols-2 gap-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={jobType === type}
                  onChange={() => setJobType(type)}
                  required
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Harga */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Harga Pekerjaan (IDR)
          </label>
          <input
            type="text"
            value={formatPrice(price)}
            onChange={handlePriceChange}
            className="border rounded px-3 py-2 w-full"
            inputMode="numeric"
            pattern="[0-9.,]*"
          />
        </div>

        {/* Tipe Konten dan Referensi */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Tipe Konten
            </label>
            <div className="flex flex-wrap gap-4">
              {contentTypes.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="contentType"
                    value={type}
                    checked={contentType === type}
                    onChange={() => setContentType(type)}
                    required
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Referensi Visual
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="3"
              value={referensiVisual}
              onChange={(e) => setreferensiVisual(e.target.value)}
              placeholder="Isi link URL"
              required
            ></textarea>
          </div>
        </div>

        {/* Arahan Konten dan Caption */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Arahan Konten
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="3"
              value={contentInstruction}
              onChange={(e) => setContentInstruction(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Arahan Caption
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="3"
              value={captionInstruction}
              onChange={(e) => setCaptionInstruction(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Catatan & Caption */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Catatan Untuk Influencer
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="2"
              value={influencerNote}
              onChange={(e) => setInfluencerNote(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Alamat Website pada Caption
            </label>
            <textarea
              rows="2"
              className="w-full border rounded px-3 py-2"
              value={captionWebsite}
              onChange={(e) => setCaptionWebsite(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Hashtag Wajib
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="#promo #hashtag1"
              value={captionHashtags}
              onChange={(e) => setCaptionHashtags(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Akun Instagram yang Wajib di Mention
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="@akun1 @akun2"
              value={captionMentions}
              onChange={(e) => setCaptionMentions(e.target.value)}
            />
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Campaign Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tampilan Campaign</h2>
          <label className="block font-medium text-gray-700 mb-1">
            Nama Proyek
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Apa yang Dipromosikan
          </label>
          <select
            className="w-full border rounded px-3 py-2"
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
          <label className="block font-medium text-gray-700 mb-1">
            Upload Cover Kampanye
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="border border-dashed border-gray-400 p-4 rounded-lg cursor-pointer flex items-center justify-center w-48 h-32 bg-gray-100"
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="object-cover w-full h-full rounded"
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="text-sm">Klik untuk upload</span>
                </div>
              )}
            </label>
            {file && (
              <p className="text-sm text-green-600 mt-1">
                File selected: {file.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="text-right pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
}
