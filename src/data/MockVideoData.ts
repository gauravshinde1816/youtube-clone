// mockVideoData.ts

export interface Comment {
  id: string;
  userId: string;
  comment: string;
  userProfilePhoto: string;
}

export interface Video {
  id: string;
  title: string; // Added title
  channelName: string; // Added channel name
  thumbnail: string;
  videoFile: string;
  likesCount: number;
  comments: Comment[];
}

const mockVideoData: Video[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Never Gonna Give You Up", // Added title
    channelName: "Rick Astley", // Added channel name
    thumbnail: "https://picsum.photos/400/225?random=1",
    videoFile:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Big Buck Bunny
    likesCount: Math.floor(Math.random() * 1000),
    comments: Array.from({ length: 10 }, (_, i) => ({
      id: `comment1_${i + 1}`,
      userId: `user1_${i + 1}`,
      comment: `Comment ${i + 1} on "Never Gonna Give You Up"`,
      userProfilePhoto: `https://i.pravatar.cc/32?img=${i + 1}`,
    })),
  },
  {
    id: "9bZkp7q19f0",
    title: "Nyan Cat", // Added title
    channelName: "saraj00n", // Added channel name
    thumbnail: "https://picsum.photos/400/225?random=2",
    videoFile:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Elephants Dream
    likesCount: Math.floor(Math.random() * 1000),
    comments: Array.from({ length: 10 }, (_, i) => ({
      id: `comment2_${i + 1}`,
      userId: `user2_${i + 1}`,
      comment: `Comment ${i + 1} on "Nyan Cat"`,
      userProfilePhoto: `https://i.pravatar.cc/32?img=${i + 11}`,
    })),
  },
  // ... 28 more video records following the same pattern ...
];

// Generate remaining video records (video3 to video30)
for (let i = 3; i <= 30; i++) {
  mockVideoData.push({
    id: `video${i}`,
    title: `Video Title ${i}`,
    channelName: `Channel ${i}`,
    thumbnail: `https://picsum.photos/400/225?random=${i}`,
    videoFile: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`, // For Bigger Blazes
    likesCount: Math.floor(Math.random() * 1000),
    comments: Array.from({ length: 10 }, (_, j) => ({
      id: `comment${i}_${j + 1}`,
      userId: `user${i}_${j + 1}`,
      comment: `Comment ${j + 1} on video ${i}`,
      userProfilePhoto: `https://i.pravatar.cc/32?img=${i * 10 + j + 1}`,
    })),
  });
}

export const getVideoFromId = (id: string | null) => {
  return mockVideoData.find((video) => video.id === id);
};

export default mockVideoData;
