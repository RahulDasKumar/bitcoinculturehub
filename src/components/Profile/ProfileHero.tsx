import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, MessageCircle, Send, Heart, Edit, UploadIcon, BuildingIcon, User, Book } from "lucide-react";
import { useEffect,useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "../Organization/Authentication/ui/Input";
import { SignUpFormData,ProfileInformation } from "../types";
import useAuthStore from "@/hooks/use-auth";
interface ProfileHeroProps {
  coverImage?: string;
  avatar?: string;
  name: string;
  handle: string;
  bio: string;
  location?: string;
  roles: string[];
  house?: string;
  lightningAddress?: string;
  isOwner?: boolean;
}

export const ProfileHero = ({
  coverImage = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=400&fit=crop",
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=bitcoin",
  name,
  handle,
  bio,
  location,
  isOwner = false,
}: ProfileHeroProps) => {
  const [selectEditButton, setSelectEditButton] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState<Partial<ProfileInformation>>({
    location: user.location,
    bio: user.bio,
    email: user.email,
    avatar: user.avatar,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-2xl">
        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      {/* Profile Content */}
      <div className="relative px-4 md:px-8 -mt-20">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-background overflow-hidden bg-surface shadow-elevated">
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-0 md:pt-16">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{name}</h1>
                  <p className="text-lg text-muted-foreground">@{handle}</p>
                </div>

                <p className="text-base text-foreground/90 max-w-2xl leading-relaxed">{bio}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {!isOwner && (
                <div className="flex flex-wrap gap-2 md:pt-0">
                  <Button variant="default" className="gap-2">
                    <Heart className="w-4 h-4" />
                    Follow
                  </Button>
                  <Button variant="secondary" className="gap-2">
                    <Zap className="w-4 h-4" />
                    Zap
                  </Button>
                  <Button variant="secondary" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Send className="w-4 h-4" />
                  </Button>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-80 sm:w-96">
                      <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>
                          Update your name, bio, handle, and profile details.
                        </SheetDescription>
                      </SheetHeader>

                      {/* form data */}
                      <div className="mt-6 space-y-4">
                        <div className="text-sm text-muted-foreground">
                          <div className="mb-8 w-full flex flex-col items-center animate-fade-in">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                              UPDATE PROFILE PICTURE
                            </label>
                            <div className="relative group cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                              />
                              <div
                                className={`
                                  w-40 h-40 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden transition-all duration-300
                                  ${previewUrl ? "bg-white" : "bg-slate-200 group-hover:bg-slate-300"}
                                `}
                              >
                                {previewUrl ? (
                                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="text-slate-400 flex flex-col items-center">
                                    <UploadIcon />
                                    <span className="text-xs mt-2 font-medium">Upload Logo</span>
                                  </div>
                                )}
                              </div>
                              <div className="absolute bottom-1 right-1 bg-slate-900 text-white p-2 rounded-full shadow-md z-20 pointer-events-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 5v14M5 12h14" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Update Display Name */}
                        <Input
                          label="Display Name"
                          name="organizationName"
                          placeholder="e.g. Satoshi Studios"
                          onChange={handleInputChange}
                          required
                          icon={<User />}
                        />
                        <Input
                          label="Location"
                          name="location"
                          placeholder="e.g. Satoshi Studios"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          icon={<BuildingIcon />}
                        />
                        <Input
                          label="Bio"
                          name="bio"
                          placeholder="e.g. about me"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="h-[1/2]"
                          icon={<Book />}
                        />
                      </div>

                      <Button className="mt-9" 
                      onClick={() => {
                        updateProfile(formData)
                         console.log(formData)}}>
                        Change
                      </Button>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
              {isOwner && <Button variant="secondary">Edit Profile</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

