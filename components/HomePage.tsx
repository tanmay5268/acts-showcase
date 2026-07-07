import Hero from "@/components/Hero";
import Video from "@/components/Video";
import MobileVideoAbout from "@/components/MobileVideoAbout";
import Galleryforus from "@/components/Galleryforus";
const HomePage = () => {
  return (
    <div className="w-screen h-screen">
      <Hero></Hero>
      <div className="max-sm:hidden">
        <Video></Video>
      </div>
      <div className="max-sm:hidden w-screen h-125">

      </div>
      <div className=" sm:hidden ">
        <MobileVideoAbout></MobileVideoAbout>
      </div>
      <Galleryforus></Galleryforus>
      <div className="w-screen h-screen"></div>
    </div>
  );
};

export default HomePage;
