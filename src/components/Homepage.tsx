import { ArrowUp, Calendar, LogIn, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const buttons = [
  { id: 0, label: "Featured" },
  { id: 1, label: "Ai" },
  { id: 2, label: "Business" },
  { id: 6, label: "Marketing" },
  { id: 3, label: "Design" },
  { id: 4, label: "Photography" },
  { id: 5, label: "Business" },
];

type Item = {
  title: string;
  startTime: string;
  staff: number;
  photo: { href: string }[];
  Author: string;
  description: string;
};

const Homepage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [truee, setTrue] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const data: { items: Item[] } = await response.json();
      setItems(data.items);
      console.log(data.items);
      console.log("Fetched data:", data);
    };
    fetchData();
  }, []);

  const [capturePhotos, setCapturePhotos] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (capturePhotos === true) {
      // Delay to ensure video element is rendered
      setTimeout(() => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            const videoElement = document.getElementById(
              "home",
            ) as HTMLVideoElement;
            if (videoElement) {
              videoElement.srcObject = stream;
            }
          })
          .catch((err) => console.error("Camera error:", err));
      }, 0);
    }
  }, [capturePhotos]);

  const capturePhoto = () => {
    setCapturePhotos(true);
  };
  const snapPhoto = () => {
    const video = document.getElementById("home") as HTMLVideoElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoUrl = canvas.toDataURL("image/png");
    setPhotoUrl(photoUrl);

    console.log(photoUrl);
    setCapturePhotos(false);
  };

  return (
    <section className="w-screen relative bg-amber-50">
      <nav className="min-w-full  bg-blue-950">
        <div className="max-w-7xl flex flex-col m-auto">
          <div className="w-full  px-10 p-5 ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex md:hidden text-white items-center">
                {<Menu onClick={() => setOpen(true)} />}
              </div>
              <div className="flex flex-row">
                {" "}
                {/* by pass protection is on */}
                <h1 className="text-3xl bg-transparent text-white">Maven</h1>
                <input
                  type="text"
                  placeholder="Enter your text"
                  className="hidden md:flex text-white border border-white rounded-full px-3 ml-10 bg-transparent outline-none "
                />
              </div>
              <div className="hidden md:flex gap-3 ">
                <h1 className="text-white font-semibold">Ligthing lesson</h1>
                <h1 className="text-white font-semibold">Apply to Teach</h1>
                <h1 className="text-white font-semibold">Login</h1>
              </div>
              <div className="flex md:hidden">
                <Search className="text-white" />
                <LogIn className="text-white ml-2" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <h1 className="text-white">Lighting Lessons</h1>
              <div className="hidden md:flex items-center gap-2">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => setSelectedButton(button.id)}
                    className={`px-4 py-2 rounded-xl font-semibold transform transition-all duration-300  ${
                      selectedButton === button.id
                        ? "bg-white text-blue-950"
                        : "bg-blue-950 text-white hover:border-amber-400 hover:border"
                    }`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              <button
                className="text-white flex md:hidden transform transition-all duration-150"
                onClick={() => setTrue((p) => !p)}
              >
                {/* {<ArrowUp className={!truee && "rotate-180"} />}Choose options */}
              </button>
            </div>
            <div className={`md:hidden mt-3 ${truee ? "flex" : "hidden"}`}>
              {buttons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setSelectedButton(button.id)}
                  className={`px-3 py-2 rounded-xl font-semibold text-sm md:text-lg transform transition-all duration-300  ${
                    selectedButton === button.id
                      ? "bg-white text-blue-950"
                      : "bg-blue-950 text-white hover:border-amber-400 hover:border"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`md:hidden absolute my-5 min-h-[calc(100vh-30)] w-2/3 left-3 top-3 bg-white bg-opacity-10 backdrop-blur-md p-5 rounded-xl flex flex-col gap-4 ${open ? "block" : "hidden"}`}
      >
        <X
          onClick={() => setOpen(false)}
          className="text-black ml-auto cursor-pointer"
        />
        <h1 className="text-2xl font-bold text-black">Fileds</h1>

        <div className="w-full">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedButton(button.id)}
              className={`w-full justify-between mt-3 px-4 py-2 rounded-xlfont-semibold transform transition-all duration-300 flex text-black`}
            >
              {button.label}
              {<ArrowUp className="rotate-90" />}
            </button>
          ))}
        </div>
      </div>
      <section className="max-w-7xl m-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="w-full flex items-center flex-col">
            <button
              onClick={capturePhoto}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Capture Photo
            </button>
            <button
              id="snap"
              className="absolutke left-0 right-0 text-white bg-green-300 "
              onClick={snapPhoto}
            >
              Take photo
            </button>
            {capturePhotos && (
              <video
                id="home"
                // autoPlay
                controls
                muted
                className="w-full h-full relative"
              ></video>
            )}
          </div>
          <canvas id="canvas" className="hidden"></canvas>
          {photoUrl && (
            <div className="">
              <img
                id="captured-photo"
                alt="Captured"
                className="w-full h-full object-cover border border-dashed border-gray-300"
                src={photoUrl || undefined}
              />
            </div>
          )}

          {items.map((item, index) => (
            <div
              key={index}
              className="m-5 bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="w-full flex flex-col items-start p-3">
                <h1 className="text-2xl text-black w-full bh3 sm:bh4 line-clamp-2 text-start font-bold">
                  {item.title}
                </h1>
                <div className="flex w-full text-sm justify-between mt-2 font-sans">
                  <div className="text-green-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>{" "}
                    {item.startTime}
                  </div>
                  <p className="text-gray-500">{item.staff} students</p>
                </div>
                <div className=" flex gap-4 items-center mt-2">
                  <div className="flex isolate -space-x-2 items-center">
                    {item.photo.map((itemX, idx) => (
                      <div
                        key={idx}
                        className="relative isolate block flex-none overflow-hidden rounded-full ring-2 ring-current h-9 w-9"
                        style={{ zIndex: 2 }}
                      >
                        <img
                          alt=""
                          loading="lazy"
                          decoding="async"
                          data-nimg="fill"
                          className="object-cover"
                          sizes="100vw"
                          // srcset="/_next/image?url=https%3A%2F%2Fd2426xcxuh3ht5.cloudfront.net%2FUX6kz7DTSXqkWPXnr5QS_1723788296821.jpeg&amp;w=415&amp;q=75 415w, /_next/image?url=https%3A%2F%2Fd2426xcxuh3ht5.cloudfront.net%2FUX6kz7DTSXqkWPXnr5QS_1723788296821.jpeg&amp;w=768&amp;q=75 768w, /_next/image?url=https%3A%2F%2Fd2426xcxuh3ht5.cloudfront.net%2FUX6kz7DTSXqkWPXnr5QS_1723788296821.jpeg&amp;w=1024&amp;q=75 1024w, /_next/image?url=https%3A%2F%2Fd2426xcxuh3ht5.cloudfront.net%2FUX6kz7DTSXqkWPXnr5QS_1723788296821.jpeg&amp;w=1280&amp;q=75 1280w, /_next/image?url=https%3A%2F%2Fd2426xcxuh3ht5.cloudfront.net%2FUX6kz7DTSXqkWPXnr5QS_1723788296821.jpeg&amp;w=1536&amp;q=75 1536w"
                          src={itemX?.href}
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            inset: "0px",
                            color: "transparent",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs flex">
                    {" "}
                    <p className="text-gray-700 mt-2">{item.Author} : </p>
                    <p className="text-gray-700 mt-2">{item.description}</p>
                  </span>
                </div>
                <span className="flex w-full items-center mt-2">
                  <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Enroll Now
                  </button>
                  <Calendar size="30" className="text-black ml-2" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="w-full bg-blue-950 mt-10 p-5">
        <div className="max-w-7xl m-auto flex flex-col md:flex-row justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Maven</h1>
          <p className="mt-3 md:mt-0">© 2024 Maven Inc. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};

export default Homepage;
