// "use client";
// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import axios from "axios";

// interface Video {
//   ID: number;
//   CreatedAt: string;
//   UpdatedAt: string;
//   DeletedAt: string | null;
//   name: string;
//   title: string;
//   video_url: string;
// }

// const API_URL = "http://localhost:5000/videos";

// const Videos = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchVideos();
//   }, []);
// //
//   const fetchVideos = async () => {
//     try {
//       const response = await axios.get<Video[]>(API_URL);
//       setVideos(response.data);
//     } catch (error) {
//       console.error("Error fetching videos", error);
//     }
//   };

//   const handleCreateOrUpdateVideo = async (e: FormEvent) => {
//     e.preventDefault();

//     if (file) {
//       if (file.type !== "video/mp4") {
//         setError("Invalid file type. Only MP4 videos are allowed.");
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         // 5 MB
//         setError("File size exceeds limit. Video size must be less than 3 MB.");
//         return;
//       }
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("title", title);
//     if (file) formData.append("file", file);

//     try {
//       let response;
//       if (selectedVideo) {
//         response = await axios.put<Video>(
//           `${API_URL}/${selectedVideo.ID}`,
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//       } else {
//         response = await axios.post<Video>(API_URL, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       fetchVideos();
//       setSelectedVideo(null);
//       setName("");
//       setTitle("");
//       setFile(null);
//       setError(null);
//     } catch (error) {
//       console.error("Error creating or updating video", error);
//     }
//   };

//   const handleDeleteVideo = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchVideos();
//     } catch (error) {
//       console.error("Error deleting video", error);
//     }
//   };

//   const handleEditVideo = (video: Video) => {
//     setSelectedVideo(video);
//     setName(video.name);
//     setTitle(video.title);
//   };

//   return (
//     <div>
//       <h1>Video Management</h1>
//       <form onSubmit={handleCreateOrUpdateVideo}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="file"
//           onChange={(e: ChangeEvent<HTMLInputElement>) => {
//             if (e.target.files) setFile(e.target.files[0]);
//           }}
//         />
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">
//           {selectedVideo ? "Update Video" : "Create Video"}
//         </button>
//       </form>

//       <ul>
//         {videos.map((video) => (
//           <li key={video.ID}>
//             <h2>{video.title}</h2>
//             <p>{video.name}</p>
//             <video width="320" height="240" controls preload="none">
//               <source src={video.video_url} type="video/mp4" />
//             </video>
//             <button onClick={() => handleEditVideo(video)}>Edit</button>
//             <button onClick={() => handleDeleteVideo(video.ID)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Videos;
