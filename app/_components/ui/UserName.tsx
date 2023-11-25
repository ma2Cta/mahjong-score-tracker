import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";

interface UserNameProps {
  name: string;
  image: string;
}

export const UserName: React.FC<UserNameProps> = ({ name, image }) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-5 w-5 border flex mr-1">
        <AvatarImage className="w-full h-full" src={image} />
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
      {name}
    </div>
  );
};
