import UploadImage from "@/components/image-upload";
import { getCurrentUser } from "@/lib/session";

export default async function Main() {
  const user = await getCurrentUser();

  return (
    <div>
      <div>
        <UploadImage userId={user?.id} />
      </div>
    </div>
  );
}
