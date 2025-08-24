import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProjectType } from "@/data/projects";
import { X } from "lucide-react";

interface ProjectModalProps {
  project: ProjectType | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  const imagesToDisplay = project.images && project.images.length > 0 ? project.images : [project.image || "https://via.placeholder.com/1200x800/0000FF/FFFFFF?text=Temporary+Image"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-[900] bg-black/80" />
      <DialogContent 
        className="fixed left-[50%] top-[50%] z-[999] w-full max-w-screen-xl h-[95vh] md:h-auto translate-x-[-50%] translate-y-[-50%] rounded-lg overflow-hidden bg-white shadow-lg flex flex-col md:flex-row p-0" // Adjusted height for mobile, flex row for desktop
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">Project details for {project.title}</DialogDescription>
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Left Section: Image Carousel */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto md:min-h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="w-full h-full">
              {imagesToDisplay.map((src, index) => (
                <CarouselItem key={index} className="flex items-center justify-center w-full h-full overflow-hidden bg-black">
                  {project.mediaType === "video" ? (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="max-w-full max-h-full object-contain rounded-md shadow-md"
                      onEnded={(e) => (e.currentTarget.currentTime = 0)}
                      onLoadedData={(e) => (e.currentTarget.currentTime = 0)}
                      onPlay={(e) => (e.currentTarget.currentTime = 0)}
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`${project.title} image ${index + 1}`}
                      className="max-w-full max-h-full object-contain rounded-md shadow-md"
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white" />
          </Carousel>
        </div>

        {/* Right Section: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-gray-900 overflow-y-auto relative z-10">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold mb-4 gradient-text leading-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl max-w-full mx-auto mb-6 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {project.link && (
            <div className="mt-auto text-center py-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View Project
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
